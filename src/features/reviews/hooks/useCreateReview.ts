import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService, type CreateReviewPayload } from '../services/reviews.service';
import { useDraftStore } from '@/stores/draft.store';

export function useCreateReview() {
  const queryClient = useQueryClient();
  const resetDraft = useDraftStore((s) => s.resetDraft);

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewsService.create(payload),
    onSuccess: () => {
      resetDraft();
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['journal'] });
      queryClient.invalidateQueries({ queryKey: ['profile-stats'] });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof reviewsService.update>[1] }) =>
      reviewsService.update(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['review', id] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['journal'] });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reviewsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['journal'] });
      queryClient.invalidateQueries({ queryKey: ['profile-stats'] });
    },
  });
}
