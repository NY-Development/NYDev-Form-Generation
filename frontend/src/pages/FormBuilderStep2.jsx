import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { updateForm } from "../services/formService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const FormBuilderStep2 = () => {
  const [searchParams] = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formId = searchParams.get("formId") || localStorage.getItem("nydev_form_id");

  const handleSaveProgress = async () => {
    if (!formId) {
      setErrorMessage("Missing form identifier.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    try {
      await updateForm(formId, {
        fields: [
          { id: "q1", type: "long_text", label: "Why do you want to join?", required: true },
          { id: "q2", type: "multiple_choice", label: "Previous Experience", required: false, options: ["None", "1-2 Years", "3+ Years"] },
          { id: "q3", type: "checkbox", label: "Availability", required: true, options: ["Weekdays", "Weekends", "Evenings"] }
        ]
      });
    } catch (error) {
      setErrorMessage("Unable to save progress.");
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
                  <p className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-[-0.033em]">Add Questions</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Step 2: Build your form structure.</p>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <div className="flex gap-6 justify-between items-center">
                    <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Wizard Progress</p>
                    <p className="text-slate-900 dark:text-white text-xs font-bold leading-normal bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Step 2/5</p>
                  </div>
                  <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full" variants={fadeUp}>
              <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight">Field Types</h2>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Basic Fields</div>
                    <div className="group flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-grab hover:border-primary hover:shadow-md transition-all select-none">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">short_text</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Short Text</span>
                      <span className="ml-auto material-symbols-outlined text-slate-300 text-[18px]">drag_indicator</span>
                    </div>
                    <div className="group flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-grab hover:border-primary hover:shadow-md transition-all select-none">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">notes</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Long Text</span>
                      <span className="ml-auto material-symbols-outlined text-slate-300 text-[18px]">drag_indicator</span>
                    </div>
                    <div className="group flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-grab hover:border-primary hover:shadow-md transition-all select-none">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">radio_button_checked</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Multiple Choice</span>
                      <span className="ml-auto material-symbols-outlined text-slate-300 text-[18px]">drag_indicator</span>
                    </div>
                    <div className="group flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-grab hover:border-primary hover:shadow-md transition-all select-none">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">check_box</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Checkboxes</span>
                      <span className="ml-auto material-symbols-outlined text-slate-300 text-[18px]">drag_indicator</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-2 mb-1">Advanced Fields</div>
                    <div className="group flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-grab hover:border-primary hover:shadow-md transition-all select-none">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">calendar_today</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Date</span>
                      <span className="ml-auto material-symbols-outlined text-slate-300 text-[18px]">drag_indicator</span>
                    </div>
                    <div className="group flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-grab hover:border-primary hover:shadow-md transition-all select-none">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">cloud_upload</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">File Upload</span>
                      <span className="ml-auto material-symbols-outlined text-slate-300 text-[18px]">drag_indicator</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-9 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight">Form Canvas</h2>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">visibility</span> Preview
                    </button>
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-xs font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={isSaving}
                      onClick={handleSaveProgress}
                      type="button"
                    >
                      {isSaving ? "Saving..." : "Save Progress"}
                    </button>
                  </div>
                </div>
                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                <div className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 p-6 md:p-10 overflow-y-auto relative shadow-inner">
                  <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                  ></div>
                  <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col border border-slate-200 dark:border-slate-700 min-h-[600px]">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-700 text-center relative group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 rounded-l-lg"></div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-slate-400 hover:text-primary">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 cursor-text border border-transparent hover:border-slate-200 dark:hover:border-slate-600 rounded px-2 -mx-2">Volunteer Registration</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm cursor-text border border-transparent hover:border-slate-200 dark:hover:border-slate-600 rounded px-2 -mx-2 inline-block">Join the Real Worship Ministry team and make a difference.</p>
                    </div>
                    <div className="flex-1 p-8 flex flex-col gap-6">
                      <div className="group relative p-5 rounded-lg border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 focus-within:border-primary bg-white dark:bg-slate-800 transition-all hover:shadow-sm">
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-move p-2 text-slate-400 hover:text-slate-600">
                          <span className="material-symbols-outlined">drag_indicator</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Why do you want to join?</label>
                            <span className="text-xs text-red-500 font-medium">*</span>
                          </div>
                          <div className="w-full h-20 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30 p-2 cursor-not-allowed">
                            <span className="text-slate-400 text-sm italic">Long text answer...</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3 opacity-30 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400 font-medium select-none">
                              <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" /> Required
                            </label>
                            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[16px]">alt_route</span> Conditional Logic
                            </button>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Duplicate">
                              <span className="material-symbols-outlined text-[18px]">content_copy</span>
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete">
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="group relative p-5 rounded-lg border-2 border-primary shadow-sm bg-slate-50 dark:bg-slate-800/80 transition-all">
                        <div className="absolute -right-3 top-[-10px] bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">EDITING</div>
                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Previous Experience</label>
                          <div className="space-y-2 pl-1">
                            <div className="flex items-center gap-2">
                              <div className="size-4 rounded-full border border-slate-300 dark:border-slate-600"></div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">None</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-4 rounded-full border border-slate-300 dark:border-slate-600"></div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">1-2 Years</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-4 rounded-full border border-slate-300 dark:border-slate-600"></div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">3+ Years</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-600 pt-3">
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400 font-medium select-none">
                              <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" /> Required
                            </label>
                            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[16px]">alt_route</span> Conditional Logic
                            </button>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                              <span className="material-symbols-outlined text-[18px]">content_copy</span>
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="group relative p-5 rounded-lg border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 focus-within:border-primary bg-white dark:bg-slate-800 transition-all hover:shadow-sm">
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-move p-2 text-slate-400 hover:text-slate-600">
                          <span className="material-symbols-outlined">drag_indicator</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Availability</label>
                            <span className="text-xs text-red-500 font-medium">*</span>
                          </div>
                          <div className="flex flex-wrap gap-4 pl-1">
                            <div className="flex items-center gap-2">
                              <div className="size-4 rounded border border-slate-300 dark:border-slate-600"></div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">Weekdays</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-4 rounded border border-slate-300 dark:border-slate-600"></div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">Weekends</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-4 rounded border border-slate-300 dark:border-slate-600"></div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">Evenings</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3 opacity-30 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400 font-medium select-none">
                              <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" /> Required
                            </label>
                            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[16px]">alt_route</span> Conditional Logic
                            </button>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                              <span className="material-symbols-outlined text-[18px]">content_copy</span>
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all cursor-copy">
                        <span className="material-symbols-outlined mb-2 text-[28px]">add_circle</span>
                        <span className="text-sm font-medium">Drag and drop fields here</span>
                      </div>
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

export default FormBuilderStep2;
