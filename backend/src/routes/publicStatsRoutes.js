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
    const [totalOrgs, totalForms, totalSubmissions, totalUsers, orgsWithLogos] = await Promise.all([
      Organization.countDocuments({ isActive: true }),
      Form.countDocuments({ status: 'published' }),
      Submission.countDocuments(),
      User.countDocuments({ isActive: true }),
      Organization.find({ isActive: true, logo: { $ne: '' }, 'logo': { $exists: true } }).limit(5).select('logo'),
    ]);

    const topLogos = orgsWithLogos.map(org => org.logo).filter(Boolean);

    sendSuccess(res, {
      stats: {
        totalOrganizations: totalOrgs,
        totalForms,
        totalSubmissions,
        totalUsers,
        topLogos,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
