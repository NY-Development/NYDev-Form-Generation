import { FileText, Scale, Zap, ShieldAlert, CreditCard, Gavel } from 'lucide-react';
import { PublicPageLayout } from '../../components/layout/PublicPageLayout';
import { useEffect, useState } from 'react';

const TermsOfServicePage = () => {
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
      {/* Header Banner */}
      <div className="relative border-b border-border bg-card overflow-hidden animate-fade-in">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[20%] h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]"></div>
        </div>
        
        <div className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-32 flex flex-col items-center text-center text-card-foreground">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-foreground text-background shadow-xl">
            <Scale className="h-8 w-8" />
          </div>
          <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-6xl">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Clear, transparent rules designed to protect you, your attendees, and our platform.
            These terms define our mutual agreement.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm font-medium text-muted-foreground bg-background rounded-full px-6 py-2 border border-border shadow-sm">
            <span className="text-foreground">Effective Date:</span> {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          
          {/* Sticky Navigation */}
          <div className="hidden lg:sticky lg:top-32 lg:block lg:w-72 shrink-0 animate-slide-in-left">
            <div className="rounded-2xl bg-muted/50 p-6">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Legal Sections</h3>
              <nav className="flex flex-col gap-2">
                {[
                  { id: 'acceptance', label: '1. Acceptance' },
                  { id: 'usage', label: '2. Usage Limits' },
                  { id: 'billing', label: '3. Subscription & Billing' },
                  { id: 'ip', label: '4. Intellectual Property' },
                  { id: 'liability', label: '5. Liability' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      activeHash === item.id 
                        ? 'bg-background text-foreground shadow-sm shadow-black/5 ring-1 ring-border' 
                        : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                    }`}
                  >
                    {item.label}
                    {activeHash === item.id && <Zap className="size-3 text-primary" />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Areas */}
          <div className="flex-1 space-y-12 animate-fade-in-up">
            
            <section id="intro" className="text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Please read these Terms of Service ("Terms") carefully before using the NYDev Form Generator application.
                By accessing or registering on our platform, you construct a legally binding agreement with NYDev Inc.
              </p>
            </section>

            <section id="acceptance" className="scroll-mt-32">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 text-muted-foreground">
                <p>
                  By accessing or using the Service, you agree to be bound by these Terms globally. 
                  If you disagree with any segment of these requirements, you are prohibited from accessing the system.
                  Your continued use of the platform constitutes your ongoing agreement.
                </p>
              </div>
            </section>

            <section id="usage" className="scroll-mt-32">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-900/20">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">2. Usage Rights & Restrictions</h2>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="bg-muted p-6 border-b border-border">
                  <p className="text-foreground font-medium">NYDev grants you a revocable, non-exclusive license explicitly limited to managing your organization's events.</p>
                </div>
                <div className="p-6 md:p-8">
                  <h4 className="font-bold text-foreground mb-4">Prohibited Activities:</h4>
                  <ul className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2 bg-background p-3 rounded-lg border border-border">
                      <span className="size-2 rounded-full bg-red-500"></span> Reverse Engineering
                    </li>
                    <li className="flex items-center gap-2 bg-background p-3 rounded-lg border border-border">
                      <span className="size-2 rounded-full bg-red-500"></span> Malicious Data Collection
                    </li>
                    <li className="flex items-center gap-2 bg-background p-3 rounded-lg border border-border">
                      <span className="size-2 rounded-full bg-red-500"></span> QR Integrity Abuse
                    </li>
                    <li className="flex items-center gap-2 bg-background p-3 rounded-lg border border-border">
                      <span className="size-2 rounded-full bg-red-500"></span> Phishing Forms
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="billing" className="scroll-mt-32">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">3. Subscription & Billing</h2>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 text-muted-foreground flex flex-col gap-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-primary-foreground">
                  <strong className="block mb-2 text-primary">Billing Accuracy</strong>
                  <p className="text-sm">Our platform operates dynamically. You will be billed in advance (ETB) based on your selected tier. Failure to process payment leads to an automatic, non-destructive downgrade to Starter features.</p>
                </div>
              </div>
            </section>

            <section id="liability" className="scroll-mt-32">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800">
                  <Gavel className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">4. Limitation of Liability</h2>
              </div>
              <div className="rounded-2xl border border-border bg-foreground p-6 md:p-8 text-background">
                <p className="text-sm leading-relaxed opacity-90 uppercase tracking-wide font-medium">
                  In no event shall NYDev, its directors, or affiliates be liable for indirect, incidental, special, consequential, or punitive damages—including data loss or event disruptions—arising unconditionally from software downtime, even if advised of the possibility of such damages.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default TermsOfServicePage;
