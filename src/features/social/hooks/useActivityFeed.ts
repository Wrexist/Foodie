import { useInfiniteQuery } from '@tanstack/react-query';
import { socialService } from '../services/social.service';
import { useAuthStore } from '@/stores/auth.store';

export function useActivityFeed() {
  const user = useAuthStore((s) => s.user);

  return useInfiniteQuery({
    queryKey: ['activity-feed', user?.id],
    queryFn: ({ pageParam = 0 }) => socialService.getActivityFeed(user!.id, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length : undefined;
    },
    enabled: !!user?.id,
  });
}
