import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth.store';
import { PAGE_SIZE } from '@/lib/constants';
import type { JournalFilters } from '../types';

async function fetchJournal(userId: string, filters: JournalFilters, page: number) {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('reviews')
    .select(`
      *,
      place:places(*),
      review_items(*),
      review_photos(*)
    `, { count: 'exact' })
    .eq('user_id', userId);

  if (filters.minRating !== undefined) {
    query = query.gte('overall_score', filters.minRating);
  }
  if (filters.maxRating !== undefined) {
    query = query.lte('overall_score', filters.maxRating);
  }
  if (filters.dateFrom) {
    query = query.gte('visit_date', filters.dateFrom);
  }
  if (filters.dateTo) {
    query = query.lte('visit_date', filters.dateTo);
  }

  const orderColumn = filters.sortBy === 'rating' ? 'overall_score' : 'visit_date';
  query = query.order(orderColumn, { ascending: filters.sortOrder === 'asc' });
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: data ?? [], total: count ?? 0 };
}

export function useJournal(filters: JournalFilters) {
  const user = useAuthStore((s) => s.user);

  return useInfiniteQuery({
    queryKey: ['journal', user?.id, filters],
    queryFn: ({ pageParam = 0 }) => fetchJournal(user!.id, filters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + p.data.length, 0);
      return loaded < lastPage.total ? allPages.length : undefined;
    },
    enabled: !!user?.id,
  });
}
