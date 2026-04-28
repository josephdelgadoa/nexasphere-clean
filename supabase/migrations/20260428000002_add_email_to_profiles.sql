-- Add email column to profiles for easier lookup
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email text UNIQUE;

-- Update existing profiles from auth.users if possible
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id;
