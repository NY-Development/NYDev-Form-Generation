import { ShieldCheck, Eye, Database, Lock, Users, Activity, FileText } from 'lucide-react';
import { PublicPageLayout } from '../../components/layout/PublicPageLayout';
import { useEffect, useState } from 'react';

const PrivacyPolicyPage = () => {
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 120) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveHash(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <PublicPageLayout>
      <div className="relative border-b border-border bg-card overflow-hidden animate-fade-in">
        {/* Dynamic Abstract Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-[10%] top-0 h-[300px] w-[500px] rounded-full bg-primary/20 blur-[120px]"></div>
          <div className="absolute -right-[10%] bottom-0 h-[300px] w-[500px] rounded-full bg-secondary/20 blur-[120px]"></div>
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-32 text-center text-card-foreground">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-6xl">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            We are committed to protecting your personal information and your right to privacy. 
            Here is how we handle your data with the care it deserves.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-2"><FileText className="size-4" /> Updated: September 2026</span>
            <span className="h-1 w-1 rounded-full bg-border"></span>
            <span className="flex items-center gap-2"><Eye className="size-4" /> 7 min read</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          
          {/* Sticky Navigation */}
          <div className="hidden lg:sticky lg:top-32 lg:block lg:w-72 shrink-0 animate-slide-in-left">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">On this page</h3>
              <nav className="flex flex-col gap-1">
                {[
                  { id: 'collection', label: '1. Information We Collect' },
                  { id: 'usage', label: '2. How We Use Data' },
                  { id: 'security', label: '3. Data Security & QR Codes' },
                  { id: 'sharing', label: '4. Information Sharing' },
                  { id: 'rights', label: '5. Your Privacy Rights' },
                  { id: 'cookies', label: '6. Cookies & Tracking' },
                  { id: 'contact', label: '7. Contact Us' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      activeHash === item.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-12 animate-fade-in-up">
            
            <section id="introduction" className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed">
                At <strong>NYDev Form Generator</strong> ("we", "our", or "us"), your privacy is not just a policy—it's a core design principle embedded in everything we build. This Privacy Policy explains how your personal information is collected, used, and disclosed when you use our platform and related services securely.
              </p>
            </section>

            <section id="collection" className="scroll-mt-32">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <p className="mb-6 text-muted-foreground leading-relaxed">We focus on collecting only what we absolutely need to provide you with a stellar experience.</p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl bg-background p-5 border border-border">
                    <h3 className="mb-2 font-bold text-foreground">Account Information</h3>
                    <p className="text-sm text-muted-foreground">When you sign up, we securely store your name, email, encrypted password, and organizational details to configure your workspace.</p>
                  </div>
                  <div className="rounded-xl bg-background p-5 border border-border">
                    <h3 className="mb-2 font-bold text-foreground">Form Submissions</h3>
                    <p className="text-sm text-muted-foreground">We process and store data entered by your attendees. You remain the data controller; we act as the secure data processor.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="usage" className="scroll-mt-32">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20">
                  <Activity className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">2. How We Use Data</h2>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <ul className="flex flex-col gap-4 text-muted-foreground">
                  <li className="flex items-start gap-4">
                    <span className="flex size-6 mt-0.5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
                    <div>
                      <strong className="text-foreground block mb-1">Delivering Core Infrastructure</strong>
                      Processing form submissions, generating dynamic QR codes, and routing automated emails based on your custom workflows.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex size-6 mt-0.5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
                    <div>
                      <strong className="text-foreground block mb-1">Security & Authentication</strong>
                      Validating login attempts, rotating secure tokens, and maintaining audit logs to prevent unauthorized access.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section id="security" className="scroll-mt-32">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/20">
                  <Lock className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">3. Data Security & QR Codes</h2>
              </div>
              <div className="rounded-2xl border border-border bg-foreground p-6 text-background md:p-8">
                <h3 className="mb-4 text-xl font-bold">Military-Grade Encryption</h3>
                <p className="mb-6 text-background/80 leading-relaxed">
                  Your event integrity is crucial. Form submissions trigger our proprietary QR generation engine. 
                  These QR codes encode specific registration hashes using modern cryptographic standards, meaning the 
                  printed code itself contains absolutely no personally identifiable attendee information.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                  <div className="flex items-center gap-2 bg-background/10 rounded-lg p-3">
                    <ShieldCheck className="h-4 w-4" /> SSL Transit Encryption
                  </div>
                  <div className="flex items-center gap-2 bg-background/10 rounded-lg p-3">
                    <Database className="h-4 w-4" /> AES-256 Data at Rest
                  </div>
                </div>
              </div>
            </section>

            <section id="sharing" className="scroll-mt-32">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/20">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">4. Information Sharing</h2>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  <strong>We do not, and will never, sell your personal information.</strong>
                </p>
                <p>
                  We may share structural sub-components of data with trusted third-party vendors exclusively to operate 
                  our business (e.g., AWS for hosting, Stripe for billing, Twilio for communications) under the strict 
                  supervision of Data Processing Agreements (DPAs).
                </p>
              </div>
            </section>
            
            <hr className="my-12 border-border" />
            
            <div className="rounded-2xl bg-muted p-8 text-center animate-fade-in-up">
              <h3 className="mb-4 text-xl font-bold text-foreground">Questions about our privacy practices?</h3>
              <p className="mb-6 text-muted-foreground">Our Data Protection Office is ready to help clarify any concerns.</p>
              <a href="mailto:privacy@nydev.com" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                Contact DPO
              </a>
            </div>

          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default PrivacyPolicyPage;
