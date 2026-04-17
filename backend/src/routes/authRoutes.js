const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
router.post(
  '/register',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/\d/)
      .withMessage('Password must contain at least one number'),
    body('organizationName').optional().trim(),
  ],
  validate,
  authController.register
);

// @route   POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  authController.login
);

// @route   POST /api/auth/google
router.post(
  '/google',
  [
    body('code').notEmpty().withMessage('Google auth code is required'),
  ],
  validate,
  authController.googleLogin
);

// @route   GET /api/auth/me
router.get('/me', protect, authController.getMe);

// @route   PUT /api/auth/password
router.put(
  '/password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters'),
  ],
  validate,
  authController.updatePassword
);

// @route   PUT /api/auth/profile
router.put('/profile', protect, authController.updateProfile);

// @route   POST /api/auth/logout
router.post('/logout', protect, authController.logout);

module.exports = router;
