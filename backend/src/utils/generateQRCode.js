const QRCode = require('qrcode');

/**
 * Generates a QR code as a base64 data URL
 * The QR encodes a verification URL: /verify/:submissionId
 *
 * @param {string} submissionId - The submission's MongoDB _id
 * @param {string} baseUrl - The base URL for verification (defaults to CLIENT_URL)
 * @returns {Promise<string>} Base64 data URL of the QR code
 */
const generateQRCode = async (submissionId, baseUrl = '') => {
  try {
    const verificationUrl = baseUrl
      ? `${baseUrl}/verify/${submissionId}`
      : `/verify/${submissionId}`;

    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return qrDataUrl;
  } catch (error) {
    console.error('QR Code generation failed:', error.message);
    throw new Error('Failed to generate QR code');
  }
};

module.exports = { generateQRCode };
