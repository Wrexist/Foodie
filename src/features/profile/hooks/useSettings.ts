import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../services/settings.service';
import { useAuthStore } from '@/stores/auth.store';
import type { UserSettingsUpdate } from '@/types/database';

export function useSettings() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ['user-settings', user?.id],
    queryFn: () => settingsService.getSettings(user!.id),
    enabled: !!user?.id,
  });
}

export function useUpdateSettings() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UserSettingsUpdate) => {
      if (!user?.id) throw new Error('Not authenticated');
      return settingsService.updateSettings(user.id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-settings', user?.id] });
    },
  });
}
