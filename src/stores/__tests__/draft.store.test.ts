import { useDraftStore } from '../draft.store';

describe('draft store', () => {
  beforeEach(() => {
    useDraftStore.getState().resetDraft();
    useDraftStore.getState().hydrate();
  });

  it('starts with default draft', () => {
    const draft = useDraftStore.getState().draft;
    expect(draft.isPrivate).toBe(false);
    expect(draft.items).toEqual([]);
    expect(draft.photoUris).toEqual([]);
  });

  it('updates draft fields', () => {
    useDraftStore.getState().updateDraft({ placeId: 'place-1', overallScore: 8 });
    const draft = useDraftStore.getState().draft;
    expect(draft.placeId).toBe('place-1');
    expect(draft.overallScore).toBe(8);
  });

  it('adds an item', () => {
    useDraftStore.getState().addItem({
      name: 'Pizza',
      category: 'dish',
      photoUris: [],
    });
    expect(useDraftStore.getState().draft.items).toHaveLength(1);
    expect(useDraftStore.getState().draft.items[0].name).toBe('Pizza');
  });

  it('removes an item', () => {
    useDraftStore.getState().addItem({ name: 'Pizza', category: 'dish', photoUris: [] });
    useDraftStore.getState().addItem({ name: 'Beer', category: 'drink', photoUris: [] });
    useDraftStore.getState().removeItem(0);
    expect(useDraftStore.getState().draft.items).toHaveLength(1);
    expect(useDraftStore.getState().draft.items[0].name).toBe('Beer');
  });

  it('updates an item', () => {
    useDraftStore.getState().addItem({ name: 'Pizza', category: 'dish', photoUris: [] });
    useDraftStore.getState().updateItem(0, { score: 9 });
    expect(useDraftStore.getState().draft.items[0].score).toBe(9);
  });

  it('resets draft', () => {
    useDraftStore.getState().updateDraft({ placeId: 'place-1' });
    useDraftStore.getState().resetDraft();
    useDraftStore.getState().hydrate();
    const draft = useDraftStore.getState().draft;
    expect(draft.placeId).toBeUndefined();
    expect(draft.items).toEqual([]);
  });
});
