import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { searchService } from '../services/search.service';

export function useUserSearch() {
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 300);

  const result = useQuery({
    queryKey: ['user-search', debouncedQuery],
    queryFn: () => searchService.searchUsers(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });

  return { query, setQuery, ...result };
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
