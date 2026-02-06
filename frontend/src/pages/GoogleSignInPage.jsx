import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginWithGoogle } from "../services/authService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const GoogleSignInPage = () => {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMessage("");
    try {
      await loginWithGoogle();
      navigate("/org/dashboard");
    } catch (error) {
      setErrorMessage("Unable to sign in. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <motion.div className="bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white transition-colors duration-200" {...pageFade}>
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        </div>
        <motion.div className="relative z-10 w-full max-w-[480px] p-4" variants={staggerContainer} initial="initial" animate="animate">
          <motion.div className="bg-white dark:bg-[#151a25] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-[#f0f2f4] dark:border-gray-800 p-8 md:p-10 flex flex-col items-center text-center" variants={fadeUp}>
            <div className="mb-8 p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
              <div className="size-10 text-primary">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-3 text-[#111318] dark:text-white">Welcome to NYDev</h1>
            <p className="text-[#616f89] dark:text-gray-400 text-base leading-relaxed mb-8 max-w-[320px]">
              Sign in with Google to create and manage smart registration forms securely.
            </p>
            <button
              className="group w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1e2330] hover:bg-gray-50 dark:hover:bg-[#252b3b] border border-[#dce0e5] dark:border-gray-700 text-[#111318] dark:text-white h-12 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSigningIn}
              onClick={handleSignIn}
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="font-medium text-[15px]">{isSigningIn ? "Signing in..." : "Sign in with Google"}</span>
              {isSigningIn && <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-transparent"></span>}
            </button>
            {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage}</p>}
            <div className="relative w-full my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#f0f2f4] dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#151a25] px-2 text-[#616f89] dark:text-gray-500">Secure Access</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#616f89] dark:text-gray-500">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Encrypted &amp; Secure</span>
            </div>
          </motion.div>
          <footer className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 mb-4">
              <a className="text-sm text-[#616f89] hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="text-sm text-[#616f89] hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
                Terms of Service
              </a>
            </div>
            <p className="text-xs text-[#9aa2b1] dark:text-gray-600">&copy; 2024 NYDev. All rights reserved.</p>
          </footer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GoogleSignInPage;
