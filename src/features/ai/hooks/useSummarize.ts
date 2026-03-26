import { useMutation } from '@tanstack/react-query';
import { aiService } from '../services/ai.service';

export function useSummarize() {
  return useMutation({
    mutationFn: ({ notes, items }: { notes: string; items: { name: string; category: string }[] }) =>
      aiService.summarizeReview(notes, items),
  });
}
