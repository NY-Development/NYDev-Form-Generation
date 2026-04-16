import { useState, useEffect, useCallback } from 'react';
import { Search, Users as UsersIcon } from 'lucide-react';
import { superadminService } from '../../services/superadmin.service';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { toast } from 'sonner';
import type { User, Pagination } from '../../types';

export const SuperAdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await superadminService.getUsers({ page, limit: 15, search, role: roleFilter || undefined });
      setUsers(res.data || []);
      setPagination(res.pagination || null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [page, search, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const roleColors: Record<string, string> = {
    superadmin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    owner: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    admin: 'bg-muted text-muted-foreground',
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Users</h1>
        <p className="text-muted-foreground">View all users across the platform.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm placeholder-muted-foreground shadow-sm outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Search by name or email..."
          />
        </div>
        <div className="flex items-center gap-2">
          {['', 'superadmin', 'owner', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => { setRoleFilter(r); setPage(1); }}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                roleFilter === r ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {r ? r.charAt(0).toUpperCase() + r.slice(1) : 'All Roles'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner className="py-20" text="Loading users..." />
      ) : users.length === 0 ? (
        <EmptyState icon={<UsersIcon className="h-8 w-8" />} title="No users found" />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">User</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="hidden px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.id || u._id} className="transition-colors hover:bg-muted/30">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {u.firstName?.charAt(0)}{u.lastName?.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-foreground">{u.firstName} {u.lastName}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">{u.email}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleColors[u.role] || 'bg-muted text-muted-foreground'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={u.isActive ? 'active' : 'inactive'} />
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-muted-foreground md:table-cell">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
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

export default SuperAdminUsers;
