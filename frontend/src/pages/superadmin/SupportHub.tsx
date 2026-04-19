import { useState, useEffect } from 'react';
import { AlertCircle, Clock, CheckCircle, Timer, Plus, MoreVertical, BookOpen, FileText, Shield, ChevronRight, Phone, Headphones } from 'lucide-react';
import { superadminService } from '../../services/superadmin.service';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { toast } from 'sonner';

const PRIORITY_STYLES: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
};

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-blue-50 text-primary dark:bg-blue-900/20',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  in_progress: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  closed: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
};

export const SupportHub = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<any>({});
  const [showCreate, setShowCreate] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: 'medium', organizationName: '' });

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await superadminService.getSupportTickets({ limit: 10 });
      setTickets(res.data || []);
      setMeta(res.pagination || res.meta || {});
    } catch (err: any) {
      toast.error(err.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleCreateTicket = async () => {
    if (!newTicket.title || !newTicket.description) {
      toast.error('Title and description are required');
      return;
    }
    try {
      await superadminService.createSupportTicket(newTicket);
      toast.success('Ticket created!');
      setShowCreate(false);
      setNewTicket({ title: '', description: '', priority: 'medium', organizationName: '' });
      fetchTickets();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create ticket');
    }
  };

  if (loading && tickets.length === 0) return <LoadingSpinner className="py-20" text="Loading support hub..." />;

  return (
    <>
      {/* Hero Stats / Bento Header */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="group relative overflow-hidden rounded-xl bg-foreground p-8 shadow-2xl">
            <div className="absolute -mr-32 -mt-32 right-0 top-0 size-64 rounded-full bg-primary/20 blur-[80px]" />
            <div className="relative z-10">
              <h2 className="mb-2 text-3xl font-black tracking-tight text-background">Support Ecosystem</h2>
              <p className="mb-6 max-w-md font-medium text-muted-foreground">
                Real-time resolution metrics and high-priority escalation tracking for the entire network.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCreate(true)}
                  className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-px active:scale-95"
                >
                  Open New Internal Ticket
                </button>
                <button className="rounded-lg border border-white/20 bg-transparent px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/5">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-4">
          {[
            { icon: AlertCircle, label: 'Open', value: meta.openCount || 0, color: 'text-primary' },
            { icon: Clock, label: 'Pending', value: meta.pendingCount || 0, color: 'text-amber-500' },
            { icon: CheckCircle, label: 'Resolved', value: meta.resolvedCount || 0, color: 'text-emerald-500' },
            { icon: Timer, label: 'MTTR', value: '2.4h', color: 'text-primary' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-0.5">
              <stat.icon className={`text-3xl ${stat.color}`} size={28} />
              <div className="mt-3">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-black text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Ticket Queue */}
        <div className="col-span-12 xl:col-span-8">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border bg-card p-6">
              <h3 className="text-lg font-black tracking-tight text-foreground">Active Ticket Queue</h3>
              <div className="flex gap-2">
                <button className="rounded-lg bg-muted px-4 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-border">Filters</button>
                <button className="rounded-lg bg-muted px-4 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-border">Sort by Priority</button>
              </div>
            </div>
            <div className="divide-y divide-border/30">
              {tickets.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">No tickets yet. Create one to get started.</div>
              ) : (
                tickets.map((ticket: any) => (
                  <div key={ticket._id || ticket.id} className={`group flex items-start gap-4 p-6 transition-colors hover:bg-muted/30 ${ticket.status === 'resolved' || ticket.status === 'closed' ? 'opacity-60' : ''}`}>
                    <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg text-xs font-black ${ticket.status === 'resolved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-blue-50 text-primary dark:bg-blue-900/20'}`}>
                      #{ticket.ticketNumber || '—'}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className={`cursor-pointer font-bold text-foreground transition-colors group-hover:text-primary ${ticket.status === 'resolved' ? 'line-through' : ''}`}>
                          {ticket.title}
                        </h4>
                        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${PRIORITY_STYLES[ticket.priority] || PRIORITY_STYLES.medium}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">{ticket.description?.slice(0, 120)}{ticket.description?.length > 120 ? '...' : ''}</p>
                      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground/70">
                        {ticket.organizationName && <span className="flex items-center gap-1">🏢 {ticket.organizationName}</span>}
                        <span className="flex items-center gap-1">🕐 {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1">👤 {ticket.assignedTo}</span>
                        <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${STATUS_STYLES[ticket.status] || ''}`}>
                          {ticket.status?.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <button className="text-muted-foreground/40 hover:text-foreground"><MoreVertical size={18} /></button>
                  </div>
                ))
              )}
            </div>
            <div className="bg-muted/50 p-4 text-center">
              <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">Load older tickets</button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="col-span-12 space-y-8 xl:col-span-4">
          {/* Documentation */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-6">
              <h3 className="text-lg font-black tracking-tight text-foreground">Admin Documentation</h3>
            </div>
            <div className="space-y-3 p-4">
              {[
                { icon: BookOpen, label: 'Incident Response Protocol', sub: 'Updated 2 days ago' },
                { icon: FileText, label: 'Organization Tier Limits', sub: 'Internal Reference 1.2' },
                { icon: Shield, label: 'Security Compliance Docs', sub: 'GDPR & SOC2 Guide' },
              ].map((doc, i) => (
                <a key={i} href="#" className="group flex items-center gap-4 rounded-lg p-3 transition-all hover:bg-muted">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                    <doc.icon size={18} className="text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{doc.label}</p>
                    <p className="text-[10px] font-medium text-muted-foreground">{doc.sub}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* L3 Escalation CTA */}
          <div className="group relative overflow-hidden rounded-xl bg-primary p-6 text-white shadow-xl shadow-primary/20">
            <div className="absolute -bottom-4 -right-4 text-white/10 transition-transform duration-500 group-hover:scale-110">
              <Headphones size={96} />
            </div>
            <h4 className="mb-2 text-xl font-black tracking-tight">Need direct assist?</h4>
            <p className="mb-6 text-sm font-medium leading-relaxed text-blue-200">
              Connect directly with core engineering for L3 escalation paths.
            </p>
            <button className="w-full rounded-lg bg-white py-3 text-sm font-bold text-primary shadow-md transition-colors hover:bg-blue-50 active:scale-95">
              <Phone size={14} className="mr-2 inline" /> Initiate L3 Call
            </button>
          </div>

          {/* System Health */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground">System Health</h3>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" /> OPERATIONAL
              </span>
            </div>
            <div className="space-y-4">
              {[
                { label: 'API RESPONSIVENESS', value: 99.9 },
                { label: 'DB CLUSTER LOAD', value: 42 },
              ].map((bar, i) => (
                <div key={i}>
                  <div className="mb-1 flex justify-between text-[10px] font-bold text-muted-foreground">
                    <span>{bar.label}</span><span>{bar.value}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${bar.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-2xl">
            <h3 className="mb-6 text-xl font-black text-foreground">New Support Ticket</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground">Title</label>
                <input value={newTicket.title} onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })} className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Brief summary of the issue" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground">Description</label>
                <textarea value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} rows={4} className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Detailed description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold text-muted-foreground">Priority</label>
                  <select value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })} className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm">
                    <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-muted-foreground">Organization</label>
                  <input value={newTicket.organizationName} onChange={(e) => setNewTicket({ ...newTicket, organizationName: e.target.value })} className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Optional" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowCreate(false)} className="rounded-lg px-6 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground">Cancel</button>
              <button onClick={handleCreateTicket} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 active:scale-95">Create Ticket</button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-50">
        <button onClick={() => setShowCreate(true)} className="group flex size-14 items-center justify-center rounded-full bg-foreground text-background shadow-2xl transition-all hover:scale-105 active:scale-95">
          <Plus size={24} />
          <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-foreground px-4 py-2 text-xs font-bold tracking-tight text-background opacity-0 shadow-xl transition-opacity group-hover:opacity-100">Quick Ticket</span>
        </button>
      </div>
    </>
  );
};

export default SupportHub;
