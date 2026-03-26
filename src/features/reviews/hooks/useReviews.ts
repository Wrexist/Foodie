import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { reviewsService } from '../services/reviews.service';
import { useAuthStore } from '@/stores/auth.store';

export function useReview(id: string) {
  return useQuery({
    queryKey: ['review', id],
    queryFn: () => reviewsService.getById(id),
    enabled: !!id,
  });
}

export function useUserReviews(userId?: string) {
  const currentUser = useAuthStore((s) => s.user);
  const uid = userId ?? currentUser?.id;

  return useInfiniteQuery({
    queryKey: ['reviews', 'user', uid],
    queryFn: ({ pageParam = 0 }) => reviewsService.getByUser(uid!, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + p.data.length, 0);
      return loaded < lastPage.total ? allPages.length : undefined;
    },
    enabled: !!uid,
  });
}

export function usePlaceReviews(placeId: string) {
  return useInfiniteQuery({
    queryKey: ['reviews', 'place', placeId],
    queryFn: ({ pageParam = 0 }) => reviewsService.getByPlace(placeId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length : undefined;
    },
    enabled: !!placeId,
  });
}
