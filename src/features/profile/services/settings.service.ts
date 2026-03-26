import { supabase } from '@/lib/supabase';
import type { UserSettingsUpdate } from '@/types/database';

export const settingsService = {
  async getSettings(userId: string) {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateSettings(userId: string, updates: UserSettingsUpdate) {
    // Upsert: create if not exists, update if exists
    const { data: existing } = await supabase
      .from('user_settings')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('user_settings')
        .update(updates as never)
        .eq('user_id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('user_settings')
        .insert({ user_id: userId, ...updates } as never)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },
};
