import { useTheme } from "../store/themeStore";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] dark:border-b-[#2a3441] bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md px-4 sm:px-10 py-3">
      <Link to="/" className="flex items-center gap-4 text-[#111318] dark:text-white">
        <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
          <span className="material-symbols-outlined !text-[20px]">qr_code_scanner</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">NYDev Form Generator</h2>
      </Link>
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors" to="#features">
            Features
          </Link>
          <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors" to="#how-it-works">
            How it Works
          </Link>
          <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors" to="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors" to="/auth/google">
            Login
          </Link>
        </div>
        <button
          className="ml-4 flex items-center justify-center rounded-lg h-9 w-9 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          type="button"
        >
          {theme === "dark" ? (
            <span className="material-symbols-outlined">light_mode</span>
          ) : (
            <span className="material-symbols-outlined">dark_mode</span>
          )}
        </button>
      </div>
      <div className="md:hidden flex items-center">
        <button className="text-[#111318] dark:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
