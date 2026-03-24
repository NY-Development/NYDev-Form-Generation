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
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const SuperAdminLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const { logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Building2, label: 'Organizations', path: '/admin/orgs' },
    { icon: FileText, label: 'Audit Logs', path: '/admin/logs' },
    { icon: Users, label: 'Users & Roles', path: '/admin/users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: HelpCircle, label: 'Support', path: '/admin/support' },
  ];

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar Navigation */}
      <nav className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-border bg-card md:flex">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-6">
            {/* User Profile / Brand */}
            <div className="flex items-center gap-3 px-2">
              <div
                className="relative flex size-10 items-center justify-center rounded-full border border-border bg-primary/10 text-primary"
              >
                <Building2 size={24} />
                <div className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card bg-green-500"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-semibold leading-tight text-foreground">NYDev Admin</h1>
                <p className="text-xs font-medium text-muted-foreground">Super User</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <p className="text-sm font-medium leading-normal">{item.label}</p>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="border-t border-border px-3 py-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>v2.4.0</span>
              <button onClick={logout} className="cursor-pointer hover:text-primary">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex h-screen flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-4">
            <button className="p-1 text-muted-foreground md:hidden">
              <Menu size={24} />
            </button>
            <h2 className="hidden text-lg font-semibold text-foreground sm:block">{title}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                className="h-10 w-64 rounded-lg border border-border bg-background pl-10 pr-4 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Search tenants, users..."
              />
            </div>
            <button className="relative flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted">
              <Bell size={20} />
              <span className="absolute right-2 top-2 size-2 rounded-full border border-card bg-red-500"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-background p-4 md:p-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
            {children}
            <div className="h-12"></div>
          </div>
        </div>
      </main>
    </div>
  );
};
