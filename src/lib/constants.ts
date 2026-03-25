export const APP_NAME = 'Palate';

export const SCORE_MAX = 10;
export const SCORE_MIN = 1;

export const PHOTO_MAX_COUNT = 10;
export const PHOTO_MAX_SIZE_MB = 10;
export const PHOTO_QUALITY = 0.8;

export const PAGE_SIZE = 20;

export const SUPABASE_STORAGE_BUCKETS = {
  avatars: 'avatars',
  reviewPhotos: 'review-photos',
  placeImages: 'place-images',
} as const;
