import { create } from 'zustand';
import type { Form } from '../types';

interface FormState {
  forms: Form[];
  currentForm: Form | null;
  submissions: any[];
  setForms: (forms: Form[]) => void;
  setCurrentForm: (form: Form | null) => void;
  addSubmission: (submission: any) => void;
}

export const useFormStore = create<FormState>((set) => ({
  forms: [],
  currentForm: null,
  submissions: [],
  setForms: (forms) => set({ forms }),
  setCurrentForm: (form) => set({ currentForm: form }),
  addSubmission: (submission) =>
    set((state) => ({ submissions: [...state.submissions, submission] })),
}));
