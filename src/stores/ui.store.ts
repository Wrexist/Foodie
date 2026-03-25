import { create } from 'zustand';

interface UIState {
  isFilterSheetOpen: boolean;
  setFilterSheetOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isFilterSheetOpen: false,
  setFilterSheetOpen: (isFilterSheetOpen) => set({ isFilterSheetOpen }),
}));
