const organizationService = require('../services/organizationService');
const { sendSuccess } = require('../utils/response');

/**
 * @desc    Update organization branding
 * @route   PUT /api/organizations/:orgId/branding
 * @access  Private (Owner)
 */
const updateBranding = async (req, res, next) => {
  try {
    const organization = await organizationService.updateBranding(req.params.orgId, req.body);
    sendSuccess(res, { organization }, 200, 'Branding updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get organization branding
 * @route   GET /api/organizations/:orgId/branding
 * @access  Private
 */
const getBranding = async (req, res, next) => {
  try {
    const organization = await organizationService.getById(req.params.orgId);
    sendSuccess(res, { branding: organization.branding });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateBranding,
  getBranding,
};
