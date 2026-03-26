-- Review Likes table
CREATE TABLE IF NOT EXISTS review_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(review_id, user_id)
);

CREATE INDEX idx_review_likes_review ON review_likes(review_id);
CREATE INDEX idx_review_likes_user ON review_likes(user_id);

-- RLS
ALTER TABLE review_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read likes" ON review_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own likes" ON review_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes" ON review_likes
  FOR DELETE USING (auth.uid() = user_id);
