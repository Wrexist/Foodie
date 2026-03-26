import { supabase } from '@/lib/supabase';
import { PAGE_SIZE } from '@/lib/constants';

export const searchService = {
  async searchUsers(query: string, page = 0) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const pattern = `%${query}%`;

    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .or(`username.ilike.${pattern},display_name.ilike.${pattern}`)
      .eq('is_public', true)
      .order('display_name')
      .range(from, to);

    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  },
};
