import { useUIStore } from '../ui.store';

describe('UI store', () => {
  beforeEach(() => {
    useUIStore.setState({ isFilterSheetOpen: false, isOnline: true });
  });

  it('starts online', () => {
    expect(useUIStore.getState().isOnline).toBe(true);
  });

  it('sets offline state', () => {
    useUIStore.getState().setOnline(false);
    expect(useUIStore.getState().isOnline).toBe(false);
  });

  it('sets filter sheet open', () => {
    useUIStore.getState().setFilterSheetOpen(true);
    expect(useUIStore.getState().isFilterSheetOpen).toBe(true);
  });

  it('toggles back to online', () => {
    useUIStore.getState().setOnline(false);
    useUIStore.getState().setOnline(true);
    expect(useUIStore.getState().isOnline).toBe(true);
  });
});
