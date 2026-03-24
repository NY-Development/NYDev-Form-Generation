import { Users, FileText, QrCode, ArrowRight, MoreVertical } from 'lucide-react';

export const Overview = () => {
  return (
    <>
      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Stat Card 1 */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-blue-50 p-2 text-primary dark:bg-blue-900/20">
              <Users size={24} />
            </div>
            <span className="flex items-center rounded bg-green-50 px-2 py-1 text-xs font-bold text-green-600 dark:bg-green-900/20">
              +12%
            </span>
          </div>
          <h3 className="mb-1 text-sm font-medium text-muted-foreground">Total Registrations</h3>
          <p className="text-3xl font-bold tracking-tight text-foreground">1,245</p>
        </div>
        {/* Stat Card 2 */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/20">
              <FileText size={24} />
            </div>
            <span className="flex items-center rounded bg-green-50 px-2 py-1 text-xs font-bold text-green-600 dark:bg-green-900/20">
              +1
            </span>
          </div>
          <h3 className="mb-1 text-sm font-medium text-muted-foreground">Active Forms</h3>
          <p className="text-3xl font-bold tracking-tight text-foreground">8</p>
        </div>
        {/* Stat Card 3 */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-orange-50 p-2 text-orange-600 dark:bg-orange-900/20">
              <QrCode size={24} />
            </div>
            <span className="flex items-center rounded bg-green-50 px-2 py-1 text-xs font-bold text-green-600 dark:bg-green-900/20">
              +28%
            </span>
          </div>
          <h3 className="mb-1 text-sm font-medium text-muted-foreground">QR Scans</h3>
          <p className="text-3xl font-bold tracking-tight text-foreground">4,521</p>
        </div>
      </div>

      {/* Banner Section */}
      <div className="relative mb-8 overflow-hidden rounded-xl bg-linear-to-r from-primary to-[#2563EB] shadow-lg">
        <div className="absolute inset-0 bg-[#000000] opacity-10 mix-blend-overlay" />
        <div className="absolute bottom-0 right-0 h-full w-1/3 bg-linear-to-l from-white/10 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center justify-between p-8 md:flex-row">
          <div className="mb-6 max-w-lg md:mb-0">
            <h2 className="mb-2 text-2xl font-bold text-white">Upgrade to Pro Plan</h2>
            <p className="text-base text-white/80">
              Get access to unlimited forms, advanced analytics, custom branding, and priority support. Take your ministry
              to the next level.
            </p>
          </div>
          <button className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3 font-bold text-primary shadow-md transition-colors hover:bg-gray-50">
            <span>Upgrade Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h3 className="text-lg font-bold text-foreground">Recent Registrations</h3>
          <button className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
            View All
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Event / Form</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Dummy row 1 */}
              <tr className="transition-colors hover:bg-muted/50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      JD
                    </div>
                    <div className="text-sm font-medium text-foreground">John Doe</div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">Youth Summer Camp 2024</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">Oct 24, 2024</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">$150.00</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Completed
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <button className="text-muted-foreground transition-colors hover:text-primary">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
              {/* Dummy row 2 */}
              <tr className="transition-colors hover:bg-muted/50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                      AS
                    </div>
                    <div className="text-sm font-medium text-foreground">Alice Smith</div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">Worship Night Signup</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">Oct 23, 2024</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">Free</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Confirmed
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <button className="text-muted-foreground transition-colors hover:text-primary">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
              {/* Dummy row 3 */}
              <tr className="transition-colors hover:bg-muted/50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
                      MJ
                    </div>
                    <div className="text-sm font-medium text-foreground">Michael Johnson</div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">Donation Form</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">Oct 22, 2024</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">$50.00</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Pending
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <button className="text-muted-foreground transition-colors hover:text-primary">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1</span> to{' '}
            <span className="font-medium text-foreground">5</span> of{' '}
            <span className="font-medium text-foreground">1,245</span> results
          </p>
          <div className="flex gap-2">
            <button
              className="rounded border border-border px-3 py-1 text-sm text-muted-foreground disabled:opacity-50 hover:bg-muted"
              disabled
            >
              Previous
            </button>
            <button className="rounded border border-border px-3 py-1 text-sm text-muted-foreground hover:bg-muted">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
