export type { SavedPlaceRow, SavedPlaceInsert } from '@/types/database';

export interface SavedPlaceWithPlace {
  id: string;
  place_id: string;
  notes: string | null;
  created_at: string;
  place: {
    id: string;
    name: string;
    address: string | null;
    city: string | null;
    cuisine_type: string | null;
    cover_image_url: string | null;
  };
}
