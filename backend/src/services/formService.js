const Form = require('../models/Form');
const Organization = require('../models/Organization');
const Subscription = require('../models/Subscription');
const AppError = require('../utils/AppError');

/**
 * Create a new form
 */
const create = async ({ title, description, fields, settings, branding, template, uniqueIdConfig, organizationId, createdBy }) => {
  // Check form limit for the organization's plan
  const org = await Organization.findById(organizationId).populate('subscription');
  if (!org) {
    throw new AppError('Organization not found.', 404);
  }

  if (org.subscription) {
    const currentFormCount = await Form.countDocuments({ organizationId });
    const maxForms = org.subscription.limits.maxForms;
    if (maxForms !== -1 && currentFormCount >= maxForms) {
      throw new AppError(`You have reached the maximum number of forms (${maxForms}) for your plan. Please upgrade.`, 403);
    }
  }

  const form = await Form.create({
    title,
    description,
    fields: fields || [],
    settings: settings || {},
    branding: branding || {},
    template: template || {},
    uniqueIdConfig: uniqueIdConfig || {},
    organizationId,
    createdBy,
  });

  return form;
};

/**
 * Get all forms for an organization
 */
const getByOrganization = async (organizationId, { page = 1, limit = 10, status, search } = {}) => {
  const query = { organizationId };

  if (status) {
    query.status = status;
  }

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  const skip = (page - 1) * limit;

  const [forms, total] = await Promise.all([
    Form.find(query)
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Form.countDocuments(query),
  ]);

  return {
    forms,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get a single form by ID
 */
const getById = async (formId, organizationId) => {
  const query = { _id: formId };
  if (organizationId) {
    query.organizationId = organizationId;
  }

  const form = await Form.findOne(query)
    .populate('createdBy', 'firstName lastName email')
    .populate('organizationId', 'name slug branding');

  if (!form) {
    throw new AppError('Form not found.', 404);
  }

  return form;
};

/**
 * Get form by slug (for public access)
 */
const getBySlug = async (slug) => {
  const form = await Form.findOne({ slug })
    .populate('organizationId', 'name slug branding logo');

  if (!form) {
    throw new AppError('Form not found.', 404);
  }

  if (form.status !== 'published') {
    throw new AppError('This form is not currently accepting responses.', 403);
  }

  if (!form.settings.acceptingResponses) {
    throw new AppError('This form is no longer accepting responses.', 403);
  }

  // Check max responses
  if (form.settings.maxResponses > 0 && form.submissionCount >= form.settings.maxResponses) {
    throw new AppError('This form has reached the maximum number of responses.', 403);
  }

  return form;
};

/**
 * Update a form
 */
const update = async (formId, organizationId, updates) => {
  const form = await Form.findOne({ _id: formId, organizationId });

  if (!form) {
    throw new AppError('Form not found.', 404);
  }

  const allowedUpdates = [
    'title', 'description', 'fields', 'settings', 'branding',
    'template', 'uniqueIdConfig',
  ];

  allowedUpdates.forEach((field) => {
    if (updates[field] !== undefined) {
      form[field] = updates[field];
    }
  });

  await form.save();
  return form;
};

/**
 * Delete a form
 */
const remove = async (formId, organizationId) => {
  const form = await Form.findOneAndDelete({ _id: formId, organizationId });

  if (!form) {
    throw new AppError('Form not found.', 404);
  }

  return { message: 'Form deleted successfully.' };
};

/**
 * Publish a form (change status to published)
 */
const publish = async (formId, organizationId) => {
  const form = await Form.findOne({ _id: formId, organizationId });

  if (!form) {
    throw new AppError('Form not found.', 404);
  }

  if (form.fields.length === 0) {
    throw new AppError('Cannot publish a form with no fields.', 400);
  }

  form.status = 'published';
  await form.save();

  return form;
};

/**
 * Close a form (stop accepting responses)
 */
const close = async (formId, organizationId) => {
  const form = await Form.findOne({ _id: formId, organizationId });

  if (!form) {
    throw new AppError('Form not found.', 404);
  }

  form.status = 'closed';
  form.settings.acceptingResponses = false;
  await form.save();

  return form;
};

/**
 * Get form templates
 */
const getTemplates = async (category) => {
  const query = { 'template.isTemplate': true };

  if (category) {
    query['template.category'] = category;
  }

  const templates = await Form.find(query)
    .select('title description fields template')
    .sort({ createdAt: -1 });

  return templates;
};

/**
 * Clone a form from template
 */
const cloneFromTemplate = async (templateId, organizationId, createdBy) => {
  const template = await Form.findOne({ _id: templateId, 'template.isTemplate': true });

  if (!template) {
    throw new AppError('Template not found.', 404);
  }

  const newForm = await Form.create({
    title: `${template.title} (Copy)`,
    description: template.description,
    fields: template.fields,
    settings: template.settings,
    organizationId,
    createdBy,
    status: 'draft',
  });

  return newForm;
};

module.exports = {
  create,
  getByOrganization,
  getById,
  getBySlug,
  update,
  remove,
  publish,
  close,
  getTemplates,
  cloneFromTemplate,
};
