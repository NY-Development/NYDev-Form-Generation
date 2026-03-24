import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';

const guestRegistrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().optional(),
  source: z.string().optional(),
  accessibility: z.string().optional(),
});

type GuestRegistrationData = z.infer<typeof guestRegistrationSchema>;

export const FormView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestRegistrationData>({
    resolver: zodResolver(guestRegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      source: 'Social Media',
      accessibility: '',
    },
  });

  const onSubmit = async (data: GuestRegistrationData) => {
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate(`/f/${id}/success`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30 text-foreground">
      {/* Header */}
      <header className="z-10 flex items-center justify-between whitespace-nowrap border-b border-border bg-card px-10 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-2xl">church</span>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight text-foreground">
            Real Worship Ministry
          </h2>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <span className="truncate">Login</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-3xl flex-col gap-8">
          
          {/* Event Hero */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="relative flex h-48 w-full items-end bg-linear-to-r from-blue-600 to-indigo-700 p-8">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510590337019-5ef2d3977e2e?q=80&w=2670&auto=format&fit=crop')" }}
              ></div>
              <div className="relative z-10 text-white">
                <span className="mb-3 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium ring-1 ring-inset ring-white/30 backdrop-blur-sm">
                  Free Event
                </span>
                <h1 className="mb-2 text-4xl font-black leading-tight tracking-tight text-white/90 drop-shadow-sm">
                  Worship Night 2024
                </h1>
                <p className="flex items-center gap-2 text-lg font-medium text-blue-100">
                  <Calendar size={20} />
                  October 24, 2024 • 7:00 PM
                </p>
              </div>
            </div>
            <div className="p-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Join us for an evening of praise and worship. We are gathering together to lift the name of Jesus high. Invite your friends and family for a night that will refresh your soul.
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 rounded-xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-2 border-b border-border pb-2">
              <h3 className="mb-1 text-xl font-bold text-foreground">Guest Registration</h3>
              <p className="text-sm text-muted-foreground">Please fill in your details below to secure your spot.</p>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  First Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  placeholder="Jane"
                  className="h-11 w-full rounded-lg border border-border bg-background px-4 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
                {errors.firstName && <span className="text-xs text-destructive">{errors.firstName.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  Last Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  placeholder="Doe"
                  className="h-11 w-full rounded-lg border border-border bg-background px-4 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
                {errors.lastName && <span className="text-xs text-destructive">{errors.lastName.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="jane.doe@example.com"
                  className="h-11 w-full rounded-lg border border-border bg-background px-4 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
                {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">Phone Number</label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="(555) 123-4567"
                  className="h-11 w-full rounded-lg border border-border bg-background px-4 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
                {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
              </div>
            </div>

            {/* Custom Questions */}
            <div className="flex flex-col gap-6 border-t border-border pt-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">How did you hear about this event?</label>
                <select 
                  {...register('source')}
                  className="h-11 w-full rounded-lg border border-border bg-background px-4 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Social Media">Social Media</option>
                  <option value="Friend / Family">Friend / Family</option>
                  <option value="Church Announcement">Church Announcement</option>
                  <option value="Website">Website</option>
                  <option value="Other">Other</option>
                </select>
                {errors.source && <span className="text-xs text-destructive">{errors.source.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">Do you have any accessibility requirements?</label>
                <textarea
                  {...register('accessibility')}
                  placeholder="Please let us know if you need wheelchair access, etc."
                  className="min-h-[100px] w-full rounded-lg border border-border bg-background p-4 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                ></textarea>
                {errors.accessibility && <span className="text-xs text-destructive">{errors.accessibility.message}</span>}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-4 flex flex-col items-center justify-between gap-6 border-t border-border pt-6 md:flex-row">
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-muted-foreground">
                <ShieldCheck className="text-green-600" size={18} />
                <span className="text-xs font-medium uppercase tracking-wide">Secure & QR Enabled</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                {isSubmitting ? 'Processing...' : 'Complete Registration'}
                {!isSubmitting && <ArrowRight size={18} />}
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
