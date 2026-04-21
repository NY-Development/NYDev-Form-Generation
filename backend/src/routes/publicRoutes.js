const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const publicController = require('../controllers/publicController');

const router = express.Router();

// Public routes — no auth required

// @route   GET /api/f/:slug
router.get('/:slug', publicController.getPublicForm);

// @route   POST /api/f/:slug/submit
router.post(
  '/:slug/submit',
  [
    body('responses').notEmpty().withMessage('Form responses are required'),
    body('submitterEmail').optional({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email'),
    body('submitterName').optional({ checkFalsy: true }).trim(),
  ],
  validate,
  publicController.submitPublicForm
);

module.exports = router;
