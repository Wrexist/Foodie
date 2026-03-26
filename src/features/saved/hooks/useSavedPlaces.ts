import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { savedService } from '../services/saved.service';
import { useAuthStore } from '@/stores/auth.store';

export function useSavedPlaces() {
  const user = useAuthStore((s) => s.user);

  return useInfiniteQuery({
    queryKey: ['saved-places', user?.id],
    queryFn: ({ pageParam = 0 }) => savedService.getByUser(user!.id, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + p.data.length, 0);
      return loaded < lastPage.total ? allPages.length : undefined;
    },
    enabled: !!user?.id,
  });
}

export function useIsSaved(placeId: string) {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ['is-saved', user?.id, placeId],
    queryFn: () => savedService.isSaved(user!.id, placeId),
    enabled: !!user?.id && !!placeId,
  });
}

export function useToggleSave() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ placeId, isSaved }: { placeId: string; isSaved: boolean }) => {
      if (!user) throw new Error('Not authenticated');
      if (isSaved) {
        await savedService.unsave(user.id, placeId);
      } else {
        await savedService.save(user.id, placeId);
      }
    },
    onSuccess: (_, { placeId }) => {
      queryClient.invalidateQueries({ queryKey: ['saved-places', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['is-saved', user?.id, placeId] });
    },
  });
}
