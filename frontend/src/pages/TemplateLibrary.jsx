import { useState } from "react";
import { motion } from "framer-motion";
import { createForm } from "../services/formService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const TemplateLibrary = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateForm = async () => {
    setIsCreating(true);
    setErrorMessage("");
    try {
      await createForm({
        title: "Custom Form",
        description: "Template: Custom Form",
        settings: { public: true, requireQrVerification: true, watermarkEnabled: true }
      });
    } catch (error) {
      setErrorMessage("Unable to create form.");
    } finally {
      setIsCreating(false);
    }
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
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white transition-colors" href="#">
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
                  <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Template Library</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Start with a professionally designed template or create your own.</p>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-medium text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isCreating}
                  onClick={handleCreateForm}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  {isCreating ? "Creating..." : "Create from Scratch"}
                </button>
              </div>
            </div>
            <motion.div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between" variants={fadeUp}>
              <div className="relative w-full lg:max-w-md">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
                <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm" placeholder="Search templates (e.g., Volunteer, Donation)" type="text" />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                <button className="px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium whitespace-nowrap transition-colors">All Templates</button>
                <button className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium whitespace-nowrap transition-colors">Churches</button>
                <button className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium whitespace-nowrap transition-colors">Events</button>
                <button className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium whitespace-nowrap transition-colors">Education</button>
                <button className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium whitespace-nowrap transition-colors">NGOs</button>
              </div>
            </motion.div>
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" variants={fadeUp}>
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="h-48 bg-slate-100 dark:bg-slate-900/50 relative overflow-hidden p-6 flex items-end justify-center">
                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
                    <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-medium shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform">
                      Preview Template
                    </button>
                  </div>
                  <div className="w-full max-w-[240px] bg-white dark:bg-slate-800 rounded-t-lg shadow-md border-t border-x border-slate-200 dark:border-slate-700 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="size-6 rounded bg-indigo-600 flex items-center justify-center text-[10px] text-white">
                          <span className="material-symbols-outlined text-[14px]">church</span>
                        </div>
                        <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded"></div>
                      <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-700 rounded"></div>
                      <div className="h-8 w-full bg-primary/10 rounded border border-primary/20 mt-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide mb-2">CHURCHES</span>
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg">Volunteer Sign-up</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">Recruit volunteers for ministry teams efficiently. Includes skill selection and schedule preferences.</p>
                  <div className="mt-auto pt-2 flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm">Use Template</button>
                    <button className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="h-48 bg-slate-100 dark:bg-slate-900/50 relative overflow-hidden p-6 flex items-end justify-center">
                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
                    <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-medium shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform">
                      Preview Template
                    </button>
                  </div>
                  <div className="w-full max-w-[240px] bg-white dark:bg-slate-800 rounded-t-lg shadow-md border-t border-x border-slate-200 dark:border-slate-700 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-col gap-3">
                      <div className="h-16 w-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-md mb-2"></div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-1/2 bg-slate-100 dark:bg-slate-700 rounded"></div>
                        <div className="h-8 w-1/2 bg-slate-100 dark:bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 rounded bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs font-semibold tracking-wide mb-2">EVENTS</span>
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg">Event Registration</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">Complete registration flow with ticket tiers, dietary requirements, and payment integration.</p>
                  <div className="mt-auto pt-2 flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm">Use Template</button>
                    <button className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="h-48 bg-slate-100 dark:bg-slate-900/50 relative overflow-hidden p-6 flex items-end justify-center">
                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
                    <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-medium shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform">
                      Preview Template
                    </button>
                  </div>
                  <div className="w-full max-w-[240px] bg-white dark:bg-slate-800 rounded-t-lg shadow-md border-t border-x border-slate-200 dark:border-slate-700 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-center mb-2">
                        <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded border border-emerald-500"></div>
                        <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded"></div>
                        <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded"></div>
                      </div>
                      <div className="h-8 w-full bg-emerald-600 rounded mt-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide mb-2">NGOs</span>
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg">Donation Form</h3>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                      <span className="material-symbols-outlined text-[12px]">star</span> Popular
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">Optimized for conversion with preset amounts, recurring options, and dedicated fund selection.</p>
                  <div className="mt-auto pt-2 flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm">Use Template</button>
                    <button className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="h-48 bg-slate-100 dark:bg-slate-900/50 relative overflow-hidden p-6 flex items-end justify-center">
                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
                    <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-medium shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform">
                      Preview Template
                    </button>
                  </div>
                  <div className="w-full max-w-[240px] bg-white dark:bg-slate-800 rounded-t-lg shadow-md border-t border-x border-slate-200 dark:border-slate-700 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-1/3 bg-slate-200 dark:bg-slate-600 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded"></div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded"></div>
                        <div className="h-2 w-3/4 bg-slate-100 dark:bg-slate-700 rounded"></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <div className="h-6 w-16 bg-blue-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide mb-2">EDUCATION</span>
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg">Scholarship App</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">Detailed application form for educational grants, including file uploads for transcripts.</p>
                  <div className="mt-auto pt-2 flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm">Use Template</button>
                    <button className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="h-48 bg-slate-100 dark:bg-slate-900/50 relative overflow-hidden p-6 flex items-end justify-center">
                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
                    <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-medium shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform">
                      Preview Template
                    </button>
                  </div>
                  <div className="w-full max-w-[240px] bg-white dark:bg-slate-800 rounded-t-lg shadow-md border-t border-x border-slate-200 dark:border-slate-700 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-col gap-3 items-center text-center">
                      <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-1"></div>
                      <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-600 rounded"></div>
                      <div className="h-8 w-full bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600"></div>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-wide mb-2">MARKETING</span>
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg">Newsletter Sign-up</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">Simple, high-conversion form to grow your audience. Perfect for embedding in footers.</p>
                  <div className="mt-auto pt-2 flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm">Use Template</button>
                    <button className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="h-48 bg-slate-100 dark:bg-slate-900/50 relative overflow-hidden p-6 flex items-end justify-center">
                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
                    <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-medium shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform">
                      Preview Template
                    </button>
                  </div>
                  <div className="w-full max-w-[240px] bg-white dark:bg-slate-800 rounded-t-lg shadow-md border-t border-x border-slate-200 dark:border-slate-700 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-col gap-3">
                      <div className="h-2 w-1/3 bg-slate-200 dark:bg-slate-600 rounded mb-1"></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded"></div>
                        <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded"></div>
                      </div>
                      <div className="h-12 bg-slate-100 dark:bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold tracking-wide mb-2">GENERAL</span>
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg">Contact Us</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">Standard contact form with validation for email and required message fields.</p>
                  <div className="mt-auto pt-2 flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm">Use Template</button>
                    <button className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex justify-center pt-8">
              <nav className="flex items-center gap-1">
                <button className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-50">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="h-9 w-9 rounded-lg bg-primary text-white text-sm font-medium">1</button>
                <button className="h-9 w-9 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium">2</button>
                <button className="h-9 w-9 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium">3</button>
                <span className="px-2 text-slate-400">...</span>
                <button className="h-9 w-9 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium">8</button>
                <button className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </nav>
            </div>
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
};

export default TemplateLibrary;
