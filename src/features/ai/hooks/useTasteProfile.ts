import { useQuery } from '@tanstack/react-query';
import { aiService } from '../services/ai.service';
import { useAuthStore } from '@/stores/auth.store';

export function useTasteProfile() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ['taste-profile', user?.id],
    queryFn: () => aiService.generateTasteProfile(user!.id),
    enabled: !!user?.id,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}
