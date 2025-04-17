CREATE TABLE IF NOT EXISTS "service_providers" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users" (id),
  "service_name" TEXT NOT NULL,
  "service_type" TEXT,
  "service_description" TEXT,
  "location" TEXT,
  "availability" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_providers_user_id ON "service_providers" (user_id);