import { useDraftStore } from '@/stores/draft.store';

export function useReviewItems() {
  const items = useDraftStore((s) => s.draft.items);
  const addItem = useDraftStore((s) => s.addItem);
  const removeItem = useDraftStore((s) => s.removeItem);
  const updateItem = useDraftStore((s) => s.updateItem);

  return { items, addItem, removeItem, updateItem };
}
