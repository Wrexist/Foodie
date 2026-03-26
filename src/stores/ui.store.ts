import { create } from 'zustand';

interface UIState {
  isFilterSheetOpen: boolean;
  setFilterSheetOpen: (open: boolean) => void;
  isOnline: boolean;
  setOnline: (online: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isFilterSheetOpen: false,
  setFilterSheetOpen: (isFilterSheetOpen) => set({ isFilterSheetOpen }),
  isOnline: true,
  setOnline: (isOnline) => set({ isOnline }),
}));
