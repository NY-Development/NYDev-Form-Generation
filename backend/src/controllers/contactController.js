const Contact = require('../models/Contact');
const AppError = require('../utils/AppError');
const { sendEmail } = require('../utils/Email');

// @desc    Submit a contact form message
// @route   POST /api/contact/submit
// @access  Public
exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return next(new AppError('Please fill out all required fields.', 400));
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    // Send auto-reply to the user's email
    try {
      await sendEmail(
        email,
        'We received your message!',
        `Hi ${name},\n\nThank you for reaching out to us. We have received your message regarding "${subject}" and our team will get back to you shortly.\n\nBest,\nNYDev Team`,
        'NYDev Support',
        'Contact Form Submission',
        'nydevofficial@gmail.com'
      );
    } catch (error) {
      // We swallow the error so that the user still gets a success response even if the email failed
      console.error('[ContactController] Failed to send auto-reply:', error);
    }

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Message successfully sent. We will get back to you soon.'
    });
  } catch (error) {
    next(error);
  }
};
