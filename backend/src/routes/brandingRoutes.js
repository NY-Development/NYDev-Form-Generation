const express = require('express');
const brandingController = require('../controllers/brandingController');
const { protect, authorize, orgAccess } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// @route   GET /api/organizations/:orgId/branding
router.get('/:orgId/branding', orgAccess, brandingController.getBranding);

// @route   PUT /api/organizations/:orgId/branding
router.put(
  '/:orgId/branding',
  orgAccess,
  authorize('owner', 'superadmin'),
  brandingController.updateBranding
);

module.exports = router;
