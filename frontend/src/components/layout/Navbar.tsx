import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Menu, X, Sun, Moon } from 'lucide-react';
import { useUiStore } from '../../store/ui.store';

export const Navbar = () => {
  const { theme, toggleTheme } = useUiStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md sm:px-10">
        <div className="flex items-center gap-4 text-foreground">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <QrCode className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">NYDev Form Generator</h2>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden flex-1 justify-end gap-8 md:flex">
          <div className="flex items-center gap-6">
            <a className="text-sm font-medium leading-normal transition-colors hover:text-primary" href="#features">
              Features
            </a>
            <a className="text-sm font-medium leading-normal transition-colors hover:text-primary" href="#how-it-works">
              How it Works
            </a>
            <a className="text-sm font-medium leading-normal transition-colors hover:text-primary" href="#pricing">
              Pricing
            </a>
            <Link className="text-sm font-medium leading-normal transition-colors hover:text-primary" to="/login">
              Login
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              to="/login"
              className="flex h-9 min-w-21 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <span className="truncate">Get Started</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleTheme} className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-foreground p-2 transition-transform hover:scale-105">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-bold text-lg text-foreground">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="rounded p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4 text-foreground">
          <a className="rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted" href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a className="rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted" href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
          <a className="rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted" href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <div className="my-2 border-t border-border"></div>
          <Link className="rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted" to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 flex h-11 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </>
  );
};
