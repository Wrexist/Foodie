import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'palate-storage' });

export const storageKeys = {
  hasOnboarded: 'has_onboarded',
  reviewDraft: 'review_draft',
} as const;
