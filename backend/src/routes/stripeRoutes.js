const express = require('express');
const { protect } = require('../middleware/auth');
const stripeService = require('../services/stripeService');
const { sendSuccess } = require('../utils/response');

const router = express.Router();

/**
 * @route   POST /api/stripe/create-checkout-session
 * @desc    Create a Stripe Checkout Session for plan upgrade
 * @access  Private (any authenticated user)
 */
router.post('/create-checkout-session', protect, async (req, res, next) => {
  try {
    const { plan } = req.body;

    if (!plan || !['pro', 'enterprise'].includes(plan)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan. Must be "pro" or "enterprise".',
      });
    }

    const orgId =
      typeof req.user.organizationId === 'object'
        ? req.user.organizationId._id || req.user.organizationId.id
        : req.user.organizationId;

    if (!orgId) {
      return res.status(400).json({
        success: false,
        message: 'Organization not found for this user.',
      });
    }

    const session = await stripeService.createCheckoutSession(orgId, plan, req.user.id);

    sendSuccess(res, { sessionId: session.id, url: session.url }, 200, 'Checkout session created');
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/stripe/webhook
 * @desc    Handle Stripe webhook events
 * @access  Public (Stripe signature verified)
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret || 'whsec_dummy');
  } catch (err) {
    console.error('⚠️ Stripe webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    await stripeService.handleWebhook(event);
    res.status(200).json({ received: true });
  } catch (err) {
    console.error('❌ Stripe webhook processing error:', err.message);
    // Still return 200 to prevent Stripe from retrying indefinitely
    res.status(200).json({ received: true, error: err.message });
  }
});

module.exports = router;
