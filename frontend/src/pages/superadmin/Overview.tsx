import { Users, DollarSign, FileText, Server, Filter, Plus, MoreVertical } from 'lucide-react';

const mockOrganizations = [
  {
    id: 1,
    initials: 'RW',
    color: 'bg-blue-100 text-primary dark:bg-blue-900/30',
    name: 'Real Worship Ministry',
    email: 'rev.john@example.com',
    plan: 'Enterprise',
    planColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    status: 'Active',
    dot: 'bg-green-500',
  },
  {
    id: 2,
    initials: 'SP',
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    name: "St. Peter's School",
    email: 'admin@stpeters.edu',
    plan: 'Standard',
    planColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    status: 'Active',
    dot: 'bg-green-500',
  },
  {
    id: 3,
    initials: 'TF',
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    name: 'TechFlow Solutions',
    email: 'cto@techflow.io',
    plan: 'Pro',
    planColor: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    status: 'Trial',
    dot: 'bg-yellow-500',
  },
  {
    id: 4,
    initials: 'CB',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
    name: 'City Bakery LLC',
    email: 'finance@citybakery.com',
    plan: 'Basic',
    planColor: 'bg-muted text-foreground',
    status: 'Expired',
    dot: 'bg-red-500',
  },
  {
    id: 5,
    initials: 'GE',
    color: 'bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400',
    name: 'Green Earth NGO',
    email: 'contact@greenearth.org',
    plan: 'Non-Profit',
    planColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    status: 'Active',
    dot: 'bg-green-500',
  },
];

export const SuperAdminOverview = () => {
  return (
    <>
      {/* Hero / Platform Overview */}
      <div className="w-full">
        <div className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-xl border border-border bg-card bg-cover bg-center shadow-sm">
          <div 
            className="absolute inset-0 opacity-20 dark:opacity-40"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')" }}
          ></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent"></div>
          <div className="z-10 flex flex-col p-6">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              System Status: <span className="text-green-500">Operational</span>
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
              Platform Overview
            </h2>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-blue-50 p-2 text-primary dark:bg-blue-900/20">
              <Users size={24} />
            </div>
            <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              +12.5%
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
          <p className="mt-1 text-2xl font-bold text-foreground">1,245</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              <DollarSign size={24} />
            </div>
            <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              +8.2%
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
          <p className="mt-1 text-2xl font-bold text-foreground">$4.2M</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-orange-50 p-2 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
              <FileText size={24} />
            </div>
            <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              +5.0%
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Active Forms</p>
          <p className="mt-1 text-2xl font-bold text-foreground">8,902</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <Server size={24} />
            </div>
            <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              Stable
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Server Uptime</p>
          <p className="mt-1 text-2xl font-bold text-foreground">99.99%</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 px-1 sm:flex-row sm:items-center">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Organizations</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted">
              <Filter size={18} />
              Filter
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-700">
              <Plus size={18} />
              Add Tenant
            </button>
          </div>
        </div>
        
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="w-[25%] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</th>
                  <th className="hidden w-[25%] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Admin Contact</th>
                  <th className="w-[15%] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plan</th>
                  <th className="w-[15%] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="w-[10%] px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockOrganizations.map((org) => (
                  <tr key={org.id} className="group transition-colors hover:bg-muted/30">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${org.color}`}>
                          {org.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">{org.name}</span>
                          <span className="text-xs text-muted-foreground md:hidden">{org.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-muted-foreground md:table-cell">
                      {org.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${org.planColor}`}>
                        {org.plan}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`size-2 rounded-full ${org.dot}`}></div>
                        <span className="text-sm text-foreground">{org.status}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            <span className="text-sm text-muted-foreground">Showing 1 to 5 of 124 results</span>
            <div className="flex gap-2">
              <button disabled className="rounded p-1 text-muted-foreground hover:bg-muted opacity-50 cursor-not-allowed">
                Previous
              </button>
              <button className="rounded p-1 text-muted-foreground hover:bg-muted">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminOverview;
