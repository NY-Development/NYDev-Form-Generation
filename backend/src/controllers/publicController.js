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

    // Asynchronously send a confirmation email if the submitter provided an email address
    if (submitterEmail) {
      (async () => {
        try {
          const { sendEmail } = await import('../utils/Email.js');
          
          const orgName = form.organizationId?.name || 'Organizer';
          const formTitle = form.title || 'Form Submission';
          
          // Fallback to support email if creator details are not populated on the organization object
          const orgCreatorEmail = form.organizationId?.creatorId?.email || form.organizationId?.email || 'support@nydev.app';

          const subject = `Registration Successful: ${formTitle}`;
          const text = `Dear ${submitterName || 'Participant'},\n\nThank you for registering! We have successfully received your submission.\n\nThe organizer will contact you using this email address (${submitterEmail}) for further updates. Please keep an eye on your inbox for upcoming announcements.\n\nBest regards,\n${orgName} Team`;

          await sendEmail(submitterEmail, subject, text, orgName, formTitle, orgCreatorEmail);
        } catch (emailError) {
          console.error('[Email Worker Error] Failed to send registration confirmation email:', emailError);
        }
      })();
    }

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