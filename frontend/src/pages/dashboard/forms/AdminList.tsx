import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Download, MoreVertical, CheckCircle2, XCircle, Eye, FileText } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { submissionService } from '../../../services/submission.service';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { toast } from 'sonner';
import type { Submission, Pagination } from '../../../types';

// Import newly installed export libraries and utilities
import { exportToExcel } from '../../../utils/excelExport'; 
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; 

export const FormAdminList = () => {
  const { id: formId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { organization } = useAuth();
  const orgId = organization?.id || organization?._id || '';

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false); 
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    if (!orgId || !formId) return;
    setLoading(true);
    try {
      const res = await submissionService.getSubmissions(orgId, formId, {
        page,
        limit: 10,
        status: filter,
        search,
      });
      setSubmissions(res.data);
      if (res.pagination) setPagination(res.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  }, [orgId, formId, page, filter, search]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // --- Dynamic Form Response Fields Mapping ---
  const dynamicFieldKeys = useMemo(() => {
    const keysSet = new Set<string>();
    submissions.forEach((sub) => {
      if (sub.responses) {
        if (Array.isArray(sub.responses)) {
          sub.responses.forEach((resp: any) => {
            if (resp.label || resp.fieldId) {
              keysSet.add(resp.label || resp.fieldId);
            }
          });
        } else if (typeof sub.responses === 'object') {
          Object.keys(sub.responses).forEach((k) => keysSet.add(k));
        }
      }
    });
    return Array.from(keysSet);
  }, [submissions]);

  // Helper utility to safely pull a value for a specific standalone field cell
  const getSingleFieldValue = (responses: any, key: string): string => {
    if (!responses) return '';
    if (Array.isArray(responses)) {
      const match = responses.find((r: any) => r.label === key || r.fieldId === key);
      if (match) {
        return typeof match.value === 'object' ? JSON.stringify(match.value) : String(match.value);
      }
      return '';
    }
    if (typeof responses === 'object' && responses[key] !== undefined) {
      return typeof responses[key] === 'object' ? JSON.stringify(responses[key]) : String(responses[key]);
    }
    return '';
  };

  // --- Internal Helper: Fetches all entries ignoring current page limits ---
  const fetchAllSubmissionsDataset = async (): Promise<Submission[]> => {
    if (!orgId || !formId) return [];
    if (pagination && pagination.pages <= 1) {
      return submissions;
    }

    try {
      const totalCount = pagination?.total || 500;
      const response = await submissionService.getSubmissions(orgId, formId, {
        page: 1,
        limit: totalCount, 
        status: filter,
        search,
      });
      return response.data;
    } catch (err) {
      console.error('Data compilation error: ', err);
      return submissions; 
    }
  };

  // --- Master Handler for Excel Generation ---
  const handleExportExcel = async (exportAll: boolean) => {
    if (submissions.length === 0) {
      toast.error('No data available to export');
      return;
    }

    setIsExporting(true);
    const dataset = exportAll ? await fetchAllSubmissionsDataset() : submissions;

    const exportData = dataset.map((sub, idx) => {
      const rowObject: Record<string, any> = {
        '#': exportAll ? idx + 1 : (page - 1) * 10 + idx + 1,
        'Unique ID': sub.uniqueId || 'N/A',
        'Name': sub.submitterName || 'Participant',
        'Email Address': sub.submitterEmail || 'N/A',
        'Status': sub.status || 'pending',
        'Registration Date': sub.createdAt ? new Date(sub.createdAt).toLocaleString() : 'N/A',
      };

      dynamicFieldKeys.forEach((fieldKey) => {
        rowObject[fieldKey] = getSingleFieldValue(sub.responses, fieldKey) || '';
      });

      return rowObject;
    });

    try {
      const scopeLabel = exportAll ? 'All' : `Page_${page}`;
      exportToExcel({
        data: exportData,
        fileName: `Form_Registrations_${scopeLabel}_${formId || 'Export'}`,
        sheetName: 'Registrations'
      });
      toast.success(`Excel matrix generated with ${dataset.length} rows!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to export spreadsheet data.');
    } finally {
      setIsExporting(false);
    }
  };

  // --- Master Handler for PDF Generation ---
  const handleExportPDF = async (exportAll: boolean) => {
    if (submissions.length === 0) {
      toast.error('No data available to export');
      return;
    }

    setIsExporting(true);
    const dataset = exportAll ? await fetchAllSubmissionsDataset() : submissions;

    try {
      const doc = new jsPDF('l', 'pt', 'a3');
      const scopeTitle = exportAll ? 'Complete Matrix Dataset' : `Page ${page} Snapshot`;
      
      doc.setFontSize(20);
      doc.setTextColor(15, 23, 42);
      doc.text(`Form Registration Detailed Audit - ${scopeTitle}`, 40, 40);
      
      doc.setFontSize(11);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated on: ${new Date().toLocaleString()} | Rows Contained: ${dataset.length}`, 40, 60);

      const staticHeaders = ['#', 'Unique ID', 'Name', 'Email Address', 'Status', 'Registration Date'];
      const headers = [[...staticHeaders, ...dynamicFieldKeys]];
      
      const body = dataset.map((sub, idx) => {
        const rowData = [
          exportAll ? idx + 1 : (page - 1) * 10 + idx + 1,
          sub.uniqueId || 'N/A',
          sub.submitterName || 'Participant',
          sub.submitterEmail || 'N/A',
          (sub.status || 'pending').toUpperCase(),
          sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'N/A',
        ];

        dynamicFieldKeys.forEach((fieldKey) => {
          rowData.push(getSingleFieldValue(sub.responses, fieldKey) || '-');
        });

        return rowData;
      });

      autoTable(doc, {
        head: headers,
        body: body,
        startY: 85,
        theme: 'striped',
        headStyles: { fillColor: [0, 75, 242], textColor: [255, 255, 255], fontStyle: 'bold' },
        styles: { fontSize: 8, overflow: 'ellipsize', cellPadding: 6 }, // Fixed 'ellipdot' to 'ellipsize'
      });

      const scopeLabel = exportAll ? 'All' : `Page_${page}`;
      doc.save(`Form_Registrations_${scopeLabel}_${formId || 'Export'}.pdf`);
      toast.success(`PDF document compiled successfully with ${dataset.length} rows!`);
    } catch (err: any) {
      toast.error('Failed to construct PDF output document properly.');
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Top action header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Form Registrations</h1>
          <p className="text-sm text-muted-foreground">Manage, view, and export participant records for this form entity.</p>
        </div>
        
        {/* Expanded 4-Button Export Row Configuration */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Current Page Controls */}
          <button
            onClick={() => handleExportExcel(false)}
            disabled={isExporting || loading}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm font-medium text-foreground shadow-3xs transition-colors hover:bg-muted disabled:opacity-50"
            title="Export only the 10 rows visible right now"
          >
            <Download size={14} className="text-emerald-600" />
            Excel (Current Page)
          </button>
          
          <button
            onClick={() => handleExportPDF(false)}
            disabled={isExporting || loading}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm font-medium text-foreground shadow-3xs transition-colors hover:bg-muted disabled:opacity-50"
            title="Export a PDF snapshot of these 10 rows"
          >
            <FileText size={14} className="text-rose-600" />
            PDF (Current Page)
          </button>

          <div className="hidden sm:block h-6 w-px bg-border mx-1" />

          {/* Full Database Controls */}
          <button
            onClick={() => handleExportExcel(true)}
            disabled={isExporting || loading}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-sm font-medium text-emerald-700 shadow-3xs transition-colors hover:bg-emerald-100 disabled:opacity-50 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-emerald-400"
            title="Fetch and compile every page into a master file"
          >
            <Download size={14} />
            {isExporting ? 'Processing...' : 'Excel (All Pages)'}
          </button>

          <button
            onClick={() => handleExportPDF(true)}
            disabled={isExporting || loading}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 text-sm font-medium text-rose-700 shadow-3xs transition-colors hover:bg-rose-100 disabled:opacity-50 dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-rose-400"
            title="Fetch and compile every page into a multi-page PDF document"
          >
            <FileText size={14} />
            {isExporting ? 'Compiling...' : 'PDF (All Pages)'}
          </button>
        </div>
      </div>

      {/* Filter and Query bar layout */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search matching names, node values or emails..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="h-9 w-full rounded-md border border-input bg-card pr-3 pl-9 text-sm shadow-3xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="h-9 rounded-md border border-input bg-card px-3 text-sm shadow-3xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring sm:w-48"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Main Registrations Table Board */}
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : submissions.length === 0 ? (
        <EmptyState
          title="No records verified"
          description="There are no active participant interaction nodes recorded matching this parameters scope."
        />
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-3xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-semibold uppercase text-muted-foreground whitespace-nowrap">
                  <th className="p-4">Unique ID</th>
                  <th className="p-4">Registrant Name</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Date Registered</th>
                  
                  {/* Dynamic Response Question Columns injected explicitly */}
                  {dynamicFieldKeys.map((key) => (
                    <th key={key} className="p-4 max-w-[150px] truncate" title={key}>
                      {key}
                    </th>
                  ))}

                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {submissions.map((sub) => {
                  const sId = sub._id || sub.id;
                  return (
                    <tr key={sId} className="hover:bg-muted/30 transition-colors whitespace-nowrap">
                      <td className="p-4 font-mono text-xs font-semibold text-foreground">
                        {sub.uniqueId || 'N/A'}
                      </td>
                      <td className="p-4 font-medium text-foreground">
                        {sub.submitterName || 'Participant'}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {sub.submitterEmail || 'N/A'}
                      </td>
                      <td className="p-4 text-xs text-muted-foreground">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'N/A'}
                      </td>

                      {/* Display each matching structural form field response inside its own tabular cell column */}
                      {dynamicFieldKeys.map((key) => {
                        const cellVal = getSingleFieldValue(sub.responses, key);
                        return (
                          <td key={key} className="p-4 text-xs max-w-[180px] truncate text-muted-foreground" title={cellVal}>
                            {cellVal || <span className="text-muted-foreground/30">-</span>}
                          </td>
                        );
                      })}

                      <td className="p-4">
                        <StatusBadge status={sub.status} />
                      </td>
                      <td className="p-4 text-right relative">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/organizations/${orgId}/submissions/${sId}`)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            title="Inspect Details"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => setActionMenu(actionMenu === sId ? null : sId)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
                          >
                            <MoreVertical size={15} />
                          </button>
                        </div>

                        {/* Action Dropdown Menu Context */}
                        {actionMenu === sId && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActionMenu(null)} />
                            <div className="absolute right-4 mt-1 z-20 w-48 rounded-lg border border-border bg-popover p-1 shadow-md">
                              <button
                                onClick={async () => {
                                  setActionMenu(null);
                                  try {
                                    await submissionService.approveSubmission(orgId, sId);
                                    toast.success('Submission flagged as approved.');
                                    fetchSubmissions();
                                  } catch (e: any) { toast.error(e.message || 'Action failed'); }
                                }}
                                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-medium text-foreground hover:bg-muted"
                              >
                                <CheckCircle2 size={13} className="text-emerald-500" />
                                Approve Record
                              </button>
                              <button
                                onClick={async () => {
                                  setActionMenu(null);
                                  try {
                                    await submissionService.rejectSubmission(orgId, sId, 'Rejected by organizer');
                                    toast.success('Submission flagged as rejected.');
                                    fetchSubmissions();
                                  } catch (e: any) { toast.error(e.message || 'Action failed'); }
                                }}
                                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-medium text-destructive hover:bg-destructive/10"
                              >
                                <XCircle size={13} />
                                Reject Record
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {pagination && pagination.pages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-border p-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                Page <span className="font-medium text-foreground">{pagination.page}</span> of{' '}
                <span className="font-medium text-foreground">{pagination.pages}</span> ({pagination.total} total)
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="h-9 rounded border border-border bg-card px-3 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:bg-muted transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={page >= pagination.pages}
                  onClick={() => setPage((p) => p + 1)}
                  className="h-9 rounded border border-border bg-card px-3 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:bg-muted transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormAdminList;