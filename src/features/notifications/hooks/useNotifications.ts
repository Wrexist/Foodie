import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '../services/notifications.service';
import { useAuthStore } from '@/stores/auth.store';

export function useNotifications() {
  const user = useAuthStore((s) => s.user);

  return useInfiniteQuery({
    queryKey: ['notifications', user?.id],
    queryFn: ({ pageParam = 0 }) => notificationsService.getByUser(user!.id, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + p.data.length, 0);
      return loaded < lastPage.total ? allPages.length : undefined;
    },
    enabled: !!user?.id,
  });
}

export function useUnreadCount() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ['unread-count', user?.id],
    queryFn: () => notificationsService.getUnreadCount(user!.id),
    enabled: !!user?.id,
    refetchInterval: 30 * 1000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unread-count'] });
    },
  });
}
