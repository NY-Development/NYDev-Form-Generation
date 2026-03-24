const Submission = require('../models/Submission');
const Form = require('../models/Form');
const AppError = require('../utils/AppError');
const { generateUniqueId, generateSequentialId } = require('../utils/generateUniqueId');
const { generateQRCode } = require('../utils/generateQRCode');
const env = require('../config/env');

/**
 * Create a new submission (public form submit)
 */
const create = async ({ formId, organizationId, responses, submitterEmail, submitterName, metadata }) => {
  // Get the form for config
  const form = await Form.findById(formId);
  if (!form) {
    throw new AppError('Form not found.', 404);
  }

  // Check if form is accepting responses
  if (!form.settings.acceptingResponses || form.status !== 'published') {
    throw new AppError('This form is not currently accepting responses.', 403);
  }

  // Check max responses
  if (form.settings.maxResponses > 0 && form.submissionCount >= form.settings.maxResponses) {
    throw new AppError('This form has reached the maximum number of responses.', 403);
  }

  // Check one response per email
  if (form.settings.oneResponsePerEmail && submitterEmail) {
    const existing = await Submission.findOne({ formId, submitterEmail });
    if (existing) {
      throw new AppError('You have already submitted a response to this form.', 400);
    }
  }

  // Generate unique ID
  const prefix = form.uniqueIdConfig?.prefix || 'REG';
  let uniqueId;

  if (form.uniqueIdConfig?.useSequential) {
    const count = form.submissionCount + 1;
    uniqueId = generateSequentialId(prefix, count);
  } else {
    uniqueId = generateUniqueId(prefix);
  }

  // Ensure uniqueId is actually unique in DB
  let retries = 0;
  while (await Submission.findOne({ uniqueId }) && retries < 5) {
    uniqueId = generateUniqueId(prefix);
    retries++;
  }

  // Generate QR code
  const qrCode = await generateQRCode(uniqueId, env.CLIENT_URL);

  // Determine initial status
  const status = form.settings.requireApproval ? 'pending' : 'approved';

  // Create submission
  const submission = await Submission.create({
    formId,
    organizationId,
    responses,
    uniqueId,
    qrCode,
    status,
    submitterEmail: submitterEmail || '',
    submitterName: submitterName || '',
    metadata: metadata || {},
  });

  // Increment form submission count
  form.submissionCount += 1;
  await form.save({ validateBeforeSave: false });

  return submission;
};

/**
 * Get submissions for a form (admin)
 */
const getByForm = async (formId, organizationId, { page = 1, limit = 20, status, search } = {}) => {
  const query = { formId, organizationId };

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { submitterName: { $regex: search, $options: 'i' } },
      { submitterEmail: { $regex: search, $options: 'i' } },
      { uniqueId: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const [submissions, total] = await Promise.all([
    Submission.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Submission.countDocuments(query),
  ]);

  return {
    submissions,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get a single submission by ID
 */
const getById = async (submissionId) => {
  const submission = await Submission.findById(submissionId)
    .populate('formId', 'title slug')
    .populate('verifiedBy', 'firstName lastName email');

  if (!submission) {
    throw new AppError('Submission not found.', 404);
  }

  return submission;
};

/**
 * Get submission by uniqueId (for verification)
 */
const getByUniqueId = async (uniqueId) => {
  const submission = await Submission.findOne({ uniqueId })
    .populate('formId', 'title slug organizationId')
    .populate('organizationId', 'name logo');

  if (!submission) {
    throw new AppError('Submission not found.', 404);
  }

  return submission;
};

/**
 * Approve a submission
 */
const approve = async (submissionId, userId) => {
  const submission = await Submission.findById(submissionId);

  if (!submission) {
    throw new AppError('Submission not found.', 404);
  }

  submission.status = 'approved';
  await submission.save();

  return submission;
};

/**
 * Reject a submission
 */
const reject = async (submissionId, userId, notes = '') => {
  const submission = await Submission.findById(submissionId);

  if (!submission) {
    throw new AppError('Submission not found.', 404);
  }

  submission.status = 'rejected';
  submission.notes = notes;
  await submission.save();

  return submission;
};

/**
 * Verify a submission (QR scan)
 */
const verify = async (uniqueId, verifiedBy = null) => {
  const submission = await Submission.findOne({ uniqueId })
    .populate('formId', 'title slug')
    .populate('organizationId', 'name logo');

  if (!submission) {
    throw new AppError('Invalid verification code. Submission not found.', 404);
  }

  if (submission.status === 'rejected') {
    throw new AppError('This registration has been rejected.', 400);
  }

  if (submission.status === 'verified') {
    return {
      submission,
      alreadyVerified: true,
      message: 'This registration has already been verified.',
    };
  }

  if (submission.status === 'pending') {
    throw new AppError('This registration is still pending approval.', 400);
  }

  // Mark as verified
  submission.status = 'verified';
  submission.verifiedAt = new Date();
  if (verifiedBy) {
    submission.verifiedBy = verifiedBy;
  }
  await submission.save();

  return {
    submission,
    alreadyVerified: false,
    message: 'Registration verified successfully.',
  };
};

module.exports = {
  create,
  getByForm,
  getById,
  getByUniqueId,
  approve,
  reject,
  verify,
};
