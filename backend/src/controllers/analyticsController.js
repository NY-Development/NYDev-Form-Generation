const analyticsService = require('../services/analyticsService');
const { sendSuccess } = require('../utils/response');

/**
 * @desc    Get organization analytics
 * @route   GET /api/organizations/:orgId/analytics
 * @access  Private
 */
const getOrganizationAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.getOrganizationAnalytics(req.params.orgId);
    sendSuccess(res, { analytics });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get form-level analytics
 * @route   GET /api/organizations/:orgId/forms/:formId/analytics
 * @access  Private
 */
const getFormAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.getFormAnalytics(req.params.formId);
    sendSuccess(res, { analytics });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrganizationAnalytics,
  getFormAnalytics,
};
