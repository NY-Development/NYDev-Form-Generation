import { useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  Headphones,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../store/ui.store';
import { SearchDialog } from '../common/SearchDialog';
import { NotificationsPanel } from '../common/NotificationsPanel';
import { HelpPanel } from '../common/HelpPanel';

export const SuperAdminLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUiStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/superadmin' },
    { icon: Building2, label: 'Organizations', path: '/superadmin/organizations' },
    { icon: FileText, label: 'Audit Logs', path: '/superadmin/logs' },
    { icon: Users, label: 'Users & Roles', path: '/superadmin/users' },
    { icon: Settings, label: 'Settings', path: '/superadmin/settings' },
    { icon: Headphones, label: 'Support', path: '/superadmin/support' },
  ];

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={`fixed inset-y-0 left-0 z-50 md:static md:flex h-screen shrink-0 flex-col overflow-y-auto border-border bg-card transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0 w-64 border-r' : '-translate-x-full md:translate-x-0 w-64 md:w-0 border-r-0'} overflow-hidden shadow-xl md:shadow-none`}>
        <div className="flex h-full min-w-64 flex-col justify-between p-4">
          <div className="flex flex-col gap-6">
            {/* Brand Header */}
            <div className="flex items-center gap-3 px-2 py-6 mb-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
                <Building2 size={20} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-black uppercase tracking-wider text-foreground">SuperAdmin</h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Management Portal</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === '/superadmin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50/50 text-primary shadow-sm shadow-primary/10 dark:bg-primary/20'
                        : 'text-muted-foreground hover:bg-muted hover:translate-x-1'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <p className="text-sm font-semibold leading-normal">{item.label}</p>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Bottom User Section */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-3 px-2 mb-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email || 'admin@nydev.tech'}</p>
              </div>
              <button onClick={logout} className="text-muted-foreground cursor-pointer hover:text-primary">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex h-screen flex-1 flex-col overflow-hidden">
        {/* Top Header - Glassmorphism */}
        <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="p-1 text-muted-foreground transition-colors hover:text-foreground">
              <Menu size={24} />
            </button>
            <h2 className="hidden text-lg font-semibold text-foreground sm:block">{title}</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  readOnly
                  onClick={() => setSearchOpen(true)}
                  className="h-10 w-64 cursor-pointer rounded-lg border border-border bg-background pl-10 pr-4 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Search tenants, users..."
                />
              </button>
            </div>
            <button onClick={toggleTheme} className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {/* Notifications */}
            <button onClick={() => { setNotifOpen(!notifOpen); setHelpOpen(false); }} className="relative flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted">
              <Bell size={20} />
              <span className="absolute right-2 top-2 size-2 rounded-full border border-card bg-red-500" />
            </button>
            {/* Help */}
            <button onClick={() => { setHelpOpen(!helpOpen); setNotifOpen(false); }} className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-background p-4 md:p-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
            {children}
            <div className="h-12" />
          </div>
        </div>
      </main>

      {/* Shared panels */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
};
