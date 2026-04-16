const express = require('express');
const Organization = require('../models/Organization');
const Form = require('../models/Form');
const Submission = require('../models/Submission');
const User = require('../models/User');
const { sendSuccess } = require('../utils/response');

const router = express.Router();

// @route   GET /api/public/stats
// @desc    Get public platform statistics for the landing page
// @access  Public
router.get('/stats', async (req, res, next) => {
  try {
    const [totalOrgs, totalForms, totalSubmissions, totalUsers] = await Promise.all([
      Organization.countDocuments({ isActive: true }),
      Form.countDocuments({ status: 'published' }),
      Submission.countDocuments(),
      User.countDocuments({ isActive: true }),
    ]);

    sendSuccess(res, {
      stats: {
        totalOrganizations: totalOrgs,
        totalForms,
        totalSubmissions,
        totalUsers,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
