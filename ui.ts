/**
 * Store de estado de UI con Zustand
 */

import { create } from 'zustand';

/**
 * Tipo de toast
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Información de un toast
 */
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

/**
 * Estado de UI
 */
interface UIState {
  loading: boolean;
  loadingMessage: string;
  error: string | null;
  toasts: Toast[];
}

/**
 * Acciones del store de UI
 */
interface UIActions {
  setLoading: (loading: boolean, message?: string) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

/**
 * Tipo completo del store
 */
type UIStore = UIState & UIActions;

/**
 * Estado inicial
 */
const initialState: UIState = {
  loading: false,
  loadingMessage: '',
  error: null,
  toasts: [],
};

/**
 * Generar ID único para toast
 */
function generateToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Store de UI
 */
export const useUIStore = create<UIStore>((set, get) => ({
  ...initialState,

  setLoading: (loading: boolean, message = 'Cargando...') => {
    set({ loading, loadingMessage: message });
  },

  setError: (error: string | null) => {
    set({ error });
    if (error) {
      get().showError(error);
    }
  },

  clearError: () => {
    set({ error: null });
  },

  addToast: (type: ToastType, message: string, duration = 5000) => {
    const id = generateToastId();
    const toast: Toast = { id, type, message, duration };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remover después de la duración
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },

  showSuccess: (message: string) => {
    get().addToast('success', message);
  },

  showError: (message: string) => {
    get().addToast('error', message, 7000); // Errores duran más
  },

  showWarning: (message: string) => {
    get().addToast('warning', message);
  },

  showInfo: (message: string) => {
    get().addToast('info', message);
  },
}));

/**
 * Selectores útiles
 */
export const selectLoading = (state: UIStore) => state.loading;
export const selectError = (state: UIStore) => state.error;
export const selectToasts = (state: UIStore) => state.toasts;
