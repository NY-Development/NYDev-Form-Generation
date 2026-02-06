import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const FormBuilderStep3 = () => {
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = () => {
    setIsUpgrading(true);
    setTimeout(() => setIsUpgrading(false), 800);
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
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white transition-colors" href="#">
                <span className="material-symbols-outlined text-[24px]">description</span>
                <p className="text-sm font-medium leading-normal">Forms</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" href="#">
                <span className="material-symbols-outlined text-[24px]">palette</span>
                <p className="text-sm font-medium leading-normal">Templates</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" href="#">
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
                  <p className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Form Branding</p>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Step 3: Customize the look and feel of your form.</p>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <div className="flex gap-6 justify-between items-center">
                    <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Wizard Progress</p>
                    <p className="text-slate-900 dark:text-white text-xs font-bold leading-normal bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Step 3/5</p>
                  </div>
                  <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
              <motion.div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm" variants={fadeUp}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex gap-4 items-center">
                    <div className="hidden sm:flex items-center justify-center size-10 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex-shrink-0">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">Free Plan Limitation</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Your form will include NYDev branding until you upgrade your subscription.</p>
                    </div>
                  </div>
                  <button
                    className="flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-5 bg-primary hover:bg-blue-700 text-white text-sm font-medium leading-normal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isUpgrading}
                    onClick={handleUpgrade}
                    type="button"
                  >
                    <span className="truncate">{isUpgrading ? "Upgrading..." : "Upgrade to Pro"}</span>
                  </button>
                </div>
              </motion.div>
            </div>
            <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full" variants={fadeUp}>
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight border-b border-slate-200 dark:border-slate-700 pb-2">Logo Upload</h2>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-8 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                    <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">cloud_upload</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-slate-900 dark:text-white font-medium text-sm">Click to upload or drag and drop</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">SVG, PNG, JPG (max. 800x400px)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded border border-slate-100 dark:border-slate-700 bg-white p-1 flex items-center justify-center">
                        <div className="w-full h-full bg-indigo-600 rounded-sm"></div>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">logo-worship-ministry.png</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">240 KB • Complete</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight border-b border-slate-200 dark:border-slate-700 pb-2">Theme Colors</h2>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Primary Color</label>
                    <div className="flex flex-wrap gap-3">
                      <button className="size-8 rounded-full bg-[#1152d4] ring-2 ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark ring-[#1152d4]"></button>
                      <button className="size-8 rounded-full bg-emerald-600 hover:scale-110 transition-transform"></button>
                      <button className="size-8 rounded-full bg-purple-600 hover:scale-110 transition-transform"></button>
                      <button className="size-8 rounded-full bg-rose-600 hover:scale-110 transition-transform"></button>
                      <button className="size-8 rounded-full bg-slate-900 dark:bg-white hover:scale-110 transition-transform"></button>
                      <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 pl-2 overflow-hidden h-8 ml-auto">
                        <span className="text-slate-400 text-xs select-none">#</span>
                        <input className="w-16 border-none bg-transparent text-xs font-mono focus:ring-0 p-1 text-slate-700 dark:text-slate-200 uppercase" type="text" defaultValue="1152D4" />
                        <input className="h-10 w-8 -my-1 cursor-pointer bg-transparent border-0 p-0" type="color" defaultValue="#1152d4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Page Background</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="group flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-slate-50 dark:bg-slate-800 py-2 px-3">
                        <div className="size-4 rounded-full border border-slate-200 bg-white"></div>
                        <span className="text-xs font-medium text-slate-900 dark:text-white">Light</span>
                      </button>
                      <button className="group flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 py-2 px-3 hover:border-slate-300">
                        <div className="size-4 rounded-full border border-slate-200 bg-slate-200"></div>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Gray</span>
                      </button>
                      <button className="group flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-900 py-2 px-3 hover:border-slate-300">
                        <div className="size-4 rounded-full border border-slate-700 bg-slate-800"></div>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Dark</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Live Preview</h2>
                  <div className="flex items-center gap-2">
                    <span className="flex size-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Updating in real-time</span>
                  </div>
                </div>
                <div className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 p-6 md:p-10 overflow-hidden relative shadow-inner">
                  <div className="w-full h-full bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col overflow-hidden max-w-lg mx-auto border border-slate-200 dark:border-slate-700">
                    <div className="h-8 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center px-3 gap-2">
                      <div className="flex gap-1.5">
                        <div className="size-2.5 rounded-full bg-red-400"></div>
                        <div className="size-2.5 rounded-full bg-amber-400"></div>
                        <div className="size-2.5 rounded-full bg-green-400"></div>
                      </div>
                      <div className="mx-auto w-1/2 h-4 bg-slate-200 dark:bg-slate-700 rounded text-[8px] flex items-center justify-center text-slate-400 dark:text-slate-500 font-mono">
                        forms.nydev.com/worship-ministry
                      </div>
                    </div>
                    <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                      <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                          <span className="material-symbols-outlined text-white text-3xl">church</span>
                        </div>
                      </div>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Volunteer Registration</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Join the Real Worship Ministry team and make a difference.</p>
                      </div>
                      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                        <div className="space-y-1">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Full Name</label>
                          <input className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3" placeholder="e.g. Jane Doe" type="text" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Email Address</label>
                          <input className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3" placeholder="jane@example.com" type="email" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Area of Interest</label>
                          <select className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3">
                            <option>Music &amp; Choir</option>
                            <option>Ushers &amp; Greeters</option>
                            <option>Technical Support</option>
                          </select>
                        </div>
                        <div className="pt-2">
                          <button className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors" type="button">
                            Submit Application
                          </button>
                        </div>
                      </form>
                      <div className="mt-8 border-t border-slate-100 dark:border-slate-700 pt-4 flex justify-center">
                        <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Powered by</span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">NYDev</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
};

export default FormBuilderStep3;
