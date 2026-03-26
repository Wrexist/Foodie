import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { likesService } from '../services/likes.service';
import { useAuthStore } from '@/stores/auth.store';

export function useLikeStatus(reviewId: string) {
  const user = useAuthStore((s) => s.user);

  const { data: isLiked = false } = useQuery({
    queryKey: ['like-status', reviewId, user?.id],
    queryFn: () => likesService.isLiked(reviewId, user!.id),
    enabled: !!user?.id && !!reviewId,
  });

  const { data: count = 0 } = useQuery({
    queryKey: ['like-count', reviewId],
    queryFn: () => likesService.getLikeCount(reviewId),
    enabled: !!reviewId,
  });

  return { isLiked, count };
}

export function useToggleLike(reviewId: string) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likesService.toggleLike(reviewId, user!.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['like-status', reviewId, user?.id] });
      await queryClient.cancelQueries({ queryKey: ['like-count', reviewId] });

      const prevStatus = queryClient.getQueryData<boolean>(['like-status', reviewId, user?.id]);
      const prevCount = queryClient.getQueryData<number>(['like-count', reviewId]);

      queryClient.setQueryData(['like-status', reviewId, user?.id], !prevStatus);
      queryClient.setQueryData(['like-count', reviewId], (prevCount ?? 0) + (prevStatus ? -1 : 1));

      return { prevStatus, prevCount };
    },
    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData(['like-status', reviewId, user?.id], context.prevStatus);
        queryClient.setQueryData(['like-count', reviewId], context.prevCount);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['like-status', reviewId] });
      queryClient.invalidateQueries({ queryKey: ['like-count', reviewId] });
    },
  });
}
