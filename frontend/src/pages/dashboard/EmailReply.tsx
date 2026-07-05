import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  User, 
  Send, 
  Clock, 
  Mail, 
  Search, 
  History, 
  Layers, 
  Loader2,
  AlertCircle,
  FileText,
  Users,
  CheckSquare,
  Square,
  RefreshCw // Added for manual refetch utility
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '../../store/auth.store';
import { useFormStore } from '../../store/form.store';
import { 
  broadcastFormUpdate, 
  fetchFormUpdatesHistory, 
  formService 
} from '../../services/form.service';
import { submissionService } from '../../services/submission.service';

const EmailReply = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  const currentForm = useFormStore((state: any) => state.currentForm);
  const setCurrentForm = useFormStore((state: any) => state.setCurrentForm);
  
  const activeFormId = currentForm?.id || currentForm?._id || ""; 
  const orgId = typeof user?.organizationId === 'object' 
    ? (user.organizationId._id || user.organizationId.id || "") 
    : (user?.organizationId || "");

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formSearchQuery, setFormSearchQuery] = useState('');
  
  const [targetScope, setTargetScope] = useState<'all' | 'selected' | 'single'>('all');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [registrantFilter, setRegistrantFilter] = useState('');

  // Query: Fetch all organization forms
  const { data: formsData, isLoading: isLoadingForms, isError: isFormsError } = useQuery({
    queryKey: ['orgForms', orgId],
    queryFn: () => formService.getForms(orgId),
    enabled: !!orgId,
  });

  // Query: Fetch active form submissions to extract registrant emails
  const { 
    data: submissionsResponse, 
    isLoading: isLoadingSubmissions, 
    refetch: refetchSubmissions,
    isRefetching: isRefetchingSubmissions 
  } = useQuery({
    queryKey: ['formSubmissionsData', orgId, activeFormId],
    queryFn: () => submissionService.getSubmissions(orgId, activeFormId, { limit: 100 }),
    // Keeps fetching active even if it hits a failure, retrying every 60 seconds
    refetchInterval: 60 * 1000, 
    refetchIntervalInBackground: true,
    retry: true, // Will continually retry failing requests on failure cycles
    retryDelay: 60 * 10000, // Wait 10 minutes before executing the failure retry sequence
    enabled: !!orgId && !!activeFormId && targetScope !== 'all',
  });

  console.log('submissions : ', submissionsResponse);
  // Query: History Retrieval Track
  const { data: historyResponse, isLoading: isLoadingHistory, isError: isHistoryError } = useQuery({
    queryKey: ['formUpdates', orgId, activeFormId],
    queryFn: () => fetchFormUpdatesHistory(orgId, activeFormId),
    enabled: !!orgId && !!activeFormId,
  });

  // Mutations: Broadcast Engine Executor
  const mutation = useMutation({
    mutationFn: (payload: { subject: string; message: string; targetScope: string; recipientEmails: string[] }) => 
      broadcastFormUpdate(orgId, activeFormId, payload),
    onSuccess: () => {
      toast.success('Communication sequences transmitted successfully.');
      setSubject('');
      setMessage('');
      setSelectedEmails([]);
      queryClient.invalidateQueries({ queryKey: ['formUpdates', orgId, activeFormId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to dispatch mailing sequences.');
    }
  });

  // Extract unique registrants from submissions data mapping payload fields
  // Handle the nested structure safely check for either response configuration formats
  const rawSubmissions = Array.isArray(submissionsResponse?.data) 
    ? submissionsResponse.data 
    : (submissionsResponse as any)?.data?.data || [];
  
  // Create a normalized list of unique users based on email address
// Create a normalized list of unique users based on email address
  const uniqueRegistrants = React.useMemo(() => {
    const seen = new Set();
    const list: Array<{ email: string; name: string }> = [];
    
    rawSubmissions.forEach((sub: any) => {
      // FIX: Extracted using the active backend schema naming tokens matching FormAdminList
      const email = sub.submitterEmail || sub.email || sub.submittedBy?.email || sub.formData?.email;
      const name = sub.submitterName || sub.name || sub.submittedBy?.name || sub.formData?.name || 'Anonymous Registrant';
      
      if (email && !seen.has(email.toLowerCase())) {
        seen.add(email.toLowerCase());
        list.push({ email: email.toLowerCase(), name });
      }
    });
    
    return list;
  }, [rawSubmissions]);

  // Client side quick filter logic
  const filteredRegistrants = uniqueRegistrants.filter((reg) =>
    reg.email.toLowerCase().includes(registrantFilter.toLowerCase()) ||
    reg.name.toLowerCase().includes(registrantFilter.toLowerCase())
  );

  const handleToggleEmailSelection = (email: string) => {
    if (targetScope === 'single') {
      setSelectedEmails([email]); 
    } else {
      setSelectedEmails(prev => 
        prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
      );
    }
  };

  const handleSelectAllFiltered = () => {
    const filteredEmails = filteredRegistrants.map(r => r.email);
    const allFilteredAreSelected = filteredEmails.every(email => selectedEmails.includes(email));

    if (allFilteredAreSelected) {
      // Deselect all items matching the current filter string
      setSelectedEmails(prev => prev.filter(email => !filteredEmails.includes(email)));
    } else {
      // Append all items currently matching filter constraints uniquely
      setSelectedEmails(prev => Array.from(new Set([...prev, ...filteredEmails])));
    }
  };

  const handleDispatchMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFormId) {
      toast.error('Please select an active form context node before proceeding.');
      return;
    }
    if (targetScope !== 'all' && selectedEmails.length === 0) {
      toast.error('Please assign at least one target recipient from the registry pool.');
      return;
    }
    mutation.mutate({ 
      subject, 
      message, 
      targetScope, 
      recipientEmails: targetScope === 'all' ? [] : selectedEmails 
    });
  };

  const formsList = formsData?.data || [];
  const filteredForms = formsList.filter(form => 
    form.title.toLowerCase().includes(formSearchQuery.toLowerCase()) ||
    (form.description && form.description.toLowerCase().includes(formSearchQuery.toLowerCase()))
  );

  const logs = historyResponse?.data || [];
  const filteredLogs = logs.filter(log => 
    log.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    log.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[calc(100vh-8rem)]">
      
      {/* LEFT COLUMN: Context Dependent Panel */}
      <div className="lg:col-span-7 flex flex-col border border-border rounded-xl bg-card overflow-hidden shadow-xs">
        {!activeFormId ? (
          /* Subview: Interactive Form Selection Matrix */
          <>
            <div className="p-4 border-b border-border bg-muted/30 space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="text-primary" size={18} />
                <div>
                  <h3 className="text-sm font-bold text-foreground">Select Scope Registry</h3>
                  <p className="text-[11px] text-muted-foreground">Pick a blueprint target list below to attach the communications node.</p>
                </div>
              </div>
              <div className="flex items-center px-3 py-1.5 rounded-lg border border-input bg-background">
                <Search size={13} className="text-muted-foreground mr-2" />
                <input 
                  type="text" 
                  placeholder="Search application registries..." 
                  value={formSearchQuery}
                  onChange={(e) => setFormSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-xs outline-none w-full text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-muted/10">
              {isLoadingForms ? (
                <div className="flex flex-col items-center justify-center py-16 gap-2 text-xs text-muted-foreground">
                  <Loader2 size={24} className="animate-spin text-primary" />
                  <span>Scanning active ecosystem repositories...</span>
                </div>
              ) : isFormsError ? (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                  <AlertCircle size={14} />
                  <span>Failed loading workspace data repositories.</span>
                </div>
              ) : filteredForms.length === 0 ? (
                <div className="p-12 text-center text-xs text-muted-foreground italic border border-dashed border-border rounded-xl bg-background">
                  No operational form blueprints match your criteria.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {filteredForms.map((form: any) => {
                    const id = form.id || form._id;
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setCurrentForm(form);
                          setTargetScope('all');
                          setSelectedEmails([]);
                        }}
                        className="flex items-start text-left gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary/40 hover:bg-muted/5 transition-all cursor-pointer shadow-2xs group"
                      >
                        <div className="p-2 rounded-lg bg-muted border border-border text-muted-foreground group-hover:text-primary transition-colors">
                          <FileText size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-foreground truncate">{form.title}</h4>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{form.description || 'No description provided.'}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium capitalize border ${
                              form.status === 'published' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-muted border-border text-muted-foreground'
                            }`}>
                              {form.status || 'Draft'}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Subview: Active Formulation Editor Layout */
          <>
            <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="text-primary" size={18} />
                <div>
                  <h3 className="text-sm font-bold text-foreground">Outbound Bulk Mail Dispatch</h3>
                  <p className="text-[11px] text-muted-foreground">Targeting: <strong className="text-foreground font-semibold">{currentForm.title}</strong></p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentForm(null)}
                className="text-[10px] text-muted-foreground hover:text-foreground border border-border bg-background px-2 py-1 rounded-md transition-all cursor-pointer shadow-2xs"
              >
                Change Form Context
              </button>
            </div>

            <form onSubmit={handleDispatchMail} className="flex-1 p-6 space-y-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                
                {/* Segment: Choose Target Audience Scope */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">Audience Targeting Scope</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'all', label: 'All Users', icon: Users },
                      { id: 'selected', label: 'Selected Bunch', icon: CheckSquare },
                      { id: 'single', label: 'Single User', icon: User }
                    ].map((scope) => (
                      <button
                        key={scope.id}
                        type="button"
                        onClick={() => {
                          setTargetScope(scope.id as any);
                          setSelectedEmails([]);
                        }}
                        className={`flex items-center justify-center gap-2 py-2 px-3 text-xs border rounded-lg transition-all cursor-pointer font-medium ${
                          targetScope === scope.id 
                            ? 'bg-primary/10 border-primary text-primary font-bold shadow-2xs' 
                            : 'bg-background border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <scope.icon size={13} />
                        {scope.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-Segment: Interactive Select Grid */}
                {targetScope !== 'all' && (
                  <div className="border border-border bg-muted/20 rounded-xl p-3 space-y-2.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-muted-foreground uppercase">
                        {targetScope === 'single' ? 'Select Single Recipient' : 'Select Target Batch'} ({selectedEmails.length} Chosen)
                      </span>
                      {targetScope === 'selected' && filteredRegistrants.length > 0 && (
                        <button
                          type="button"
                          onClick={handleSelectAllFiltered}
                          className="text-primary text-[10px] hover:underline font-semibold text-right min-w-[70px]"
                        >
                          {filteredRegistrants.every(r => selectedEmails.includes(r.email)) ? 'Deselect Page' : 'Select Page'}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center px-2 py-1.5 rounded-lg border border-input bg-background">
                      <Search size={12} className="text-muted-foreground mr-2" />
                      <input 
                        type="text" 
                        placeholder="Search submissions by name or email..." 
                        value={registrantFilter}
                        onChange={(e) => setRegistrantFilter(e.target.value)}
                        className="bg-transparent border-none text-xs outline-none w-full text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="max-h-[160px] overflow-y-auto border border-border/60 rounded-lg divide-y divide-border/40 bg-background custom-scrollbar">
                      {isLoadingSubmissions || isRefetchingSubmissions ? (
                        <div className="p-4 text-center text-xs text-muted-foreground flex justify-center gap-1.5 items-center">
                          <Loader2 size={12} className="animate-spin text-primary" /> Gathering users from submissions...
                        </div>
                      ) : filteredRegistrants.length === 0 ? (
                        <div className="p-4 text-center text-xs text-muted-foreground flex flex-col items-center gap-2 bg-muted/5">
                          <span className="italic">No matching submission logs found.</span>
                          <button
                            type="button"
                            onClick={() => refetchSubmissions()}
                            className="inline-flex items-center gap-1 text-[10px] text-primary font-semibold border border-primary/20 bg-primary/5 hover:bg-primary/10 px-2.5 py-1 rounded transition-colors cursor-pointer shadow-2xs"
                          >
                            <RefreshCw size={10} /> Check Again
                          </button>
                        </div>
                      ) : (
                        filteredRegistrants.map((reg) => {
                          const isChecked = selectedEmails.includes(reg.email);
                          return (
                            <button
                              key={reg.email}
                              type="button"
                              onClick={() => handleToggleEmailSelection(reg.email)}
                              className="w-full flex items-center justify-between text-left p-2.5 hover:bg-muted/40 text-xs transition-colors group cursor-pointer"
                            >
                              <div className="min-w-0 pr-2">
                                <p className="font-semibold text-foreground truncate">{reg.name}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{reg.email}</p>
                              </div>
                              <div className="text-primary flex-shrink-0 ml-2">
                                {isChecked ? (
                                  <CheckSquare size={15} className="fill-primary/10 text-primary" />
                                ) : (
                                  <Square size={15} className="text-muted-foreground group-hover:text-foreground" />
                                )}
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Email Subject Header</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Change of Event Venue & Sign-in Schedule Details"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg text-xs border border-input bg-background text-foreground focus:ring-1 focus:ring-ring outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Message Core Content Body</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Compose full operational transmission report..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 flex-1 rounded-lg text-xs border border-input bg-background text-foreground focus:ring-1 focus:ring-ring outline-none transition-all resize-none min-h-[140px]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border mt-4">
                <button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-xs"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Distributing Sequences...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Fire Broadcast Matrix
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* RIGHT COLUMN: Transmission History Analytics Stream */}
      <div className="lg:col-span-5 flex flex-col border border-border rounded-xl bg-card overflow-hidden shadow-xs h-[500px] lg:h-full">
        <div className="p-4 border-b border-border bg-muted/30 space-y-3">
          <div className="flex items-center gap-2">
            <History className="text-muted-foreground" size={16} />
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Historical Logs</h4>
          </div>
          <div className="flex items-center px-3 py-1.5 rounded-lg border border-input bg-background">
            <Search size={13} className="text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Filter sent updates archive..." 
              value={searchQuery}
              disabled={!activeFormId}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs outline-none w-full text-foreground placeholder:text-muted-foreground disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/10">
          {!activeFormId ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-muted-foreground">
              <Clock size={24} className="mb-2 stroke-1 text-muted-foreground/70 animate-pulse" />
              <p className="text-xs italic">Select a form registry target array to view stream history pipelines.</p>
            </div>
          ) : isLoadingHistory ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2 text-xs text-muted-foreground">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span>Fetching communication history telemetry...</span>
            </div>
          ) : isHistoryError ? (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
              <AlertCircle size={14} />
              <span>Failed loading historic logging records.</span>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground italic border border-dashed border-border rounded-xl bg-background">
              No historical outward bulk communications logged against this form registry node.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log._id} className="p-4 rounded-xl border border-border bg-card space-y-2.5 shadow-2xs hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-xs text-foreground line-clamp-1">{log.subject}</span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap bg-muted px-2 py-0.5 rounded-md border border-border">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-3 bg-muted/30 p-2 rounded-md">
                  {log.message}
                </p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1.5 border-t border-border/60">
                  <span className="inline-flex items-center gap-1">
                    <User size={10} /> Batch Size: <strong className="text-foreground font-semibold">{log.recipientsCount} nodes</strong>
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/60">ID: {log._id.substring(18)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default EmailReply;