export type { PlaceRow, PlaceInsert, PlaceUpdate } from '@/types/database';

export interface PlaceWithStats {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  cuisine_type: string | null;
  price_level: number | null;
  latitude: number | null;
  longitude: number | null;
  cover_image_url: string | null;
  reviewCount: number;
  averageScore: number;
}
