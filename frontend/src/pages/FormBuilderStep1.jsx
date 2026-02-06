import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { createForm, getForm, updateForm } from "../services/formService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const FormBuilderStep1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState(searchParams.get("formId") || localStorage.getItem("nydev_form_id"));
  const [title, setTitle] = useState("Volunteer Registration");
  const [description, setDescription] = useState("Join the Real Worship Ministry team and make a difference.");
  const [category, setCategory] = useState("ngo");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!formId) {
      return;
    }

    const loadForm = async () => {
      try {
        const data = await getForm(formId);
        if (data.form?.title) {
          setTitle(data.form.title);
        }
        if (data.form?.description) {
          setDescription(data.form.description);
        }
      } catch (error) {
        setErrorMessage("Unable to load form details.");
      }
    };

    loadForm();
  }, [formId]);

  const handleSaveNext = async () => {
    setIsSaving(true);
    setErrorMessage("");
    try {
      const payload = {
        title,
        description,
        settings: {
          public: true,
          requireQrVerification: true,
          watermarkEnabled: true
        }
      };

      if (formId) {
        await updateForm(formId, payload);
      } else {
        const data = await createForm(payload);
        const createdId = data.form?._id;
        if (createdId) {
          setFormId(createdId);
          localStorage.setItem("nydev_form_id", createdId);
        }
      }

      const nextId = formId || localStorage.getItem("nydev_form_id");
      navigate(`/builder/step-2?formId=${nextId || ""}`);
    } catch (error) {
      setErrorMessage("Unable to save form details.");
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
          <motion.div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 flex flex-col gap-8 h-full" variants={staggerContainer} initial="initial" animate="animate">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap justify-between items-end gap-4">
                <div className="flex min-w-72 flex-col gap-1">
                  <p className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-[-0.033em]">Form Details</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Step 1: Set up your form information.</p>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <div className="flex gap-6 justify-between items-center">
                    <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Wizard Progress</p>
                    <p className="text-slate-900 dark:text-white text-xs font-bold leading-normal bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Step 1/5</p>
                  </div>
                  <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "20%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div className="flex-1 flex justify-center items-start pt-6" variants={fadeUp}>
              <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-slate-700">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">General Information</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Define the core identity of your form. These details will be visible to your users.</p>
                </div>
                <div className="p-8 flex flex-col gap-6">
                  {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="form-title">
                      Form Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-3"
                      id="form-title"
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="e.g. Annual Survey 2024"
                      type="text"
                      value={title}
                    />
                    <p className="text-xs text-slate-500">This title will be displayed at the top of your form.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="form-desc">
                      Description
                    </label>
                    <textarea
                      className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-3 resize-none"
                      id="form-desc"
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Describe the purpose of this form..."
                      rows="4"
                      value={description}
                    />
                    <p className="text-xs text-slate-500">Provide context or instructions for the respondents.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="form-category">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-3 pr-10"
                        id="form-category"
                        onChange={(event) => setCategory(event.target.value)}
                        value={category}
                      >
                        <option disabled value="">Select a category</option>
                        <option value="corporate">Corporate</option>
                        <option value="education">Education</option>
                        <option value="ngo">Religious/NGO</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 px-8 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <button className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                    Cancel
                  </button>
                  <button
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isSaving}
                    onClick={handleSaveNext}
                    type="button"
                  >
                    {isSaving ? "Saving..." : "Save & Next"} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
};

export default FormBuilderStep1;
