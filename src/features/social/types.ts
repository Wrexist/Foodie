export type { FollowRow, ActivityFeedEventRow, UserRow } from '@/types/database';

export interface FollowWithUser {
  id: string;
  created_at: string;
  follower?: {
    id: string;
    display_name: string;
    username: string;
    avatar_url: string | null;
  };
  following?: {
    id: string;
    display_name: string;
    username: string;
    avatar_url: string | null;
  };
}
