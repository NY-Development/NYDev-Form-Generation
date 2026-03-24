const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const { protect, orgAccess } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// @route   GET /api/organizations/:orgId/analytics
router.get('/:orgId/analytics', orgAccess, analyticsController.getOrganizationAnalytics);

// @route   GET /api/organizations/:orgId/forms/:formId/analytics
router.get('/:orgId/forms/:formId/analytics', orgAccess, analyticsController.getFormAnalytics);

module.exports = router;
