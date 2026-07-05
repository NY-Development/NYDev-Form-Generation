const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const formController = require('../controllers/formController');
const updateController = require('../controllers/updateController'); // Added update controller
const { protect, authorize, orgAccess } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Template routes (no orgId needed)
router.get('/templates', formController.getTemplates);

// Organization-scoped routes
// @route   POST /api/organizations/:orgId/forms
router.post(
  '/:orgId/forms',
  orgAccess,
  [
    body('title').trim().notEmpty().withMessage('Form title is required'),
    body('description').optional().trim(),
    body('fields').optional().isArray().withMessage('Fields must be an array'),
  ],
  validate,
  formController.createForm
);

// @route   GET /api/organizations/:orgId/forms
router.get('/:orgId/forms', orgAccess, formController.getForms);

// @route   GET /api/organizations/:orgId/forms/:formId
router.get('/:orgId/forms/:formId', orgAccess, formController.getForm);

// @route   PUT /api/organizations/:orgId/forms/:formId
router.put(
  '/:orgId/forms/:formId',
  orgAccess,
  [
    body('title').optional().trim().notEmpty().withMessage('Form title cannot be empty'),
    body('fields').optional().isArray().withMessage('Fields must be an array'),
  ],
  validate,
  formController.updateForm
);

// @route   DELETE /api/organizations/:orgId/forms/:formId
router.delete(
  '/:orgId/forms/:formId',
  orgAccess,
  authorize('owner', 'superadmin'),
  formController.deleteForm
);

// @route   PUT /api/organizations/:orgId/forms/:formId/publish
router.put('/:orgId/forms/:formId/publish', orgAccess, formController.publishForm);

// @route   PUT /api/organizations/:orgId/forms/:formId/close
router.put('/:orgId/forms/:formId/close', orgAccess, formController.closeForm);

// @route   POST /api/organizations/:orgId/forms/from-template/:templateId
router.post('/:orgId/forms/from-template/:templateId', orgAccess, formController.cloneFromTemplate);

// ... existing route declarations ...

// @route   GET /api/organizations/:orgId/forms/:formId/registrants
router.get('/:orgId/forms/:formId/registrants', orgAccess, updateController.getFormRegistrants);

/**
 * Broadcast Email Updates
 * @route   POST /api/organizations/:orgId/forms/:formId/send-update
 */
router.post(
  '/:orgId/forms/:formId/send-update',
  orgAccess,
  [
    body('subject').trim().notEmpty().withMessage('Email subject is required'),
    body('message').trim().notEmpty().withMessage('Email message content is required'),
    body('targetScope').optional().isIn(['all', 'selected', 'single']),
    body('recipientEmails').optional().isArray(),
  ],
  validate,
  updateController.sendFormUpdateEmail
);

// @route   GET /api/organizations/:orgId/forms/:formId/updates
router.get('/:orgId/forms/:formId/updates', orgAccess, updateController.getFormUpdatesHistory);

module.exports = router;