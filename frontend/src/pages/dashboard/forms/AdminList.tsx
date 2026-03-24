import { useState } from 'react';
import { Search, Filter, Download, QrCode, MoreVertical } from 'lucide-react';

const mockRegistrations = [
  {
    id: 1,
    initials: 'ES',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    name: 'Eleanor Shellstrop',
    email: 'eleanor@example.com',
    type: 'General Admission',
    typeColor: 'bg-muted text-muted-foreground',
    date: 'Oct 24, 2023',
    time: '10:42 AM',
    status: 'Verified',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    dotColor: 'bg-emerald-500',
  },
  {
    id: 2,
    initials: 'CA',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    name: 'Chidi Anagonye',
    email: 'chidi@example.com',
    type: 'VIP Pass',
    typeColor: 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800 border',
    date: 'Oct 23, 2023',
    time: '04:15 PM',
    status: 'Pending',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    dotColor: 'bg-amber-500',
  },
  {
    id: 3,
    initials: 'TA',
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    name: 'Tahani Al-Jamil',
    email: 'tahani@example.com',
    type: 'VIP Pass',
    typeColor: 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800 border',
    date: 'Oct 22, 2023',
    time: '09:30 AM',
    status: 'Verified',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    dotColor: 'bg-emerald-500',
  },
  {
    id: 4,
    initials: 'JM',
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    name: 'Jason Mendoza',
    email: 'jason@example.com',
    type: 'General Admission',
    typeColor: 'bg-muted text-muted-foreground',
    date: 'Oct 20, 2023',
    time: '02:00 PM',
    status: 'Rejected',
    statusColor: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    dotColor: 'bg-red-500',
  },
];

export const FormAdminList = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 text-sm font-medium">
        <a className="text-muted-foreground hover:underline" href="/dashboard">Dashboard</a>
        <span className="text-muted-foreground">/</span>
        <a className="text-muted-foreground hover:underline" href="/dashboard/forms">Forms</a>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground">Worship Night 2024</span>
      </div>

      {/* Header & Actions */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            Registrations
          </h1>
          <p className="max-w-xl text-base font-normal leading-normal text-muted-foreground">
            Manage attendee list, verify tickets, and track status for <span className="font-semibold text-primary">Worship Night 2024</span>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Export Button (Pro) */}
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
            <div className="invisible absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground/90 px-2 py-1 text-xs text-background opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              Upgrade to Pro to export data
            </div>
          </div>
          {/* Scan QR Button */}
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
              className="ml-2 w-full border-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:ring-0"
              placeholder="Search by name, email, or ticket ID"
            />
          </label>
        </div>
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilter('All')}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'All' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            All Statuses
          </button>
          {Object.entries({ Verified: 'bg-emerald-500', Pending: 'bg-amber-500', Rejected: 'bg-red-500' }).map(
            ([status, colorClass]) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === status ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <span className={`size-2 rounded-full ${colorClass}`}></span> {status}
              </button>
            )
          )}
        </div>
        <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-foreground hover:bg-muted dark:border-border md:rounded-l-none md:border-l md:pl-2">
          <Filter size={20} />
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-muted">
              <tr>
                <th className="w-12 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <input type="checkbox" className="rounded border-border bg-background text-primary focus:ring-primary/20" />
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Attendee</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ticket Type</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date Registered</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockRegistrations
                .filter((r) => filter === 'All' || r.status === filter)
                .map((row) => (
                  <tr key={row.id} className="group transition-colors hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded border-border bg-background text-primary focus:ring-primary/20" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex size-9 items-center justify-center rounded-full text-sm font-bold ${row.color}`}>
                          {row.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{row.name}</p>
                          <p className="text-xs text-muted-foreground">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${row.typeColor}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-foreground">{row.date}</p>
                      <p className="text-xs text-muted-foreground">{row.time}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${row.statusColor}`}>
                        <span className={`size-1.5 rounded-full ${row.dotColor}`}></span> {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border p-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1</span> to{' '}
            <span className="font-medium text-foreground">{mockRegistrations.length}</span> of{' '}
            <span className="font-medium text-foreground">128</span> results
          </p>
          <div className="flex gap-2">
            <button disabled className="h-9 rounded border border-border bg-card px-3 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed">
              Previous
            </button>
            <button className="h-9 rounded border border-border bg-card px-3 text-sm font-medium text-foreground hover:bg-muted">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAdminList;
