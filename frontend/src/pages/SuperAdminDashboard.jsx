import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listOrganizations } from "../services/superAdminService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";
import { useTheme } from "../store/themeStore";

const SuperAdminDashboard = () => {
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const data = await listOrganizations();
        setOrganizations(data.organizations || []);
      } catch (error) {
        setErrorMessage("Unable to load organizations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const orgCount = organizations.length;

  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark antialiased" {...pageFade}>
            <div className="relative flex min-h-screen w-full flex-row overflow-hidden">
              <div className="flex flex-col gap-1">
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">dashboard</span>
                  <p className="text-sm font-medium leading-normal">Dashboard</p>
                </a>
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark/50 hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">domain</span>
                  <p className="text-sm font-medium leading-normal">Organizations</p>
                </a>
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark/50 hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">description</span>
                  <p className="text-sm font-medium leading-normal">Audit Logs</p>
                </a>
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark/50 hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">group</span>
                  <p className="text-sm font-medium leading-normal">Users &amp; Roles</p>
                </a>
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark/50 hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                  <p className="text-sm font-medium leading-normal">Settings</p>
                </a>
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark/50 hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">help</span>
                  <p className="text-sm font-medium leading-normal">Support</p>
                </a>
              </div>
            </div>
            <div className="px-3 py-4 border-t border-border-light dark:border-border-dark">
              <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark">
                <span>v2.4.0</span>
                <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary">logout</span>
              </div>
            </div>
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-16 flex items-center justify-between px-6 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark flex-shrink-0 z-10">
            <div className="flex items-center gap-4">
              <button className="md:hidden p-1 text-text-secondary-light dark:text-text-secondary-dark">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark hidden sm:block">Overview</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-[20px]">search</span>
                <input className="h-10 pl-10 pr-4 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white w-64 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark" placeholder="Search tenants, users..." type="text" />
              </div>
              <button className="size-10 flex items-center justify-center rounded-full hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-surface-dark"></span>
              </button>
            </div>
          </header>
          <motion.div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark" variants={staggerContainer} initial="initial" animate="animate">
            <motion.div className="max-w-[1200px] mx-auto flex flex-col gap-6" variants={fadeUp}>
              {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
              <div className="@container w-full">
                <div
                  className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden bg-surface-light dark:bg-surface-dark rounded-xl min-h-[200px] shadow-sm border border-border-light dark:border-border-dark group"
                  data-alt="Abstract network visualization background"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(17, 82, 212, 0.1) 0%, rgba(16, 22, 34, 0.85) 100%), url(https://lh3.googleusercontent.com/aida-public/AB6AXuAGkfHZJDf6PPEJjOnlypi5I-iUaBaBKADDGKKbNl9NJlV8pg93Acdd2MCvV4SdRwhJniey3GKiccAW8tODiTiaJFrFNf0HSRtbPVoKyMb1I7k8-JXLTTrZ_4ajk6w1itlHLvgTWV0GLF261zyFK4DwBcA62QizSxGh1x09wpAkieW9yqcmUWg1U7DKImdTLrQM8mBb7B_l0GQYJv3ckav1_vy0guThvq92vVrIxQh-cfGCq9XWnZX1PX0qVp-iuWJdy8XIh7HmyNI)"
                  }}
                >
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                  <div className="flex flex-col p-6 z-10">
                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">System Status: Operational</p>
                    <h2 className="text-white tracking-tight text-3xl font-bold leading-tight">Platform Overview</h2>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">+12.5%</span>
                  </div>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Total Customers</p>
                  <p className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold mt-1">1,245</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">+8.2%</span>
                  </div>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Total Revenue</p>
                  <p className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold mt-1">$4.2M</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                      <span className="material-symbols-outlined">description</span>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">+5.0%</span>
                  </div>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Active Forms</p>
                  <p className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold mt-1">8,902</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                      <span className="material-symbols-outlined">dns</span>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Stable</span>
                  </div>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Server Uptime</p>
                  <p className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold mt-1">99.99%</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
                  <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold tracking-tight">Recent Organizations</h2>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-medium hover:bg-background-light dark:hover:bg-background-dark/50 transition-colors text-text-secondary-light dark:text-text-secondary-dark">
                      <span className="material-symbols-outlined text-[18px]">filter_list</span>
                      Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/30">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Add Tenant
                    </button>
                  </div>
                </div>
                <div className="w-full overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border-light dark:border-border-dark bg-background-light/50 dark:bg-surface-dark">
                          <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider w-[25%]">Organization</th>
                          <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider w-[25%] hidden md:table-cell">Admin Contact</th>
                          <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider w-[15%]">Plan</th>
                          <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider w-[15%]">Status</th>
                          <th className="px-6 py-4 text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider w-[10%] text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-light dark:divide-border-dark">
                        {isLoading && (
                          <tr>
                            <td className="px-6 py-6 text-sm text-text-secondary-light dark:text-text-secondary-dark" colSpan={5}>
                              Loading organizations...
                            </td>
                          </tr>
                        )}
                        {!isLoading && errorMessage && (
                          <tr>
                            <td className="px-6 py-6 text-sm text-red-500" colSpan={5}>
                              {errorMessage}
                            </td>
                          </tr>
                        )}
                        {!isLoading && !errorMessage && organizations.length === 0 && (
                          <tr>
                            <td className="px-6 py-6 text-sm text-text-secondary-light dark:text-text-secondary-dark" colSpan={5}>
                              No organizations found.
                            </td>
                          </tr>
                        )}
                        {!isLoading && !errorMessage && organizations.map((org) => {
                          const initials = org.name?.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase() || "NA";
                          const planLabel = org.plan ? org.plan.charAt(0).toUpperCase() + org.plan.slice(1) : "Basic";
                          const statusLabel = org.status || "Active";

                          return (
                            <tr key={org._id} className="hover:bg-background-light dark:hover:bg-background-dark/30 transition-colors group">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary font-bold text-xs">
                                    {initials}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{org.name || "Untitled"}</span>
                                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark md:hidden">{org.adminEmail || "-"}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark hidden md:table-cell">{org.adminEmail || "-"}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                  {planLabel}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <div className="size-2 rounded-full bg-green-500"></div>
                                  <span className="text-sm text-text-primary-light dark:text-text-primary-dark">{statusLabel}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors p-1 rounded hover:bg-background-light dark:hover:bg-background-dark" type="button">
                                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
                    <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Showing {orgCount} organizations</span>
                    <div className="flex gap-2">
                      <button className="p-1 rounded hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark disabled:opacity-50">
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                      </button>
                      <button className="p-1 rounded hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-12"></div>
            </motion.div>
          </motion.div>
        </main>
    </motion.div>
  );
};

export default SuperAdminDashboard;
