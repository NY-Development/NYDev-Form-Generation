const ImageKit = require('imagekit');
const env = require('../config/env');
const AppError = require('../utils/AppError');

// Initialize ImageKit only if all keys are present
let imagekit;
let isImageKitConfigured = false;

if (env.IMAGEKIT_PUBLIC_KEY && env.IMAGEKIT_PRIVATE_KEY && env.IMAGEKIT_URL_ENDPOINT) {
  imagekit = new ImageKit({
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
  });
  isImageKitConfigured = true;
} else {
  console.warn('⚠️  ImageKit is not fully configured in environment variables.');
}

/**
 * Uploads a file to ImageKit
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} fileName - Original filename
 * @param {string} folder - Folder name in ImageKit
 * @returns {Promise<string>} The uploaded file URL
 */
const uploadImage = async (fileBuffer, fileName, folder = 'nydevform') => {
  if (!isImageKitConfigured) {
    throw new AppError('Image upload service is not configured. Please contact administration.', 500);
  }

  try {
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName,
      folder,
      useUniqueFileName: true,
    });

    return response.url;
  } catch (error) {
    console.error('ImageKit Upload Error:', error);
    throw new AppError('Error uploading image to storage service.', 500);
  }
};

/**
 * Deletes a file from ImageKit
 * @param {string} fileId - The ImageKit file ID
 */
const deleteImage = async (fileId) => {
  if (!isImageKitConfigured) return;

  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    console.error('ImageKit Delete Error:', error);
    // Don't throw here to avoid failing updates just because a delete failed
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  isConfigured: () => isImageKitConfigured,
};
