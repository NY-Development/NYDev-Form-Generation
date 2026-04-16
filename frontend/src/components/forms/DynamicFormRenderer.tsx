import type { FormField } from '../../types';

interface DynamicFormRendererProps {
  fields: FormField[];
  values: Record<string, unknown>;
  onChange: (fieldId: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export const DynamicFormRenderer = ({ fields, values, onChange, errors }: DynamicFormRendererProps) => {
  const sortedFields = [...fields].sort((a, b) => a.order - b.order);

  const renderField = (field: FormField) => {
    const value = values[field.fieldId] ?? '';
    // const error = errors?.[field.fieldId];
    const baseInputClass = 'h-11 w-full rounded-lg border border-border bg-background px-4 text-foreground shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none';

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
            className="w-full rounded-lg border border-border bg-background p-4 text-foreground shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y min-h-[100px]"
          />
        );

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
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
                  onChange={(e) => onChange(field.fieldId, e.target.value)}
                  className="h-4 w-4 border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">{opt.label}</span>
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
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">{opt.label}</span>
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
            className={baseInputClass}
          />
        );

      case 'time':
        return (
          <input
            type="time"
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            className={baseInputClass}
          />
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => onChange(field.fieldId, e.target.files?.[0] || null)}
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
            className="w-full rounded-lg border border-border bg-background p-4 text-foreground shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y"
          />
        );

      default:
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(field.fieldId, e.target.value)}
            placeholder={field.placeholder || ''}
            className={baseInputClass}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {sortedFields.map((field) => (
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
    </div>
  );
};
