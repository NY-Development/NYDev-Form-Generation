const Form = require('../models/Form');
const Submission = require('../models/Submission');

/**
 * @desc    Send an update email to all registered participants of a form
 * @route   POST /api/organizations/:orgId/forms/:formId/send-update
 * @access  Private (Form Organizer)
 */
const sendFormUpdateEmail = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const { subject, message } = req.body;

    // Find the form, populating organization info and the creator's email details
    const form = await Form.findById(formId)
      .populate('organizationId')
      .populate('createdBy', 'email');

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found.' });
    }

    // Extract unique, valid email addresses from form submissions
    const submissions = await Submission.find({ formId, submitterEmail: { $exists: true, $ne: '' } });
    const emailList = [...new Set(submissions.map(sub => sub.submitterEmail.trim()))];

    if (emailList.length === 0) {
      return res.status(200).json({ success: true, message: 'No registered users found to email.' });
    }

    const orgName = form.organizationId?.name || 'Organizer';
    const formTitle = form.title || 'Form Update';
    
    // Fallback order: Logged-in user email -> Form creator email -> Org support email -> System default
    const orgCreatorEmail = req.user?.email || form.createdBy?.email || form.organizationId?.email || 'support@nydev.app';

    // Import the ES Module Email service utility dynamically
    const { sendEmail } = await import('../utils/Email.js');

    // Fire off all emails safely in parallel background tracks
    const emailPromises = emailList.map(email => 
      sendEmail(email, subject, message, orgName, formTitle, orgCreatorEmail)
        .catch(err => console.error(`[Broadcast Error] Failed sending update to ${email}:`, err))
    );
    
    await Promise.all(emailPromises);

    return res.status(200).json({
      success: true,
      message: `Update email successfully sent to ${emailList.length} registered participant(s).`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendFormUpdateEmail,
};