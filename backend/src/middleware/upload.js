const multer = require('multer');
const AppError = require('../utils/AppError');

// Use memory storage for cloud deployment flexibility
const storage = multer.memoryStorage();

// File filter — allow images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files (JPEG, PNG, GIF, WebP, SVG) are allowed.', 400), false);
  }
};

// Upload configurations
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

// Specific upload middleware
const uploadLogo = upload.single('logo');
const uploadFavicon = upload.single('favicon');
const uploadImage = upload.single('image');

module.exports = { upload, uploadLogo, uploadFavicon, uploadImage };
