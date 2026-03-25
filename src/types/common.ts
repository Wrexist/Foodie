export type Pagination = {
  page: number;
  pageSize: number;
  total?: number;
};

export type SortOrder = 'asc' | 'desc';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type ImageAsset = {
  uri: string;
  width: number;
  height: number;
  mimeType?: string;
};
