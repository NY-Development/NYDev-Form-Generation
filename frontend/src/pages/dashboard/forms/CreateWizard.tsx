import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CloudUpload, Share2, Plus, Trash2, GripVertical, SeparatorHorizontal, Video, Lock } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { formService } from '../../../services/form.service';
import { toast } from 'sonner';
import type { FormField, FieldType } from '../../../types';

const FIELD_TYPES: { type: FieldType; label: string; icon?: React.ReactNode; pro?: boolean }[] = [
  { type: 'text', label: 'Short Text' },
  { type: 'textarea', label: 'Long Text' },
  { type: 'email', label: 'Email' },
  { type: 'phone', label: 'Phone' },
  { type: 'number', label: 'Number' },
  { type: 'select', label: 'Dropdown' },
  { type: 'radio', label: 'Multiple Choice' },
  { type: 'checkbox', label: 'Checkboxes' },
  { type: 'date', label: 'Date' },
  { type: 'time', label: 'Time' },
  { type: 'url', label: 'URL' },
  { type: 'address', label: 'Address' },
  { type: 'page_break', label: 'Page Break', icon: <SeparatorHorizontal size={16} className="text-amber-500" /> },
  { type: 'video', label: 'Video Upload', icon: <Video size={16} className="text-purple-500" />, pro: true },
];

export const CreateWizard = () => {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const isEdit = !!editId;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    primaryColor: '#1152d4',
    headerImage: '',
    youtube: '',
    tiktok: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    whatsapp: '',
    telegram: '',
    other: '',
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [fields, setFields] = useState<FormField[]>([]);
  const [savedFormId, setSavedFormId] = useState(editId || '');
  const [saving, setSaving] = useState(false);

  // Load existing form for edit mode
  useEffect(() => {
    if (editId && orgId) {
      formService.getForm(orgId, editId).then((res) => {
        const form = res.data.form || res.data;
        setFormData({ 
          title: form.title, 
          description: form.description, 
          primaryColor: form.branding?.primaryColor || '#1152d4', 
          headerImage: form.branding?.headerImage || '',
          youtube: form.branding?.socialLinks?.youtube || '',
          tiktok: form.branding?.socialLinks?.tiktok || '',
          instagram: form.branding?.socialLinks?.instagram || '',
          facebook: form.branding?.socialLinks?.facebook || '',
          twitter: form.branding?.socialLinks?.twitter || '',
          linkedin: form.branding?.socialLinks?.linkedin || '',
          whatsapp: form.branding?.socialLinks?.whatsapp || '',
          telegram: form.branding?.socialLinks?.telegram || '',
          other: form.branding?.socialLinks?.other || '',
        });
        setFields(form.fields || []);
        setSavedFormId(editId);
      }).catch((err: any) => toast.error(err.message || 'Failed to load form'));
    }
  }, [editId, orgId]);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const calculateProgress = () => ((step - 1) / (totalSteps - 1)) * 100;

  // STEP 1: Save form details
  const handleSaveDetails = async () => {
    if (!formData.title.trim()) { toast.error('Title is required'); return; }
    if (!orgId) { toast.error('Organization not found'); return; }
    setSaving(true);
    try {
      if (savedFormId) {
        await formService.updateForm(orgId, savedFormId, { title: formData.title, description: formData.description });
        toast.success('Form details updated');
      } else {
        const res = await formService.createForm(orgId, { title: formData.title, description: formData.description });
        const newId = res.data.form?.id || res.data.form?._id || (res.data as any)?.id;
        setSavedFormId(newId);
        toast.success('Form created!');
      }
      nextStep();
    } catch (err: any) { 
      const msg = err.message || 'Failed to save';
      if ((msg.toLowerCase().includes('maximum number') || msg.toLowerCase().includes('limit')) && 
          (!organization?.subscription || (organization.subscription as any)?.plan === 'free')) {
        setShowUpgradeModal(true);
      } else {
        toast.error(msg); 
      }
    }
    finally { setSaving(false); }
  };

  // STEP 2: Add field
  const addField = (type: FieldType) => {
    const newField: FormField = {
      fieldId: `field_${Date.now()}`,
      label: type === 'page_break' ? 'Page Break' : type === 'video' ? 'Video Upload' : `New ${type} field`,
      type,
      required: type === 'page_break' ? false : false,
      order: fields.length,
      placeholder: type === 'page_break' ? '' : '',
      options: ['select', 'radio', 'checkbox'].includes(type) ? [{ label: 'Option 1', value: 'option_1' }] : undefined,
    };
    setFields([...fields, newField]);
  };

  const removeField = (fieldId: string) => {
    setFields(fields.filter((f) => f.fieldId !== fieldId));
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => f.fieldId === fieldId ? { ...f, ...updates } : f));
  };

  const addOption = (fieldId: string) => {
    setFields(fields.map((f) => {
      if (f.fieldId !== fieldId) return f;
      const opts = f.options || [];
      return { ...f, options: [...opts, { label: `Option ${opts.length + 1}`, value: `option_${opts.length + 1}` }] };
    }));
  };

  // STEP 2: Save fields
  const handleSaveFields = async () => {
    if (!savedFormId || !orgId) return;
    setSaving(true);
    try {
      await formService.updateForm(orgId, savedFormId, { fields });
      toast.success('Form fields saved!');
      nextStep();
    } catch (err: any) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  // STEP 3: Save branding
  const handleSaveBranding = async () => {
    if (!savedFormId || !orgId) return;
    setSaving(true);
    try {
      await formService.updateForm(orgId, savedFormId, { 
        branding: { 
          primaryColor: formData.primaryColor,
          headerImage: formData.headerImage,
          socialLinks: {
            youtube: formData.youtube,
            tiktok: formData.tiktok,
            instagram: formData.instagram,
            facebook: formData.facebook,
            twitter: formData.twitter,
            linkedin: formData.linkedin,
            whatsapp: formData.whatsapp,
            telegram: formData.telegram,
            other: formData.other,
          }
        } as any 
      });
      toast.success('Branding saved!');
      nextStep();
    } catch (err: any) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  // STEP 4: Publish
  const handlePublish = async () => {
    if (!savedFormId || !orgId) return;
    setSaving(true);
    try {
      await formService.publishForm(orgId, savedFormId);
      toast.success('Form published! 🎉');
      navigate('/dashboard/forms');
    } catch (err: any) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Wizard Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex min-w-[288px] flex-col gap-1">
            <p className="text-2xl font-black leading-tight tracking-tight text-foreground">
              {step === 1 && 'Form Details'}
              {step === 2 && 'Add Questions'}
              {step === 3 && 'Form Branding'}
              {step === 4 && 'Review & Publish'}
            </p>
            <p className="text-sm font-normal leading-normal text-muted-foreground">
              {step === 1 && 'Step 1: Set up your form information.'}
              {step === 2 && 'Step 2: Build your form structure.'}
              {step === 3 && 'Step 3: Customize the look and feel.'}
              {step === 4 && 'Step 4: Review and publish your form.'}
            </p>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-2">
            <div className="flex items-center justify-between gap-6">
              <p className="text-sm font-medium leading-normal text-foreground">Progress</p>
              <p className="rounded bg-muted px-2 py-0.5 text-xs font-bold leading-normal text-foreground">
                Step {step}/{totalSteps}
              </p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${calculateProgress()}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: Details */}
      {step === 1 && (
        <div className="flex flex-1 items-start justify-center pt-6">
          <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-8">
              <h2 className="mb-1 text-lg font-bold text-foreground">General Information</h2>
              <p className="text-sm text-muted-foreground">These details will be visible to your users.</p>
            </div>
            <div className="flex flex-col gap-6 p-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">Form Title <span className="text-destructive">*</span></label>
                <input
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Volunteer Registration"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">Description</label>
                <textarea
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what this form is for..."
                />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border bg-muted/30 px-8 py-6">
              <button onClick={() => navigate('/dashboard/forms')} className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
                Cancel
              </button>
              <button onClick={handleSaveDetails} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save & Next'} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Fields Builder */}
      {step === 2 && (
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Field Types */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <div className="border-b border-border pb-2">
              <h2 className="text-base font-bold tracking-tight text-foreground">Field Types</h2>
            </div>
            <div className="flex flex-col gap-2">
              {FIELD_TYPES.map((ft) => (
                <button
                  key={ft.type}
                  onClick={() => addField(ft.type)}
                  className={`flex items-center gap-3 rounded-lg border bg-card p-3 text-sm font-medium text-foreground shadow-sm transition-all hover:shadow-md ${
                    ft.type === 'page_break' ? 'border-amber-500/30 hover:border-amber-500' : ft.pro ? 'border-purple-500/30 hover:border-purple-500' : 'border-border hover:border-primary'
                  }`}
                >
                  {ft.icon || <Plus size={16} className="text-muted-foreground" />}
                  {ft.label}
                  {ft.pro && <Lock size={12} className="ml-auto text-amber-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex flex-col gap-4 lg:col-span-9">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight text-foreground">Form Canvas ({fields.length} fields)</h2>
              <div className="flex gap-2">
                <button onClick={prevStep} className="rounded-lg border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted">
                  <ArrowLeft size={14} className="inline mr-1" /> Back
                </button>
                <button onClick={handleSaveFields} disabled={saving} className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save & Next'}
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-y-auto rounded-xl border border-border bg-muted/30 p-4 shadow-inner md:p-6">
              {fields.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                  <GripVertical size={32} className="opacity-50" />
                  <p className="text-sm">Click a field type on the left to add it here</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {fields.map((field, idx) => (
                    field.type === 'page_break' ? (
                      /* ── Page Break Visual Divider ── */
                      <div key={field.fieldId} className="relative flex items-center gap-4 py-2">
                        <div className="flex-1 border-t-2 border-dashed border-amber-500/40" />
                        <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 dark:bg-amber-950/30 px-4 py-1.5">
                          <SeparatorHorizontal size={14} className="text-amber-600" />
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Page Break</span>
                        </div>
                        <div className="flex-1 border-t-2 border-dashed border-amber-500/40" />
                        <button onClick={() => removeField(field.fieldId)} className="absolute -right-1 -top-1 text-muted-foreground hover:text-destructive">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                    <div key={field.fieldId} className={`rounded-lg border bg-card p-5 shadow-sm ${field.type === 'video' ? 'border-purple-500/30' : 'border-border'}`}>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {field.type === 'video' && <Video size={14} className="text-purple-500" />}
                          <span className="text-xs font-medium text-muted-foreground uppercase">{field.type} · #{idx + 1}</span>
                          {field.type === 'video' && <span className="rounded bg-purple-100 dark:bg-purple-900/30 px-1.5 py-0.5 text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">Pro</span>}
                        </div>
                        <button onClick={() => removeField(field.fieldId)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-muted-foreground">Label</label>
                          <input
                            value={field.label}
                            onChange={(e) => updateField(field.fieldId, { label: e.target.value })}
                            className="h-9 rounded border border-border bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-muted-foreground">Placeholder</label>
                          <input
                            value={field.placeholder || ''}
                            onChange={(e) => updateField(field.fieldId, { placeholder: e.target.value })}
                            className="h-9 rounded border border-border bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                      {field.type === 'video' && (
                        <div className="mt-3 rounded-lg border border-dashed border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20 p-3">
                          <p className="text-xs text-purple-600 dark:text-purple-400">📹 Respondents can record or upload a video (max 3 minutes). Requires Pro plan.</p>
                        </div>
                      )}
                      <label className="mt-3 flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateField(field.fieldId, { required: e.target.checked })}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">Required</span>
                      </label>
                      {field.options && (
                        <div className="mt-3 flex flex-col gap-2">
                          <label className="text-xs text-muted-foreground">Options</label>
                          {field.options.map((opt, oi) => (
                            <input
                              key={oi}
                              value={opt.label}
                              onChange={(e) => {
                                const newOpts = [...(field.options || [])];
                                newOpts[oi] = { label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, '_') };
                                updateField(field.fieldId, { options: newOpts });
                              }}
                              className="h-8 rounded border border-border bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                            />
                          ))}
                          <button onClick={() => addOption(field.fieldId)} className="self-start text-xs text-primary hover:underline">
                            + Add option
                          </button>
                        </div>
                      )}
                    </div>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Branding */}
      {step === 3 && (
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <h2 className="border-b border-border pb-2 text-lg font-bold tracking-tight text-foreground">Logo Upload</h2>
              <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/50 p-8 text-center transition-colors hover:bg-muted overflow-hidden">
                <input 
                  type="file" 
                  accept="image/svg+xml, image/png, image/jpeg" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 1024 * 1024) {
                        toast.error('Image must be less than 1MB');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData((prev) => ({ ...prev, headerImage: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
                {formData.headerImage ? (
                  <img src={formData.headerImage} alt="Logo preview" className="max-h-24 object-contain" />
                ) : (
                  <>
                    <div className="flex size-12 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors group-hover:text-primary">
                      <CloudUpload size={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 1MB)</p>
                    </div>
                  </>
                )}
              </label>
              {formData.headerImage && (
                <button 
                  onClick={() => setFormData((prev) => ({ ...prev, headerImage: '' }))}
                  className="text-xs text-destructive hover:underline self-start"
                >
                  Remove logo
                </button>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="border-b border-border pb-2 text-lg font-bold tracking-tight text-foreground">Theme Colors</h2>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">Primary Color</label>
                <div className="flex flex-wrap gap-3">
                  {['#1152d4', '#059669', '#7c3aed', '#e11d48', '#ea580c'].map((c) => (
                    <button key={c} onClick={() => setFormData({ ...formData, primaryColor: c })}
                      className={`size-8 rounded-full transition-transform hover:scale-110 ${formData.primaryColor === c ? 'ring-2 ring-offset-2 ring-offset-background' : ''}`}
                      style={{ backgroundColor: c}}
                    />
                  ))}
                  <input type="color" className="h-8 w-12 cursor-pointer rounded border border-border bg-background p-0"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 mt-4 pt-6 border-t border-border">
              <h2 className="border-b border-border pb-2 text-lg font-bold tracking-tight text-foreground">Social Media Links</h2>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">YouTube</label>
                <div className="relative">
                  <input type="url" placeholder="https://youtube.com/..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary" value={formData.youtube} onChange={e => setFormData({...formData, youtube: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">TikTok</label>
                <div className="relative">
                  <input type="url" placeholder="https://tiktok.com/@..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary" value={formData.tiktok} onChange={e => setFormData({...formData, tiktok: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">Instagram</label>
                <div className="relative">
                  <input type="url" placeholder="https://instagram.com/..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">Facebook</label>
                <div className="relative">
                  <input type="url" placeholder="https://facebook.com/..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary" value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">Twitter</label>
                <div className="relative">
                  <input type="url" placeholder="https://twitter.com/..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">LinkedIn</label>
                <div className="relative">
                  <input type="url" placeholder="https://linkedin.com/..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">WhatsApp</label>
                <div className="relative">
                  <input type="url" placeholder="https://wa.me/..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">Telegram</label>
                <div className="relative">
                  <input type="url" placeholder="https://t.me/..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary" value={formData.telegram} onChange={e => setFormData({...formData, telegram: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">Other</label>
                <div className="relative">
                  <input type="url" placeholder="https://..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary" value={formData.other} onChange={e => setFormData({...formData, other: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="mt-auto flex gap-4 pt-6">
              <button onClick={prevStep} className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">Back</button>
              <button onClick={handleSaveBranding} disabled={saving} className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50">
                {saving ? 'Saving...' : 'Next Step'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Live Preview</h2>
            <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-muted/30 p-6 shadow-inner md:p-10">
              <div className="mx-auto flex h-full w-full max-w-lg flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
                  <div className="mb-8 text-center flex flex-col items-center">
                    {formData.headerImage && (
                      <img src={formData.headerImage} alt="Form Logo" className="mb-4 max-h-16 object-contain" />
                    )}
                    <h3 className="mb-2 text-2xl font-bold text-foreground">{formData.title || 'Untitled Form'}</h3>
                    <p className="text-sm text-muted-foreground">{formData.description}</p>
                  </div>
                  <div className="space-y-4">
                    {fields.slice(0, 3).map((f) => (
                      <div key={f.fieldId}>
                        <label className="mb-1 block text-sm font-medium text-foreground">{f.label}</label>
                        <div className="h-10 w-full rounded border border-border bg-background" />
                      </div>
                    ))}
                    <button className="mt-4 w-full rounded-md px-4 py-2.5 text-sm font-medium text-white shadow-sm" style={{ backgroundColor: formData.primaryColor }}>
                      Submit
                    </button>
                  </div>
                </div>
                {(!organization?.subscription || (organization.subscription as any)?.plan === 'free') && (
                  <div className="bg-muted/30 p-4 border-t border-border flex justify-center items-center gap-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <span className="material-symbols-outlined text-[16px]">bolt</span>
                      <span className="text-xs font-medium">Powered by <span className="font-bold text-foreground">NYDev Platform</span></span>
                    </div>
                    <div className="h-4 w-px bg-border"></div>
                    <button onClick={() => navigate('/dashboard/billing')} className="text-[10px] bg-muted hover:bg-muted/80 text-foreground px-2.5 py-1 rounded font-semibold transition-colors uppercase tracking-wide">
                      Upgrade to Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Publish */}
      {step === 4 && (
        <div className="flex flex-1 items-start justify-center pt-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-sm text-center p-12">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6 dark:bg-green-900/20">
              <Share2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{isEdit ? 'Save Changes' : 'Ready to Publish!'}</h2>
            <p className="text-muted-foreground mb-2">
              <strong>{formData.title}</strong> has <strong>{fields.length}</strong> fields configured.
            </p>
            <p className="text-muted-foreground mb-8">
              {isEdit ? 'Your changes have been saved. You can publish or continue editing.' : 'Publish your form to start collecting registrations.'}
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={prevStep} className="rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted">
                Go Back
              </button>
              <button onClick={handlePublish} disabled={saving} className="rounded-lg bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50">
                {saving ? 'Publishing...' : 'Publish Form'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer / Modals */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-card rounded-xl p-8 shadow-2xl border border-border">
            <h3 className="text-xl font-bold mb-2 text-foreground">Upgrade to Pro</h3>
            <p className="text-muted-foreground mb-6">
              You have reached the maximum number of custom forms for your current plan. Upgrade to Pro to create unlimited forms and unlock premium features.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowUpgradeModal(false)} className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">
                Cancel
              </button>
              <button onClick={() => navigate('/dashboard/billing')} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWizard;
