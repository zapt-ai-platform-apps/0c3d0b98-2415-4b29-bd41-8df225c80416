CREATE TABLE IF NOT EXISTS "merchants" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users" (id),
  "business_name" TEXT NOT NULL,
  "business_type" TEXT,
  "business_description" TEXT,
  "location" TEXT,
  "logo_url" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_merchants_user_id ON "merchants" (user_id);