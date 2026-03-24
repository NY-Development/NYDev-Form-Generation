import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CloudUpload, Edit3, Share2 } from 'lucide-react';

export const CreateWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form State
  const [formData, setFormData] = useState({
    title: 'Volunteer Registration',
    description: 'Join the Real Worship Ministry team and make a difference.',
    category: 'ngo',
    primaryColor: '#1152d4',
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinish = () => {
    // Navigate to admin detailed view or back to dashboard
    navigate('/dashboard');
  };

  const calculateProgress = () => ((step - 1) / (totalSteps - 1)) * 100;

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
              {step === 4 && 'Integrations & Finish'}
            </p>
            <p className="text-sm font-normal leading-normal text-muted-foreground">
              {step === 1 && 'Step 1: Set up your form information.'}
              {step === 2 && 'Step 2: Build your form structure.'}
              {step === 3 && 'Step 3: Customize the look and feel of your form.'}
              {step === 4 && 'Step 4: Connect to tools and publish.'}
            </p>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-2">
            <div className="flex items-center justify-between gap-6">
              <p className="text-sm font-medium leading-normal text-foreground">Wizard Progress</p>
              <p className="rounded bg-muted px-2 py-0.5 text-xs font-bold leading-normal text-foreground">
                Step {step}/{totalSteps}
              </p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="flex flex-1 items-start justify-center pt-6">
          <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-8">
              <h2 className="mb-1 text-lg font-bold text-foreground">General Information</h2>
              <p className="text-sm text-muted-foreground">
                Define the core identity of your form. These details will be visible to your users.
              </p>
            </div>
            <div className="flex flex-col gap-6 p-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  Form Title <span className="text-destructive">*</span>
                </label>
                <input
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">Description</label>
                <textarea
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border bg-muted/30 px-8 py-6">
              <button
                onClick={() => navigate('/dashboard/forms')}
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={nextStep}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Save & Next <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Builder Sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <div className="flex flex-col gap-4">
              <div className="border-b border-border pb-2">
                <h2 className="text-base font-bold tracking-tight text-foreground">Field Types</h2>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Basic Fields
                </div>
                {['Short Text', 'Long Text', 'Multiple Choice', 'Checkboxes'].map((field) => (
                  <div
                    key={field}
                    className="group flex cursor-grab select-none items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:border-primary hover:shadow-md"
                  >
                    <Edit3 size={18} className="text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm font-medium text-foreground">{field}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Builder Canvas */}
          <div className="flex flex-col gap-4 lg:col-span-9">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight text-foreground">Form Canvas</h2>
              <div className="flex gap-2">
                <button onClick={prevStep} className="rounded-lg border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted">
                  Back
                </button>
                <button onClick={nextStep} className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  Next Step
                </button>
              </div>
            </div>
            <div className="relative flex-1 overflow-y-auto rounded-xl border border-border bg-muted/30 p-6 shadow-inner md:p-10">
              <div className="mx-auto flex w-full max-w-3xl flex-col rounded-lg border border-border bg-card shadow-xl min-h-[400px]">
                <div className="relative border-b border-border p-8 text-center group">
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-primary"></div>
                  <h3 className="mb-2 text-3xl font-bold text-foreground">{formData.title}</h3>
                  <p className="text-sm text-muted-foreground">{formData.description}</p>
                </div>
                <div className="flex flex-col gap-6 p-8">
                  {/* Mock Form Field */}
                  <div className="rounded-lg border border-border bg-muted/20 p-5">
                    <label className="mb-2 block text-sm font-semibold text-foreground">Full Name *</label>
                    <div className="h-10 w-full rounded border border-border bg-background"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <h2 className="border-b border-border pb-2 text-lg font-bold tracking-tight text-foreground">
                Logo Upload
              </h2>
              <div className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/50 p-8 text-center transition-colors hover:bg-muted">
                <div className="flex size-12 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors group-hover:text-primary">
                  <CloudUpload size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 800x400px)</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="border-b border-border pb-2 text-lg font-bold tracking-tight text-foreground">
                Theme Colors
              </h2>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-foreground">Primary Color</label>
                <div className="flex flex-wrap gap-3">
                  <button className="size-8 rounded-full bg-[#1152d4] ring-2 ring-[#1152d4] ring-offset-2 ring-offset-background"></button>
                  <button className="size-8 rounded-full bg-emerald-600 transition-transform hover:scale-110"></button>
                  <button className="size-8 rounded-full bg-purple-600 transition-transform hover:scale-110"></button>
                  <input
                    type="color"
                    className="h-8 w-12 cursor-pointer rounded border border-border bg-background p-0"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="mt-auto flex gap-4 pt-6">
              <button
                onClick={prevStep}
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Next Step
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Live Preview</h2>
            <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-muted/30 p-6 shadow-inner md:p-10">
              <div className="mx-auto flex h-full w-full max-w-lg flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">{formData.title}</h3>
                    <p className="text-sm text-muted-foreground">{formData.description}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-10 w-full rounded border border-border bg-background"></div>
                    <div className="h-10 w-full rounded border border-border bg-background"></div>
                    <button
                      className="mt-4 w-full rounded-md px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors"
                      style={{ backgroundColor: formData.primaryColor }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-1 items-start justify-center pt-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-sm text-center p-12">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
              <Share2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">You're Ready to Publish!</h2>
            <p className="text-muted-foreground mb-8">
              Your form "{formData.title}" is fully designed and structured. You can now publish it to start collecting registrations.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={prevStep}
                className="rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted"
              >
                Go Back
              </button>
              <button
                onClick={handleFinish}
                className="rounded-lg bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Publish Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWizard;
