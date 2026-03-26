import { supabase } from '@/lib/supabase';
import type { PlaceInsert, PlaceUpdate } from '@/types/database';
import { PAGE_SIZE } from '@/lib/constants';

export const placesService = {
  async getById(id: string) {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async search(query: string, limit = 20) {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .ilike('name', `%${query}%`)
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  },

  async getNearby(lat: number, lng: number, radiusKm = 5) {
    const { data, error } = await supabase.rpc('nearby_places' as never, {
      lat,
      lng,
      radius_km: radiusKm,
    } as any);
    if (error) throw error;
    return (data as never[]) ?? [];
  },

  async create(place: PlaceInsert) {
    const { data, error } = await supabase
      .from('places')
      .insert(place as never)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: PlaceUpdate) {
    const { data, error } = await supabase
      .from('places')
      .update(updates as never)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getPlaceStats(placeId: string) {
    const { data, error, count } = await supabase
      .from('reviews')
      .select('overall_score', { count: 'exact' })
      .eq('place_id', placeId)
      .eq('is_private', false);
    if (error) throw error;

    const rows = (data as any[]) ?? [];
    const scores = rows.map((r) => r.overall_score);
    const avgScore = scores.length > 0
      ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length
      : 0;

    return {
      reviewCount: count ?? 0,
      averageScore: Math.round(avgScore * 10) / 10,
    };
  },
};
