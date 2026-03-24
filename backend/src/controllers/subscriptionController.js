const subscriptionService = require('../services/subscriptionService');
const { sendSuccess } = require('../utils/response');

/**
 * @desc    Get organization subscription
 * @route   GET /api/organizations/:orgId/subscription
 * @access  Private
 */
const getSubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.getByOrganization(req.params.orgId);
    sendSuccess(res, { subscription });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upgrade subscription plan
 * @route   PUT /api/organizations/:orgId/subscription
 * @access  Private (Owner)
 */
const updateSubscription = async (req, res, next) => {
  try {
    const { plan } = req.body;
    const subscription = await subscriptionService.upgradePlan(req.params.orgId, plan);
    sendSuccess(res, { subscription }, 200, `Plan updated to ${plan}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubscription,
  updateSubscription,
};
