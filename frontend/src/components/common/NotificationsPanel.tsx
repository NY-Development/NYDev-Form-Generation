import { X, Bell, FileText, UserPlus, CreditCard, Shield } from 'lucide-react';

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

const MOCK_NOTIFICATIONS = [
  { id: 1, icon: FileText, title: 'New form submission', desc: 'Registration Form received a new entry', time: '2 mins ago', read: false },
  { id: 2, icon: UserPlus, title: 'New user joined', desc: 'A new user registered via Google OAuth', time: '1 hour ago', read: false },
  { id: 3, icon: CreditCard, title: 'Plan upgrade', desc: 'TechFlow Solutions upgraded to Pro', time: '3 hours ago', read: true },
  { id: 4, icon: Shield, title: 'Security alert', desc: 'Failed login attempt detected from unusual IP', time: 'Yesterday', read: true },
];

export const NotificationsPanel = ({ open, onClose }: NotificationsPanelProps) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-4 top-16 z-50 w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            <h3 className="text-sm font-black text-foreground">Notifications</h3>
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
              {MOCK_NOTIFICATIONS.filter(n => !n.read).length}
            </span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X size={16} />
          </button>
        </div>
        <div className="max-h-96 divide-y divide-border/50 overflow-y-auto">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start gap-3 p-4 transition-colors hover:bg-muted/30 ${!notif.read ? 'bg-primary/5' : ''}`}
            >
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${!notif.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <notif.icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!notif.read ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>{notif.title}</p>
                <p className="truncate text-xs text-muted-foreground">{notif.desc}</p>
                <p className="mt-1 text-[10px] font-medium text-muted-foreground">{notif.time}</p>
              </div>
              {!notif.read && <div className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
        <div className="border-t border-border bg-muted/30 p-3 text-center">
          <button className="text-xs font-bold text-primary hover:underline">Mark all as read</button>
        </div>
      </div>
    </>
  );
};
