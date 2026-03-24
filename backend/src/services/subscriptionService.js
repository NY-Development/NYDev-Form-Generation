const Subscription = require('../models/Subscription');
const Organization = require('../models/Organization');
const AppError = require('../utils/AppError');

/**
 * Get subscription for an organization
 */
const getByOrganization = async (orgId) => {
  const subscription = await Subscription.findOne({ organizationId: orgId });

  if (!subscription) {
    throw new AppError('Subscription not found.', 404);
  }

  return subscription;
};

/**
 * Create default free subscription
 */
const createFree = async (orgId) => {
  const existing = await Subscription.findOne({ organizationId: orgId });
  if (existing) {
    return existing;
  }

  const limits = Subscription.getPlanLimits('free');

  const subscription = await Subscription.create({
    organizationId: orgId,
    plan: 'free',
    limits,
  });

  return subscription;
};

/**
 * Upgrade subscription plan
 */
const upgradePlan = async (orgId, newPlan) => {
  const validPlans = ['free', 'pro', 'enterprise'];
  if (!validPlans.includes(newPlan)) {
    throw new AppError('Invalid plan. Choose from: free, pro, enterprise.', 400);
  }

  const subscription = await Subscription.findOne({ organizationId: orgId });
  if (!subscription) {
    throw new AppError('Subscription not found.', 404);
  }

  const newLimits = Subscription.getPlanLimits(newPlan);

  subscription.plan = newPlan;
  subscription.limits = newLimits;
  subscription.status = 'active';
  subscription.startDate = new Date();

  // Set end date for paid plans (e.g., 30 days for monthly)
  if (newPlan !== 'free') {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    subscription.endDate = endDate;
  } else {
    subscription.endDate = null;
  }

  await subscription.save();

  return subscription;
};

/**
 * Check a specific limit for an organization
 */
const checkLimit = async (orgId, limitKey, currentCount) => {
  const subscription = await Subscription.findOne({ organizationId: orgId });

  if (!subscription) {
    // Default to free plan limits
    const freeLimits = Subscription.getPlanLimits('free');
    return {
      allowed: currentCount < freeLimits[limitKey],
      limit: freeLimits[limitKey],
      current: currentCount,
    };
  }

  const limit = subscription.limits[limitKey];
  const allowed = limit === -1 || currentCount < limit;

  return {
    allowed,
    limit,
    current: currentCount,
    plan: subscription.plan,
  };
};

module.exports = {
  getByOrganization,
  createFree,
  upgradePlan,
  checkLimit,
};
