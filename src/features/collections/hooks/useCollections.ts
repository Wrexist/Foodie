import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionsService } from '../services/collections.service';
import { useAuthStore } from '@/stores/auth.store';
import type { CollectionInsert, CollectionUpdate } from '@/types/database';

export function useCollections() {
  const user = useAuthStore((s) => s.user);

  return useInfiniteQuery({
    queryKey: ['collections', user?.id],
    queryFn: ({ pageParam = 0 }) => collectionsService.getByUser(user!.id, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + p.data.length, 0);
      return loaded < lastPage.total ? allPages.length : undefined;
    },
    enabled: !!user?.id,
  });
}

export function useCollectionDetail(id: string) {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => collectionsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CollectionInsert) => collectionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useDeleteCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => collectionsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useCollectionPlaces() {
  const queryClient = useQueryClient();

  const addPlace = useMutation({
    mutationFn: ({ collectionId, placeId }: { collectionId: string; placeId: string }) =>
      collectionsService.addPlace(collectionId, placeId),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries({ queryKey: ['collection', collectionId] });
    },
  });

  const removePlace = useMutation({
    mutationFn: ({ collectionId, placeId }: { collectionId: string; placeId: string }) =>
      collectionsService.removePlace(collectionId, placeId),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries({ queryKey: ['collection', collectionId] });
    },
  });

  return { addPlace, removePlace };
}
