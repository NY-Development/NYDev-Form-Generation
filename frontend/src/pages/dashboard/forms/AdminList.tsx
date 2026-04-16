import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Download, QrCode, MoreVertical, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { submissionService } from '../../../services/submission.service';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { toast } from 'sonner';
import type { Submission, Pagination } from '../../../types';

export const FormAdminList = () => {
  const { id: formId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    if (!orgId || !formId) return;
    setLoading(true);
    try {
      const res = await submissionService.getSubmissions(orgId, formId, {
        page,
        limit: 15,
        search,
        status: filter || undefined,
      });
      setSubmissions(res.data || []);
      setPagination(res.pagination || null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  }, [orgId, formId, page, search, filter]);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  const handleApprove = async (subId: string) => {
    try {
      await submissionService.approveSubmission(orgId, subId);
      toast.success('Submission approved!');
      fetchSubmissions();
    } catch (err: any) { toast.error(err.message); }
    setActionMenu(null);
  };

  const handleReject = async (subId: string) => {
    const notes = prompt('Rejection reason (optional):');
    try {
      await submissionService.rejectSubmission(orgId, subId, notes || undefined);
      toast.success('Submission rejected.');
      fetchSubmissions();
    } catch (err: any) { toast.error(err.message); }
    setActionMenu(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 text-sm font-medium">
        <a className="text-muted-foreground hover:underline" href="/dashboard">Dashboard</a>
        <span className="text-muted-foreground">/</span>
        <a className="text-muted-foreground hover:underline" href="/dashboard/forms">Forms</a>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground">Submissions</span>
      </div>

      {/* Header & Actions */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            Registrations
          </h1>
          <p className="max-w-xl text-base font-normal leading-normal text-muted-foreground">
            Manage attendee list, verify tickets, and track status.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="group relative">
            <button
              disabled
              className="flex h-10 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-transparent bg-muted px-4 text-sm font-bold text-muted-foreground"
            >
              <Download size={20} />
              <span>Export CSV</span>
              <span className="ml-1 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Pro
              </span>
            </button>
          </div>
          <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90">
            <QrCode size={20} />
            <span>Scan QR Code</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-2 shadow-sm md:flex-row">
        <div className="min-w-[200px] flex-1">
          <label className="flex h-10 w-full items-center rounded-lg border border-transparent bg-muted px-3 transition-colors focus-within:border-primary/50">
            <Search className="text-muted-foreground" size={20} />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="ml-2 w-full border-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:ring-0 outline-none"
              placeholder="Search by name, email, or ticket ID"
            />
          </label>
        </div>
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {['', 'pending', 'approved', 'rejected', 'verified'].map((s) => (
            <button
              key={s}
              onClick={() => { setFilter(s); setPage(1); }}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner className="py-20" text="Loading submissions..." />
      ) : submissions.length === 0 ? (
        <EmptyState
          icon={<QrCode className="h-8 w-8" />}
          title="No submissions yet"
          description="Share your form link to start collecting registrations."
        />
      ) : (
        <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Attendee</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">ID</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {submissions.map((sub) => {
                  const sId = sub.id || sub._id || '';
                  return (
                    <tr key={sId} className="group transition-colors hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {sub.submitterName?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{sub.submitterName || '—'}</p>
                            <p className="text-xs text-muted-foreground">{sub.submitterEmail || '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm font-medium text-foreground">{sub.uniqueId}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-foreground">{sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : '—'}</p>
                        <p className="text-xs text-muted-foreground">{sub.createdAt ? new Date(sub.createdAt).toLocaleTimeString() : ''}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={sub.status} />
                      </td>
                      <td className="relative px-4 py-3 text-right">
                        <button
                          onClick={() => setActionMenu(actionMenu === sId ? null : sId)}
                          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <MoreVertical size={20} />
                        </button>
                        {actionMenu === sId && (
                          <div className="absolute right-4 top-12 z-20 w-40 rounded-lg border border-border bg-card py-1 shadow-lg">
                            <button
                              onClick={() => { navigate(`/dashboard/forms/${formId}/submissions/${sId}`); setActionMenu(null); }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
                            >
                              <Eye size={16} /> View Detail
                            </button>
                            {sub.status === 'pending' && (
                              <>
                                <button onClick={() => handleApprove(sId)} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-emerald-600 hover:bg-muted">
                                  <CheckCircle2 size={16} /> Approve
                                </button>
                                <button onClick={() => handleReject(sId)} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-muted">
                                  <XCircle size={16} /> Reject
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-border p-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                Page <span className="font-medium text-foreground">{pagination.page}</span> of{' '}
                <span className="font-medium text-foreground">{pagination.pages}</span> ({pagination.total} total)
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="h-9 rounded border border-border bg-card px-3 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:bg-muted"
                >
                  Previous
                </button>
                <button
                  disabled={page >= pagination.pages}
                  onClick={() => setPage((p) => p + 1)}
                  className="h-9 rounded border border-border bg-card px-3 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:bg-muted"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormAdminList;
