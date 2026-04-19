import { useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  FileText,
  PlusSquare,
  CreditCard,
  Settings,
  Search,
  Bell,
  HelpCircle,
  LogOut,
  Gem,
  Sun,
  Moon,
  Menu,
} from 'lucide-react';
import { useUiStore } from '../../store/ui.store';
import { SearchDialog } from '../common/SearchDialog';
import { NotificationsPanel } from '../common/NotificationsPanel';
import { HelpPanel } from '../common/HelpPanel';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export const DashboardLayout = ({ children, title = 'Dashboard' }: DashboardLayoutProps) => {
  const { user, organization, logout } = useAuth();
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUiStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'My Forms', icon: <FileText size={20} />, path: '/dashboard/forms' },
    { label: 'Create Form', icon: <PlusSquare size={20} />, path: '/dashboard/forms/new' },
    { label: 'Billing', icon: <CreditCard size={20} />, path: '/dashboard/billing' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground font-display">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 md:static border-border bg-card flex shrink-0 flex-col h-full transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0 w-64 border-r' : '-translate-x-full md:translate-x-0 w-64 md:w-0 border-r-0'} overflow-hidden shadow-xl md:shadow-none`}>
        <div className="p-6 min-w-64">
          {/* Org Info */}
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary bg-cover bg-center bg-no-repeat font-bold"
              style={organization?.logo ? { backgroundImage: `url(${organization.logo})` } : {}}
            >
              {!organization?.logo && organization?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="truncate text-base font-bold leading-normal text-foreground">
                {organization?.name || 'My Organization'}
              </h1>
              <p className="truncate text-sm font-normal leading-normal text-muted-foreground">Basic Plan</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <div className="[&>svg]:transition-colors">{item.icon}</div>
                <p className="text-sm font-medium leading-normal">{item.label}</p>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Pro Up-sell banner */}
        <div className="mt-auto p-6">
          <div className="rounded-xl border border-primary/10 bg-linear-to-br from-primary/10 to-primary/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Gem size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Pro Features</span>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">Unlock unlimited forms and advanced analytics.</p>
            <button className="flex h-9 w-full items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex h-full flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="p-1 text-muted-foreground transition-colors hover:text-foreground">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden h-10 w-64 items-center overflow-hidden rounded-lg bg-muted transition-all focus-within:ring-2 focus-within:ring-primary/50 md:flex cursor-pointer" onClick={() => setSearchOpen(true)}>
              <div className="flex items-center justify-center pl-3 text-muted-foreground">
                <Search size={20} />
              </div>
              <input
                className="h-full w-full border-none bg-transparent px-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-0 outline-none cursor-pointer"
                placeholder="Search forms, data..."
                type="text"
                readOnly
                onClick={() => setSearchOpen(true)}
              />
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => { setNotifOpen(!notifOpen); setHelpOpen(false); }} className="relative flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted">
                <Bell size={20} />
                <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-card bg-red-500"></span>
              </button>
              <button onClick={() => { setHelpOpen(!helpOpen); setNotifOpen(false); }} className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted">
                <HelpCircle size={20} />
              </button>
              <div className="mx-1 h-8 w-px bg-border"></div>
              
              {/* User Dropdown Profile (Simple version) */}
              <button className="ml-1 flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-muted group">
                <div className="flex size-8 items-center justify-center rounded-full border border-border bg-background bg-cover bg-center bg-no-repeat text-xs font-bold text-primary">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <span className="hidden text-sm font-medium text-foreground sm:block">
                  {user?.firstName} {user?.lastName}
                </span>
                
                <div className="hidden group-hover:flex bg-card border border-border absolute right-6 top-14 p-2 rounded shadow-lg flex-col z-50">
                  <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border mb-1">{user?.email}</div>
                  <div 
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded text-sm text-destructive cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </div>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth md:p-8">
          {children}
        </div>
      </main>

      {/* Shared panels */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
};
