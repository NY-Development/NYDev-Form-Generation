const submissionService = require('../services/submissionService');
const { sendSuccess } = require('../utils/response');

/**
 * @desc    Verify a submission via unique ID (from QR code scan)
 * @route   GET /api/verify/:uniqueId
 * @access  Public
 */
const verifySubmission = async (req, res, next) => {
  try {
    const result = await submissionService.verify(req.params.uniqueId);

    sendSuccess(res, {
      verified: !result.alreadyVerified,
      alreadyVerified: result.alreadyVerified,
      submission: {
        id: result.submission._id,
        uniqueId: result.submission.uniqueId,
        submitterName: result.submission.submitterName,
        submitterEmail: result.submission.submitterEmail,
        status: result.submission.status,
        verifiedAt: result.submission.verifiedAt,
        form: result.submission.formId,
        organization: result.submission.organizationId,
      },
    }, 200, result.message);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Lookup submission details by unique ID (no verification action)
 * @route   GET /api/verify/:uniqueId/details
 * @access  Public
 */
const getSubmissionDetails = async (req, res, next) => {
  try {
    const submission = await submissionService.getByUniqueId(req.params.uniqueId);

    sendSuccess(res, {
      submission: {
        id: submission._id,
        uniqueId: submission.uniqueId,
        submitterName: submission.submitterName,
        status: submission.status,
        verifiedAt: submission.verifiedAt,
        createdAt: submission.createdAt,
        form: submission.formId,
        organization: submission.organizationId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifySubmission,
  getSubmissionDetails,
};
