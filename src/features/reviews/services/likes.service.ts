import { supabase } from '@/lib/supabase';

export const likesService = {
  async isLiked(reviewId: string, userId: string) {
    const { data, error } = await supabase
      .from('review_likes')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;
    return !!data;
  },

  async getLikeCount(reviewId: string) {
    const { count, error } = await supabase
      .from('review_likes')
      .select('id', { count: 'exact', head: true })
      .eq('review_id', reviewId);
    if (error) throw error;
    return count ?? 0;
  },

  async toggleLike(reviewId: string, userId: string) {
    const existing = await supabase
      .from('review_likes')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing.data) {
      const { error } = await supabase
        .from('review_likes')
        .delete()
        .eq('id', (existing.data as any).id);
      if (error) throw error;
      return false;
    } else {
      const { error } = await supabase
        .from('review_likes')
        .insert({ review_id: reviewId, user_id: userId } as never);
      if (error) throw error;
      return true;
    }
  },
};
