/**
 * One-time script to create Stripe products & prices for Pro and Enterprise plans.
 * Run: node create_stripe_prices.js
 */
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPrices() {
  try {
    // Create Pro product + price
    const proProduct = await stripe.products.create({
      name: 'NYDev Pro Plan',
      description: 'Pro plan with advanced form features, analytics, and priority support.',
    });
    const proPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 2900, // $29.00/month
      currency: 'usd',
      recurring: { interval: 'month' },
    });

    // Create Enterprise product + price
    const enterpriseProduct = await stripe.products.create({
      name: 'NYDev Enterprise Plan',
      description: 'Enterprise plan with unlimited forms, white-label, and dedicated support.',
    });
    const enterprisePrice = await stripe.prices.create({
      product: enterpriseProduct.id,
      unit_amount: 9900, // $99.00/month
      currency: 'usd',
      recurring: { interval: 'month' },
    });

    console.log('\n✅ Stripe products and prices created successfully!\n');
    console.log(`STRIPE_PRO_PRICE_ID=${proPrice.id}`);
    console.log(`STRIPE_ENTERPRISE_PRICE_ID=${enterprisePrice.id}`);
    console.log('\nUpdate your .env file with the values above.\n');
  } catch (err) {
    console.error('Failed to create Stripe prices:', err.message);
  }
}

createPrices();
