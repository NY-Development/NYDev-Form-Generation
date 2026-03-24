const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const superAdminController = require('../controllers/superAdminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require superadmin role
router.use(protect);
router.use(authorize('superadmin'));

// @route   GET /api/superadmin/organizations
router.get('/organizations', superAdminController.getOrganizations);

// @route   GET /api/superadmin/users
router.get('/users', superAdminController.getUsers);

// @route   GET /api/superadmin/stats
router.get('/stats', superAdminController.getStats);

// @route   PUT /api/superadmin/organizations/:orgId/status
router.put('/organizations/:orgId/status', superAdminController.toggleOrganizationStatus);

// @route   PUT /api/superadmin/organizations/:orgId/subscription
router.put(
  '/organizations/:orgId/subscription',
  [body('plan').isIn(['free', 'pro', 'enterprise']).withMessage('Invalid plan')],
  validate,
  superAdminController.updateOrgSubscription
);

module.exports = router;
