import { z } from 'zod';

export const fieldSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'email', 'number', 'select', 'radio', 'checkbox', 'textarea', 'date']),
  label: z.string().min(1, 'Label is required'),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
  placeholder: z.string().optional(),
});

export const formSchema = z.object({
  title: z.string().min(1, 'Form title is required'),
  description: z.string().optional(),
  status: z.enum(['draft', 'published', 'closed']).default('draft'),
  fields: z.array(fieldSchema).min(1, 'Form must have at least one field'),
});

export type FormField = z.infer<typeof fieldSchema>;
export type FormStructure = z.infer<typeof formSchema>;
