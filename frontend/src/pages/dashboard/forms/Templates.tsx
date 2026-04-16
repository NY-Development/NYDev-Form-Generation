import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Search, FileText } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { formService } from '../../../services/form.service';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { toast } from 'sonner';
import type { Form } from '../../../types';

const CATEGORIES = ['', 'Education', 'Events', 'Healthcare', 'Business', 'General'];

export const Templates = () => {
  const navigate = useNavigate();
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';

  const [templates, setTemplates] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [cloning, setCloning] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await formService.getTemplates(category || undefined);
        setTemplates(res.data.templates || res.data || []);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load templates');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category]);

  const handleClone = async (templateId: string) => {
    if (!orgId) { toast.error('Organization not found'); return; }
    setCloning(templateId);
    try {
      const res = await formService.cloneTemplate(orgId, templateId);
      const newFormId = res.data.form?.id || res.data.form?._id;
      toast.success('Template cloned! Redirecting to form editor...');
      navigate(`/dashboard/forms/${newFormId}/edit`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to clone template');
    } finally {
      setCloning('');
    }
  };

  const filtered = templates.filter((t) =>
    !search || t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <button onClick={() => navigate('/dashboard/forms')} className="flex items-center gap-1 text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to Forms
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Template Library</h1>
        <p className="text-muted-foreground">Start from a pre-built template and customize it to your needs.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm placeholder-muted-foreground shadow-sm outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Search templates..."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                category === c ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {c || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <LoadingSpinner className="py-20" text="Loading templates..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-8 w-8" />}
          title="No templates found"
          description="Try a different search term or category."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => {
            const tId = template.id || template._id || '';
            return (
              <div
                key={tId}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="relative h-36 w-full" style={{ backgroundColor: template.branding?.primaryColor || '#3b82f6' }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <FileText size={64} className="text-white" />
                  </div>
                  {template.template?.category && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                      {template.template.category}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 text-lg font-bold text-foreground">{template.title}</h3>
                  <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
                    {template.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template.fields?.length || 0} fields</span>
                  </div>
                </div>

                <div className="border-t border-border p-4">
                  <button
                    onClick={() => handleClone(tId)}
                    disabled={cloning === tId}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Copy size={16} />
                    {cloning === tId ? 'Cloning...' : 'Use This Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Templates;
