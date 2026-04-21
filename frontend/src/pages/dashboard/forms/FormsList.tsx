import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, Trash2, Globe, Lock, Edit, BarChart2, ExternalLink } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { formService } from '../../../services/form.service';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { toast } from 'sonner';
import type { Form, Pagination } from '../../../types';

export const FormsList = () => {
  const navigate = useNavigate();
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';

  const [forms, setForms] = useState<Form[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const fetchForms = useCallback(async () => {
    if (!orgId) return;
    setLoading(true);
    try {
      const res = await formService.getForms(orgId, { page, limit: 10, search, status: statusFilter || undefined });
      setForms(res.data || []);
      setPagination(res.pagination || null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load forms');
    } finally {
      setLoading(false);
    }
  }, [orgId, page, search, statusFilter]);

  useEffect(() => { 
    // Force a reload on initial navigation to ensure fresh data fetching
    const hasReloaded = sessionStorage.getItem('forms_reloaded');
    if (!hasReloaded) {
      sessionStorage.setItem('forms_reloaded', 'true');
      window.location.reload();
    } else {
      setTimeout(() => sessionStorage.removeItem('forms_reloaded'), 1000);
      fetchForms(); 
    }
  }, [fetchForms]);

  const handlePublish = async (formId: string) => {
    try {
      await formService.publishForm(orgId, formId);
      toast.success('Form published!');
      fetchForms();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleClose = async (formId: string) => {
    try {
      await formService.closeForm(orgId, formId);
      toast.success('Form closed.');
      fetchForms();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (formId: string) => {
    if (!confirm('Are you sure you want to delete this form?')) return;
    try {
      await formService.deleteForm(orgId, formId);
      toast.success('Form deleted.');
      fetchForms();
    } catch (err: any) { toast.error(err.message); }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'published':
        return {
          bar: 'bg-primary',
          badge: 'bg-blue-50 text-primary',
          text: 'text-primary',
          label: 'Active'
        };
      case 'closed':
        return {
          bar: 'bg-error',
          badge: 'bg-error-container text-on-error-container',
          text: 'text-on-surface',
          label: 'Closed'
        };
      default: // draft
        return {
          bar: 'bg-on-surface-variant/30',
          badge: 'bg-surface-container-low text-on-surface-variant',
          text: 'text-on-surface-variant/40',
          label: 'Draft'
        };
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-on-surface mb-2">My Forms</h2>
          <p className="text-on-surface-variant max-w-md">Manage your organization's registration workflows and analyze submission data in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/forms/templates')}
            className="flex items-center gap-2 px-6 py-3 bg-surface border border-outline-variant rounded-lg font-bold text-on-surface shadow-sm hover:border-primary transition-all"
          >
            Templates
          </button>
          <button
            onClick={() => navigate('/dashboard/forms/new')}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-[2px] active:scale-95 transition-all"
          >
            <Plus size={20} />
            <span>Create New Form</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex bg-surface rounded-lg p-1 shadow-sm border border-outline-variant/50">
          {[
            { value: '', label: 'All Forms' },
            { value: 'published', label: 'Active' },
            { value: 'draft', label: 'Drafts' },
            { value: 'closed', label: 'Closed' }
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => { setStatusFilter(filter.value); setPage(1); }}
              className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                statusFilter === filter.value
                  ? 'font-bold bg-primary text-white'
                  : 'font-semibold text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="relative w-full max-w-sm ml-auto sm:ml-4 flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" size={16} />
          <input 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/60 shadow-sm" 
            placeholder="Search forms..." 
            type="text"
          />
        </div>
        
        {pagination && (
          <div className="ml-auto text-sm font-medium text-on-surface-variant hidden md:block">
            Showing <span className="text-on-surface font-bold">{pagination.total}</span> forms
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSpinner className="py-20" text="Loading forms..." />
      ) : forms.length === 0 ? (
        <div 
          onClick={() => navigate('/dashboard/forms/templates')}
          className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-outline-variant rounded-xl hover:border-primary/50 transition-all group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-surface shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText className="text-primary w-8 h-8" />
          </div>
          <p className="font-bold text-on-surface">Start from a template</p>
          <p className="text-sm text-on-surface-variant text-center mt-1">Quickly launch a registration form using pre-built ministry templates.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {forms.map((form) => {
              const fId = form.id || form._id || '';
              const styles = getStatusStyles(form.status);
              
              return (
                <div key={fId} className="group bg-surface rounded-xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-[4px] transition-all duration-300 border border-transparent hover:border-primary/10 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${styles.bar}`}></div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles.badge}`}>
                      {form.status === 'published' && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
                      {styles.label}
                    </div>
                    <div className="text-on-surface-variant/40 text-[10px] font-bold">
                      CREATED {form.createdAt ? new Date(form.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase() : ''}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-on-surface mb-2 tracking-tight">{form.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                    {form.description || 'No description provided.'}
                  </p>
                  
                  <div className="flex items-end justify-between border-t border-outline-variant pt-6">
                    <div>
                      <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Registrations</div>
                      <div className={`text-3xl font-black tracking-tighter ${styles.text}`}>
                        {form.submissionCount || 0}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {form.link && (
                        <button onClick={() => window.open(form.link, '_blank')} className="p-2 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors" title="Open sharing link">
                          <ExternalLink size={18} />
                        </button>
                      )}
                      {form.status === 'draft' && (
                        <button onClick={() => handlePublish(fId)} className="p-2 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors" title="Publish">
                          <Globe size={18} />
                        </button>
                      )}
                      
                      <button onClick={() => navigate(`/dashboard/forms/${fId}/edit`)} className="p-2 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                      
                      {form.status !== 'draft' && (
                        <button onClick={() => navigate(`/dashboard/forms/${fId}/submissions`)} className="p-2 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors" title="View Results">
                          <BarChart2 size={18} />
                        </button>
                      )}
                      
                      {form.status === 'published' && (
                        <button onClick={() => handleClose(fId)} className="p-2 rounded-lg hover:bg-amber-100 text-on-surface-variant hover:text-amber-600 transition-colors" title="Close">
                          <Lock size={18} />
                        </button>
                      )}
                      
                      <button onClick={() => handleDelete(fId)} className="p-2 rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Template Card at the end */}
            <div 
              onClick={() => navigate('/dashboard/forms/templates')}
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-outline-variant rounded-xl hover:border-primary/50 transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-surface shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-primary w-8 h-8" />
              </div>
              <p className="font-bold text-on-surface">Start from a template</p>
              <p className="text-sm text-on-surface-variant text-center mt-1">Quickly launch a registration form using pre-built ministry templates.</p>
            </div>
          </div>
          
          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-outline-variant mt-6">
              <p className="text-sm text-on-surface-variant">
                Page {pagination.page} of {pagination.pages}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="h-10 rounded-lg border border-outline-variant bg-surface px-4 text-sm font-semibold text-on-surface disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-container-low transition-colors shadow-sm"
                >
                  Previous
                </button>
                <button
                  disabled={page >= pagination.pages}
                  onClick={() => setPage((p) => p + 1)}
                  className="h-10 rounded-lg border border-outline-variant bg-surface px-4 text-sm font-semibold text-on-surface disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-container-low transition-colors shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FormsList;
