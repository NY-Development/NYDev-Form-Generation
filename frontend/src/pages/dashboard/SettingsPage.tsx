import { useState, useEffect } from 'react';
import { Settings, Building2, Palette, Users, UserPlus, Trash2, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { organizationService } from '../../services/organization.service';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { toast } from 'sonner';
import type { User } from '../../types';

export const SettingsPage = () => {
  const { organization, setOrganization } = useAuth();
  const orgId = organization?.id || organization?._id || '';

  const [activeTab, setActiveTab] = useState<'general' | 'members' | 'branding'>('general');
  const [loading, setLoading] = useState(false);
  const [orgName, setOrgName] = useState(organization?.name || '');
  const [orgDescription, setOrgDescription] = useState(organization?.description || '');
  const [members, setMembers] = useState<User[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);

  // New admin form
  const [newAdmin, setNewAdmin] = useState({ firstName: '', lastName: '', email: '', password: '' });

  // Branding states
  const [brandingVars, setBrandingVars] = useState({
    primaryColor: organization?.branding?.primaryColor || '#1152d4',
    logo: organization?.logo || ''
  });

  useEffect(() => {
    if (activeTab === 'members' && orgId) {
      fetchMembers();
    }
  }, [activeTab, orgId]);

  const fetchMembers = async () => {
    setMembersLoading(true);
    try {
      const res = await organizationService.getMembers(orgId);
      setMembers(res.data.members || []);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load members');
    } finally {
      setMembersLoading(false);
    }
  };

  const handleSaveGeneral = async () => {
    setLoading(true);
    try {
      const res = await organizationService.updateOrganization(orgId, { name: orgName, description: orgDescription });
      setOrganization(res.data.organization);
      toast.success('Organization updated!');
    } catch (err: any) {
      toast.error(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBranding = async () => {
    setLoading(true);
    try {
      const res = await organizationService.updateOrganization(orgId, { 
        branding: { primaryColor: brandingVars.primaryColor } as any, 
        logo: brandingVars.logo 
      });
      setOrganization(res.data.organization);
      toast.success('Branding updated!');
    } catch (err: any) {
      toast.error(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdmin.email || !newAdmin.firstName || !newAdmin.password) {
      toast.error('Fill in all required fields');
      return;
    }
    try {
      await organizationService.addAdmin(orgId, newAdmin);
      toast.success('Admin added!');
      setNewAdmin({ firstName: '', lastName: '', email: '', password: '' });
      fetchMembers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to add admin');
    }
  };

  const handleRemoveAdmin = async (adminId: string) => {
    if (!confirm('Remove this admin?')) return;
    try {
      await organizationService.removeAdmin(orgId, adminId);
      toast.success('Admin removed.');
      fetchMembers();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const tabs = [
    { id: 'general' as const, label: 'General', icon: Building2 },
    { id: 'members' as const, label: 'Team Members', icon: Users },
    { id: 'branding' as const, label: 'Branding', icon: Palette },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your organization, team, and branding.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={18} /> {label}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="max-w-2xl rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-foreground">Organization Details</h2>
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Organization Name</label>
              <input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-border bg-background p-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              />
            </div>
            <button
              onClick={handleSaveGeneral}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50"
            >
              <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="flex flex-col gap-6">
          {/* Add admin form */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-foreground">Add New Admin</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input value={newAdmin.firstName} onChange={(e) => setNewAdmin({ ...newAdmin, firstName: e.target.value })} placeholder="First Name *" className="h-10 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
              <input value={newAdmin.lastName} onChange={(e) => setNewAdmin({ ...newAdmin, lastName: e.target.value })} placeholder="Last Name" className="h-10 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
              <input value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} placeholder="Email *" type="email" className="h-10 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
              <input value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} placeholder="Temp Password *" type="password" className="h-10 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <button onClick={handleAddAdmin} className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">
              <UserPlus size={16} /> Add Admin
            </button>
          </div>

          {/* Members list */}
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-6 py-4">
              <h2 className="font-bold text-foreground">Team Members</h2>
            </div>
            {membersLoading ? (
              <LoadingSpinner className="py-10" />
            ) : members.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">No team members found.</div>
            ) : (
              <div className="divide-y divide-border">
                {members.map((m) => (
                  <div key={m.id || m._id} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {m.firstName?.charAt(0)}{m.lastName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{m.firstName} {m.lastName}</p>
                        <p className="text-xs text-muted-foreground">{m.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-muted px-2 py-1 text-xs font-medium text-muted-foreground capitalize">{m.role}</span>
                      {m.role !== 'owner' && (
                        <button onClick={() => handleRemoveAdmin(m.id || m._id || '')} className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Branding Tab */}
      {activeTab === 'branding' && (
        <div className="max-w-2xl rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-foreground">Branding Settings</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Customize your organization's appearance. Logo, colors, and fonts will appear on your public forms.
          </p>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Primary Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={brandingVars.primaryColor} onChange={(e) => setBrandingVars({ ...brandingVars, primaryColor: e.target.value })} className="h-10 w-14 cursor-pointer rounded border border-border p-0" />
                <span className="text-sm text-muted-foreground">{brandingVars.primaryColor}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Logo</label>
              <label className="relative flex cursor-pointer items-center gap-4 rounded-lg border border-dashed border-border bg-muted/30 p-6 hover:bg-muted/50 transition-colors">
                <input 
                  type="file" 
                  accept="image/svg+xml, image/png, image/jpeg" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        toast.error('Image must be less than 2MB');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setBrandingVars({ ...brandingVars, logo: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
                {brandingVars.logo ? (
                  <img src={brandingVars.logo} alt="Logo" className="h-16 w-16 rounded-lg object-contain bg-white" />
                ) : (
                  <div className="flex size-16 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Settings size={24} />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">Click to upload organization logo</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                </div>
              </label>
              {brandingVars.logo && (
                <button 
                  onClick={() => setBrandingVars({ ...brandingVars, logo: '' })}
                  className="text-xs text-destructive hover:underline self-start"
                >
                  Remove logo
                </button>
              )}
            </div>
            <button onClick={handleSaveBranding} disabled={loading} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50">
              <Save size={16} /> {loading ? 'Saving...' : 'Save Branding'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
