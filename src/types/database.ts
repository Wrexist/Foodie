export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: UserRow;
        Insert: UserInsert;
        Update: UserUpdate;
      };
      user_settings: {
        Row: UserSettingsRow;
        Insert: UserSettingsInsert;
        Update: UserSettingsUpdate;
      };
      follows: {
        Row: FollowRow;
        Insert: FollowInsert;
        Update: never;
      };
      places: {
        Row: PlaceRow;
        Insert: PlaceInsert;
        Update: PlaceUpdate;
      };
      place_images: {
        Row: PlaceImageRow;
        Insert: PlaceImageInsert;
        Update: never;
      };
      reviews: {
        Row: ReviewRow;
        Insert: ReviewInsert;
        Update: ReviewUpdate;
      };
      review_photos: {
        Row: ReviewPhotoRow;
        Insert: ReviewPhotoInsert;
        Update: never;
      };
      review_items: {
        Row: ReviewItemRow;
        Insert: ReviewItemInsert;
        Update: ReviewItemUpdate;
      };
      review_item_photos: {
        Row: ReviewItemPhotoRow;
        Insert: ReviewItemPhotoInsert;
        Update: never;
      };
      saved_places: {
        Row: SavedPlaceRow;
        Insert: SavedPlaceInsert;
        Update: never;
      };
      collections: {
        Row: CollectionRow;
        Insert: CollectionInsert;
        Update: CollectionUpdate;
      };
      collection_places: {
        Row: CollectionPlaceRow;
        Insert: CollectionPlaceInsert;
        Update: never;
      };
      tags: {
        Row: TagRow;
        Insert: TagInsert;
        Update: never;
      };
      review_tags: {
        Row: ReviewTagRow;
        Insert: ReviewTagInsert;
        Update: never;
      };
      place_tags: {
        Row: PlaceTagRow;
        Insert: PlaceTagInsert;
        Update: never;
      };
      activity_feed_events: {
        Row: ActivityFeedEventRow;
        Insert: ActivityFeedEventInsert;
        Update: never;
      };
      taste_profiles: {
        Row: TasteProfileRow;
        Insert: TasteProfileInsert;
        Update: TasteProfileUpdate;
      };
      notifications: {
        Row: NotificationRow;
        Insert: NotificationInsert;
        Update: NotificationUpdate;
      };
      subscriptions: {
        Row: SubscriptionRow;
        Insert: SubscriptionInsert;
        Update: SubscriptionUpdate;
      };
      embeddings: {
        Row: EmbeddingRow;
        Insert: EmbeddingInsert;
        Update: EmbeddingUpdate;
      };
    };
    Functions: Record<string, never>;
    Enums: {
      review_item_category: 'dish' | 'drink';
      activity_event_type: 'review' | 'follow' | 'save' | 'collection';
      notification_type: 'follow' | 'like' | 'comment' | 'recommendation';
      subscription_tier: 'free' | 'premium' | 'premium_plus';
    };
  };
}

// ── User ──
export interface UserRow {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
export type UserInsert = Omit<UserRow, 'created_at' | 'updated_at'>;
export type UserUpdate = Partial<Omit<UserRow, 'id' | 'created_at'>>;

// ── User Settings ──
export interface UserSettingsRow {
  id: string;
  user_id: string;
  push_notifications: boolean;
  email_notifications: boolean;
  default_review_visibility: 'public' | 'private';
  created_at: string;
  updated_at: string;
}
export type UserSettingsInsert = Omit<UserSettingsRow, 'id' | 'created_at' | 'updated_at'>;
export type UserSettingsUpdate = Partial<Omit<UserSettingsRow, 'id' | 'user_id' | 'created_at'>>;

// ── Follow ──
export interface FollowRow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}
export type FollowInsert = Omit<FollowRow, 'id' | 'created_at'>;

// ── Place ──
export interface PlaceRow {
  id: string;
  google_place_id: string | null;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  location: string | null; // PostGIS geography, auto-set by trigger
  phone: string | null;
  website: string | null;
  price_level: number | null;
  category: string | null;
  cuisine_type: string | null;
  cover_image_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}
export type PlaceInsert = Omit<PlaceRow, 'id' | 'location' | 'created_at' | 'updated_at'>;
export type PlaceUpdate = Partial<Omit<PlaceRow, 'id' | 'created_at'>>;

// ── Place Image ──
export interface PlaceImageRow {
  id: string;
  place_id: string;
  image_url: string;
  uploaded_by: string;
  created_at: string;
}
export type PlaceImageInsert = Omit<PlaceImageRow, 'id' | 'created_at'>;

// ── Review ──
export interface ReviewRow {
  id: string;
  user_id: string;
  place_id: string;
  visit_date: string;
  overall_score: number;
  notes: string | null;
  ai_summary: string | null;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}
export type ReviewInsert = Omit<ReviewRow, 'id' | 'ai_summary' | 'created_at' | 'updated_at'>;
export type ReviewUpdate = Partial<Omit<ReviewRow, 'id' | 'user_id' | 'created_at'>>;

// ── Review Photo ──
export interface ReviewPhotoRow {
  id: string;
  review_id: string;
  photo_url: string;
  sort_order: number;
  created_at: string;
}
export type ReviewPhotoInsert = Omit<ReviewPhotoRow, 'id' | 'created_at'>;

// ── Review Item ──
export interface ReviewItemRow {
  id: string;
  review_id: string;
  name: string;
  category: 'dish' | 'drink';
  score: number | null;
  notes: string | null;
  created_at: string;
}
export type ReviewItemInsert = Omit<ReviewItemRow, 'id' | 'created_at'>;
export type ReviewItemUpdate = Partial<Omit<ReviewItemRow, 'id' | 'review_id' | 'created_at'>>;

// ── Review Item Photo ──
export interface ReviewItemPhotoRow {
  id: string;
  review_item_id: string;
  photo_url: string;
  sort_order: number;
  created_at: string;
}
export type ReviewItemPhotoInsert = Omit<ReviewItemPhotoRow, 'id' | 'created_at'>;

// ── Saved Place ──
export interface SavedPlaceRow {
  id: string;
  user_id: string;
  place_id: string;
  notes: string | null;
  created_at: string;
}
export type SavedPlaceInsert = Omit<SavedPlaceRow, 'id' | 'created_at'>;

// ── Collection ──
export interface CollectionRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
export type CollectionInsert = Omit<CollectionRow, 'id' | 'created_at' | 'updated_at'>;
export type CollectionUpdate = Partial<Omit<CollectionRow, 'id' | 'user_id' | 'created_at'>>;

// ── Collection Place ──
export interface CollectionPlaceRow {
  id: string;
  collection_id: string;
  place_id: string;
  added_at: string;
}
export type CollectionPlaceInsert = Omit<CollectionPlaceRow, 'id' | 'added_at'>;

// ── Tag ──
export interface TagRow {
  id: string;
  name: string;
  category: string;
  created_at: string;
}
export type TagInsert = Omit<TagRow, 'id' | 'created_at'>;

// ── Review Tag ──
export interface ReviewTagRow {
  id: string;
  review_id: string;
  tag_id: string;
}
export type ReviewTagInsert = Omit<ReviewTagRow, 'id'>;

// ── Place Tag ──
export interface PlaceTagRow {
  id: string;
  place_id: string;
  tag_id: string;
}
export type PlaceTagInsert = Omit<PlaceTagRow, 'id'>;

// ── Activity Feed Event ──
export interface ActivityFeedEventRow {
  id: string;
  actor_id: string;
  event_type: 'review' | 'follow' | 'save' | 'collection';
  target_id: string;
  metadata: Json | null;
  created_at: string;
}
export type ActivityFeedEventInsert = Omit<ActivityFeedEventRow, 'id' | 'created_at'>;

// ── Taste Profile ──
export interface TasteProfileRow {
  id: string;
  user_id: string;
  profile_data: Json;
  generated_at: string;
  updated_at: string;
}
export type TasteProfileInsert = Omit<TasteProfileRow, 'id' | 'generated_at' | 'updated_at'>;
export type TasteProfileUpdate = Partial<Omit<TasteProfileRow, 'id' | 'user_id' | 'generated_at'>>;

// ── Notification ──
export interface NotificationRow {
  id: string;
  user_id: string;
  type: 'follow' | 'like' | 'comment' | 'recommendation';
  actor_id: string | null;
  target_id: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}
export type NotificationInsert = Omit<NotificationRow, 'id' | 'created_at'>;
export type NotificationUpdate = Partial<Pick<NotificationRow, 'is_read'>>;

// ── Subscription ──
export interface SubscriptionRow {
  id: string;
  user_id: string;
  tier: 'free' | 'premium' | 'premium_plus';
  revenue_cat_id: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}
export type SubscriptionInsert = Omit<SubscriptionRow, 'id' | 'created_at' | 'updated_at'>;
export type SubscriptionUpdate = Partial<Omit<SubscriptionRow, 'id' | 'user_id' | 'created_at'>>;

// ── Embedding ──
export interface EmbeddingRow {
  id: string;
  source_type: 'review' | 'place' | 'user';
  source_id: string;
  embedding: number[] | null;
  created_at: string;
  updated_at: string;
}
export type EmbeddingInsert = Omit<EmbeddingRow, 'id' | 'created_at' | 'updated_at'>;
export type EmbeddingUpdate = Partial<Pick<EmbeddingRow, 'embedding'>>;

// ── Convenience types for app use ──
export type User = UserRow;
export type Place = PlaceRow;
export type Review = ReviewRow;
export type ReviewItem = ReviewItemRow;
export type Collection = CollectionRow;
export type Tag = TagRow;

export type ReviewWithPlace = Review & { place: Place };
export type ReviewWithItems = Review & { review_items: ReviewItem[] };
export type ReviewFull = Review & { place: Place; review_items: ReviewItem[]; review_photos: ReviewPhotoRow[] };
