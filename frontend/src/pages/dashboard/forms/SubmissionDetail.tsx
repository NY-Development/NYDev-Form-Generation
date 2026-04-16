import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { submissionService } from '../../../services/submission.service';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { toast } from 'sonner';
import type { Submission } from '../../../types';

export const SubmissionDetail = () => {
  const { id: formId, subId } = useParams<{ id: string; subId: string }>();
  const navigate = useNavigate();
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!orgId || !subId) return;
      try {
        const res = await submissionService.getSubmission(orgId, subId);
        setSubmission(res.data.submission);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load submission');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [orgId, subId]);

  const handleApprove = async () => {
    if (!orgId || !subId) return;
    try {
      const res = await submissionService.approveSubmission(orgId, subId);
      setSubmission(res.data.submission);
      toast.success('Submission approved!');
    } catch (err: any) { toast.error(err.message); }
  };

  const handleReject = async () => {
    if (!orgId || !subId) return;
    const notes = prompt('Rejection reason (optional):');
    try {
      const res = await submissionService.rejectSubmission(orgId, subId, notes || undefined);
      setSubmission(res.data.submission);
      toast.success('Submission rejected.');
    } catch (err: any) { toast.error(err.message); }
  };

  if (loading) return <LoadingSpinner className="py-20" text="Loading submission..." />;
  if (!submission) return <div className="py-20 text-center text-muted-foreground">Submission not found.</div>;

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <button onClick={() => navigate(`/dashboard/forms/${formId}/submissions`)} className="flex items-center gap-1 text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to Submissions
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Submission Details</h1>
          <p className="text-muted-foreground">ID: <span className="font-mono font-medium">{submission.uniqueId}</span></p>
        </div>
        <div className="flex items-center gap-3">
          {submission.status === 'pending' && (
            <>
              <button onClick={handleApprove} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700">
                <CheckCircle2 size={16} /> Approve
              </button>
              <button onClick={handleReject} className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 shadow-sm transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                <XCircle size={16} /> Reject
              </button>
            </>
          )}
          <StatusBadge status={submission.status} size="md" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Responses */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-6 py-4">
              <h3 className="font-bold text-foreground">Submitted Responses</h3>
            </div>
            <div className="divide-y divide-border">
              {submission.responses && typeof submission.responses === 'object' ? (
                Object.entries(submission.responses).map(([key, val]) => (
                  <div key={key} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-start sm:justify-between">
                    <span className="text-sm font-medium text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}</span>
                    <span className="text-sm font-medium text-foreground sm:text-right">{Array.isArray(val) ? val.join(', ') : String(val || '—')}</span>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-muted-foreground">No responses recorded.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Info Card + QR */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-foreground">Registrant Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User size={16} className="text-muted-foreground" />
                <span>{submission.submitterName || '—'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-muted-foreground" />
                <span>{submission.submitterEmail || '—'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-muted-foreground" />
                <span>{submission.createdAt ? new Date(submission.createdAt).toLocaleString() : '—'}</span>
              </div>
            </div>
          </div>

          {submission.qrCode && (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-bold text-foreground">QR Code</h3>
              <div className="rounded-lg border border-border bg-white p-3">
                <img
                  src={submission.qrCode}
                  alt="QR Code"
                  className="h-40 w-40 object-contain"
                />
              </div>
              <p className="font-mono text-lg font-bold tracking-wider text-foreground">{submission.uniqueId}</p>
            </div>
          )}

          {submission.notes && (
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-2 font-bold text-foreground">Notes</h3>
              <p className="text-sm text-muted-foreground">{submission.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
