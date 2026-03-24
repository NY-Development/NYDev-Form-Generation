import { Link } from 'react-router-dom';
import { QrCode, Menu, PlayCircle, Edit3, Palette, Settings, CheckCircle2, Check, Share2 } from 'lucide-react';

const Landing = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md sm:px-10">
        <div className="flex items-center gap-4 text-foreground">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <QrCode className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">NYDev Form Generator</h2>
        </div>
        <div className="hidden flex-1 justify-end gap-8 md:flex">
          <div className="flex items-center gap-9">
            <a className="text-sm font-medium leading-normal transition-colors hover:text-primary" href="#features">
              Features
            </a>
            <a className="text-sm font-medium leading-normal transition-colors hover:text-primary" href="#how-it-works">
              How it Works
            </a>
            <a className="text-sm font-medium leading-normal transition-colors hover:text-primary" href="#pricing">
              Pricing
            </a>
            <Link className="text-sm font-medium leading-normal transition-colors hover:text-primary" to="/login">
              Login
            </Link>
          </div>
          <Link
            to="/login"
            className="flex h-9 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <span className="truncate">Get Started</span>
          </Link>
        </div>
        <div className="flex items-center md:hidden">
          <button className="text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="flex max-w-[1200px] flex-1 flex-col px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="@container">
              <div className="flex flex-col-reverse gap-6 py-10 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
                {/* Hero Text */}
                <div className="flex flex-col gap-6 lg:w-1/2 lg:min-w-[400px]">
                  <div className="flex flex-col gap-4 text-left">
                    <span className="text-sm font-bold tracking-wider text-primary uppercase">
                      Event Management Simplified
                    </span>
                    <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-foreground sm:text-5xl lg:text-6xl">
                      Create Smart Registration Forms with <span className="text-primary">QR Verification</span>
                    </h1>
                    <h2 className="text-base font-normal leading-relaxed text-muted-foreground sm:text-lg">
                      Streamline your event check-ins and data collection. Build intelligent forms in minutes and use our
                      instant QR code verification system for seamless entry.
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      to="/login"
                      className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-6 text-base font-bold leading-normal tracking-[0.015em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                    >
                      <span className="truncate">Create Free Form</span>
                    </Link>
                    <button className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-border bg-background px-6 text-base font-bold leading-normal tracking-[0.015em] text-foreground transition-colors hover:bg-muted">
                      <span className="flex items-center gap-2 truncate">
                        <PlayCircle className="h-5 w-5" />
                        View Demo
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex -space-x-3">
                      <div
                        className="h-10 w-10 rounded-full border-2 border-background bg-muted bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64")',
                        }}
                      ></div>
                      <div
                        className="h-10 w-10 rounded-full border-2 border-background bg-muted bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'url("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64")',
                        }}
                      ></div>
                      <div
                        className="h-10 w-10 rounded-full border-2 border-background bg-muted bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64")',
                        }}
                      ></div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-bold text-foreground">2,000+</span> event organizers trust us
                    </div>
                  </div>
                </div>

                {/* Hero Visual Output */}
                <div className="relative z-0 w-full lg:w-1/2">
                  <div className="absolute -inset-4 animate-pulse rounded-full bg-linear-to-r from-primary/30 to-purple-500/30 opacity-30 blur-3xl"></div>
                  <div className="relative flex aspect-4/3 w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                    {/* Fake Browser Header */}
                    <div className="flex h-8 items-center gap-2 border-b border-border bg-muted/50 px-4">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    {/* Content Mockup */}
                    <div className="flex flex-1 overflow-hidden">
                      {/* Sidebar */}
                      <div className="flex w-16 flex-col items-center gap-4 border-r border-border bg-muted/30 py-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/20 text-primary">
                          <Edit3 className="h-4 w-4" />
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground">
                          <Palette className="h-4 w-4" />
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground">
                          <Settings className="h-4 w-4" />
                        </div>
                      </div>
                      {/* Main Area */}
                      <div className="relative flex-1 bg-card p-6">
                        <div className="mb-4 h-8 w-full animate-pulse rounded bg-muted"></div>
                        <div className="mb-8 h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="h-3 w-12 rounded bg-muted"></div>
                            <div className="h-10 w-full rounded border border-border bg-transparent"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 w-12 rounded bg-muted"></div>
                            <div className="h-10 w-full rounded border border-border bg-transparent"></div>
                          </div>
                        </div>

                        {/* Overlay Floating Card */}
                        <div className="absolute bottom-6 right-6 flex w-48 rotate-[-5deg] transform flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 shadow-xl transition-transform duration-300 hover:rotate-0">
                          <div className="h-24 w-24 rounded bg-white p-1">
                            <QrCode className="h-full w-full text-black" />
                          </div>
                          <p className="text-[10px] font-bold text-muted-foreground">SCAN TO VERIFY</p>
                          <div className="flex items-center gap-1 text-xs font-bold text-green-500">
                            <CheckCircle2 className="h-4 w-4" />
                            Valid Ticket
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div id="how-it-works" className="border-t border-dashed border-border py-16 md:py-24">
              <div className="mb-16 flex flex-col gap-4 text-center">
                <span className="text-sm font-bold tracking-wider text-primary uppercase">Process</span>
                <h2 className="text-3xl font-black leading-tight tracking-[-0.015em] text-foreground sm:text-4xl">
                  Simple Steps to Smart Registration
                </h2>
                <p className="mx-auto max-w-[720px] text-base font-normal leading-normal text-muted-foreground">
                  Get started in minutes with our intuitive three-step process designed for efficiency and reliability.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
                {/* Step 1 */}
                <div className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/20">
                    <Edit3 className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold leading-tight text-card-foreground">1. Create Custom Form</h3>
                    <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                      Design your perfect registration form with our drag-and-drop builder. Add custom fields, logic, and
                      branding without writing code.
                    </p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-900/20">
                    <Share2 className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold leading-tight text-card-foreground">2. Share & Collect</h3>
                    <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                      Distribute your form automatically via unique links, email campaigns, or embedded widgets. Watch
                      responses roll in real-time.
                    </p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-transform duration-300 group-hover:scale-110 dark:bg-green-900/20">
                    <QrCode className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold leading-tight text-card-foreground">3. Verify Instantly</h3>
                    <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                      Every registration generates a unique QR code. Scan attendee codes at the door with our mobile app
                      for secure, instant entry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Preview Section */}
            <div id="pricing" className="mb-20 py-10">
              <div className="mb-10 flex flex-col items-end justify-between gap-6 md:flex-row">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold tracking-wider text-primary uppercase">Plans</span>
                  <h2 className="text-3xl font-black leading-tight tracking-[-0.015em] text-foreground">
                    Flexible Pricing
                  </h2>
                </div>
                <div className="flex rounded-lg bg-muted p-1">
                  <button className="rounded-md bg-background px-4 py-2 text-sm font-bold text-foreground shadow-sm">
                    Monthly
                  </button>
                  <button className="rounded-md px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground">
                    Yearly
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Free Plan */}
                <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-2 text-lg font-bold text-card-foreground">Starter</h3>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-card-foreground">$0</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <p className="mb-6 text-sm text-muted-foreground">Perfect for small meetups and testing the waters.</p>
                  <Link
                    to="/login"
                    className="mb-6 w-full rounded-lg border border-primary py-2.5 text-center text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                  >
                    Get Started Free
                  </Link>
                  <ul className="flex flex-col gap-3 text-sm text-card-foreground">
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      Up to 50 Registrations
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      Basic Form Builder
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      Email Support
                    </li>
                  </ul>
                </div>

                {/* Pro Plan (Highlighted) */}
                <div className="relative flex transform flex-col overflow-hidden rounded-2xl border border-primary bg-primary text-primary-foreground shadow-2xl md:-translate-y-4 p-6">
                  <div className="absolute right-0 top-0 rounded-bl-lg bg-background px-3 py-1 text-[10px] font-bold tracking-wider text-primary uppercase">
                    Most Popular
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-primary-foreground">Professional</h3>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-primary-foreground">$29</span>
                    <span className="text-primary-foreground/80">/mo</span>
                  </div>
                  <p className="mb-6 text-sm text-primary-foreground/80">For professional event organizers.</p>
                  <Link
                    to="/login"
                    className="mb-6 w-full rounded-lg bg-background py-2.5 text-center text-sm font-bold text-primary shadow-lg shadow-background/25 transition-colors hover:bg-background/90"
                  >
                    Start Free Trial
                  </Link>
                  <ul className="flex flex-col gap-3 text-sm text-primary-foreground/90">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-background" />
                      Unlimited Registrations
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-background" />
                      QR Code Check-in App
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-background" />
                      Analytics Dashboard
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-background" />
                      Custom Branding
                    </li>
                  </ul>
                </div>

                {/* Enterprise Plan */}
                <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-2 text-lg font-bold text-card-foreground">Business</h3>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-card-foreground">$99</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <p className="mb-6 text-sm text-muted-foreground">Advanced features for large scale operations.</p>
                  <button className="mb-6 w-full rounded-lg border border-border py-2.5 text-center text-sm font-bold text-card-foreground transition-colors hover:bg-muted">
                    Contact Sales
                  </button>
                  <ul className="flex flex-col gap-3 text-sm text-card-foreground">
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      API Access
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      SSO Integration
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      Dedicated Account Manager
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      SLA Support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-border pb-8 pt-12">
              <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row">
                <div className="flex max-w-sm flex-col gap-4">
                  <div className="flex items-center gap-3 text-foreground">
                    <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                      <QrCode className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-bold">NYDev Form Generator</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The smartest way to create forms and manage event entry with secure QR code technology.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-foreground">Product</h4>
                    <a className="text-muted-foreground hover:text-primary" href="#">
                      Features
                    </a>
                    <a className="text-muted-foreground hover:text-primary" href="#">
                      Pricing
                    </a>
                    <a className="text-muted-foreground hover:text-primary" href="#">
                      Integrations
                    </a>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-foreground">Resources</h4>
                    <a className="text-muted-foreground hover:text-primary" href="#">
                      Documentation
                    </a>
                    <a className="text-muted-foreground hover:text-primary" href="#">
                      Blog
                    </a>
                    <a className="text-muted-foreground hover:text-primary" href="#">
                      Community
                    </a>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-foreground">Company</h4>
                    <a className="text-muted-foreground hover:text-primary" href="#">
                      About
                    </a>
                    <a className="text-muted-foreground hover:text-primary" href="#">
                      Contact
                    </a>
                    <a className="text-muted-foreground hover:text-primary" href="#">
                      Legal
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
                <p>© {new Date().getFullYear()} NYDev. All rights reserved.</p>
                <div className="flex gap-4">
                  <a className="hover:text-primary" href="#">
                    Privacy Policy
                  </a>
                  <a className="hover:text-primary" href="#">
                    Terms of Service
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
