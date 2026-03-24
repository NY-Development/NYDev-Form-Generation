const formService = require('../services/formService');
const { sendSuccess, sendPaginated } = require('../utils/response');

/**
 * @desc    Create a new form
 * @route   POST /api/organizations/:orgId/forms
 * @access  Private
 */
const createForm = async (req, res, next) => {
  try {
    const form = await formService.create({
      ...req.body,
      organizationId: req.params.orgId,
      createdBy: req.user.id,
    });

    sendSuccess(res, { form }, 201, 'Form created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all forms for an organization
 * @route   GET /api/organizations/:orgId/forms
 * @access  Private
 */
const getForms = async (req, res, next) => {
  try {
    const { page, limit, status, search } = req.query;
    const result = await formService.getByOrganization(req.params.orgId, { page, limit, status, search });

    sendPaginated(res, result.forms, result.pagination);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single form
 * @route   GET /api/organizations/:orgId/forms/:formId
 * @access  Private
 */
const getForm = async (req, res, next) => {
  try {
    const form = await formService.getById(req.params.formId, req.params.orgId);
    sendSuccess(res, { form });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a form
 * @route   PUT /api/organizations/:orgId/forms/:formId
 * @access  Private
 */
const updateForm = async (req, res, next) => {
  try {
    const form = await formService.update(req.params.formId, req.params.orgId, req.body);
    sendSuccess(res, { form }, 200, 'Form updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a form
 * @route   DELETE /api/organizations/:orgId/forms/:formId
 * @access  Private (Owner)
 */
const deleteForm = async (req, res, next) => {
  try {
    const result = await formService.remove(req.params.formId, req.params.orgId);
    sendSuccess(res, result, 200, 'Form deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Publish a form
 * @route   PUT /api/organizations/:orgId/forms/:formId/publish
 * @access  Private
 */
const publishForm = async (req, res, next) => {
  try {
    const form = await formService.publish(req.params.formId, req.params.orgId);
    sendSuccess(res, { form }, 200, 'Form published successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Close a form
 * @route   PUT /api/organizations/:orgId/forms/:formId/close
 * @access  Private
 */
const closeForm = async (req, res, next) => {
  try {
    const form = await formService.close(req.params.formId, req.params.orgId);
    sendSuccess(res, { form }, 200, 'Form closed successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get form templates
 * @route   GET /api/templates
 * @access  Private
 */
const getTemplates = async (req, res, next) => {
  try {
    const { category } = req.query;
    const templates = await formService.getTemplates(category);
    sendSuccess(res, { templates });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clone a form from template
 * @route   POST /api/organizations/:orgId/forms/from-template/:templateId
 * @access  Private
 */
const cloneFromTemplate = async (req, res, next) => {
  try {
    const form = await formService.cloneFromTemplate(
      req.params.templateId,
      req.params.orgId,
      req.user.id
    );
    sendSuccess(res, { form }, 201, 'Form created from template');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createForm,
  getForms,
  getForm,
  updateForm,
  deleteForm,
  publishForm,
  closeForm,
  getTemplates,
  cloneFromTemplate,
};
