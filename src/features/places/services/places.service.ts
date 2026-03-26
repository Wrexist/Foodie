import { supabase } from '@/lib/supabase';
import type { PlaceInsert, PlaceUpdate, PlaceRow } from '@/types/database';
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
    const { data, error } = await (supabase.rpc as any)('nearby_places', {
      lat,
      lng,
      radius_km: radiusKm,
    });
    if (error) throw error;
    return (data ?? []) as PlaceRow[];
  },

  async create(place: PlaceInsert) {
    const { data, error } = await supabase
      .from('places')
      .insert(place as any)
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

    const scores = (data ?? [])
      .map((r: any) => r.overall_score)
      .filter((s): s is number => s != null);
    const avgScore = scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;

    return {
      reviewCount: count ?? 0,
      averageScore: Math.round(avgScore * 10) / 10,
    };
  },
};
