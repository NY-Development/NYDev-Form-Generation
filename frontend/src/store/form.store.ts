import { create } from 'zustand';
import type { Form, Submission, Pagination } from '../types';
import type { UpdateHistoryItem } from '../services/form.service';

interface FormState {
  forms: Form[];
  currentForm: Form | null;
  submissions: Submission[];
  pagination: Pagination | null;
  updatesHistory: UpdateHistoryItem[]; // Added for email history tracking
  loading: boolean;
  error: string | null;
  
  setForms: (forms: Form[]) => void;
  setCurrentForm: (form: Form | null) => void;
  setSubmissions: (submissions: Submission[]) => void;
  setPagination: (pagination: Pagination | null) => void;
  setUpdatesHistory: (history: UpdateHistoryItem[]) => void; // Added
  addUpdateHistoryItem: (item: UpdateHistoryItem) => void; // Added for immediate UI updates
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
  updatesHistory: [], // Initial state
  loading: false,
  error: null,
  
  setForms: (forms) => set({ forms }),
  setCurrentForm: (form) => set({ currentForm: form }),
  setSubmissions: (submissions) => set({ submissions }),
  setPagination: (pagination) => set({ pagination }),
  setUpdatesHistory: (updatesHistory) => set({ updatesHistory }),
  
  // Appends a freshly sent communication log item straight to the top of your history list
  addUpdateHistoryItem: (item) => 
    set((state) => ({ updatesHistory: [item, ...state.updatesHistory] })),
    
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  // Clean up side-car arrays when changing or wiping the view
  clearCurrentForm: () => set({ currentForm: null, submissions: [], updatesHistory: [] }),
  
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