import { useQuery } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';
import { placesService } from '../services/places.service';
import type { PlaceRow } from '@/types/database';

export function usePlaceSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useQuery({
    queryKey: ['place-search', debouncedQuery],
    queryFn: () => placesService.search(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 30 * 1000,
  });

  const search = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    query,
    search,
    clear,
    results: (results.data ?? []) as PlaceRow[],
    isSearching: results.isFetching,
    error: results.error,
  };
}
