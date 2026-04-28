-- Add check-in and check-out tracking for cleaners
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS check_in_at timestamptz,
ADD COLUMN IF NOT EXISTS check_out_at timestamptz,
ADD COLUMN IF NOT EXISTS notes text,
ADD COLUMN IF NOT EXISTS completion_photos text[]; -- Array of URLs for proof of work

-- Add a status for cleaner progress
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_progress') THEN
    CREATE TYPE appointment_progress AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');
  END IF;
END $$;

ALTER TABLE appointments 
ALTER COLUMN status TYPE text; -- Keep as text but we'll use the progress values
