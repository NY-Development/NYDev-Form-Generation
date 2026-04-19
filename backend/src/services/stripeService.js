const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
const Subscription = require('../models/Subscription');
const Organization = require('../models/Organization');

// Price IDs should be configured in your Stripe Dashboard
// These map plan names to Stripe Price IDs
const PLAN_PRICE_MAP = {
  pro: process.env.STRIPE_PRO_PRICE_ID || null,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID || null,
};

/**
 * Check if a price ID looks like a real Stripe price (not a placeholder)
 */
const isValidPriceId = (priceId) => {
  if (!priceId) return false;
  // Real Stripe price IDs start with 'price_' and are typically 30+ chars
  // Reject obvious placeholders
  const placeholderPatterns = ['placeholder', 'dummy', 'test_placeholder', 'price_pro_', 'price_enterprise_'];
  return priceId.startsWith('price_') && !placeholderPatterns.some(p => priceId.toLowerCase().includes(p));
};

/**
 * Create a Stripe Checkout Session for plan upgrade
 * @param {string} orgId - Organization ID
 * @param {string} plan - Target plan ('pro' | 'enterprise')
 * @param {string} userId - User initiating the upgrade
 * @returns {Object} Stripe Checkout Session
 */
const createCheckoutSession = async (orgId, plan, userId) => {
  const org = await Organization.findById(orgId).populate('subscription');
  if (!org) throw new Error('Organization not found');

  const priceId = PLAN_PRICE_MAP[plan];
  if (!priceId) {
    throw new Error(
      `No Stripe price ID configured for plan "${plan}". ` +
      `Please set STRIPE_${plan.toUpperCase()}_PRICE_ID in your .env file with a real Stripe Price ID from your Stripe Dashboard.`
    );
  }

  const orgIdStr = String(orgId);
  const userIdStr = String(userId);

  // Find or create Stripe customer
  let customerId = org.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      name: org.name,
      metadata: {
        organizationId: orgIdStr,
        userId: userIdStr,
      },
    });
    customerId = customer.id;
    org.stripeCustomerId = customerId;
    await org.save();
  }

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${clientUrl}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}&success=true`,
    cancel_url: `${clientUrl}/dashboard/billing?canceled=true`,
    metadata: {
      organizationId: orgIdStr,
      plan,
      userId: userIdStr,
    },
    subscription_data: {
      metadata: {
        organizationId: orgIdStr,
        plan,
      },
    },
  });

  return session;
};

/**
 * Handle Stripe webhook events
 * @param {Object} event - Stripe webhook event
 */
const handleWebhook = async (event) => {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const orgId = session.metadata?.organizationId;
      const plan = session.metadata?.plan;

      if (orgId && plan) {
        const subscription = await Subscription.findOne({ organizationId: orgId });
        if (subscription) {
          const newLimits = Subscription.getPlanLimits(plan);
          subscription.plan = plan;
          subscription.limits = newLimits;
          subscription.status = 'active';
          subscription.stripeSubscriptionId = session.subscription;
          subscription.stripeCustomerId = session.customer;
          subscription.startDate = new Date();
          // Pro/Enterprise are recurring — endDate managed by Stripe
          subscription.endDate = null;
          await subscription.save();
        }
      }
      break;
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object;
      const orgId = sub.metadata?.organizationId;

      if (orgId) {
        const subscription = await Subscription.findOne({ organizationId: orgId });
        if (subscription) {
          // Map Stripe status to our status
          const statusMap = {
            active: 'active',
            past_due: 'past_due',
            canceled: 'cancelled',
            unpaid: 'past_due',
            trialing: 'active',
          };
          subscription.status = statusMap[sub.status] || 'active';
          
          if (sub.current_period_end) {
            subscription.endDate = new Date(sub.current_period_end * 1000);
          }
          await subscription.save();
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      const orgId = sub.metadata?.organizationId;

      if (orgId) {
        const subscription = await Subscription.findOne({ organizationId: orgId });
        if (subscription) {
          // Downgrade to free
          subscription.plan = 'free';
          subscription.limits = Subscription.getPlanLimits('free');
          subscription.status = 'cancelled';
          subscription.stripeSubscriptionId = null;
          await subscription.save();
        }
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      const orgId = invoice.subscription_details?.metadata?.organizationId;

      if (orgId) {
        const subscription = await Subscription.findOne({ organizationId: orgId });
        if (subscription) {
          subscription.status = 'past_due';
          await subscription.save();
        }
      }
      break;
    }

    default:
      // Unhandled event type — ignore gracefully
      break;
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
};
