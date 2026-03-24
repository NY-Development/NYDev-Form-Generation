const organizationService = require('../services/organizationService');
const { sendSuccess } = require('../utils/response');

/**
 * @desc    Get organization by ID
 * @route   GET /api/organizations/:orgId
 * @access  Private
 */
const getOrganization = async (req, res, next) => {
  try {
    const organization = await organizationService.getById(req.params.orgId);
    sendSuccess(res, { organization });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update organization
 * @route   PUT /api/organizations/:orgId
 * @access  Private (Owner)
 */
const updateOrganization = async (req, res, next) => {
  try {
    const organization = await organizationService.update(req.params.orgId, req.body);
    sendSuccess(res, { organization }, 200, 'Organization updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get organization members
 * @route   GET /api/organizations/:orgId/members
 * @access  Private
 */
const getMembers = async (req, res, next) => {
  try {
    const members = await organizationService.getMembers(req.params.orgId);
    sendSuccess(res, { members });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add admin to organization
 * @route   POST /api/organizations/:orgId/members
 * @access  Private (Owner)
 */
const addAdmin = async (req, res, next) => {
  try {
    const admin = await organizationService.addAdmin(req.params.orgId, req.body);
    sendSuccess(res, { admin }, 201, 'Admin added successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove admin from organization
 * @route   DELETE /api/organizations/:orgId/members/:adminId
 * @access  Private (Owner)
 */
const removeAdmin = async (req, res, next) => {
  try {
    const result = await organizationService.removeAdmin(req.params.orgId, req.params.adminId);
    sendSuccess(res, result, 200, 'Admin removed successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrganization,
  updateOrganization,
  getMembers,
  addAdmin,
  removeAdmin,
};
