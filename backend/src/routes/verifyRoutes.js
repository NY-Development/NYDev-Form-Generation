const express = require('express');
const verifyController = require('../controllers/verifyController');

const router = express.Router();

// Public routes — no auth required

// @route   GET /api/verify/:uniqueId
router.get('/:uniqueId', verifyController.verifySubmission);

// @route   GET /api/verify/:uniqueId/details
router.get('/:uniqueId/details', verifyController.getSubmissionDetails);

module.exports = router;
