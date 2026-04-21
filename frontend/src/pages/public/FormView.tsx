import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';
import { publicService } from '../../services/public.service';
import { DynamicFormRenderer } from '../../components/forms/DynamicFormRenderer';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { toast } from 'sonner';
import type { FormField } from '../../types';

export const FormView = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      if (!slug) return;
      try {
        const res = await publicService.getPublicForm(slug);
        setForm(res.data.form || res.data);
      } catch (err: any) {
        setError(err.message || 'Form not found');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  const handleChange = (fieldId: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fields: FormField[] = form?.fields || [];
    
    fields.forEach((field) => {
      if (field.required) {
        const val = values[field.fieldId];
        if (!val || (typeof val === 'string' && !val.trim()) || (Array.isArray(val) && val.length === 0)) {
          newErrors[field.fieldId] = `${field.label} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!slug) return;

    setSubmitting(true);
    try {
      // Build submitter info from responses
      const emailField = form?.fields?.find((f: FormField) => f.type === 'email');
      const nameFields = form?.fields?.filter((f: FormField) => f.label.toLowerCase().includes('name'));
      
      const submitterEmail = emailField ? (values[emailField.fieldId] as string) : '';
      const submitterName = nameFields?.map((f: FormField) => values[f.fieldId]).filter(Boolean).join(' ') || '';

      const payload: any = { responses: values };
      if (submitterEmail) payload.submitterEmail = submitterEmail;
      if (submitterName) payload.submitterName = submitterName;

      const res = await publicService.submitPublicForm(slug, payload);

      toast.success('Registration submitted successfully!');
      navigate(`/f/${slug}/success`, {
        state: {
          submission: res.data.submission || res.data,
          formTitle: form?.title,
          confirmationMessage: form?.settings?.confirmationMessage,
          orgName: form?.organization?.name,
        },
      });
    } catch (err: any) {
      toast.error(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner fullPage text="Loading form..." />;

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-foreground">
        <div className="rounded-full bg-destructive/10 p-4 mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Form Not Found</h1>
        <p className="text-muted-foreground mb-6">{error}</p>
        <button onClick={() => navigate('/')} className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">
          Go Home
        </button>
      </div>
    );
  }

  const orgName = typeof form?.organization === 'object' ? form.organization.name : 'Organization';
  const orgLogo = typeof form?.organization === 'object' ? form.organization.logo : '';
  const fields: FormField[] = form?.fields || [];

  return (
    <div className="relative flex min-h-screen flex-col bg-background selection:bg-primary/30 text-foreground overflow-hidden">
      
      {/* Watermark for free plan */}
      {(!form?.organization?.subscription || form.organization.subscription.plan === 'free') && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center -z-10 overflow-hidden">
          <div className="text-[12vw] font-black text-primary/5 -rotate-12 whitespace-nowrap select-none">
            NYDEV FORMS
          </div>
        </div>
      )}

      {/* Header */}
      <header className="z-10 flex items-center justify-between whitespace-nowrap border-b border-border bg-card px-6 py-4 shadow-sm sm:px-10">
        <div className="flex items-center gap-4">
          <div
            className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary bg-cover bg-center bg-no-repeat font-bold"
            style={orgLogo ? { backgroundImage: `url(${orgLogo})` } : {}}
          >
            {!orgLogo && orgName?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight text-foreground">{orgName}</h2>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Login
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-3xl flex-col gap-8">
          
          {/* Event Hero */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div
              className={`relative flex w-full p-8 min-h-[16rem] items-end`}
              style={form?.branding?.headerImage ? { backgroundImage: `url(${form.branding.headerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundColor: form?.branding?.primaryColor || '#3b82f6' }}
            >
              {form?.branding?.headerImage && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              )}
              
              <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="text-white">
                  <h1 className="mb-2 text-4xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
                    {form?.title || 'Untitled Form'}
                  </h1>
                </div>

                {(form?.branding?.socialLinks?.youtube || form?.branding?.socialLinks?.tiktok || form?.branding?.socialLinks?.instagram) && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 shadow-sm">
                    {form?.branding?.socialLinks?.youtube && (
                      <a href={form.branding.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10">
                        <span className="material-symbols-outlined text-xl">smart_display</span>
                      </a>
                    )}
                    {form?.branding?.socialLinks?.tiktok && (
                      <a href={form.branding.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10">
                        <span className="material-symbols-outlined text-xl">music_note</span>
                      </a>
                    )}
                    {form?.branding?.socialLinks?.instagram && (
                      <a href={form.branding.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10">
                        <span className="material-symbols-outlined text-xl">photo_camera</span>
                      </a>
                    )}
                    {form?.branding?.socialLinks?.facebook && (
                      <a href={form.branding.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10">
                        <span className="material-symbols-outlined text-xl">facebook</span>
                      </a>
                    )}
                    {form?.branding?.socialLinks?.twitter && (
                      <a href={form.branding.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10">
                        <span className="material-symbols-outlined text-xl">close</span>
                      </a>
                    )}
                    {form?.branding?.socialLinks?.linkedin && (
                      <a href={form.branding.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10">
                        <span className="material-symbols-outlined text-xl">work</span>
                      </a>
                    )}
                    {form?.branding?.socialLinks?.whatsapp && (
                      <a href={form.branding.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10">
                        <span className="material-symbols-outlined text-xl">chat</span>
                      </a>
                    )}
                    {form?.branding?.socialLinks?.telegram && (
                      <a href={form.branding.socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10">
                        <span className="material-symbols-outlined text-xl">send</span>
                      </a>
                    )}
                    {form?.branding?.socialLinks?.other && (
                      <a href={form.branding.socialLinks.other} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10">
                        <span className="material-symbols-outlined text-xl">link</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            {form?.description && (
              <div className="p-8">
                <p className="text-lg leading-relaxed text-muted-foreground">{form.description}</p>
              </div>
            )}
          </div>

          {/* Registration Form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-8 rounded-xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-2 border-b border-border pb-2">
              <h3 className="mb-1 text-xl font-bold text-foreground">Registration</h3>
              <p className="text-sm text-muted-foreground">Please fill in your details below to complete your registration.</p>
            </div>

            {fields.length > 0 ? (
              <DynamicFormRenderer
                fields={fields}
                values={values}
                onChange={handleChange}
                errors={errors}
                enablePagination={true}
              />
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                This form has no fields configured yet.
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-4 flex flex-col items-center justify-between gap-6 border-t border-border pt-6 md:flex-row">
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-muted-foreground">
                <ShieldCheck className="text-green-600" size={18} />
                <span className="text-xs font-medium uppercase tracking-wide">Secure & QR Enabled</span>
              </div>
              <button
                type="submit"
                disabled={submitting || fields.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                {submitting ? 'Processing...' : 'Complete Registration'}
                {!submitting && <ArrowRight size={18} />}
              </button>
            </div>
          </form>

          {/* NYDev Branding */}
          <footer className="flex flex-col items-center justify-center gap-2 py-6 opacity-70 transition-opacity hover:opacity-100">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="text-xs font-medium uppercase tracking-widest">Powered by</span>
              <span className="flex items-center gap-1 font-bold text-foreground">
                <Terminal size={14} />
                NYDev Form Generator
              </span>
            </div>
            <a href="/" className="text-[10px] text-primary hover:underline">
              Create your own free form
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default FormView;
