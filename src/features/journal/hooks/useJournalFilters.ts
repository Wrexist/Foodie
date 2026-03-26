import { useState, useCallback } from 'react';
import { DEFAULT_FILTERS, type JournalFilters } from '../types';

export function useJournalFilters() {
  const [filters, setFilters] = useState<JournalFilters>(DEFAULT_FILTERS);

  const updateFilters = useCallback((updates: Partial<JournalFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return { filters, updateFilters, resetFilters };
}
