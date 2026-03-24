import { Search, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const templates = [
  {
    id: 1,
    category: 'CHURCHES',
    title: 'Volunteer Sign-up',
    description: 'Recruit volunteers for ministry teams efficiently. Includes skill selection and schedule preferences.',
    color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
    icon: 'church',
  },
  {
    id: 2,
    category: 'EVENTS',
    title: 'Event Registration',
    description: 'Complete registration flow with ticket tiers, dietary requirements, and payment integration.',
    color: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    icon: 'event',
  },
  {
    id: 3,
    category: 'NGOs',
    title: 'Donation Form',
    description: 'Optimized for conversion with preset amounts, recurring options, and dedicated fund selection.',
    color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
    icon: 'volunteer_activism',
    popular: true,
  },
  {
    id: 4,
    category: 'EDUCATION',
    title: 'Scholarship App',
    description: 'Detailed application form for educational grants, including file uploads for transcripts.',
    color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    icon: 'school',
  },
  {
    id: 5,
    category: 'MARKETING',
    title: 'Newsletter Sign-up',
    description: 'Simple, high-conversion form to grow your audience. Perfect for embedding in footers.',
    color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    icon: 'mail',
  },
  {
    id: 6,
    category: 'GENERAL',
    title: 'Contact Us',
    description: 'Standard contact form with validation for email and required message fields.',
    color: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    icon: 'chat',
  },
];

export const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex min-w-[288px] flex-col gap-2">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-foreground">Template Library</h1>
            <p className="text-base font-normal leading-normal text-muted-foreground">
              Start with a professionally designed template or create your own.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/forms/new/wizard')}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            <Plus size={20} />
            Create from Scratch
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-foreground placeholder-muted-foreground shadow-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
            placeholder="Search templates (e.g., Volunteer, Donation)"
            type="text"
          />
        </div>
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          <button className="whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors">
            All Templates
          </button>
          {['Churches', 'Events', 'Education', 'NGOs'].map((cat) => (
            <button
              key={cat}
              className="whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
          >
            <div className="relative flex h-48 items-end justify-center overflow-hidden bg-muted p-6">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/90 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => navigate('/dashboard/forms/new/wizard')}
                  className="rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground shadow-lg transition-transform hover:scale-105"
                >
                  Preview Template
                </button>
              </div>
              <div className="relative w-full max-w-[240px] translate-y-2 transform rounded-t-lg border-x border-t border-border bg-card p-4 shadow-md transition-transform duration-300 group-hover:translate-y-0">
                <div className="flex flex-col gap-3">
                  <div className="mb-1 flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded bg-primary/20 text-[10px] text-primary">
                      <div className="size-3 rounded-full bg-primary" />
                    </div>
                    <div className="h-2 w-16 rounded bg-muted-foreground/30"></div>
                  </div>
                  <div className="h-2 w-full rounded bg-muted-foreground/20"></div>
                  <div className="h-2 w-2/3 rounded bg-muted-foreground/20"></div>
                  <div className="mt-1 h-8 w-full rounded border border-primary/20 bg-primary/10"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`mb-2 inline-block rounded px-2 py-1 text-xs font-semibold tracking-wide ${tpl.color}`}
                  >
                    {tpl.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{tpl.title}</h3>
                </div>
                {tpl.popular && (
                  <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-500 dark:border-amber-800 dark:bg-amber-900/20">
                    Popular
                  </span>
                )}
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">{tpl.description}</p>
              <div className="mt-auto flex gap-3 pt-2">
                <button
                  onClick={() => navigate('/dashboard/forms/new/wizard')}
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Use Template
                </button>
                <button className="rounded-lg border border-border px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <Eye size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
