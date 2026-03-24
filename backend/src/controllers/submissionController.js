const submissionService = require('../services/submissionService');
const { sendSuccess, sendPaginated } = require('../utils/response');

/**
 * @desc    Get submissions for a form
 * @route   GET /api/organizations/:orgId/forms/:formId/submissions
 * @access  Private
 */
const getSubmissions = async (req, res, next) => {
  try {
    const { page, limit, status, search } = req.query;
    const result = await submissionService.getByForm(
      req.params.formId,
      req.params.orgId,
      { page, limit, status, search }
    );

    sendPaginated(res, result.submissions, result.pagination);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single submission
 * @route   GET /api/organizations/:orgId/submissions/:submissionId
 * @access  Private
 */
const getSubmission = async (req, res, next) => {
  try {
    const submission = await submissionService.getById(req.params.submissionId);
    sendSuccess(res, { submission });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Approve a submission
 * @route   PUT /api/organizations/:orgId/submissions/:submissionId/approve
 * @access  Private
 */
const approveSubmission = async (req, res, next) => {
  try {
    const submission = await submissionService.approve(req.params.submissionId, req.user.id);
    sendSuccess(res, { submission }, 200, 'Submission approved');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reject a submission
 * @route   PUT /api/organizations/:orgId/submissions/:submissionId/reject
 * @access  Private
 */
const rejectSubmission = async (req, res, next) => {
  try {
    const { notes } = req.body;
    const submission = await submissionService.reject(req.params.submissionId, req.user.id, notes);
    sendSuccess(res, { submission }, 200, 'Submission rejected');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubmissions,
  getSubmission,
  approveSubmission,
  rejectSubmission,
};
