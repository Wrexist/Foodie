import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profile.service';
import { useAuthStore } from '@/stores/auth.store';
import type { UserUpdate } from '@/types/database';

export function useProfile(userId?: string) {
  const currentUser = useAuthStore((s) => s.user);
  const uid = userId ?? currentUser?.id;

  return useQuery({
    queryKey: ['profile', uid],
    queryFn: () => profileService.getById(uid!),
    enabled: !!uid,
  });
}

export function useUpdateProfile() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UserUpdate) => {
      if (!user) throw new Error('Not authenticated');
      return profileService.update(user.id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
}
