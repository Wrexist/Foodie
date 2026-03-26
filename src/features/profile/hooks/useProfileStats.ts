import { useQuery } from '@tanstack/react-query';
import { profileService } from '../services/profile.service';
import { useAuthStore } from '@/stores/auth.store';

export function useProfileStats(userId?: string) {
  const currentUser = useAuthStore((s) => s.user);
  const uid = userId ?? currentUser?.id;

  return useQuery({
    queryKey: ['profile-stats', uid],
    queryFn: () => profileService.getStats(uid!),
    enabled: !!uid,
  });
}
