const mongoose = require('mongoose');

const PLAN_LIMITS = {
  free: {
    maxForms: 3,
    maxSubmissionsPerForm: 100,
    maxAdmins: 1,
    customBranding: false,
    analytics: false,
    exports: false,
    apiAccess: false,
    removeWatermark: false,
  },
  pro: {
    maxForms: 50,
    maxSubmissionsPerForm: 10000,
    maxAdmins: 10,
    customBranding: true,
    analytics: true,
    exports: true,
    apiAccess: false,
    removeWatermark: true,
  },
  enterprise: {
    maxForms: -1, // unlimited
    maxSubmissionsPerForm: -1,
    maxAdmins: -1,
    customBranding: true,
    analytics: true,
    exports: true,
    apiAccess: true,
    removeWatermark: true,
  },
};

const subscriptionSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Subscription must belong to an organization'],
      unique: true,
      index: true,
    },
    plan: {
      type: String,
      enum: {
        values: ['free', 'pro', 'enterprise'],
        message: 'Plan must be free, pro, or enterprise',
      },
      default: 'free',
    },
    limits: {
      maxForms: { type: Number, default: PLAN_LIMITS.free.maxForms },
      maxSubmissionsPerForm: { type: Number, default: PLAN_LIMITS.free.maxSubmissionsPerForm },
      maxAdmins: { type: Number, default: PLAN_LIMITS.free.maxAdmins },
      customBranding: { type: Boolean, default: PLAN_LIMITS.free.customBranding },
      analytics: { type: Boolean, default: PLAN_LIMITS.free.analytics },
      exports: { type: Boolean, default: PLAN_LIMITS.free.exports },
      apiAccess: { type: Boolean, default: PLAN_LIMITS.free.apiAccess },
      removeWatermark: { type: Boolean, default: PLAN_LIMITS.free.removeWatermark },
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'cancelled', 'expired', 'past_due'],
        message: 'Status must be active, cancelled, expired, or past_due',
      },
      default: 'active',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    paymentHistory: [
      {
        amount: Number,
        currency: { type: String, default: 'USD' },
        date: { type: Date, default: Date.now },
        description: String,
      },
    ],
    stripeSubscriptionId: {
      type: String,
      default: null,
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Check if a specific feature is available on this subscription
 */
subscriptionSchema.methods.hasFeature = function (feature) {
  return this.limits[feature] === true || this.limits[feature] === -1;
};

/**
 * Check if a numeric limit has been reached
 */
subscriptionSchema.methods.isWithinLimit = function (limitKey, currentCount) {
  const limit = this.limits[limitKey];
  if (limit === -1) return true; // unlimited
  return currentCount < limit;
};

// Static: get plan limits
subscriptionSchema.statics.getPlanLimits = function (plan) {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.free;
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
