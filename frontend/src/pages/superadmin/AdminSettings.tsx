import { useState } from 'react';
import { Palette, AlertTriangle, Key, Mail, Eye, EyeOff, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export const AdminSettings = () => {
  const [brandName, setBrandName] = useState('NYDev');
  const [primaryColor, setPrimaryColor] = useState('#1152d4');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [showSmtpPass, setShowSmtpPass] = useState(false);
  const [smtp, setSmtp] = useState({ host: 'smtp.postmarkapp.com', port: '587', user: 'platform@nydev.tech', pass: '' });

  const handleSave = () => {
    toast.success('Settings synced successfully across all clusters');
  };

  return (
    <>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground" style={{ letterSpacing: '-0.033em' }}>
          Global Settings
        </h2>
        <p className="font-medium text-muted-foreground">Configure platform-wide parameters and infrastructure integrations.</p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Global Branding */}
        <div className="col-span-12 rounded-xl border border-border bg-card p-8 shadow-sm lg:col-span-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary"><Palette size={20} /></div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Global Branding</h3>
          </div>
          <div className="group mb-6 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 transition-all hover:border-primary hover:bg-card">
            <div className="mb-4 flex size-24 items-center justify-center rounded-lg bg-primary shadow-lg transition-transform group-hover:scale-110">
              <span className="text-2xl font-black text-white">NY</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Update Logo</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Brand Name</label>
              <input value={brandName} onChange={(e) => setBrandName(e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary Color</label>
              <div className="flex gap-2">
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="size-10 cursor-pointer rounded-lg border border-border shadow-sm" />
                <input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1 rounded-lg border border-border bg-card px-4 py-2 font-mono text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="relative col-span-12 overflow-hidden rounded-xl border border-border bg-card p-8 shadow-sm lg:col-span-8">
          <div className="absolute -mr-16 -mt-16 right-0 top-0 size-32 rounded-full bg-destructive/5 blur-3xl" />
          <div className="mb-8 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600"><AlertTriangle size={20} /></div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Maintenance Mode</h3>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${maintenanceMode ? 'bg-destructive' : 'bg-muted'}`}
            >
              <span className={`inline-block size-5 transform rounded-full bg-white shadow-sm transition-transform ${maintenanceMode ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="mb-6 rounded-lg border-l-4 border-amber-500 bg-muted p-6">
            <h4 className="mb-1 text-sm font-bold text-foreground">Status: {maintenanceMode ? 'Maintenance Active' : 'Operational'}</h4>
            <p className="text-xs leading-relaxed text-muted-foreground">Maintenance mode will prevent all non-admin users from accessing the platform.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Scheduled Start</label>
              <input type="datetime-local" className="w-full rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold" />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Estimated Duration</label>
              <select className="w-full rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold">
                <option>30 Minutes</option><option>1 Hour</option><option>4 Hours</option><option>Custom...</option>
              </select>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="col-span-12 rounded-xl border border-border bg-card p-8 shadow-sm lg:col-span-7">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary"><Key size={20} /></div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Global API Keys</h3>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">+ Generate New Key</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'ImageKit CDN', key: 'ik_live_••••••••••••', icon: '☁️', active: true },
              { name: 'Stripe Production', key: 'pk_live_••••••••••••', icon: '💳', active: true },
            ].map((item, i) => (
              <div key={i} className={`group flex items-center justify-between rounded-lg bg-muted/50 p-4 ${item.active ? 'border-2 border-primary/20' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded border border-border bg-card text-lg">{item.icon}</div>
                  <div>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{item.key}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.active && <span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase text-primary">Active</span>}
                  <button className="rounded-md p-2 transition-colors hover:bg-card"><Eye size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email SMTP */}
        <div className="col-span-12 rounded-xl border border-border bg-card p-8 shadow-sm lg:col-span-5">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary"><Mail size={20} /></div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Email SMTP Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Host Server</label>
                <input value={smtp.host} onChange={(e) => setSmtp({ ...smtp, host: e.target.value })} className="w-full rounded-lg border border-transparent bg-muted px-4 py-2 text-sm font-semibold transition-all focus:border-primary focus:bg-card" />
              </div>
              <div className="col-span-4">
                <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Port</label>
                <input value={smtp.port} onChange={(e) => setSmtp({ ...smtp, port: e.target.value })} className="w-full rounded-lg border border-transparent bg-muted px-4 py-2 text-sm font-semibold transition-all focus:border-primary focus:bg-card" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Authentication User</label>
              <input value={smtp.user} onChange={(e) => setSmtp({ ...smtp, user: e.target.value })} className="w-full rounded-lg border border-transparent bg-muted px-4 py-2 text-sm font-semibold transition-all focus:border-primary focus:bg-card" />
            </div>
            <div className="relative">
              <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-muted-foreground">SMTP Password</label>
              <input type={showSmtpPass ? 'text' : 'password'} value={smtp.pass} onChange={(e) => setSmtp({ ...smtp, pass: e.target.value })} placeholder="••••••••••" className="w-full rounded-lg border border-transparent bg-muted px-4 py-2 text-sm font-semibold transition-all focus:border-primary focus:bg-card" />
              <button onClick={() => setShowSmtpPass(!showSmtpPass)} className="absolute right-3 top-7 text-muted-foreground">
                {showSmtpPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <button className="w-full rounded-lg bg-primary py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
              Test Connection
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="col-span-12 mb-12 flex items-center justify-end gap-4 pt-4">
          <button className="px-8 py-3 text-[11px] font-black uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            <X size={14} className="mr-1 inline" /> Discard Changes
          </button>
          <button onClick={handleSave} className="rounded-lg bg-foreground px-10 py-3 text-[11px] font-black uppercase tracking-widest text-background shadow-2xl transition-all hover:bg-primary active:scale-95">
            <Save size={14} className="mr-1 inline" /> Propagate Configurations
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
