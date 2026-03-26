import { useQuery } from '@tanstack/react-query';
import { placesService } from '../services/places.service';

export function usePlaceStats(placeId: string) {
  return useQuery({
    queryKey: ['place-stats', placeId],
    queryFn: () => placesService.getPlaceStats(placeId),
    enabled: !!placeId,
  });
}
