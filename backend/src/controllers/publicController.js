const formService = require('../services/formService');
const submissionService = require('../services/submissionService');
const { sendSuccess } = require('../utils/response');

/**
 * @desc    Get public form by slug
 * @route   GET /api/f/:slug
 * @access  Public
 */
const getPublicForm = async (req, res, next) => {
  try {
    const form = await formService.getBySlug(req.params.slug);

    // Return only public-safe data
    sendSuccess(res, {
      form: {
        id: form._id,
        title: form.title,
        description: form.description,
        fields: form.fields,
        settings: {
          confirmationMessage: form.settings.confirmationMessage,
          requireApproval: form.settings.requireApproval,
        },
        branding: form.branding,
        organization: {
          name: form.organizationId?.name,
          logo: form.organizationId?.logo,
          branding: form.organizationId?.branding,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit a public form
 * @route   POST /api/f/:slug/submit
 * @access  Public
 */
const submitPublicForm = async (req, res, next) => {
  try {
    const form = await formService.getBySlug(req.params.slug);

    const { responses, submitterEmail, submitterName } = req.body;

    // Validate required fields
    const missingFields = [];
    form.fields.forEach((field) => {
      if (field.required && (!responses || !responses[field.fieldId])) {
        missingFields.push(field.label);
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    const submission = await submissionService.create({
      formId: form._id,
      organizationId: form.organizationId._id || form.organizationId,
      responses,
      submitterEmail,
      submitterName,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent') || '',
        referrer: req.get('Referrer') || '',
      },
    });

    sendSuccess(res, {
      submission: {
        id: submission._id,
        uniqueId: submission.uniqueId,
        qrCode: submission.qrCode,
        status: submission.status,
        confirmationMessage: form.settings.confirmationMessage,
      },
    }, 201, 'Registration submitted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicForm,
  submitPublicForm,
};
