const nodemailer = require('nodemailer');
const configModule = require('../config/env');
const { logger } = require('../config/logger');

// Robust fallback to extract the environment variables regardless of named or default export layouts
const env = configModule.env || (configModule.default && configModule.default.env) || configModule;

/**
 * Send an email using Brevo SMTP (configured in .env) with nodemailer
 */
const sendEmail = async (to, subject, text, orgName, formTitle, orgCreatorEmail) => {
  try {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SENDER_EMAIL } = env || {};

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SENDER_EMAIL) {
      logger.warn('[Email Service] SMTP configuration missing. Fallback log email to console:');
      logger.info(`[MOCK EMAIL TO: ${to}] SUBJECT: ${subject} \nCONTENT: ${text}`);
      return true;
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: false, // 587 is STARTTLS
      requireTLS: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Verify SMTP connection
    await transporter.verify();
    logger.info('[Email Service] Brevo SMTP connection verified successfully.');

    // Beautiful HTML template utilizing TrustPay color palette (HSL-equivalent hex codes)
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#1e293b; line-height:1.6;">
        <div style="max-width:600px; margin:40px auto; background-color:#ffffff; border:1px solid #e2e8f0; border-radius:16px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03); overflow:hidden;">
          
          <div style="background: linear-gradient(135deg, #004bf2 0%, #003ec7 100%); padding:32px 40px; text-align:center;">
            <div style="font-size:13px; font-weight:700; color:#93c5fd; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:6px;">Ecosystem Communication Broadcast</div>
            <h1 style="color:#ffffff; font-size:22px; font-weight:800; margin:0; letter-spacing:-0.5px; line-height:1.3;">${formTitle}</h1>
          </div>

          <div style="padding:40px 40px 32px 40px;">
            <div style="margin-bottom:28px;">
              <h2 style="color:#0f172a; font-size:18px; font-weight:700; margin:0 0 12px 0; letter-spacing:-0.3px;">${subject}</h2>
              <div style="white-space: pre-wrap; color:#334155; font-size:14px; line-height:1.65;">${text}</div>
            </div>

            <table style="width:100%; border-collapse:collapse; background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; margin-top:32px;">
              <tr>
                <td style="padding:20px 24px; vertical-align:middle;">
                  <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Need support?</span>
                  <br/>
                  <a href="mailto:${orgCreatorEmail}" style="color:#003ec7; text-decoration:none; font-weight:700; font-size:15px;">${orgCreatorEmail}</a>
                </td>
              </tr>
            </table>
          </div>

          <div style="background-color:#fafafa; border-top: 1px solid #f1f5f9; padding:24px 30px; text-align:center; font-size:12px; color:#94a3b8; line-height: 1.5;">
            <p style="margin:0 0 8px 0; font-weight:600;">${orgName}</p>
            <p style="margin:0;">&copy; ${new Date().getFullYear()} Nydev Form Generator. All rights reserved.</p>
            <p style="margin:8px 0 0 0; font-size:11px; color:#cbd5e1;">If you did not request this email, you can safely ignore this safety alert.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"${orgName}" <${SENDER_EMAIL}>`,
      to,
      subject,
      text,
      html: htmlTemplate,
    });

    logger.info(`[Email Service] Broadcast dispatched message successfully to ${to}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    logger.error('[Email Service] Failed dispatching outbox telemetry transmission context:', error);
    throw error;
  }
};

// Export objects simultaneously to maximize support across consumers
module.exports = { sendEmail };