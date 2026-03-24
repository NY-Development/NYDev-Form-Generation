const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const subscriptionController = require('../controllers/subscriptionController');
const { protect, authorize, orgAccess } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/organizations/:orgId/subscription
router.get('/:orgId/subscription', orgAccess, subscriptionController.getSubscription);

// @route   PUT /api/organizations/:orgId/subscription
router.put(
  '/:orgId/subscription',
  orgAccess,
  authorize('owner', 'superadmin'),
  [body('plan').isIn(['free', 'pro', 'enterprise']).withMessage('Invalid plan')],
  validate,
  subscriptionController.updateSubscription
);

module.exports = router;
