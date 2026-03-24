import { z } from 'zod';

// This is a dynamic schema generator since submission data depends on form structure
export const generateSubmissionSchema = (fields: any[]) => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldValidator;

    switch (field.type) {
      case 'email':
        fieldValidator = z.string().email('Invalid email address');
        break;
      case 'number':
        fieldValidator = z.number();
        break;
      case 'checkbox':
        fieldValidator = z.boolean();
        break;
      default:
        fieldValidator = z.string();
    }

    if (field.required) {
      if (field.type === 'string' || field.type === 'email') {
        fieldValidator = (fieldValidator as z.ZodString).min(1, `${field.label} is required`);
      }
    } else {
      fieldValidator = fieldValidator.optional().or(field.type === 'string' ? z.literal('') : z.any());
    }

    schemaShape[field.id] = fieldValidator;
  });

  return z.object(schemaShape);
};

export const submissionMetaSchema = z.object({
  formId: z.string(),
  submittedAt: z.date().default(() => new Date()),
  data: z.record(z.string(), z.any()), // Validated dynamically
});

export type SubmissionMeta = z.infer<typeof submissionMetaSchema>;
