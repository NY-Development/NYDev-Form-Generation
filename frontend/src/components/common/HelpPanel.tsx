import { X, HelpCircle, BookOpen, MessageCircle, Keyboard, ExternalLink } from 'lucide-react';

interface HelpPanelProps {
  open: boolean;
  onClose: () => void;
}

export const HelpPanel = ({ open, onClose }: HelpPanelProps) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-4 top-16 z-50 w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <HelpCircle size={18} className="text-primary" />
            <h3 className="text-sm font-black text-foreground">Help & Resources</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X size={16} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {[
            { icon: BookOpen, label: 'Documentation', desc: 'Learn how to use all features', href: '#' },
            { icon: MessageCircle, label: 'Contact Support', desc: 'Get help from our team', href: '#' },
            { icon: Keyboard, label: 'Keyboard Shortcuts', desc: 'Speed up your workflow', href: '#' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <item.icon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
              <ExternalLink size={14} className="text-muted-foreground" />
            </a>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-muted-foreground">Keyboard Shortcuts</h4>
          <div className="space-y-2">
            {[
              { keys: 'Ctrl + K', desc: 'Open search' },
              { keys: 'Ctrl + N', desc: 'New form' },
              { keys: 'Esc', desc: 'Close dialog' },
            ].map((shortcut, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{shortcut.desc}</span>
                <kbd className="rounded border border-border bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                  {shortcut.keys}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border bg-muted/30 p-4">
          <p className="text-center text-[10px] text-muted-foreground">NYDev Form Generator v2.4.0</p>
        </div>
      </div>
    </>
  );
};
