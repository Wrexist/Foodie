import { supabase } from '@/lib/supabase';
import type { SignInCredentials, SignUpCredentials, ProfileSetup } from '../types';

export const authService = {
  async signInWithEmail({ email, password }: SignInCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signUpWithEmail({ email, password }: SignUpCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signInWithApple() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
    });
    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  async setupProfile(userId: string, profile: ProfileSetup) {
    const { data, error } = await supabase.from('users').upsert({
      id: userId,
      email: '',
      username: profile.username,
      display_name: profile.display_name,
      bio: profile.bio ?? null,
      avatar_url: profile.avatar_url ?? null,
    } as never);
    if (error) throw error;

    await supabase.auth.updateUser({
      data: {
        username: profile.username,
        display_name: profile.display_name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
      },
    });

    return data;
  },

  async updateProfile(userId: string, updates: Partial<ProfileSetup>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates as never)
      .eq('id', userId);
    if (error) throw error;
    return data;
  },
};
