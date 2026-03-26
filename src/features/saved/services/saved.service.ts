import { supabase } from '@/lib/supabase';
import type { SavedPlaceInsert } from '@/types/database';
import { PAGE_SIZE } from '@/lib/constants';

export const savedService = {
  async getByUser(userId: string, page = 0) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from('saved_places')
      .select(`
        *,
        place:places(*)
      `, { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  },

  async isSaved(userId: string, placeId: string) {
    const { count, error } = await supabase
      .from('saved_places')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('place_id', placeId);
    if (error) throw error;
    return (count ?? 0) > 0;
  },

  async save(userId: string, placeId: string, notes?: string) {
    const { data, error } = await supabase
      .from('saved_places')
      .insert({ user_id: userId, place_id: placeId, notes: notes ?? null } as never)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async unsave(userId: string, placeId: string) {
    const { error } = await supabase
      .from('saved_places')
      .delete()
      .eq('user_id', userId)
      .eq('place_id', placeId);
    if (error) throw error;
  },
};
