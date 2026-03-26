export type { UserRow, UserUpdate } from '@/types/database';

export interface ProfileStats {
  reviewCount: number;
  averageScore: number;
  followerCount: number;
  followingCount: number;
}
