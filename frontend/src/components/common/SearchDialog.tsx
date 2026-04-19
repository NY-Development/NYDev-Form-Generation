import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Building2, Users, ArrowRight } from 'lucide-react';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SearchDialog = ({ open, onClose }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const suggestions = [
    { icon: FileText, label: 'My Forms', path: '/dashboard/forms', type: 'Page' },
    { icon: Building2, label: 'Organizations', path: '/superadmin/organizations', type: 'Page' },
    { icon: Users, label: 'User Management', path: '/superadmin/users', type: 'Page' },
    { icon: FileText, label: 'Create New Form', path: '/dashboard/forms/new', type: 'Action' },
  ].filter(s => !query || s.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative mx-4 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={20} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 flex-1 bg-transparent text-sm font-medium text-foreground placeholder-muted-foreground outline-none"
            placeholder="Search forms, pages, users..."
          />
          <kbd className="hidden rounded border border-border bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground sm:inline-block">ESC</kbd>
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {suggestions.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No results found for "{query}"</div>
          ) : (
            suggestions.map((item, i) => (
              <a
                key={i}
                href={item.path}
                className="flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-[10px] font-medium text-muted-foreground">{item.type}</p>
                </div>
                <ArrowRight size={14} className="text-muted-foreground" />
              </a>
            ))
          )}
        </div>
        <div className="border-t border-border bg-muted/30 px-4 py-2 text-center text-[10px] font-medium text-muted-foreground">
          Press <kbd className="rounded border border-border bg-card px-1 font-bold">↵</kbd> to navigate • <kbd className="rounded border border-border bg-card px-1 font-bold">↑↓</kbd> to move
        </div>
      </div>
    </div>
  );
};
