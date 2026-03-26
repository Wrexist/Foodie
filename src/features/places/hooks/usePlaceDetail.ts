import { useQuery } from '@tanstack/react-query';
import { placesService } from '../services/places.service';

export function usePlaceDetail(id: string) {
  return useQuery({
    queryKey: ['place', id],
    queryFn: () => placesService.getById(id),
    enabled: !!id,
  });
}
