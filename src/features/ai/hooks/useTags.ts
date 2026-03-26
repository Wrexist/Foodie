import { useMutation } from '@tanstack/react-query';
import { aiService } from '../services/ai.service';

export function useExtractTags() {
  return useMutation({
    mutationFn: ({ notes, items }: { notes: string; items: { name: string; category: string }[] }) =>
      aiService.extractTags(notes, items),
  });
}
