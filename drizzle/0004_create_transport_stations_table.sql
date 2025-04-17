CREATE TABLE IF NOT EXISTS "transport_stations" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "users" (id),
  "station_name" TEXT NOT NULL,
  "station_type" TEXT,
  "location" TEXT,
  "capacity" INTEGER,
  "operating_hours" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transport_stations_user_id ON "transport_stations" (user_id);