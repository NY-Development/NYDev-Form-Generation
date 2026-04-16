import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Download, Terminal } from 'lucide-react';

export const RegistrationSuccess = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const state = location.state as {
    submission?: { id: string; uniqueId: string; qrCode: string; status: string; confirmationMessage?: string };
    formTitle?: string;
    confirmationMessage?: string;
    orgName?: string;
  } | null;

  const submission = state?.submission;
  const formTitle = state?.formTitle || 'Registration';
  const orgName = state?.orgName || 'NYDev Form Generator';
  const confirmationMessage = state?.confirmationMessage || submission?.confirmationMessage || 'Your registration has been submitted successfully.';

  const handleDownloadQR = () => {
    if (!submission?.qrCode) return;
    const link = document.createElement('a');
    link.href = submission.qrCode;
    link.download = `qr-${submission.uniqueId || 'code'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-border bg-card px-6 py-4 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight text-foreground">{formTitle}</h2>
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          <nav className="hidden items-center gap-6 md:flex lg:gap-9">
            <Link to="/" className="text-sm font-medium leading-normal text-muted-foreground transition-colors hover:text-primary">Home</Link>
            <Link to={`/f/${slug}`} className="text-sm font-medium leading-normal text-muted-foreground transition-colors hover:text-primary">Event Details</Link>
          </nav>
          <Link
            to="/login"
            className="flex h-10 min-w-[84px] items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold tracking-wide text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex grow flex-col items-center justify-center px-4 py-10 md:px-6">
        
        {/* Decorative Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -right-[10%] top-[40%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>

        {/* Success Header */}
        <div className="relative z-10 mb-10 flex w-full max-w-2xl flex-col items-center gap-4 text-center">
          <div className="mb-2 animate-bounce rounded-full bg-green-100 p-4 dark:bg-green-900/30">
            <CheckCircle2 className="size-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
            Registration Successful!
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            {confirmationMessage}
          </p>
        </div>

        {/* Ticket / QR Card */}
        <div className="relative z-10 w-full max-w-[400px]">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            {/* Card Header */}
            <div className="border-b border-dashed border-border bg-primary/5 p-6 text-center dark:bg-primary/10">
              <h3 className="text-xl font-bold tracking-tight text-foreground">{formTitle}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{orgName}</p>
            </div>

            {/* QR Section */}
            <div className="flex flex-col items-center bg-card p-8">
              {submission?.qrCode ? (
                <div className="mb-6 rounded-xl border border-border bg-white p-3 shadow-inner">
                  <img
                    alt="QR Code for verification"
                    className="size-48 object-contain md:size-56"
                    src={submission.qrCode}
                  />
                </div>
              ) : (
                <div className="mb-6 flex size-48 items-center justify-center rounded-xl border border-dashed border-border bg-muted md:size-56">
                  <p className="text-sm text-muted-foreground">QR Code</p>
                </div>
              )}
              <div className="w-full text-center">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Registration ID</p>
                <p className="inline-block rounded-lg border border-border bg-muted/50 px-4 py-2 font-mono text-3xl font-bold tracking-wider text-foreground">
                  {submission?.uniqueId || '—'}
                </p>
              </div>
            </div>

            {/* Footer / Instructions */}
            <div className="border-t border-border bg-muted/30 p-6 text-center">
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Please save or screenshot this QR code for verification at the event.
              </p>
              {submission?.qrCode && (
                <button
                  onClick={handleDownloadQR}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
                >
                  <Download size={20} />
                  <span>Download QR Code</span>
                </button>
              )}
              <Link to={`/f/${slug}`}>
                <button className="mt-3 w-full py-2 text-sm font-semibold text-primary transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  View Form Details
                </button>
              </Link>
            </div>

            {/* Decorative Ticket Circles */}
            <div className="absolute -left-3 top-[138px] size-6 rounded-full bg-background"></div>
            <div className="absolute -right-3 top-[138px] size-6 rounded-full bg-background"></div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-1.5 text-xs text-muted-foreground opacity-60">
          <Terminal size={12} />
          <span>Powered by NYDev Form Generator</span>
        </div>
      </main>
    </div>
  );
};

export default RegistrationSuccess;
