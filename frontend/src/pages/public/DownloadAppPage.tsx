import { QrCode, Smartphone, Zap, ShieldCheck } from 'lucide-react';
import { PublicPageLayout } from '../../components/layout/PublicPageLayout';
// Removed Link import

const DownloadAppPage = () => {
  return (
    <PublicPageLayout>
      <div className="relative overflow-hidden">
        {/* Background Decorative Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] animate-float rounded-full bg-primary/5 blur-[100px]"></div>
          <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] animate-float rounded-full bg-secondary/5 blur-[80px]" style={{ animationDelay: '-3s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            
            {/* Left Content */}
            <div className="flex flex-col gap-6 animate-fade-in-up">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                <Smartphone className="h-4 w-4" />
                NYDev Mobile Access
              </div>
              
              <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                The ultimate <span className="text-primary">event check-in</span> companion.
              </h1>
              
              <p className="text-lg text-muted-foreground sm:text-xl">
                Scan attendee QR codes in milliseconds, track real-time capacity, and manage multiple entry points seamlessly. Available for iOS and Android.
              </p>
              
              <div className="mt-4 flex flex-col gap-8 sm:flex-row sm:items-center">
                {/* QR Code Demo */}
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl">
                  <div className="rounded-xl bg-white p-2">
                    <QrCode className="size-24 text-black" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Scan to Download</span>
                </div>
                
                <div className="flex flex-col gap-4">
                  <button className="flex items-center gap-3 rounded-xl bg-foreground px-6 py-3 text-background transition-transform hover:scale-105">
                    <svg viewBox="0 0 384 512" className="h-8 w-8 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                    <div className="flex flex-col items-start leading-none gap-0.5">
                      <span className="text-[10px]">Download on the</span>
                      <span className="text-xl font-semibold">App Store</span>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 rounded-xl bg-foreground px-6 py-3 text-background transition-transform hover:scale-105">
                    <svg viewBox="0 0 512 512" className="h-8 w-8 fill-current"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                    <div className="flex flex-col items-start leading-none gap-0.5">
                      <span className="text-[10px]">GET IT ON</span>
                      <span className="text-xl font-semibold">Google Play</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0 animate-fade-in-up animation-delay-200">
              <div className="absolute inset-0 -rotate-6 rounded-[3rem] bg-gradient-to-tr from-primary to-accent opacity-50 blur-lg"></div>
              
              {/* Phone Mockup */}
              <div className="relative mx-auto aspect-[1/2] w-[300px] overflow-hidden rounded-[3rem] border-8 border-foreground bg-background shadow-2xl">
                {/* Dynamic Island Notch */}
                <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground"></div>
                
                {/* App UI inside phone */}
                <div className="relative flex h-full w-full flex-col bg-muted/30">
                  <div className="bg-primary px-6 pb-6 pt-12 text-primary-foreground">
                    <h3 className="text-lg font-bold">Tech Conf 2026</h3>
                    <p className="text-xs opacity-80">Scanning Mode Active</p>
                  </div>
                  
                  <div className="flex-1 p-4 flex flex-col items-center justify-center">
                    {/* Scanner overlay */}
                    <div className="relative size-48 rounded-xl border-2 border-dashed border-primary bg-background/50 backdrop-blur-sm">
                      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-red-500 shadow-[0_0_10px_red]"></div>
                      {/* Corners */}
                      <div className="absolute -left-0.5 -top-0.5 size-4 border-l-4 border-t-4 border-primary"></div>
                      <div className="absolute -right-0.5 -top-0.5 size-4 border-r-4 border-t-4 border-primary"></div>
                      <div className="absolute -bottom-0.5 -left-0.5 size-4 border-b-4 border-l-4 border-primary"></div>
                      <div className="absolute -bottom-0.5 -right-0.5 size-4 border-b-4 border-r-4 border-primary"></div>
                    </div>
                    <p className="mt-8 text-center text-sm font-medium text-muted-foreground animate-pulse">
                      Align QR code here
                    </p>
                  </div>
                  
                  <div className="bg-card p-4 shadow-[0_-10px_40px_rgb(0,0,0,0.1)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Checked In</p>
                        <p className="font-bold text-foreground">1,204 / 2,000</p>
                      </div>
                      <div className="flex size-10 items-center justify-center rounded-full bg-green-500/20 text-green-600">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Grid below fold */}
          <div className="mt-32 grid gap-8 md:grid-cols-3 animate-fade-in-up animation-delay-300">
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <Zap className="mx-auto mb-4 h-10 w-10 text-yellow-500" />
              <h3 className="mb-2 font-bold text-foreground">Sub-second Scans</h3>
              <p className="text-sm text-muted-foreground">Our highly optimized scanner validates tickets instantly, preventing long lines at the door.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-green-500" />
              <h3 className="mb-2 font-bold text-foreground">Offline Mode (Pro)</h3>
              <p className="text-sm text-muted-foreground">Keep scanning even if the venue WiFi drops. Changes sync automatically when connection restores.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <Smartphone className="mx-auto mb-4 h-10 w-10 text-blue-500" />
              <h3 className="mb-2 font-bold text-foreground">Multi-Device Sync</h3>
              <p className="text-sm text-muted-foreground">Arm your entire volunteer team. All devices sync state instantly to prevent duplicate entry attempts.</p>
            </div>
          </div>

        </div>
      </div>
    </PublicPageLayout>
  );
};

export default DownloadAppPage;
