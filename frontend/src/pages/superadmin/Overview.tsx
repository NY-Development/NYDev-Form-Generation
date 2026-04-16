import { useState, useEffect } from 'react';
import { Users, DollarSign, FileText, Server, TrendingUp } from 'lucide-react';
import { superadminService } from '../../services/superadmin.service';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { toast } from 'sonner';
import type { PlatformStats, Organization } from '../../types';

export const SuperAdminOverview = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [recentOrgs, setRecentOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [statsRes, orgsRes] = await Promise.all([
          superadminService.getStats(),
          superadminService.getOrganizations({ page: 1, limit: 5 }),
        ]);
        setStats(statsRes.data.stats || statsRes.data);
        setRecentOrgs(orgsRes.data || []);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load platform data');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <LoadingSpinner className="py-20" text="Loading platform overview..." />;

  return (
    <>
      {/* Hero / Platform Overview */}
      <div className="w-full">
        <div className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-xl border border-border bg-card bg-cover bg-center shadow-sm">
          <div
            className="absolute inset-0 opacity-20 dark:opacity-40"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent" />
          <div className="z-10 flex flex-col p-6">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              System Status: <span className="text-green-500">Operational</span>
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground">Platform Overview</h2>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-blue-50 p-2 text-primary dark:bg-blue-900/20"><Users size={24} /></div>
            <span className="inline-flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <TrendingUp size={12} />
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{stats?.totalOrganizations?.toLocaleString() || 0}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"><DollarSign size={24} /></div>
            <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <TrendingUp size={12} />
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{stats?.totalUsers?.toLocaleString() || 0}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-orange-50 p-2 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"><FileText size={24} /></div>
            <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <TrendingUp size={12} />
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Forms</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{stats?.totalForms?.toLocaleString() || 0}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-900/20 dark:text-green-400"><Server size={24} /></div>
            <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">Stable</span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{stats?.totalSubmissions?.toLocaleString() || 0}</p>
        </div>
      </div>

      {/* Recent Organizations Table */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 px-1 sm:flex-row sm:items-center">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Organizations</h2>
          <a href="/superadmin/organizations" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90">
            View All
          </a>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</th>
                  <th className="hidden px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Slug</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrgs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">No organizations yet.</td>
                  </tr>
                ) : (
                  recentOrgs.map((org) => (
                    <tr key={org.id || org._id} className="transition-colors hover:bg-muted/30">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {org.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-foreground">{org.name}</span>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap px-6 py-4 font-mono text-sm text-muted-foreground md:table-cell">{org.slug}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status={org.isActive ? 'active' : 'inactive'} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                        {org.createdAt ? new Date(org.createdAt).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminOverview;
