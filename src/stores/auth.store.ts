import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  hasHydrated: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  hasHydrated: false,
  setSession: (session) =>
    set({ session, user: session?.user ?? null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  setHydrated: (hasHydrated) => set({ hasHydrated }),
  reset: () => set({ session: null, user: null, isLoading: false }),
}));
