export type { ReviewInsert, ReviewUpdate, ReviewItemInsert, ReviewItemRow, ReviewRow, ReviewFull } from '@/types/database';

export interface JournalFilters {
  sortBy: 'date' | 'rating' | 'place';
  sortOrder: 'asc' | 'desc';
  minRating?: number;
  maxRating?: number;
  cuisineType?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const DEFAULT_FILTERS: JournalFilters = {
  sortBy: 'date',
  sortOrder: 'desc',
};
