import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const IntegrationsPage = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestIntegration = () => {
    setIsRequesting(true);
    setTimeout(() => setIsRequesting(false), 800);
  };

  return (
    <motion.div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased overflow-hidden" {...pageFade}>
      <div className="flex h-screen w-full">
        <aside className="flex w-72 flex-col justify-between border-r border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 flex-shrink-0 transition-colors duration-300">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex gap-3 items-center mb-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-1 ring-slate-200 dark:ring-slate-700"
                data-alt="User profile avatar gradient"
                style={{
                  backgroundImage:
                    "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBiLku3bnFygcLoLQ2X87GvZ0gFo_7q2sRn7kU5kmviecQJ4-QnNNN6YAtcYpgoagMcsxky0D42Rp1z5E2KhoJauGubuOxdTkJ5flGmW6mWbdWwObriJyiwu1Bn3NflaET7NPJJfb3muuHJHO2vzVzajdpLcYeO4b_Gyph16XTQCKl8Tcp6VwUMtccO5oiIqCbgLpx_iMcoRdNbBFGMqyP4Y6N_0BLXcljF5XZogDkZ2aN9zPi5MhsHgFk5xBnKAp5mID_f6wHfVEc)"
                }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-slate-900 dark:text-white text-base font-medium leading-normal">NYDev Platform</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Organization Workspace</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[24px]">dashboard</span>
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[24px]">description</span>
                <p className="text-sm font-medium leading-normal">Forms</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[24px]">palette</span>
                <p className="text-sm font-medium leading-normal">Templates</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white transition-colors" href="#">
                <span className="material-symbols-outlined text-[24px]">extension</span>
                <p className="text-sm font-medium leading-normal">Integrations</p>
              </a>
            </div>
          </div>
          <div className="p-4">
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" href="#">
              <span className="material-symbols-outlined text-[24px]">settings</span>
              <p className="text-sm font-medium leading-normal">Settings</p>
            </a>
          </div>
        </aside>
        <main className="flex-1 flex flex-col overflow-y-auto">
          <motion.div className="w-full max-w-[1400px] mx-auto p-6 md:p-10 flex flex-col gap-8" variants={staggerContainer} initial="initial" animate="animate">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap justify-between items-end gap-4">
                <div className="flex min-w-72 flex-col gap-2">
                  <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Integrations</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Connect your forms with the tools you use every day.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-transparent">
                    <span className="material-symbols-outlined text-[20px]">history</span>
                    <span className="text-sm font-medium">Activity Log</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-blue-700 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isRequesting}
                    onClick={handleRequestIntegration}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span className="text-sm font-medium">{isRequesting ? "Requesting..." : "Request Integration"}</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-6">
                <div className="relative w-full md:w-96">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary dark:text-white shadow-sm" placeholder="Search integrations..." type="text" />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button className="px-3 py-1.5 text-sm font-medium rounded-full bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white">All</button>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">CRM</button>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Marketing</button>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Payments</button>
                </div>
              </div>
            </div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6" variants={fadeUp}>
              <div className="flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-14 rounded-xl flex items-center justify-center bg-[#E8F5E9] border border-[#C8E6C9]">
                    <img alt="Google Sheets Logo" className="size-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuF6MLHqaYOipxgRJ-Qf6h4R5w6Xitn34XsOO2aBpGAYWt6achwqPul99vf-ULOBQn-siHNmjEoCZyUcQe2ipGHF5xuz8W_Lgcm0gbzLeTHIcEz_i9MHH1Q-d6BxUD6SETBktjYQ0-ZeIXDpxJsIW5PD-Iq_WChz_hsGNdOh3BCZK_o9Yd5NE8npOS4UqwyJaDFXjqq0RMcBHl1D2YgR6DLaNSU_kZTHuDA03zCnid10RFQVzVIZAEod-ki4MTuDrGOK78Y9uNoGg" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Google Sheets</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">Automatically send new form submissions to a Google Sheet spreadsheet in real-time.</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[16px]">sync</span>
                    Last sync: 2m ago
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              <div className="flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-14 rounded-xl flex items-center justify-center bg-[#FFE01B]/10 border border-[#FFE01B]/30">
                    <span className="material-symbols-outlined text-[#3C3C3C] text-[32px]">mail</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Mailchimp</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">Sync contacts and add new subscribers to your audience lists instantly.</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Connected as Admin
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              <div className="flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-14 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600">
                    <img alt="Slack Logo" className="size-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIGJ3egabc560A3BcMeQ0iDKb2dyVqKOYVEizXZ9o9R0jTGjvZme1BmUunpaUXiSAPoPOB_c2Zk33jQRjxaYL8vKNT1yCjpyfkJnXLvud12YyITrJW29V1t2meglVlo5dlvmkspssHrcmt7GayaAc6exHovbkDIazomSuDFxiooFisUdyW0asTkau3ak15HzNiWIliutMe5wn10VVXRSbr7qo-PQN4jdf1rijCWImX91FYc-59P-rJTBHytf8zYtc6SeIz3z-TiuU" />
                  </div>
                  <div className="flex items-center gap-2"></div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Slack</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">Receive instant notifications in your Slack channels whenever a form is submitted.</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xs text-slate-400">Not connected</span>
                  <button className="px-4 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors">Connect</button>
                </div>
              </div>
              <div className="flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 shadow-sm transition-shadow group relative opacity-90">
                <div className="absolute -top-3 -right-3">
                  <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">PRO</span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div className="size-14 rounded-xl flex items-center justify-center bg-[#635BFF] border border-[#635BFF]">
                    <span className="material-symbols-outlined text-white text-[32px]">payments</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Stripe</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">Accept payments, donations, and subscription orders directly through your forms.</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-medium">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    Upgrade required
                  </div>
                  <button className="px-4 py-1.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors shadow-sm">Upgrade</button>
                </div>
              </div>
              <div className="flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-14 rounded-xl flex items-center justify-center bg-[#FF7A59]/10 border border-[#FF7A59]/20">
                    <span className="material-symbols-outlined text-[#FF7A59] text-[32px]">hub</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">HubSpot</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">Create new deals, contacts, or tickets in your HubSpot CRM from form submissions.</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xs text-slate-400">Not connected</span>
                  <button className="px-4 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors">Connect</button>
                </div>
              </div>
              <div className="flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-14 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 text-[32px]">webhook</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Webhooks</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">Send data to any URL via POST request for custom integrations and workflows.</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xs text-slate-400">Not connected</span>
                  <button className="px-4 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors">Configure</button>
                </div>
              </div>
            </motion.div>
            <motion.div className="mt-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden" variants={fadeUp}>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-lg">
                  <h3 className="text-xl font-bold">Need a custom integration?</h3>
                  <p className="text-indigo-100">Our Enterprise plan offers custom API development and dedicated support to connect with your proprietary systems.</p>
                </div>
                <button className="whitespace-nowrap px-6 py-2.5 bg-white text-indigo-600 hover:bg-indigo-50 font-semibold rounded-lg transition-colors shadow-lg">Contact Sales</button>
              </div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
};

export default IntegrationsPage;
