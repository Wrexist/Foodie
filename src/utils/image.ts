import { PHOTO_QUALITY, PHOTO_MAX_SIZE_MB } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import type { ImageAsset } from '@/types/common';

export async function uploadImage(
  bucket: string,
  path: string,
  uri: string,
  contentType: string = 'image/jpeg'
): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, blob, {
      contentType,
      upsert: true,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

export function generateImagePath(
  userId: string,
  folder: string,
  filename: string
): string {
  const timestamp = Date.now();
  const ext = filename.split('.').pop() ?? 'jpg';
  return `${userId}/${folder}/${timestamp}.${ext}`;
}
