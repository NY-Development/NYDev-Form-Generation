import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { updateForm } from "../services/formService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const FormBuilderStep5 = () => {
  const [searchParams] = useSearchParams();
  const [isCopying, setIsCopying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [requireQrVerification, setRequireQrVerification] = useState(true);
  const formId = searchParams.get("formId") || localStorage.getItem("nydev_form_id");

  const handleCopyLink = async () => {
    if (!formId) {
      setErrorMessage("Missing form identifier.");
      return;
    }

    setIsCopying(true);
    setErrorMessage("");
    try {
      await updateForm(formId, { status: "published" });
    } catch (error) {
      setErrorMessage("Unable to publish form.");
    } finally {
      setIsCopying(false);
    }
  };

  const handleToggleQr = async (event) => {
    const nextValue = event.target.checked;
    setRequireQrVerification(nextValue);
    if (!formId) {
      return;
    }

    try {
      await updateForm(formId, { settings: { requireQrVerification: nextValue } });
    } catch (error) {
      setErrorMessage("Unable to update QR settings.");
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
                  <p className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-[-0.033em]">Publish &amp; Share</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Step 5: Your form is live and ready to go.</p>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <div className="flex gap-6 justify-between items-center">
                    <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Wizard Progress</p>
                    <p className="text-slate-900 dark:text-white text-xs font-bold leading-normal bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Step 5/5</p>
                  </div>
                  <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div className="flex-1 flex flex-col items-center justify-center min-h-[500px] pb-12" variants={fadeUp}>
              <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-gradient-to-b from-green-50 to-white dark:from-green-900/10 dark:to-slate-800 p-8 md:p-12 flex flex-col items-center text-center gap-6 border-b border-slate-100 dark:border-slate-700">
                  <div className="rounded-full bg-white dark:bg-slate-800 p-2 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                    <span className="material-symbols-outlined text-[80px] text-green-500 leading-none">check_circle</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Form Published Successfully!</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                      The <strong className="text-slate-900 dark:text-white font-semibold">Volunteer Registration</strong> form is now collecting responses.
                    </p>
                  </div>
                  <div className="w-full max-w-xl mt-4">
                    <div className="flex flex-col items-start gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Public Link</label>
                      <div className="w-full flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 shadow-inner group focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                        <span className="material-symbols-outlined text-slate-400 ml-3 text-[20px]">link</span>
                        <input
                          className="flex-1 bg-transparent border-none text-slate-700 dark:text-slate-200 font-mono text-sm focus:ring-0 px-2 w-full outline-none"
                          readOnly
                          value="nydev.form/realworship-volunteer"
                        />
                        <button
                          className="bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-medium text-sm shadow-sm border border-slate-200 dark:border-slate-600 transition-all flex items-center gap-2 hover:text-primary dark:hover:text-primary disabled:opacity-60 disabled:cursor-not-allowed"
                          disabled={isCopying}
                          onClick={handleCopyLink}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">content_copy</span>
                          <span>{isCopying ? "Publishing..." : "Copy Link"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10 bg-white dark:bg-slate-800">
                  {errorMessage && <p className="mb-4 text-sm text-red-500">{errorMessage}</p>}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="flex flex-col gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all group">
                      <div className="flex items-start justify-between">
                        <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                          <span className="material-symbols-outlined text-[28px]">qr_code_2</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">download</span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Download QR Code</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Get a high-res QR code for print materials.</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all group cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                          <span className="material-symbols-outlined text-[28px]">share</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-purple-500 transition-colors">open_in_new</span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Share on Social</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Post directly to Facebook, Twitter, or LinkedIn.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 max-w-2xl mx-auto">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-slate-400 mt-0.5">verified_user</span>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">Enable QR Verification</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">Require users to sign in before scanning to track attendance.</span>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" onChange={handleToggleQr} type="checkbox" value="" checked={requireQrVerification} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <a className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors" href="#">
                      Go to Dashboard <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
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

export default FormBuilderStep5;
