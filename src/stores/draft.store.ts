import { create } from 'zustand';
import { storage, storageKeys } from '@/lib/storage';

interface ReviewDraftItem {
  name: string;
  category: 'dish' | 'drink';
  score?: number;
  notes?: string;
  photoUris: string[];
}

interface ReviewDraft {
  placeId?: string;
  placeName?: string;
  visitDate?: string;
  overallScore?: number;
  notes?: string;
  isPrivate: boolean;
  items: ReviewDraftItem[];
  photoUris: string[];
}

interface DraftState {
  draft: ReviewDraft;
  updateDraft: (updates: Partial<ReviewDraft>) => void;
  addItem: (item: ReviewDraftItem) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, updates: Partial<ReviewDraftItem>) => void;
  resetDraft: () => void;
  hydrate: () => void;
}

const defaultDraft: ReviewDraft = {
  isPrivate: false,
  items: [],
  photoUris: [],
};

export const useDraftStore = create<DraftState>((set, get) => ({
  draft: defaultDraft,
  updateDraft: (updates) => {
    set((state) => {
      const newDraft = { ...state.draft, ...updates };
      storage.set(storageKeys.reviewDraft, JSON.stringify(newDraft));
      return { draft: newDraft };
    });
  },
  addItem: (item) => {
    set((state) => {
      const newDraft = { ...state.draft, items: [...state.draft.items, item] };
      storage.set(storageKeys.reviewDraft, JSON.stringify(newDraft));
      return { draft: newDraft };
    });
  },
  removeItem: (index) => {
    set((state) => {
      const items = state.draft.items.filter((_, i) => i !== index);
      const newDraft = { ...state.draft, items };
      storage.set(storageKeys.reviewDraft, JSON.stringify(newDraft));
      return { draft: newDraft };
    });
  },
  updateItem: (index, updates) => {
    set((state) => {
      const items = state.draft.items.map((item, i) =>
        i === index ? { ...item, ...updates } : item
      );
      const newDraft = { ...state.draft, items };
      storage.set(storageKeys.reviewDraft, JSON.stringify(newDraft));
      return { draft: newDraft };
    });
  },
  resetDraft: () => {
    storage.remove(storageKeys.reviewDraft);
    set({ draft: defaultDraft });
  },
  hydrate: () => {
    const stored = storage.getString(storageKeys.reviewDraft);
    if (stored) {
      try {
        set({ draft: JSON.parse(stored) as ReviewDraft });
      } catch {
        set({ draft: defaultDraft });
      }
    }
  },
}));
