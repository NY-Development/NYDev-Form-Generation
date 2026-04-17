const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const organizationController = require('../controllers/organizationController');
const { protect, authorize, orgAccess } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/organizations/:orgId
router.get('/:orgId', orgAccess, organizationController.getOrganization);

// @route   PUT /api/organizations/:orgId
router.put(
  '/:orgId',
  orgAccess,
  authorize('owner', 'superadmin'),
  [
    body('name').optional().trim().notEmpty().withMessage('Organization name cannot be empty'),
    body('description').optional().trim(),
    body('logo').optional(),
    body('branding').optional().isObject(),
  ],
  validate,
  organizationController.updateOrganization
);

// @route   GET /api/organizations/:orgId/members
router.get('/:orgId/members', orgAccess, organizationController.getMembers);

// @route   POST /api/organizations/:orgId/members
router.post(
  '/:orgId/members',
  orgAccess,
  authorize('owner', 'superadmin'),
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  validate,
  organizationController.addAdmin
);

// @route   DELETE /api/organizations/:orgId/members/:adminId
router.delete(
  '/:orgId/members/:adminId',
  orgAccess,
  authorize('owner', 'superadmin'),
  organizationController.removeAdmin
);

module.exports = router;
