import { Edit3, QrCode, Layers, ShieldCheck, Mail, Database } from 'lucide-react';
import { PublicPageLayout } from '../../components/layout/PublicPageLayout';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  return (
    <PublicPageLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mb-20 text-center animate-fade-in-up">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">Platform Capabilities</span>
          <h1 className="mb-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Everything you need for <span className="text-primary">events</span>
          </h1>
          <p className="mx-auto max-w-[800px] text-lg text-muted-foreground sm:text-xl">
            A comprehensive suite of tools built specifically for modern event organizers. From registration to real-time check-ins.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-md animate-fade-in-up animation-delay-100">
            <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-900/20">
              <Edit3 className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">Advanced Form Builder</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Drag-and-drop interface with conditional logic, custom validation schemas, file uploads, and multi-step pagination.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-md animate-fade-in-up animation-delay-200">
            <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-transform group-hover:scale-110 dark:bg-green-900/20">
              <QrCode className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">Dynamic QR Check-in</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every submission generates an encrypted QR code. Scan tickets at the door using our mobile app for instant verification and capacity tracking.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-md animate-fade-in-up animation-delay-300">
            <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-transform group-hover:scale-110 dark:bg-purple-900/20">
              <Database className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">Real-time Analytics</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Live dashboards showing conversion rates, peak registration times, and demographic breakdowns of your attendees.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-md animate-fade-in-up animation-delay-400">
            <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-transform group-hover:scale-110 dark:bg-orange-900/20">
              <Layers className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">Custom Branding</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              White-label your forms with your organization's logo, colors, fonts, and custom domains for a seamless brand experience.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-md animate-fade-in-up animation-delay-500">
            <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-transform group-hover:scale-110 dark:bg-teal-900/20">
              <Mail className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">Automated Workflows</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Send automatic confirmation emails, tickets, and reminder broadcasts leading up to your event date.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-md animate-fade-in-up animation-delay-600">
            <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition-transform group-hover:scale-110 dark:bg-rose-900/20">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">Multi-Org Support</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Manage permissions, roles, and branch-level access control for massive enterprises hosting hundreds of decentralized events.
            </p>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mb-24 overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 animate-fade-in-up">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="mb-6 text-3xl font-black text-foreground">Experience the Dashboard</h2>
            <p className="mb-8 max-w-2xl text-muted-foreground">
              Everything is managed through our beautiful, heavily optimized command center. Fast, responsive, and available in dark mode.
            </p>
            <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-border shadow-2xl">
              {/* Fake dashboard mockup */}
              <div className="flex h-10 items-center justify-between border-b border-border bg-muted/50 px-4">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="aspect-video w-full bg-background p-6 flex flex-col gap-4">
                <div className="h-8 w-1/4 rounded bg-muted"></div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-24 rounded border border-border bg-card"></div>
                  <div className="h-24 rounded border border-border bg-card"></div>
                  <div className="h-24 rounded border border-border bg-card"></div>
                  <div className="h-24 rounded border border-border bg-card"></div>
                </div>
                <div className="flex-1 rounded border border-border bg-card"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up">
          <Link to="/login" className="inline-flex h-14 items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105">
            Start Building Forms
          </Link>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default FeaturesPage;
