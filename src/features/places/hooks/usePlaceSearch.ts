import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { placesService } from '../services/places.service';

export function usePlaceSearch() {
  const [query, setQuery] = useState('');

  const results = useQuery({
    queryKey: ['place-search', query],
    queryFn: () => placesService.search(query),
    enabled: query.length >= 2,
    staleTime: 30 * 1000,
  });

  const search = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    search,
    clear,
    results: (results.data ?? []) as any[],
    isSearching: results.isFetching,
  };
}
