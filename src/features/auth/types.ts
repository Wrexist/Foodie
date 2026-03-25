import type { Session, User } from '@supabase/supabase-js';

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}

export interface ProfileSetup {
  username: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
}
