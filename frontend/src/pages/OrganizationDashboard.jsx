import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { listForms } from "../services/formService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const OrganizationDashboard = () => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const data = await listForms();
        setForms(data.forms || []);
      } catch (error) {
        setErrorMessage("Unable to load forms.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);

  const activeFormsCount = forms.length;

  return (
    <motion.div className="bg-background-light dark:bg-background-dark min-h-screen text-[#111318] dark:text-white font-display" {...pageFade}>
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-[#1A202C] border-r border-[#e5e7eb] dark:border-[#2D3748] flex flex-col h-full transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 flex-shrink-0"
                data-alt="Organization Logo Avatar"
                style={{
                  backgroundImage:
                    "url(https://lh3.googleusercontent.com/aida-public/AB6AXuAfqZd0Fwpqi3dRDw3XkKrVsRZAypBvVJ7ermCNItBrIuWkn4s2KDKgBg7J79Vwf4Y_repdsbpaXcjzttf_3SGdLFK3eUSwNI_6GR84gepH-U0c4lM2xszfLiVVmSxRXnlxr29daJrD045V52rn76RLyvp58ShzdfmJuonndyM-ymawQKGiuY77VwJLrDcnPJn-3tsVxPEYXu-IiYioAu9mETXgu37CWpIcE7jQ3x3jZqLwOqG8PkN7Xlsk59-ZZieiMKTSTEVjlSs)"
                }}
              ></div>
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-[#111318] dark:text-white text-base font-bold leading-normal truncate">Real Worship Ministry</h1>
                <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal truncate">Basic Plan</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary group" to="/org/dashboard">
                <span className="material-symbols-outlined fill">dashboard</span>
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </Link>
              <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#616f89] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group" to="/org/forms">
                <span className="material-symbols-outlined">description</span>
                <p className="text-[#111318] dark:text-white text-sm font-medium leading-normal group-hover:text-primary dark:group-hover:text-primary transition-colors">My Forms</p>
              </Link>
              <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#616f89] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group" to="/builder/step-1">
                <span className="material-symbols-outlined">add_box</span>
                <p className="text-[#111318] dark:text-white text-sm font-medium leading-normal group-hover:text-primary dark:group-hover:text-primary transition-colors">Create Form</p>
              </Link>
              <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#616f89] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group" to="/org/billing">
                <span className="material-symbols-outlined">credit_card</span>
                <p className="text-[#111318] dark:text-white text-sm font-medium leading-normal group-hover:text-primary dark:group-hover:text-primary transition-colors">Billing</p>
              </Link>
              <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#616f89] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group" to="/org/settings">
                <span className="material-symbols-outlined">settings</span>
                <p className="text-[#111318] dark:text-white text-sm font-medium leading-normal group-hover:text-primary dark:group-hover:text-primary transition-colors">Settings</p>
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/10">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <span className="material-symbols-outlined text-xl">diamond</span>
                <span className="text-xs font-bold uppercase tracking-wider">Pro Features</span>
              </div>
              <p className="text-xs text-[#616f89] dark:text-gray-400 mb-3">Unlock unlimited forms and advanced analytics.</p>
              <button className="w-full flex items-center justify-center rounded-lg h-9 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </aside>
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#1A202C] border-b border-[#e5e7eb] dark:border-[#2D3748] flex-shrink-0 z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-[#111318] dark:text-white">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:flex items-center w-64 h-10 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                <div className="flex items-center justify-center pl-3 text-[#616f89] dark:text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input className="w-full h-full bg-transparent border-none focus:ring-0 text-sm px-2 text-[#111318] dark:text-white placeholder:text-[#616f89]" placeholder="Search forms, data..." type="text" />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[#616f89] dark:text-gray-400 transition-colors relative">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1A202C]"></span>
                </button>
                <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[#616f89] dark:text-gray-400 transition-colors">
                  <span className="material-symbols-outlined">help</span>
                </button>
                <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>
                <button className="flex items-center gap-2 ml-1 hover:bg-gray-50 dark:hover:bg-gray-800 pr-3 pl-1 py-1 rounded-full transition-colors">
                  <div
                    className="bg-center bg-no-repeat bg-cover rounded-full size-8 border border-gray-200 dark:border-gray-700"
                    data-alt="User Avatar"
                    style={{
                      backgroundImage:
                        "url(https://lh3.googleusercontent.com/aida-public/AB6AXuDNX8jWvoi9X8v892WEnzWPfwNDUFbrbjgqmNUuXUy9EGJp0pKd7CKo8-qp4-Xn5Fv26sv0Esu5t-E3_RIwR6yO4v1_mrQSX1-w8JYoMXGVGmy7UGM4c0X0Uxc65bnSvkGg_aFcUmvO1h1Uv7CInP05zXPKjnAk6Dcq6zu2oWRq4V0AFArRKbDFZRH2Sp7mQg8YVLGC0ByfZsT1JMw20jlhTBrFW0lKrlAIkr-YFTqkdlGJUsuYFVmzAZISvrOjBF86DgS6GtN-Zfw)"
                    }}
                  ></div>
                  <span className="text-sm font-medium text-[#111318] dark:text-white hidden sm:block">Admin User</span>
                </button>
              </div>
            </div>
          </header>
          <motion.div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth" variants={staggerContainer} initial="initial" animate="animate">
            {errorMessage && <p className="mb-4 text-sm text-red-500">{errorMessage}</p>}
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={fadeUp}>
              <div className="bg-white dark:bg-[#1A202C] rounded-xl p-6 border border-[#e5e7eb] dark:border-[#2D3748] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                    <span className="material-symbols-outlined">group</span>
                  </div>
                  <span className="flex items-center text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs font-bold">
                    <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                    +12%
                  </span>
                </div>
                <h3 className="text-[#616f89] dark:text-gray-400 text-sm font-medium mb-1">Total Registrations</h3>
                <p className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight">1,245</p>
              </div>
              <div className="bg-white dark:bg-[#1A202C] rounded-xl p-6 border border-[#e5e7eb] dark:border-[#2D3748] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
                    <span className="material-symbols-outlined">assignment</span>
                  </div>
                  <span className="flex items-center text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs font-bold">
                    <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                    +1
                  </span>
                </div>
                <h3 className="text-[#616f89] dark:text-gray-400 text-sm font-medium mb-1">Active Forms</h3>
                <p className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight">
                  {isLoading ? "--" : activeFormsCount}
                </p>
              </div>
              <div className="bg-white dark:bg-[#1A202C] rounded-xl p-6 border border-[#e5e7eb] dark:border-[#2D3748] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600">
                    <span className="material-symbols-outlined">qr_code_scanner</span>
                  </div>
                  <span className="flex items-center text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs font-bold">
                    <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                    +28%
                  </span>
                </div>
                <h3 className="text-[#616f89] dark:text-gray-400 text-sm font-medium mb-1">QR Scans</h3>
                <p className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight">4,521</p>
              </div>
            </motion.div>
            <motion.div className="mb-8 rounded-xl overflow-hidden relative bg-gradient-to-r from-primary to-[#2563EB] shadow-lg" variants={fadeUp}>
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              <div className="absolute right-0 bottom-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent"></div>
              <div className="flex flex-col md:flex-row items-center justify-between p-8 relative z-10">
                <div className="mb-6 md:mb-0 max-w-lg">
                  <h2 className="text-white text-2xl font-bold mb-2">Upgrade to Pro Plan</h2>
                  <p className="text-white/80 text-base">Get access to unlimited forms, advanced analytics, custom branding, and priority support. Take your ministry to the next level.</p>
                </div>
                <button className="whitespace-nowrap bg-white text-primary hover:bg-gray-50 px-6 py-3 rounded-lg font-bold shadow-md transition-colors flex items-center gap-2">
                  <span>Upgrade Now</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </motion.div>
            <motion.div className="bg-white dark:bg-[#1A202C] rounded-xl border border-[#e5e7eb] dark:border-[#2D3748] shadow-sm overflow-hidden" variants={fadeUp}>
              <div className="px-6 py-5 border-b border-[#e5e7eb] dark:border-[#2D3748] flex items-center justify-between">
                <h3 className="text-[#111318] dark:text-white text-lg font-bold">Recent Registrations</h3>
                <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                  View All
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f9fafb] dark:bg-gray-800/50 text-[#616f89] dark:text-gray-400 text-xs uppercase tracking-wider font-semibold border-b border-[#e5e7eb] dark:border-[#2D3748]">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Event / Form</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2D3748]">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold">JD</div>
                          <div className="text-sm font-medium text-[#111318] dark:text-white">John Doe</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Youth Summer Camp 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Oct 24, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111318] dark:text-white">$150.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Completed</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-xs font-bold">AS</div>
                          <div className="text-sm font-medium text-[#111318] dark:text-white">Alice Smith</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Worship Night Signup</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Oct 23, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111318] dark:text-white">Free</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Confirmed</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 flex items-center justify-center text-xs font-bold">MJ</div>
                          <div className="text-sm font-medium text-[#111318] dark:text-white">Michael Johnson</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Donation Form</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Oct 22, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111318] dark:text-white">$50.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pending</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 flex items-center justify-center text-xs font-bold">EW</div>
                          <div className="text-sm font-medium text-[#111318] dark:text-white">Emma Williams</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Volunteer Application</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Oct 21, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111318] dark:text-white">-</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Reviewing</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 flex items-center justify-center text-xs font-bold">DB</div>
                          <div className="text-sm font-medium text-[#111318] dark:text-white">David Brown</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Men's Breakfast</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#616f89] dark:text-gray-300">Oct 20, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111318] dark:text-white">$15.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Paid</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-[#e5e7eb] dark:border-[#2D3748] flex items-center justify-between">
                <p className="text-sm text-[#616f89] dark:text-gray-400">Showing <span className="font-medium text-[#111318] dark:text-white">1</span> to <span className="font-medium text-[#111318] dark:text-white">5</span> of <span className="font-medium text-[#111318] dark:text-white">1,245</span> results</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-[#e5e7eb] dark:border-[#2D3748] rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-[#616f89] dark:text-gray-400 disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="px-3 py-1 text-sm border border-[#e5e7eb] dark:border-[#2D3748] rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-[#616f89] dark:text-gray-400">
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
            <footer className="mt-8 text-center text-sm text-[#616f89] dark:text-gray-500 pb-4">
              <p>&copy; 2023 NYDev Form Generator. All rights reserved.</p>
            </footer>
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
};

export default OrganizationDashboard;
