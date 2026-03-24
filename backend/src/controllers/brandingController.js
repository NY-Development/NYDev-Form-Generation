const organizationService = require('../services/organizationService');
const imagekitService = require('../services/imagekit.service');
const { sendSuccess } = require('../utils/response');

/**
 * @desc    Update organization branding
 * @route   PUT /api/organizations/:orgId/branding
 * @access  Private (Owner)
 */
const updateBranding = async (req, res, next) => {
  try {
    const brandingData = { ...req.body };

    // Handle logo upload
    if (req.files && req.files.logo && req.files.logo[0]) {
      const file = req.files.logo[0];
      const url = await imagekitService.uploadImage(file.buffer, file.originalname, 'nydevform/logos');
      brandingData.logo = url;
    }

    // Handle favicon upload
    if (req.files && req.files.favicon && req.files.favicon[0]) {
      const file = req.files.favicon[0];
      const url = await imagekitService.uploadImage(file.buffer, file.originalname, 'nydevform/favicons');
      brandingData.favicon = url;
    }

    const organization = await organizationService.updateBranding(req.params.orgId, brandingData);
    
    // If the org itself has a root logo field (not just in branding), we should update that too
    if (brandingData.logo) {
      await organizationService.update(req.params.orgId, { logo: brandingData.logo });
    }

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
