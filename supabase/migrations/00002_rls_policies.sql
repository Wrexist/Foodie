-- Row Level Security Policies for Palate

-- ══════════════════════════════════════
-- USERS
-- ══════════════════════════════════════
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public profiles"
  ON users FOR SELECT
  USING (is_public = true OR id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (id = auth.uid());

-- ══════════════════════════════════════
-- USER SETTINGS
-- ══════════════════════════════════════
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own settings"
  ON user_settings FOR ALL
  USING (user_id = auth.uid());

-- ══════════════════════════════════════
-- FOLLOWS
-- ══════════════════════════════════════
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view follows"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own follows"
  ON follows FOR INSERT
  WITH CHECK (follower_id = auth.uid());

CREATE POLICY "Users can unfollow"
  ON follows FOR DELETE
  USING (follower_id = auth.uid());

-- ══════════════════════════════════════
-- PLACES
-- ══════════════════════════════════════
ALTER TABLE places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view places"
  ON places FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create places"
  ON places FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Place creators can update"
  ON places FOR UPDATE
  USING (created_by = auth.uid());

ALTER TABLE place_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view place images"
  ON place_images FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can upload place images"
  ON place_images FOR INSERT
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can delete own place images"
  ON place_images FOR DELETE
  USING (uploaded_by = auth.uid());

-- ══════════════════════════════════════
-- REVIEWS
-- ══════════════════════════════════════
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public reviews and own reviews"
  ON reviews FOR SELECT
  USING (is_private = false OR user_id = auth.uid());

CREATE POLICY "Users can create own reviews"
  ON reviews FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (user_id = auth.uid());

ALTER TABLE review_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Review photos visible with review"
  ON review_photos FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM reviews WHERE reviews.id = review_photos.review_id
    AND (reviews.is_private = false OR reviews.user_id = auth.uid())
  ));

CREATE POLICY "Users can manage photos on own reviews"
  ON review_photos FOR ALL
  USING (EXISTS (
    SELECT 1 FROM reviews WHERE reviews.id = review_photos.review_id
    AND reviews.user_id = auth.uid()
  ));

ALTER TABLE review_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Review items visible with review"
  ON review_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM reviews WHERE reviews.id = review_items.review_id
    AND (reviews.is_private = false OR reviews.user_id = auth.uid())
  ));

CREATE POLICY "Users can manage items on own reviews"
  ON review_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM reviews WHERE reviews.id = review_items.review_id
    AND reviews.user_id = auth.uid()
  ));

ALTER TABLE review_item_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Review item photos visible with review"
  ON review_item_photos FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM review_items ri
    JOIN reviews r ON r.id = ri.review_id
    WHERE ri.id = review_item_photos.review_item_id
    AND (r.is_private = false OR r.user_id = auth.uid())
  ));

CREATE POLICY "Users can manage photos on own review items"
  ON review_item_photos FOR ALL
  USING (EXISTS (
    SELECT 1 FROM review_items ri
    JOIN reviews r ON r.id = ri.review_id
    WHERE ri.id = review_item_photos.review_item_id
    AND r.user_id = auth.uid()
  ));

-- ══════════════════════════════════════
-- SAVED PLACES
-- ══════════════════════════════════════
ALTER TABLE saved_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saved places"
  ON saved_places FOR ALL
  USING (user_id = auth.uid());

-- ══════════════════════════════════════
-- COLLECTIONS
-- ══════════════════════════════════════
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public collections and own"
  ON collections FOR SELECT
  USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can manage own collections"
  ON collections FOR ALL
  USING (user_id = auth.uid());

ALTER TABLE collection_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collection places visible with collection"
  ON collection_places FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM collections WHERE collections.id = collection_places.collection_id
    AND (collections.is_public = true OR collections.user_id = auth.uid())
  ));

CREATE POLICY "Users can manage places in own collections"
  ON collection_places FOR ALL
  USING (EXISTS (
    SELECT 1 FROM collections WHERE collections.id = collection_places.collection_id
    AND collections.user_id = auth.uid()
  ));

-- ══════════════════════════════════════
-- TAGS
-- ══════════════════════════════════════
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tags"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON tags FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE review_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Review tags visible with review"
  ON review_tags FOR SELECT
  USING (true);

CREATE POLICY "Users can manage tags on own reviews"
  ON review_tags FOR ALL
  USING (EXISTS (
    SELECT 1 FROM reviews WHERE reviews.id = review_tags.review_id
    AND reviews.user_id = auth.uid()
  ));

ALTER TABLE place_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view place tags"
  ON place_tags FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can tag places"
  ON place_tags FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Place creators can manage place tags"
  ON place_tags FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM places WHERE places.id = place_tags.place_id
    AND places.created_by = auth.uid()
  ));

-- ══════════════════════════════════════
-- ACTIVITY FEED
-- ══════════════════════════════════════
ALTER TABLE activity_feed_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view activity from followed users"
  ON activity_feed_events FOR SELECT
  USING (
    actor_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM follows WHERE follows.follower_id = auth.uid()
      AND follows.following_id = activity_feed_events.actor_id
    )
  );

CREATE POLICY "System can create activity events"
  ON activity_feed_events FOR INSERT
  WITH CHECK (actor_id = auth.uid());

-- ══════════════════════════════════════
-- TASTE PROFILES
-- ══════════════════════════════════════
ALTER TABLE taste_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own taste profile"
  ON taste_profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own taste profile"
  ON taste_profiles FOR ALL
  USING (user_id = auth.uid());

-- ══════════════════════════════════════
-- NOTIFICATIONS
-- ══════════════════════════════════════
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  USING (user_id = auth.uid());

-- ══════════════════════════════════════
-- SUBSCRIPTIONS
-- ══════════════════════════════════════
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (user_id = auth.uid());

-- ══════════════════════════════════════
-- EMBEDDINGS
-- ══════════════════════════════════════
ALTER TABLE embeddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view embeddings"
  ON embeddings FOR SELECT
  USING (auth.uid() IS NOT NULL);
