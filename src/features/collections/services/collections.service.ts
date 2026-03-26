import { supabase } from '@/lib/supabase';
import type { CollectionInsert, CollectionUpdate, CollectionPlaceInsert } from '@/types/database';
import { PAGE_SIZE } from '@/lib/constants';

export const collectionsService = {
  async getByUser(userId: string, page = 0) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from('collections')
      .select(`
        *,
        collection_places(count)
      `, { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('collections')
      .select(`
        *,
        collection_places(
          place:places(*)
        )
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(collection: CollectionInsert) {
    const { data, error } = await supabase
      .from('collections')
      .insert(collection as any)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: CollectionUpdate) {
    const { data, error } = await supabase
      .from('collections')
      .update(updates as never)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id: string) {
    const { error } = await supabase.from('collections').delete().eq('id', id);
    if (error) throw error;
  },

  async addPlace(collectionId: string, placeId: string) {
    const { error } = await supabase
      .from('collection_places')
      .insert({ collection_id: collectionId, place_id: placeId } as any);
    if (error) throw error;
  },

  async removePlace(collectionId: string, placeId: string) {
    const { error } = await supabase
      .from('collection_places')
      .delete()
      .eq('collection_id', collectionId)
      .eq('place_id', placeId);
    if (error) throw error;
  },
};
