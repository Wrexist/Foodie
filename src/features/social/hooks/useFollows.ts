import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { socialService } from '../services/social.service';
import { useAuthStore } from '@/stores/auth.store';

export function useIsFollowing(targetUserId: string) {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ['is-following', user?.id, targetUserId],
    queryFn: () => socialService.isFollowing(user!.id, targetUserId),
    enabled: !!user?.id && !!targetUserId && user.id !== targetUserId,
  });
}

export function useToggleFollow() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      targetUserId,
      isFollowing,
    }: {
      targetUserId: string;
      isFollowing: boolean;
    }) => {
      if (!user) throw new Error('Not authenticated');
      if (isFollowing) {
        await socialService.unfollow(user.id, targetUserId);
      } else {
        await socialService.follow(user.id, targetUserId);
      }
    },
    onSuccess: (_, { targetUserId }) => {
      queryClient.invalidateQueries({ queryKey: ['is-following', user?.id, targetUserId] });
      queryClient.invalidateQueries({ queryKey: ['profile-stats'] });
      queryClient.invalidateQueries({ queryKey: ['followers', targetUserId] });
      queryClient.invalidateQueries({ queryKey: ['following', user?.id] });
    },
  });
}

export function useFollowers(userId: string) {
  return useQuery({
    queryKey: ['followers', userId],
    queryFn: () => socialService.getFollowers(userId),
    enabled: !!userId,
  });
}

export function useFollowing(userId: string) {
  return useQuery({
    queryKey: ['following', userId],
    queryFn: () => socialService.getFollowing(userId),
    enabled: !!userId,
  });
}
