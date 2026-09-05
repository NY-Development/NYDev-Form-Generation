import { Check, CheckCircle2 } from 'lucide-react';
import { PublicPageLayout } from '../../components/layout/PublicPageLayout';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  return (
    <PublicPageLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center animate-fade-in-up">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">Pricing Plans</span>
          <h1 className="mb-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-7xl">
            Simple, transparent <span className="text-primary">pricing</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Whether you're hosting a small meetup or a massive multi-day conference, 
            we have a plan that scales with your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Starter Plan */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg animate-fade-in-up animation-delay-100">
            <h3 className="mb-3 text-xl font-bold text-card-foreground">Starter</h3>
            <p className="mb-6 text-sm text-muted-foreground min-h-[40px]">Perfect for small meetups and testing the waters.</p>
            <div className="mb-8 flex items-end gap-1">
              <span className="text-5xl font-black text-card-foreground">0 ETB</span>
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            <Link
              to="/login"
              className="mb-8 w-full rounded-xl border-2 border-primary py-3.5 text-center text-sm font-bold text-primary transition-colors hover:bg-primary/5"
            >
              Get Started Free
            </Link>
            <div className="flex flex-col gap-4 text-sm font-medium text-card-foreground">
              <p className="font-bold border-b border-border pb-2">What's included</p>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                Up to 50 Registrations / event
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                Basic Form Builder
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                Email Support
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                Standard Templates
              </div>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="relative flex flex-col rounded-3xl border-2 border-primary bg-primary p-8 text-primary-foreground shadow-2xl transition-transform hover:-translate-y-2 md:-translate-y-4 animate-fade-in-up animation-delay-200">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-background px-4 py-1 text-xs font-bold tracking-wider text-primary uppercase shadow-sm">
              Most Popular
            </div>
            <h3 className="mb-3 text-xl font-bold">Professional</h3>
            <p className="mb-6 text-sm text-primary-foreground/80 min-h-[40px]">For professional event organizers and growing communities.</p>
            <div className="mb-8 flex items-end gap-1">
              <span className="text-5xl font-black">2,500 ETB</span>
              <span className="text-primary-foreground/80 font-medium">/month</span>
            </div>
            <Link
              to="/login"
              className="mb-8 w-full rounded-xl bg-background py-3.5 text-center text-sm font-bold text-primary shadow-[0_0_20px_rgb(0,0,0,0.15)] transition-transform hover:scale-[1.02]"
            >
              Start 14-Day Free Trial
            </Link>
            <div className="flex flex-col gap-4 text-sm font-medium text-primary-foreground/95">
              <p className="font-bold border-b border-primary-foreground/20 pb-2">Everything in Starter, plus</p>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-background shrink-0" />
                Unlimited Registrations
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-background shrink-0" />
                QR Code Check-in App Access
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-background shrink-0" />
                Real-time Analytics Dashboard
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-background shrink-0" />
                Remove NYDev Branding
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-background shrink-0" />
                Custom Email Notifications
              </div>
            </div>
          </div>

          {/* Business Plan */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg animate-fade-in-up animation-delay-300">
            <h3 className="mb-3 text-xl font-bold text-card-foreground">Business</h3>
            <p className="mb-6 text-sm text-muted-foreground min-h-[40px]">Advanced features, compliance, and support for large scale operations.</p>
            <div className="mb-8 flex items-end gap-1">
              <span className="text-5xl font-black text-card-foreground">9,500 ETB</span>
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            <Link
              to="/contact"
              className="mb-8 w-full rounded-xl bg-muted py-3.5 text-center text-sm font-bold text-foreground transition-colors hover:bg-muted-foreground/20"
            >
              Contact Sales
            </Link>
            <div className="flex flex-col gap-4 text-sm font-medium text-card-foreground">
              <p className="font-bold border-b border-border pb-2">Everything in Pro, plus</p>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                Dedicated Account Manager
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                Multi-Organization Support
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                API & Webhook Access
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                99.9% Uptime SLA
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto max-w-3xl animate-fade-in-up animation-delay-400">
          <h2 className="mb-10 text-center text-3xl font-black text-foreground">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 font-bold text-foreground">Can I change my plan later?</h3>
              <p className="text-sm text-muted-foreground">Absolutely. You can upgrade or downgrade your plan at any time through your dashboard settings. Upgrades take effect immediately.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 font-bold text-foreground">How do you count registrations?</h3>
              <p className="text-sm text-muted-foreground">A registration counts when a user successfully submits your form. Failed payments or rejected submissions do not count against your limit.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 font-bold text-foreground">Do you take a cut of ticket sales?</h3>
              <p className="text-sm text-muted-foreground">No, NYDev does not take any percentage of your ticket sales. You only pay for your subscription plan. Standard Stripe/payment gateway fees still apply directly via your payment provider.</p>
            </div>
          </div>
        </div>

      </div>
    </PublicPageLayout>
  );
};

export default PricingPage;
