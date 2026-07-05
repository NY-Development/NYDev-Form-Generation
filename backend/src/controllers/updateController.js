const Form = require('../models/Form');
const Submission = require('../models/Submission');
const UpdateEmail = require('../models/UpdateEmail');
const { sendEmail } = require('../utils/Email'); // Synchronously required at top level

/**
 * @desc    Get all unique registered participants for a form
 * @route   GET /api/organizations/:orgId/forms/:formId/registrants
 * @access  Private (Form Organizer)
 */
const getFormRegistrants = async (req, res, next) => {
  try {
    const { formId } = req.params;

    // Find all submissions containing valid email records
    const submissions = await Submission.find(
      { formId, submitterEmail: { $exists: true, $ne: '' } },
      'submitterEmail submitterName createdAt'
    ).sort({ createdAt: -1 });

    // De-duplicate registrants by email while preserving the latest metadata profile
    const uniqueMap = new Map();
    submissions.forEach(sub => {
      const email = sub.submitterEmail.trim();
      if (!uniqueMap.has(email)) {
        uniqueMap.set(email, {
          email,
          name: sub.submitterName || 'Participant',
        });
      }
    });

    return res.status(200).json({
      success: true,
      data: Array.from(uniqueMap.values()),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Send an update email to form participants (Broadcast engine)
 * @route   POST /api/organizations/:orgId/forms/:formId/send-update
 * @access  Private (Form Organizer)
 */
const sendFormUpdateEmail = async (req, res, next) => {
  try {
    const { orgId, formId } = req.params;
    const { subject, message, targetScope, recipientEmails } = req.body;

    // Verify form ownership structure
    const form = await Form.findOne({ _id: formId, organizationId: orgId })
      .populate('organizationId');

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form context not found inside organization scope.' });
    }

    let emailList = [];

    if (targetScope === 'selected' || targetScope === 'single') {
      if (!recipientEmails || !Array.isArray(recipientEmails) || recipientEmails.length === 0) {
        return res.status(400).json({ success: false, message: 'Explicit recipient distribution map array required for targeted updates.' });
      }
      emailList = recipientEmails.map(e => e.trim());
    } else {
      // Default / 'all' target scope: Pull all distinct registrants
      const submissions = await Submission.find(
        { formId, submitterEmail: { $exists: true, $ne: '' } },
        'submitterEmail'
      );
      const uniqueEmails = new Set(submissions.map(sub => sub.submitterEmail.trim()));
      emailList = Array.from(uniqueEmails);
    }

    if (emailList.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Broadcast payload transmission aborted: Zero active email records found matching targeted audience configuration.',
      });
    }

    const orgName = form.organizationId?.name || 'Organizer';
    const formTitle = form.title || 'Form Update Notice';
    const orgCreatorEmail = form.organizationId?.email || 'support@nydev.app';

    // Broadcast mapped mail delivery tasks asynchronously via Promises
    const emailPromises = emailList.map(email => 
      sendEmail(email, subject, message, orgName, formTitle, orgCreatorEmail)
        .catch(err => console.error(`[Broadcast Error] Failed sending update to ${email}:`, err))
    );
    
    await Promise.all(emailPromises);

    // Persist communication log entry
    await UpdateEmail.create({
      formId,
      organizationId: orgId,
      senderId: req.user._id,
      subject,
      message,
      recipientsCount: emailList.length,
      recipientsList: emailList,
    });

    return res.status(200).json({
      success: true,
      message: `Update email successfully sent to ${emailList.length} participant(s).`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all sent update emails tracking history for a form
 * @route   GET /api/organizations/:orgId/forms/:formId/updates
 * @access  Private (Form Organizer)
 */
const getFormUpdatesHistory = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const updates = await UpdateEmail.find({ formId })
      .populate('senderId', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: updates
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFormRegistrants,
  sendFormUpdateEmail,
  getFormUpdatesHistory,
};