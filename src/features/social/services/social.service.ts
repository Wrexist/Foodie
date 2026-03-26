import { supabase } from '@/lib/supabase';
import { PAGE_SIZE } from '@/lib/constants';

export const socialService = {
  async follow(followerId: string, followingId: string) {
    const { error } = await supabase
      .from('follows')
      .insert({ follower_id: followerId, following_id: followingId } as never);
    if (error) throw error;
  },

  async unfollow(followerId: string, followingId: string) {
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);
    if (error) throw error;
  },

  async isFollowing(followerId: string, followingId: string) {
    const { count, error } = await supabase
      .from('follows')
      .select('id', { count: 'exact', head: true })
      .eq('follower_id', followerId)
      .eq('following_id', followingId);
    if (error) throw error;
    return (count ?? 0) > 0;
  },

  async getFollowers(userId: string, page = 0) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from('follows')
      .select(`
        *,
        follower:users!follower_id(id, display_name, username, avatar_url)
      `, { count: 'exact' })
      .eq('following_id', userId)
      .range(from, to);
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  },

  async getFollowing(userId: string, page = 0) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from('follows')
      .select(`
        *,
        following:users!following_id(id, display_name, username, avatar_url)
      `, { count: 'exact' })
      .eq('follower_id', userId)
      .range(from, to);
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  },

  async getActivityFeed(userId: string, page = 0) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from('activity_feed_events')
      .select(`
        *,
        actor:users!actor_id(id, display_name, username, avatar_url)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  },
};
