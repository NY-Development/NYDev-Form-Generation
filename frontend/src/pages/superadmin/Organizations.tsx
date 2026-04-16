import { useState, useEffect, useCallback } from 'react';
import { Search, Building2, MoreVertical, ToggleLeft, ToggleRight, CreditCard } from 'lucide-react';
import { superadminService } from '../../services/superadmin.service';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { toast } from 'sonner';
import type { Organization, Pagination } from '../../types';

export const SuperAdminOrgs = () => {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const fetchOrgs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await superadminService.getOrganizations({ page, limit: 15, search });
      setOrgs(res.data || []);
      setPagination(res.pagination || null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load organizations');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchOrgs(); }, [fetchOrgs]);

  const handleToggleStatus = async (orgId: string) => {
    try {
      await superadminService.toggleOrgStatus(orgId);
      toast.success('Organization status updated');
      fetchOrgs();
    } catch (err: any) { toast.error(err.message); }
    setActionMenu(null);
  };

  const handleChangePlan = async (orgId: string) => {
    const plan = prompt('Enter new plan (free, pro, enterprise):');
    if (!plan || !['free', 'pro', 'enterprise'].includes(plan)) return;
    try {
      await superadminService.updateOrgSubscription(orgId, plan);
      toast.success('Subscription updated');
      fetchOrgs();
    } catch (err: any) { toast.error(err.message); }
    setActionMenu(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Organizations</h1>
          <p className="text-muted-foreground">Manage all tenant organizations on the platform.</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm placeholder-muted-foreground shadow-sm outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Search organizations..."
        />
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner className="py-20" text="Loading organizations..." />
      ) : orgs.length === 0 ? (
        <EmptyState icon={<Building2 className="h-8 w-8" />} title="No organizations found" />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</th>
                  <th className="hidden px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Slug</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Created</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orgs.map((org) => {
                  const oid = org.id || org._id || '';
                  return (
                    <tr key={oid} className="transition-colors hover:bg-muted/30">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {org.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{org.name}</p>
                            <p className="text-xs text-muted-foreground">{org.description || '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap px-6 py-4 font-mono text-sm text-muted-foreground md:table-cell">{org.slug}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status={org.isActive ? 'active' : 'inactive'} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                        {org.createdAt ? new Date(org.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="relative whitespace-nowrap px-6 py-4 text-right">
                        <button onClick={() => setActionMenu(actionMenu === oid ? null : oid)} className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-primary">
                          <MoreVertical size={20} />
                        </button>
                        {actionMenu === oid && (
                          <div className="absolute right-6 top-12 z-20 w-44 rounded-lg border border-border bg-card py-1 shadow-lg">
                            <button onClick={() => handleToggleStatus(oid)} className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
                              {org.isActive ? <ToggleRight size={16} className="text-red-500" /> : <ToggleLeft size={16} className="text-emerald-500" />}
                              {org.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button onClick={() => handleChangePlan(oid)} className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
                              <CreditCard size={16} /> Change Plan
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <span className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.pages} ({pagination.total} total)</span>
              <div className="flex gap-2">
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border border-border px-3 py-1 text-sm hover:bg-muted disabled:opacity-50">Previous</button>
                <button disabled={page >= pagination.pages} onClick={() => setPage((p) => p + 1)} className="rounded border border-border px-3 py-1 text-sm hover:bg-muted disabled:opacity-50">Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuperAdminOrgs;
