import { create } from 'zustand';
import type { Form, Submission, Pagination } from '../types';

interface FormState {
  forms: Form[];
  currentForm: Form | null;
  submissions: Submission[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  setForms: (forms: Form[]) => void;
  setCurrentForm: (form: Form | null) => void;
  setSubmissions: (submissions: Submission[]) => void;
  setPagination: (pagination: Pagination | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearCurrentForm: () => void;
  addForm: (form: Form) => void;
  updateFormInList: (formId: string, updates: Partial<Form>) => void;
  removeFormFromList: (formId: string) => void;
}

export const useFormStore = create<FormState>((set) => ({
  forms: [],
  currentForm: null,
  submissions: [],
  pagination: null,
  loading: false,
  error: null,
  setForms: (forms) => set({ forms }),
  setCurrentForm: (form) => set({ currentForm: form }),
  setSubmissions: (submissions) => set({ submissions }),
  setPagination: (pagination) => set({ pagination }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearCurrentForm: () => set({ currentForm: null, submissions: [] }),
  addForm: (form) => set((state) => ({ forms: [form, ...state.forms] })),
  updateFormInList: (formId, updates) =>
    set((state) => ({
      forms: state.forms.map((f) => ((f.id || f._id) === formId ? { ...f, ...updates } : f)),
    })),
  removeFormFromList: (formId) =>
    set((state) => ({
      forms: state.forms.filter((f) => (f.id || f._id) !== formId),
    })),
}));
