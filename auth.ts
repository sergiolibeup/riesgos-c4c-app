/**
 * Store de autenticación con Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_TENANT } from '@/config/constants';

/**
 * Estado de autenticación
 */
interface AuthState {
  tenant: string;
  username: string;
  password: string;
  isAuthenticated: boolean;
}

/**
 * Acciones del store de autenticación
 */
interface AuthActions {
  setCredentials: (tenant: string, username: string, password: string) => void;
  setTenant: (tenant: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  clearCredentials: () => void;
  hasCredentials: () => boolean;
}

/**
 * Tipo completo del store
 */
type AuthStore = AuthState & AuthActions;

/**
 * Estado inicial
 */
const initialState: AuthState = {
  tenant: DEFAULT_TENANT,
  username: '',
  password: '',
  isAuthenticated: false,
};

/**
 * Store de autenticación
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCredentials: (tenant: string, username: string, password: string) => {
        set({
          tenant: tenant.trim(),
          username: username.trim(),
          password: password.trim(),
          isAuthenticated: Boolean(tenant && username && password),
        });
      },

      setTenant: (tenant: string) => {
        set((state) => ({
          tenant: tenant.trim(),
          isAuthenticated: Boolean(tenant && state.username && state.password),
        }));
      },

      setUsername: (username: string) => {
        set((state) => ({
          username: username.trim(),
          isAuthenticated: Boolean(state.tenant && username && state.password),
        }));
      },

      setPassword: (password: string) => {
        set((state) => ({
          password: password.trim(),
          isAuthenticated: Boolean(state.tenant && state.username && password),
        }));
      },

      clearCredentials: () => {
        set(initialState);
      },

      hasCredentials: () => {
        const state = get();
        return Boolean(state.tenant && state.username && state.password);
      },
    }),
    {
      name: 'riesgos-c4c-auth',
      // Solo persistir tenant, no las credenciales por seguridad
      partialize: (state) => ({ tenant: state.tenant }),
    }
  )
);

/**
 * Selectores útiles
 */
export const selectAuthConfig = (state: AuthStore) => ({
  tenant: state.tenant,
  username: state.username,
  password: state.password,
});

export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
