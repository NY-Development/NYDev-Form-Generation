import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, Eye, Trash2, Globe, Lock, MoreVertical } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { formService } from '../../../services/form.service';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { EmptyState } from '../../../components/common/EmptyState';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { toast } from 'sonner';
import type { Form, Pagination } from '../../../types';

export const FormsList = () => {
  const navigate = useNavigate();
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';

  const [forms, setForms] = useState<Form[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const fetchForms = useCallback(async () => {
    if (!orgId) return;
    setLoading(true);
    try {
      const res = await formService.getForms(orgId, { page, limit: 10, search, status: statusFilter || undefined });
      setForms(res.data || []);
      setPagination(res.pagination || null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load forms');
    } finally {
      setLoading(false);
    }
  }, [orgId, page, search, statusFilter]);

  useEffect(() => { fetchForms(); }, [fetchForms]);

  const handlePublish = async (formId: string) => {
    try {
      await formService.publishForm(orgId, formId);
      toast.success('Form published!');
      fetchForms();
    } catch (err: any) { toast.error(err.message); }
    setOpenMenu(null);
  };

  const handleClose = async (formId: string) => {
    try {
      await formService.closeForm(orgId, formId);
      toast.success('Form closed.');
      fetchForms();
    } catch (err: any) { toast.error(err.message); }
    setOpenMenu(null);
  };

  const handleDelete = async (formId: string) => {
    if (!confirm('Are you sure you want to delete this form?')) return;
    try {
      await formService.deleteForm(orgId, formId);
      toast.success('Form deleted.');
      fetchForms();
    } catch (err: any) { toast.error(err.message); }
    setOpenMenu(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">My Forms</h1>
          <p className="text-base text-muted-foreground">Create, manage, and publish your registration forms.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/forms/templates')}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            Templates
          </button>
          <button
            onClick={() => navigate('/dashboard/forms/new')}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Plus size={18} /> New Form
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground shadow-sm outline-none transition-all focus:ring-2 focus:ring-primary/50"
            placeholder="Search forms..."
          />
        </div>
        <div className="flex items-center gap-2">
          {['', 'draft', 'published', 'closed'].map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSpinner className="py-20" text="Loading forms..." />
      ) : forms.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-8 w-8" />}
          title="No forms yet"
          description="Create your first form to start collecting registrations."
          action={
            <button
              onClick={() => navigate('/dashboard/forms/new')}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Plus size={18} /> Create Form
            </button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {forms.map((form) => {
              const fId = form.id || form._id || '';
              return (
                <div
                  key={fId}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between p-5 pb-3">
                    <div className="flex-1 min-w-0">
                      <div className="mb-2 flex items-center gap-2">
                        <StatusBadge status={form.status} />
                        {form.status === 'published' ? (
                          <Globe size={14} className="text-emerald-500" />
                        ) : (
                          <Lock size={14} className="text-muted-foreground" />
                        )}
                      </div>
                      <h3 className="truncate text-lg font-bold text-foreground">{form.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {form.description || 'No description'}
                      </p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === fId ? null : fId)}
                        className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <MoreVertical size={18} />
                      </button>
                      {openMenu === fId && (
                        <div className="absolute right-0 top-8 z-20 w-40 rounded-lg border border-border bg-card py-1 shadow-lg">
                          <button onClick={() => { navigate(`/dashboard/forms/${fId}/edit`); setOpenMenu(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
                            <Eye size={16} /> View / Edit
                          </button>
                          <button onClick={() => { navigate(`/dashboard/forms/${fId}/submissions`); setOpenMenu(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
                            <FileText size={16} /> Submissions
                          </button>
                          {form.status === 'draft' && (
                            <button onClick={() => handlePublish(fId)} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-emerald-600 hover:bg-muted">
                              <Globe size={16} /> Publish
                            </button>
                          )}
                          {form.status === 'published' && (
                            <button onClick={() => handleClose(fId)} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-amber-600 hover:bg-muted">
                              <Lock size={16} /> Close
                            </button>
                          )}
                          <div className="my-1 border-t border-border" />
                          <button onClick={() => handleDelete(fId)} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted">
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="mt-auto flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
                    <span>{form.submissionCount || 0} submissions</span>
                    <span>{form.createdAt ? new Date(form.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.pages} ({pagination.total} forms)
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
        </>
      )}
    </div>
  );
};

export default FormsList;
