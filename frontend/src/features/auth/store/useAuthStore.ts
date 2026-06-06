// stores/authStore.ts
import { create } from 'zustand';
import type { AuthUser } from '../types/type';

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));