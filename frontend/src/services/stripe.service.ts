import api from './api';
import type { ApiResponse } from '../types';

interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export const stripeService = {
  /**
   * Create a Stripe Checkout Session for upgrading to a paid plan.
   * Returns a Stripe Checkout URL to redirect the user to.
   */
  createCheckoutSession: (plan: 'pro' | 'enterprise') =>
    api.post('/stripe/create-checkout-session', { plan }) as Promise<
      ApiResponse<CheckoutSessionResponse>
    >,
};
