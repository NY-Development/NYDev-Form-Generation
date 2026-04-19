import { useState, useRef } from 'react';
import { Video, Upload, X, AlertCircle } from 'lucide-react';
import type { FormField } from '../../types';

interface DynamicFormRendererProps {
  fields: FormField[];
  values: Record<string, unknown>;
  onChange: (fieldId: string, value: unknown) => void;
  errors?: Record<string, string>;
  /** If true, renders multi-page navigation automatically when page_break fields exist */
  enablePagination?: boolean;
}

export const DynamicFormRenderer = ({
  fields,
  values,
  onChange,
  errors,
  enablePagination = true,
}: DynamicFormRendererProps) => {
  const sortedFields = [...fields].sort((a, b) => a.order - b.order);

  // ── Split fields into pages using page_break markers ──
  const pages: FormField[][] = [];
  let currentPage: FormField[] = [];
  sortedFields.forEach((f) => {
    if (f.type === 'page_break') {
      pages.push(currentPage);
      currentPage = [];
    } else {
      currentPage.push(f);
    }
  });
  pages.push(currentPage); // push the last page

  const hasPages = enablePagination && pages.length > 1;
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const totalPages = pages.length;

  // If not paginated, render all non-page-break fields flat
  const visibleFields = hasPages ? pages[currentPageIdx] : sortedFields.filter((f) => f.type !== 'page_break');

  const goNext = () => setCurrentPageIdx((p) => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setCurrentPageIdx((p) => Math.max(p - 1, 0));
  const isLastPage = currentPageIdx === totalPages - 1;

  const renderField = (field: FormField) => {
    const value = values[field.fieldId] ?? '';
    const baseInputClass =
      'h-11 w-full rounded-lg border border-border bg-background px-4 text-foreground shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
        return (
          <input
            type={field.type === 'phone' ? 'tel' : field.type}
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            placeholder={field.placeholder || ''}
            required={field.required}
            className={baseInputClass}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            placeholder={field.placeholder || ''}
            min={field.validation?.min}
            max={field.validation?.max}
            required={field.required}
            className={baseInputClass}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            placeholder={field.placeholder || ''}
            rows={4}
            required={field.required}
            className="w-full rounded-lg border border-border bg-background p-4 text-foreground shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y min-h-[100px]"
          />
        );

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            required={field.required}
            className={baseInputClass}
          >
            <option value="">{field.placeholder || 'Select an option...'}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="flex flex-col gap-2">
            {field.options?.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name={field.fieldId}
                  value={opt.value}
                  checked={value === opt.value}
                  required={field.required && !value}
                  onChange={(e) => onChange(field.fieldId, e.target.value)}
                  className="h-4 w-4 border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex flex-col gap-2">
            {field.options?.map((opt) => {
              const checked = Array.isArray(value) ? (value as string[]).includes(opt.value) : false;
              return (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={checked}
                    onChange={(e) => {
                      const current = Array.isArray(value) ? (value as string[]) : [];
                      const next = e.target.checked
                        ? [...current, opt.value]
                        : current.filter((v) => v !== opt.value);
                      onChange(field.fieldId, next);
                    }}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            required={field.required}
            className={baseInputClass}
          />
        );

      case 'time':
        return (
          <input
            type="time"
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            required={field.required}
            className={baseInputClass}
          />
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => onChange(field.fieldId, e.target.files?.[0] || null)}
            required={field.required && !value}
            className="w-full rounded-lg border border-border bg-background p-2 text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary"
          />
        );

      case 'address':
        return (
          <textarea
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            placeholder={field.placeholder || 'Enter your full address...'}
            rows={3}
            required={field.required}
            className="w-full rounded-lg border border-border bg-background p-4 text-foreground shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y"
          />
        );

      case 'video':
        return <VideoUploadField field={field} onChange={onChange} />;

      case 'page_break':
        // Page breaks shouldn't render inline — they're handled by the paginator
        return null;

      default:
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            placeholder={field.placeholder || ''}
            required={field.required}
            className={baseInputClass}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page indicator */}
      {hasPages && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-2">
          <span className="text-sm font-medium text-foreground">
            Page {currentPageIdx + 1} of {totalPages}
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentPageIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentPageIdx ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-primary/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Render visible fields */}
      {visibleFields.map((field) => (
        <div key={field.fieldId} className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground">
            {field.label}
            {field.required && <span className="ml-1 text-destructive">*</span>}
          </label>
          {renderField(field)}
          {errors?.[field.fieldId] && (
            <span className="text-xs text-destructive">{errors[field.fieldId]}</span>
          )}
        </div>
      ))}

      {/* Page navigation buttons */}
      {hasPages && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentPageIdx === 0}
            className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          {!isLastPage && (
            <button
              type="button"
              onClick={goNext}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Next →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Video Upload Sub-Component ────────────────────────────────
const MAX_VIDEO_DURATION = 180; // 3 minutes in seconds

const VideoUploadField = ({
  field,
  onChange,
}: {
  field: FormField;
  onChange: (fieldId: string, value: unknown) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFile = (file: File) => {
    setError('');

    // Validate it's actually a video
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file.');
      return;
    }

    // Validate size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      setError('Video must be under 100MB.');
      return;
    }

    // Validate duration
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      if (video.duration > MAX_VIDEO_DURATION) {
        setError(`Video exceeds ${MAX_VIDEO_DURATION / 60}-minute limit (${Math.round(video.duration)}s detected).`);
        return;
      }
      // Valid — store the file and create preview
      onChange(field.fieldId, file);
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    };
    video.src = URL.createObjectURL(file);
  };

  const handleRemove = () => {
    onChange(field.fieldId, null);
    setPreview(null);
    setFileName('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-3">
      {preview ? (
        <div className="relative overflow-hidden rounded-xl border border-border bg-black">
          <video src={preview} controls className="w-full max-h-64 object-contain" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-red-600"
          >
            <X size={16} />
          </button>
          <div className="border-t border-border bg-card px-4 py-2">
            <p className="truncate text-xs text-muted-foreground">{fileName}</p>
          </div>
        </div>
      ) : (
        <label className="group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-all hover:border-primary/50 hover:bg-muted/50">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="flex size-14 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400">
            <Video size={24} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-foreground">
              Click to upload or drag a video
            </p>
            <p className="text-xs text-muted-foreground">
              MP4, MOV, WebM · Max 3 minutes · 100MB limit
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-background border border-border px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors group-hover:border-primary/50">
            <Upload size={14} />
            Choose File
          </div>
        </label>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
};
