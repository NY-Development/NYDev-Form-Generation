import { useState, useEffect } from 'react';
import { Shield, RefreshCw, ExternalLink, ChevronLeft, ChevronRight, Filter, Download, Calendar } from 'lucide-react';
import { superadminService } from '../../services/superadmin.service';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { toast } from 'sonner';

const ACTION_COLORS: Record<string, { bg: string; text: string }> = {
  plan_upgrade: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-primary' },
  form_deleted: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-destructive' },
  login_success: { bg: 'bg-muted', text: 'text-muted-foreground' },
  api_key_created: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400' },
  user_created: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400' },
  org_created: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400' },
  settings_updated: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
  other: { bg: 'bg-muted', text: 'text-muted-foreground' },
};

export const AuditLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>({});
  const [actionFilter, setActionFilter] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await superadminService.getAuditLogs({ page, limit: 10, action: actionFilter });
      setLogs(res.data || []);
      setMeta(res.pagination || res.meta || {});
    } catch (err: any) {
      toast.error(err.message || 'Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, [page, actionFilter]);

  const getActionStyle = (action: string) => ACTION_COLORS[action] || ACTION_COLORS.other;

  if (loading && logs.length === 0) return <LoadingSpinner className="py-20" text="Loading audit logs..." />;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-2 inline-block rounded bg-primary/10 px-2 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Security Control
          </span>
          <h2 className="text-4xl font-black tracking-tight text-foreground" style={{ letterSpacing: '-0.033em' }}>
            Audit Logs
          </h2>
          <p className="mt-2 max-w-xl font-medium text-muted-foreground">
            Comprehensive ledger of all administrative and system-level operations.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-bold shadow-sm transition-colors hover:bg-muted">
            <Download size={18} /> Export CSV
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Events (24h)</p>
          <p className="text-3xl font-black text-primary">{meta.total?.toLocaleString() || 0}</p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-600">
            <RefreshCw size={14} /> Live tracking
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Critical Actions</p>
          <p className="text-3xl font-black text-destructive">{meta.criticalCount || 0}</p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-muted-foreground">Stable trend</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Admins</p>
          <p className="text-3xl font-black text-foreground">{meta.activeAdmins || 0}</p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary">
            <Shield size={14} /> All verified sessions
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl bg-primary p-6 shadow-xl shadow-primary/10">
          <div className="relative z-10">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/70">System Integrity</p>
            <p className="text-3xl font-black text-white">99.9%</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-white">
              <Shield size={14} /> Encryption Active
            </div>
          </div>
          <Shield className="absolute -bottom-4 -right-4 text-white/10 transition-transform duration-500 group-hover:scale-110" size={96} />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border/20 bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2 rounded-lg border border-transparent bg-muted px-3 py-2 transition-colors hover:border-border">
          <Calendar size={16} className="text-muted-foreground" />
          <span className="text-sm font-semibold text-muted-foreground">All time</span>
        </div>
        <div className="h-6 w-px bg-border" />
        <select
          className="cursor-pointer border-none bg-transparent text-sm font-bold text-muted-foreground focus:ring-0"
          value={actionFilter}
          onChange={(e) => { setActionFilter(e.target.value); setPage(1); }}
        >
          <option value="all">All Actions</option>
          <option value="plan_upgrade">Plan Upgrade</option>
          <option value="form_deleted">Form Deleted</option>
          <option value="login_success">Login Success</option>
          <option value="user_created">User Created</option>
          <option value="settings_updated">Settings Updated</option>
        </select>
        <button onClick={() => { setActionFilter('all'); setPage(1); }} className="ml-auto text-xs font-bold text-primary hover:underline">
          Clear all filters
        </button>
      </div>

      {/* Logs Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-muted/30">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">User</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Action</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Entity</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">IP Address</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {logs.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">No audit logs yet.</td></tr>
              ) : (
                logs.map((log: any) => {
                  const style = getActionStyle(log.action);
                  return (
                    <tr key={log._id || log.id} className="transition-colors hover:bg-blue-50/20 dark:hover:bg-blue-900/5">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-foreground">
                          {new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-[10px] font-medium text-muted-foreground">
                          {new Date(log.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-black text-primary">
                            {log.userName?.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) || 'SY'}
                          </div>
                          <span className="text-sm font-semibold text-foreground">{log.userName || 'System'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${style.bg} ${style.text}`}>
                          {log.action?.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-muted-foreground">{log.entity || '—'}</div>
                        {log.entityId && <div className="text-[10px] tracking-tight text-muted-foreground">ID: {log.entityId}</div>}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{log.ipAddress || '—'}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-muted-foreground transition-colors hover:text-primary">
                          <ExternalLink size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Showing {logs.length} of {meta.total || 0} logs
          </p>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="flex size-8 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50">
              <ChevronLeft size={18} />
            </button>
            <div className="flex size-8 items-center justify-center rounded bg-primary text-xs font-bold text-white">{page}</div>
            <button disabled={page >= (meta.pages || 1)} onClick={() => setPage(p => p + 1)} className="flex size-8 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* FAB Refresh */}
      <button
        onClick={fetchLogs}
        className="group fixed bottom-8 right-8 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/40 transition-all hover:scale-110 active:scale-95"
      >
        <RefreshCw size={22} />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-background opacity-0 transition-opacity group-hover:opacity-100">
          Refresh Feed
        </span>
      </button>
    </>
  );
};

export default AuditLogs;
