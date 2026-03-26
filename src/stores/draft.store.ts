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
  hasHydrated: boolean;
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

const persistDraft = (draft: ReviewDraft) => {
  storage.set(storageKeys.reviewDraft, JSON.stringify(draft));
};

export const useDraftStore = create<DraftState>((set, get) => ({
  draft: defaultDraft,
  hasHydrated: false,
  updateDraft: (updates) => {
    if (!get().hasHydrated) return;
    set((state) => {
      const newDraft = { ...state.draft, ...updates };
      persistDraft(newDraft);
      return { draft: newDraft };
    });
  },
  addItem: (item) => {
    if (!get().hasHydrated) return;
    set((state) => {
      const newDraft = { ...state.draft, items: [...state.draft.items, item] };
      persistDraft(newDraft);
      return { draft: newDraft };
    });
  },
  removeItem: (index) => {
    if (!get().hasHydrated) return;
    set((state) => {
      const items = state.draft.items.filter((_, i) => i !== index);
      const newDraft = { ...state.draft, items };
      persistDraft(newDraft);
      return { draft: newDraft };
    });
  },
  updateItem: (index, updates) => {
    if (!get().hasHydrated) return;
    set((state) => {
      const items = state.draft.items.map((item, i) =>
        i === index ? { ...item, ...updates } : item
      );
      const newDraft = { ...state.draft, items };
      persistDraft(newDraft);
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
        set({ draft: JSON.parse(stored) as ReviewDraft, hasHydrated: true });
      } catch {
        set({ draft: defaultDraft, hasHydrated: true });
      }
    } else {
      set({ hasHydrated: true });
    }
  },
}));

// Hydrate eagerly on module load
useDraftStore.getState().hydrate();
