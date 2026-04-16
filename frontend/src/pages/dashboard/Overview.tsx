import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, QrCode, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { analyticsService } from '../../services/analytics.service';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { toast } from 'sonner';
import type { OrgAnalytics } from '../../types';

export const Overview = () => {
  const navigate = useNavigate();
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';

  const [analytics, setAnalytics] = useState<OrgAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!orgId) { setLoading(false); return; }
      try {
        const res = await analyticsService.getOrgAnalytics(orgId);
        setAnalytics(res.data.analytics || res.data);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [orgId]);

  if (loading) return <LoadingSpinner className="py-20" text="Loading dashboard..." />;

  const overview = analytics?.overview || { totalForms: 0, publishedForms: 0, draftForms: 0, totalSubmissions: 0 };
  const statusBreakdown = analytics?.statusBreakdown || { pending: 0, approved: 0, rejected: 0, verified: 0 };
  const recentSubmissions = analytics?.recentSubmissions || [];

  return (
    <>
      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-blue-50 p-2 text-primary dark:bg-blue-900/20">
              <Users size={24} />
            </div>
            <span className="flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs font-bold text-green-600 dark:bg-green-900/20">
              <TrendingUp size={12} /> Total
            </span>
          </div>
          <h3 className="mb-1 text-sm font-medium text-muted-foreground">Total Submissions</h3>
          <p className="text-3xl font-bold tracking-tight text-foreground">{overview.totalSubmissions.toLocaleString()}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/20">
              <FileText size={24} />
            </div>
            <span className="flex items-center rounded bg-green-50 px-2 py-1 text-xs font-bold text-green-600 dark:bg-green-900/20">
              {overview.publishedForms} live
            </span>
          </div>
          <h3 className="mb-1 text-sm font-medium text-muted-foreground">Total Forms</h3>
          <p className="text-3xl font-bold tracking-tight text-foreground">{overview.totalForms}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-orange-50 p-2 text-orange-600 dark:bg-orange-900/20">
              <QrCode size={24} />
            </div>
            <span className="flex items-center rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-900/20">
              {statusBreakdown.verified} verified
            </span>
          </div>
          <h3 className="mb-1 text-sm font-medium text-muted-foreground">Verified Scans</h3>
          <p className="text-3xl font-bold tracking-tight text-foreground">{statusBreakdown.verified.toLocaleString()}</p>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(statusBreakdown).map(([key, val]) => (
          <div key={key} className="rounded-lg border border-border bg-card p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-foreground">{val}</p>
            <p className="text-xs font-medium capitalize text-muted-foreground">{key}</p>
          </div>
        ))}
      </div>

      {/* Upgrade Banner */}
      <div className="relative mb-8 overflow-hidden rounded-xl bg-linear-to-r from-primary to-[#2563EB] shadow-lg">
        <div className="absolute inset-0 bg-[#000000] opacity-10 mix-blend-overlay" />
        <div className="absolute bottom-0 right-0 h-full w-1/3 bg-linear-to-l from-white/10 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center justify-between p-8 md:flex-row">
          <div className="mb-6 max-w-lg md:mb-0">
            <h2 className="mb-2 text-2xl font-bold text-white">Upgrade to Pro Plan</h2>
            <p className="text-base text-white/80">
              Get access to unlimited forms, advanced analytics, custom branding, and priority support.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/billing')}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3 font-bold text-primary shadow-md transition-colors hover:bg-gray-50"
          >
            <span>Upgrade Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h3 className="text-lg font-bold text-foreground">Recent Submissions</h3>
          <button
            onClick={() => navigate('/dashboard/forms')}
            className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View All Forms
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No submissions yet. Create and publish a form to start collecting data.
                  </td>
                </tr>
              ) : (
                recentSubmissions.slice(0, 5).map((sub) => (
                  <tr key={sub.id || sub._id} className="transition-colors hover:bg-muted/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {sub.submitterName?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
                        </div>
                        <div className="text-sm font-medium text-foreground">{sub.submitterName || '—'}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">{sub.submitterEmail || '—'}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="font-mono text-sm font-medium text-foreground">{sub.uniqueId}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={sub.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Overview;
