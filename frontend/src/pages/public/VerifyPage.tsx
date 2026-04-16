import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { verifyService } from '../../services/verify.service';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

type VerifyState = 'loading' | 'verified' | 'already_verified' | 'rejected' | 'error';

export const VerifyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<VerifyState>('loading');
  const [data, setData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!id) return;
      try {
        const res = await verifyService.verifySubmission(id);
        setData(res.data);
        if (res.data.alreadyVerified) {
          setState('already_verified');
        } else if (res.data.submission?.status === 'rejected') {
          setState('rejected');
        } else {
          setState('verified');
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'Verification failed');
        setState('error');
      }
    };
    verify();
  }, [id]);

  if (state === 'loading') {
    return <LoadingSpinner fullPage text="Verifying registration..." />;
  }

  const stateConfig = {
    verified: {
      icon: <CheckCircle2 className="h-16 w-16 text-emerald-500" />,
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      title: 'Registration Verified!',
      subtitle: 'This registration has been successfully verified.',
    },
    already_verified: {
      icon: <ShieldCheck className="h-16 w-16 text-blue-500" />,
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      title: 'Already Verified',
      subtitle: 'This registration was previously verified.',
    },
    rejected: {
      icon: <XCircle className="h-16 w-16 text-red-500" />,
      bg: 'bg-red-100 dark:bg-red-900/30',
      title: 'Registration Rejected',
      subtitle: 'This registration has been rejected.',
    },
    error: {
      icon: <AlertTriangle className="h-16 w-16 text-amber-500" />,
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      title: 'Verification Error',
      subtitle: errorMsg,
    },
  };

  const config = stateConfig[state];
  const submission = data?.submission;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-6 text-foreground">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-[10%] top-[40%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-10 text-center shadow-xl">
          <div className={`rounded-full p-5 ${config.bg}`}>{config.icon}</div>
          <div>
            <h1 className="mb-2 text-2xl font-black tracking-tight">{config.title}</h1>
            <p className="text-muted-foreground">{config.subtitle}</p>
          </div>

          {submission && (
            <div className="w-full space-y-3 rounded-xl border border-border bg-muted/30 p-5 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{submission.submitterName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ID</span>
                <span className="font-mono font-medium">{submission.uniqueId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-medium capitalize ${
                  submission.status === 'verified' ? 'text-emerald-600' :
                  submission.status === 'rejected' ? 'text-red-600' :
                  'text-amber-600'
                }`}>
                  {submission.status}
                </span>
              </div>
              {submission.verifiedAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Verified At</span>
                  <span className="font-medium">{new Date(submission.verifiedAt).toLocaleString()}</span>
                </div>
              )}
              {typeof submission.form === 'object' && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Event</span>
                  <span className="font-medium">{submission.form.title}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex w-full flex-col gap-3 pt-2">
            <Link
              to="/"
              className="flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Go Home
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Clock className="mr-1 inline h-3 w-3" />
          Powered by NYDev Form Generator
        </p>
      </div>
    </div>
  );
};

export default VerifyPage;
