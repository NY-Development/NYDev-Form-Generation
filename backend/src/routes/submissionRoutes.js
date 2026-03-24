const express = require('express');
const submissionController = require('../controllers/submissionController');
const { protect, orgAccess } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/organizations/:orgId/forms/:formId/submissions
router.get('/:orgId/forms/:formId/submissions', orgAccess, submissionController.getSubmissions);

// @route   GET /api/organizations/:orgId/submissions/:submissionId
router.get('/:orgId/submissions/:submissionId', orgAccess, submissionController.getSubmission);

// @route   PUT /api/organizations/:orgId/submissions/:submissionId/approve
router.put('/:orgId/submissions/:submissionId/approve', orgAccess, submissionController.approveSubmission);

// @route   PUT /api/organizations/:orgId/submissions/:submissionId/reject
router.put('/:orgId/submissions/:submissionId/reject', orgAccess, submissionController.rejectSubmission);

module.exports = router;
