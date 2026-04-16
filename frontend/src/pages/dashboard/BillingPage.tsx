import { useState, useEffect } from 'react';
import { CheckCircle2, CreditCard, Zap, Crown, Gem, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { organizationService } from '../../services/organization.service';
import { toast } from 'sonner';
import type { Subscription } from '../../types';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    icon: <Zap className="h-6 w-6" />,
    color: 'border-border',
    features: ['3 forms', '100 submissions/form', '1 admin', 'Basic analytics', 'NYDev watermark'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    icon: <Crown className="h-6 w-6" />,
    color: 'border-primary ring-2 ring-primary/20',
    popular: true,
    features: ['Unlimited forms', '10,000 submissions/form', '5 admins', 'Advanced analytics', 'Custom branding', 'CSV exports', 'No watermark'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    icon: <Gem className="h-6 w-6" />,
    color: 'border-border',
    features: ['Everything in Pro', 'Unlimited submissions', 'Unlimited admins', 'API access', 'Priority support', 'Custom integrations', 'SLA guarantee'],
  },
];

export const BillingPage = () => {
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState('');

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

  const currentPlan = subscription?.plan || 'free';

  const handleUpgrade = async (plan: string) => {
    if (plan === currentPlan) return;
    setUpgrading(plan);
    try {
      const res = await organizationService.updateSubscription(orgId, plan);
      setSubscription(res.data.subscription);
      toast.success(`Upgraded to ${plan.charAt(0).toUpperCase() + plan.slice(1)}!`);
    } catch (err: any) {
      toast.error(err.message || 'Upgrade failed');
    } finally {
      setUpgrading('');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Billing & Plans</h1>
        <p className="text-muted-foreground">Manage your subscription and billing information.</p>
      </div>

      {/* Current Plan */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CreditCard size={24} />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Current Plan</h2>
              <p className="text-sm text-muted-foreground">
                You are on the <span className="font-semibold text-primary capitalize">{currentPlan}</span> plan
              </p>
            </div>
          </div>
          {subscription && (
            <div className="text-right text-sm text-muted-foreground">
              <p>Status: <span className="capitalize font-medium text-foreground">{subscription.status}</span></p>
              {subscription.endDate && <p>Renews: {new Date(subscription.endDate).toLocaleDateString()}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-md">
                  Most Popular
                </div>
              )}

              <div className="mb-4 flex items-center gap-3 text-primary">
                {plan.icon}
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-black text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

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
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${
                  isCurrent
                    ? 'cursor-default border border-border bg-muted text-muted-foreground'
                    : 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50'
                }`}
              >
                {isCurrent ? 'Current Plan' : upgrading === plan.id ? 'Processing...' : (
                  <>Upgrade <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillingPage;
