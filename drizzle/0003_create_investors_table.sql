CREATE TABLE IF NOT EXISTS "investors" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users" (id),
  "investment_focus" TEXT,
  "investment_range" TEXT,
  "bio" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_investors_user_id ON "investors" (user_id);