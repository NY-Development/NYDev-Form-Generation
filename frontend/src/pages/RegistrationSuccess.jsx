import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const RegistrationSuccess = () => {
  const { state } = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  const registrationId = state?.registrationId || "RWM-8829";

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 800);
  };

  return (
    <motion.div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-white overflow-x-hidden" {...pageFade}>
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 py-4 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Worship Night 2024</h2>
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          <nav className="hidden md:flex items-center gap-6 lg:gap-9">
            <a className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Home</a>
            <a className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Event Details</a>
            <a className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Contact</a>
          </nav>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-blue-700 transition-colors text-white text-sm font-bold leading-normal tracking-wide shadow-sm">
            <span className="truncate">Login</span>
          </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-4 md:px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>
        <motion.div className="relative z-10 flex flex-col items-center text-center max-w-2xl mb-10 gap-4" variants={staggerContainer} initial="initial" animate="animate">
          <motion.div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 mb-2 animate-bounce-slow" variants={fadeUp}>
            <span className="material-symbols-outlined text-5xl text-green-600 dark:text-green-400">check_circle</span>
          </motion.div>
          <motion.h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white" variants={fadeUp}>
            Registration Successful!
          </motion.h1>
          <motion.p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-lg" variants={fadeUp}>
            You are all set for Worship Night 2024. A confirmation email has been sent to your inbox.
          </motion.p>
        </motion.div>
        <motion.div className="relative z-10 w-full max-w-[400px] perspective-1000" variants={fadeUp}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col">
            <div className="bg-primary/5 dark:bg-primary/10 p-6 text-center border-b border-dashed border-slate-200 dark:border-slate-700">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Worship Night 2024</h3>
              <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                <span>Oct 24, 2024</span>
                <span className="mx-1">•</span>
                <span className="material-symbols-outlined text-lg">schedule</span>
                <span>7:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span className="material-symbols-outlined text-lg">location_on</span>
                <span>Main Cathedral Hall</span>
              </div>
            </div>
            <div className="p-8 flex flex-col items-center bg-white dark:bg-slate-800">
              <div className="p-3 bg-white rounded-xl shadow-inner border border-slate-100 mb-6">
                <img
                  alt="QR Code for event entry"
                  className="w-48 h-48 md:w-56 md:h-56 object-contain"
                  data-alt="Black and white QR code pattern"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARbP2K9fnNr9p7LyVB-lXDtcsCA1Ttv7l6gIILJG82F1M1MoRz8KP4g5Q3PPzKnVje0pPtAcT_dA4U-gajFPXRcUUNTcWYDGhc-wlZiYyZFDf9DAYdi_LcQYAqTJO8LJ0PBOlvKx92wKtZUUqwaA2km3HQ5pMkDqjjHzytDgXZaPaq7Rf1qyvcSKRC2wAjAGlvDBFhrtKFGycn9iuf6jmexMjJosINLfBc3Dy1bknh0uC2L7U7Vhpis4bp3uOXr8AWMRkCtXdwxIE"
                />
              </div>
              <div className="text-center w-full">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Registration ID</p>
                <p className="text-3xl font-mono font-bold tracking-wider text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700/50 py-2 px-4 rounded-lg inline-block border border-slate-200 dark:border-slate-600">
                  {registrationId}
                </p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 text-center border-t border-slate-100 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                Please present this QR code at the entrance for verification.
              </p>
              <button
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white text-sm font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isDownloading}
                onClick={handleDownload}
                type="button"
              >
                <span className="material-symbols-outlined">download</span>
                <span>{isDownloading ? "Preparing..." : "Download QR Code"}</span>
              </button>
              <button className="w-full mt-3 text-primary hover:text-blue-600 dark:text-blue-400 text-sm font-semibold py-2">View Event Details</button>
            </div>
            <div className="absolute top-[138px] -left-3 w-6 h-6 bg-background-light dark:bg-background-dark rounded-full"></div>
            <div className="absolute top-[138px] -right-3 w-6 h-6 bg-background-light dark:bg-background-dark rounded-full"></div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default RegistrationSuccess;
