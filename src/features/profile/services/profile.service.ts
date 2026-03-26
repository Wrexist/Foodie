import { supabase } from '@/lib/supabase';
import type { UserUpdate } from '@/types/database';

export const profileService = {
  async getById(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async getByUsername(username: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    if (error) throw error;
    return data;
  },

  async update(userId: string, updates: UserUpdate) {
    const { data, error } = await supabase
      .from('users')
      .update(updates as never)
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getStats(userId: string) {
    const [reviewsResult, followersResult, followingResult] = await Promise.all([
      supabase
        .from('reviews')
        .select('overall_score', { count: 'exact' })
        .eq('user_id', userId),
      supabase
        .from('follows')
        .select('id', { count: 'exact', head: true })
        .eq('following_id', userId),
      supabase
        .from('follows')
        .select('id', { count: 'exact', head: true })
        .eq('follower_id', userId),
    ]);

    const scores = ((reviewsResult.data as any[]) ?? []).map((r: any) => r.overall_score);
    const avgScore = scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;

    return {
      reviewCount: reviewsResult.count ?? 0,
      averageScore: Math.round(avgScore * 10) / 10,
      followerCount: followersResult.count ?? 0,
      followingCount: followingResult.count ?? 0,
    };
  },
};
