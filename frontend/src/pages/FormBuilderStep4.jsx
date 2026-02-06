import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { updateForm } from "../services/formService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const FormBuilderStep4 = () => {
  const [searchParams] = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formId = searchParams.get("formId") || localStorage.getItem("nydev_form_id");

  const handleSaveContinue = async () => {
    if (!formId) {
      setErrorMessage("Missing form identifier.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    try {
      await updateForm(formId, {
        settings: {
          watermarkEnabled: true
        }
      });
    } catch (error) {
      setErrorMessage("Unable to save branding settings.");
    } finally {
      setIsSaving(false);
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
          <motion.div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 flex flex-col gap-6 h-full" variants={staggerContainer} initial="initial" animate="animate">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap justify-between items-end gap-4">
                <div className="flex min-w-72 flex-col gap-1">
                  <p className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-[-0.033em]">Branding &amp; Style</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Step 4: Customize your form's appearance.</p>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <div className="flex gap-6 justify-between items-center">
                    <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Wizard Progress</p>
                    <p className="text-slate-900 dark:text-white text-xs font-bold leading-normal bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Step 4/5</p>
                  </div>
                  <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full" variants={fadeUp}>
              <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight">Appearance Settings</h2>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Logo</label>
                    <div className="group border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer bg-white dark:bg-slate-800/50">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary mb-2 text-[32px]">cloud_upload</span>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:text-primary">Click to upload</span>
                      <span className="text-[10px] text-slate-400 mt-1">SVG, PNG, JPG (max 2MB)</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 shadow-sm">
                        <input className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer p-0 border-0" type="color" defaultValue="#1152d4" />
                      </div>
                      <div className="flex-1">
                        <input className="w-full rounded-md border-slate-200 dark:border-slate-700 text-sm py-2 px-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-mono shadow-sm focus:border-primary focus:ring-primary" type="text" defaultValue="#1152d4" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-1">
                      <button aria-label="Blue" className="size-6 rounded-full bg-[#1152d4] ring-2 ring-offset-2 ring-[#1152d4] ring-offset-white dark:ring-offset-slate-900"></button>
                      <button aria-label="Purple" className="size-6 rounded-full bg-purple-600 hover:scale-110 transition-transform focus:outline-none"></button>
                      <button aria-label="Emerald" className="size-6 rounded-full bg-emerald-600 hover:scale-110 transition-transform focus:outline-none"></button>
                      <button aria-label="Rose" className="size-6 rounded-full bg-rose-600 hover:scale-110 transition-transform focus:outline-none"></button>
                      <button aria-label="Black" className="size-6 rounded-full bg-slate-900 dark:bg-slate-100 hover:scale-110 transition-transform focus:outline-none"></button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Font Family</label>
                    <div className="relative">
                      <select className="appearance-none w-full rounded-md border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-3 pr-10 text-sm text-slate-700 dark:text-slate-200 shadow-sm focus:border-primary focus:ring-primary" defaultValue="Inter">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Open Sans</option>
                        <option>Lato</option>
                        <option>System Default</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Show Branding Watermark</span>
                    </label>
                    <p className="text-xs text-slate-400 pl-7">Free accounts cannot disable this.</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-9 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight">Live Preview</h2>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">refresh</span> Refresh
                    </button>
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-xs font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={isSaving}
                      onClick={handleSaveContinue}
                      type="button"
                    >
                      {isSaving ? "Saving..." : "Save & Continue"}
                    </button>
                  </div>
                </div>
                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                <div className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 p-6 md:p-10 overflow-y-auto relative shadow-inner">
                  <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                  ></div>
                  <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col border border-slate-200 dark:border-slate-700 min-h-[600px] overflow-hidden">
                    <div className="h-2 w-full bg-[#1152d4]"></div>
                    <div className="p-8 border-b border-slate-100 dark:border-slate-700 text-center">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Volunteer Registration</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Join the Real Worship Ministry team and make a difference.</p>
                    </div>
                    <div className="flex-1 p-8 flex flex-col gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Why do you want to join? <span className="text-red-500">*</span>
                        </label>
                        <textarea className="w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700/30 p-3 text-sm focus:border-primary focus:ring-primary shadow-sm" placeholder="Tell us about your motivation..." rows="3"></textarea>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Previous Experience</label>
                        <div className="space-y-2.5">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input className="text-primary focus:ring-primary border-slate-300" name="exp" type="radio" />
                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">None</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input className="text-primary focus:ring-primary border-slate-300" name="exp" type="radio" />
                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">1-2 Years</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input className="text-primary focus:ring-primary border-slate-300" name="exp" type="radio" />
                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">3+ Years</span>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Availability <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-6">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input className="rounded text-primary focus:ring-primary border-slate-300" type="checkbox" />
                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">Weekdays</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input className="rounded text-primary focus:ring-primary border-slate-300" type="checkbox" />
                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">Weekends</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input className="rounded text-primary focus:ring-primary border-slate-300" type="checkbox" />
                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">Evenings</span>
                          </label>
                        </div>
                      </div>
                      <div className="pt-6 mt-auto">
                        <button className="w-full py-3 bg-[#1152d4] text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all">Submit Application</button>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-t border-slate-100 dark:border-slate-700 flex justify-center items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">bolt</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          Powered by <span className="font-bold text-slate-600 dark:text-slate-300">NYDev Platform</span>
                        </span>
                      </div>
                      <div className="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>
                      <button className="text-[10px] bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded font-semibold transition-colors uppercase tracking-wide">Upgrade to Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
};

export default FormBuilderStep4;
