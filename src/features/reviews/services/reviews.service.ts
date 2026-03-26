import { supabase } from '@/lib/supabase';
import type { ReviewInsert, ReviewUpdate, ReviewItemInsert } from '@/types/database';
import { PAGE_SIZE } from '@/lib/constants';

export interface CreateReviewPayload {
  review: ReviewInsert;
  items: Omit<ReviewItemInsert, 'review_id'>[];
  photoUris: string[];
}

export const reviewsService = {
  async getById(id: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        place:places(*),
        review_items(*),
        review_photos(*),
        user:users!user_id(id, display_name, username, avatar_url)
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByUser(userId: string, page = 0) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from('reviews')
      .select(`
        *,
        place:places(*),
        review_items(*),
        review_photos(*),
        user:users!user_id(id, display_name, username, avatar_url)
      `, { count: 'exact' })
      .eq('user_id', userId)
      .order('visit_date', { ascending: false })
      .range(from, to);
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  },

  async getByPlace(placeId: string, page = 0) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from('reviews')
      .select(`
        *,
        place:places(*),
        review_items(*),
        review_photos(*),
        user:users!user_id(id, display_name, username, avatar_url)
      `, { count: 'exact' })
      .eq('place_id', placeId)
      .eq('is_private', false)
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  },

  async create(payload: CreateReviewPayload) {
    const { data: reviewData, error: reviewError } = await supabase
      .from('reviews')
      .insert(payload.review as never)
      .select()
      .single();
    if (reviewError) throw reviewError;
    const review = reviewData as any;

    if (payload.items.length > 0) {
      const items = payload.items.map((item) => ({
        ...item,
        review_id: review.id,
      }));
      const { error: itemsError } = await supabase
        .from('review_items')
        .insert(items as never[]);
      if (itemsError) throw itemsError;
    }

    if (payload.photoUris.length > 0) {
      const photos = payload.photoUris.map((uri, i) => ({
        review_id: review.id,
        photo_url: uri,
        sort_order: i,
      }));
      const { error: photosError } = await supabase
        .from('review_photos')
        .insert(photos as never[]);
      if (photosError) throw photosError;
    }

    return review;
  },

  async update(id: string, updates: ReviewUpdate) {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates as never)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id: string) {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) throw error;
  },
};
