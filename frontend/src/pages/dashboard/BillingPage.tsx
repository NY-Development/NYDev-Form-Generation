import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, CreditCard, Zap, Crown, Gem, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { organizationService } from '../../services/organization.service';
import { stripeService } from '../../services/stripe.service';
import { toast } from 'sonner';
import type { Subscription } from '../../types';

const plans = [
  {
    id: 'free' as const,
    name: 'Free',
    price: '$0',
    period: '/month',
    icon: <Zap className="h-6 w-6" />,
    color: 'border-border',
    gradient: 'from-slate-500/10 to-slate-500/5',
    iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    features: ['3 forms', '100 submissions/form', '1 admin', 'Basic analytics', 'NYDev watermark'],
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    price: '$29',
    period: '/month',
    icon: <Crown className="h-6 w-6" />,
    color: 'border-primary ring-2 ring-primary/20',
    gradient: 'from-primary/10 to-primary/5',
    iconBg: 'bg-primary/10 text-primary',
    popular: true,
    features: [
      'Unlimited forms',
      '10,000 submissions/form',
      '5 admins',
      'Advanced analytics',
      'Custom branding',
      'CSV exports',
      'No watermark',
      'Video upload fields',
    ],
  },
  {
    id: 'enterprise' as const,
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    icon: <Gem className="h-6 w-6" />,
    color: 'border-border',
    gradient: 'from-amber-500/10 to-amber-500/5',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    features: [
      'Everything in Pro',
      'Unlimited submissions',
      'Unlimited admins',
      'API access',
      'Priority support',
      'Custom integrations',
      'SLA guarantee',
    ],
  },
];

export const BillingPage = () => {
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetch = async () => {
      if (!orgId) { setLoading(false); return; }
      try {
        const res = await organizationService.getSubscription(orgId);
        setSubscription(res.data.subscription);
      } catch {
        // May not have subscription yet - default to free
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [orgId]);

  // Handle Stripe redirect callbacks
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('🎉 Subscription upgraded successfully! It may take a moment to reflect.');
      // Re-fetch subscription after successful payment
      if (orgId) {
        organizationService.getSubscription(orgId)
          .then((res) => setSubscription(res.data.subscription))
          .catch(() => {});
      }
    }
    if (searchParams.get('canceled') === 'true') {
      toast.info('Payment was canceled. No changes were made.');
    }
  }, [searchParams, orgId]);

  const currentPlan = subscription?.plan || 'free';

  const handleUpgrade = async (plan: string) => {
    if (plan === currentPlan) return;

    // Free plan downgrade — handled directly
    if (plan === 'free') {
      setUpgrading(plan);
      try {
        const res = await organizationService.updateSubscription(orgId, plan);
        setSubscription(res.data.subscription);
        toast.success('Downgraded to Free plan.');
      } catch (err: any) {
        toast.error(err.message || 'Downgrade failed');
      } finally {
        setUpgrading('');
      }
      return;
    }

    // Pro/Enterprise — redirect to Stripe Checkout
    setUpgrading(plan);
    try {
      const res = await stripeService.createCheckoutSession(plan as 'pro' | 'enterprise');
      const { url } = res.data;
      if (url) {
        window.location.href = url;
      } else {
        toast.error('Could not create checkout session.');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to initiate checkout');
    } finally {
      setUpgrading('');
    }
  };

  const getPlanLevel = (plan: string) => {
    const levels: Record<string, number> = { free: 0, pro: 1, enterprise: 2 };
    return levels[plan] ?? 0;
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Billing & Plans</h1>
        <p className="text-muted-foreground">Manage your subscription and billing information.</p>
      </div>

      {/* Current Plan Banner */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent" />
        <div className="relative flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
              <CreditCard size={24} />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Current Plan</h2>
              <p className="text-sm text-muted-foreground">
                You are on the{' '}
                <span className="font-bold text-primary capitalize">{currentPlan}</span> plan
              </p>
            </div>
          </div>
          <div className="text-right">
            {subscription && (
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <p>
                  Status:{' '}
                  <span
                    className={`capitalize font-semibold ${
                      subscription.status === 'active'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : subscription.status === 'past_due'
                        ? 'text-amber-600'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {subscription.status}
                  </span>
                </p>
                {subscription.endDate && (
                  <p>Renews: {new Date(subscription.endDate).toLocaleDateString()}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          const isUpgrade = getPlanLevel(plan.id) > getPlanLevel(currentPlan);
          const isDowngrade = getPlanLevel(plan.id) < getPlanLevel(currentPlan);

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border bg-card shadow-sm transition-all hover:shadow-lg ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-md">
                  <Sparkles size={12} />
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className={`rounded-t-2xl bg-gradient-to-br p-6 ${plan.gradient}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex size-10 items-center justify-center rounded-lg ${plan.iconBg}`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                </div>
                <div>
                  <span className="text-4xl font-black text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-1 flex-col p-6">
                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isCurrent || !!upgrading || loading}
                  className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all ${
                    isCurrent
                      ? 'cursor-default border border-border bg-muted text-muted-foreground'
                      : isUpgrade
                      ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md disabled:opacity-50'
                      : isDowngrade
                      ? 'border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50'
                      : 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50'
                  }`}
                >
                  {isCurrent ? (
                    'Current Plan'
                  ) : upgrading === plan.id ? (
                    <span className="flex items-center gap-2">
                      <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Processing...
                    </span>
                  ) : isUpgrade ? (
                    <>
                      Upgrade <ExternalLink size={14} />
                    </>
                  ) : (
                    <>
                      Downgrade <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stripe Trust Badge */}
      <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card/50 p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CreditCard size={16} />
          <span className="text-xs font-medium">Secure payments powered by</span>
          <span className="text-sm font-bold text-foreground">Stripe</span>
        </div>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">256-bit SSL encryption</span>
      </div>
    </div>
  );
};

export default BillingPage;
