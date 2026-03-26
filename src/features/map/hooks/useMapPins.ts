import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth.store';

export interface MapPin {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'visited' | 'saved';
  averageScore?: number;
}

async function fetchMapPins(userId: string): Promise<MapPin[]> {
  const [visitedResult, savedResult] = await Promise.all([
    supabase
      .from('reviews')
      .select('place:places(id, name, latitude, longitude), overall_score')
      .eq('user_id', userId),
    supabase
      .from('saved_places')
      .select('place:places(id, name, latitude, longitude)')
      .eq('user_id', userId),
  ]);

  const visitedMap = new Map<string, { scores: number[]; name: string; lat: number; lng: number }>();

  if (visitedResult.data) {
    for (const row of (visitedResult.data as any[])) {
      const place = row.place as { id: string; name: string; latitude: number; longitude: number } | null;
      if (!place?.latitude || !place?.longitude) continue;

      const existing = visitedMap.get(place.id);
      if (existing) {
        existing.scores.push(row.overall_score);
      } else {
        visitedMap.set(place.id, {
          name: place.name,
          lat: place.latitude,
          lng: place.longitude,
          scores: [row.overall_score],
        });
      }
    }
  }

  const pins: MapPin[] = [];

  for (const [id, data] of visitedMap) {
    const avg = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
    pins.push({
      id,
      name: data.name,
      latitude: data.lat,
      longitude: data.lng,
      type: 'visited',
      averageScore: Math.round(avg * 10) / 10,
    });
  }

  if (savedResult.data) {
    for (const row of (savedResult.data as any[])) {
      const place = row.place as { id: string; name: string; latitude: number; longitude: number } | null;
      if (!place?.latitude || !place?.longitude) continue;
      if (visitedMap.has(place.id)) continue;

      pins.push({
        id: place.id,
        name: place.name,
        latitude: place.latitude,
        longitude: place.longitude,
        type: 'saved',
      });
    }
  }

  return pins;
}

export function useMapPins() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ['map-pins', user?.id],
    queryFn: () => fetchMapPins(user!.id),
    enabled: !!user?.id,
  });
}
