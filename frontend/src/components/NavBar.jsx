import { useState } from "react";
import { useTheme } from "../store/themeStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../store/authStore"; // Import your auth store
import { logout } from "../services/authService"; // Import your logout service

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  // Zustand Auth State
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.logout);
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await logout();
    clearAuth();
    closeMenu();
    navigate("/");
  };

  // Define links based on authentication status
  const navLinks = user 
    ? [
        { name: "Dashboard", icon: "grid_view", to: "/org/dashboard" },
        { name: "Forms", icon: "article", to: "/org/forms" },
        { name: "Templates", icon: "layers", to: "/org/templates" },
        { name: "Settings", icon: "settings_suggest", to: "/org/settings" },
      ]
    : [
        { name: "Features", icon: "star", to: "/#features" },
        { name: "Pricing", icon: "payments", to: "/#pricing" },
      ];

  return (
    <>
      <nav className="sticky top-0 z-[60] flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-md px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center bg-indigo-600 rounded-lg text-white shadow-md">
            <span className="material-symbols-outlined !text-[18px]">qr_code_scanner</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-white tracking-tight">NYDev</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className={`text-sm font-medium transition-colors ${location.pathname === l.to ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>
              {l.name}
            </Link>
          ))}
          
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
          
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined !text-[20px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>

          {!user ? (
            <Link to="/auth/google" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-sm font-bold text-rose-500 hover:text-rose-600">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Trigger */}
        <button onClick={toggleMenu} className="md:hidden p-2 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">{isOpen ? "close" : "notes"}</span>
        </button>
      </nav>

      {/* --- FRAMER MOTION MODAL --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" 
            />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="relative p-8">
                {/* User Profile Section in Modal */}
                {user && (
                  <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{user.role}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link 
                        to={link.to}
                        onClick={closeMenu}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                          location.pathname === link.to 
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                          : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <span className="material-symbols-outlined">{link.icon}</span>
                        <span className="font-bold tracking-tight">{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { toggleTheme(); closeMenu(); }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
                  >
                    <span className="material-symbols-outlined !text-[18px]">
                      {theme === "dark" ? "light_mode" : "dark_mode"}
                    </span>
                    {theme === "dark" ? "LIGHT" : "DARK"}
                  </button>
                  
                  {!user ? (
                    <Link 
                      to="/auth/google" 
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/20"
                    >
                      LOGIN
                    </Link>
                  ) : (
                    <button 
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-bold text-xs"
                    >
                      <span className="material-symbols-outlined !text-[18px]">logout</span>
                      LOGOUT
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;