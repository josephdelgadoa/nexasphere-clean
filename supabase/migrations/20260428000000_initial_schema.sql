-- NexaSphere Clean: Initial Database Schema

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Profile)
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
    full_name text,
    phone_text text,
    role text CHECK (role IN ('admin', 'cleaner', 'customer')) DEFAULT 'customer',
    avatar_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Services
CREATE TABLE IF NOT EXISTS public.services (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    base_price numeric NOT NULL,
    multiplier numeric DEFAULT 1.0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- 3. Add-ons
CREATE TABLE IF NOT EXISTS public.add_ons (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text,
    price numeric NOT NULL,
    is_active boolean DEFAULT true
);

-- 4. Properties
CREATE TABLE IF NOT EXISTS public.properties (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    address text NOT NULL,
    city text,
    state text,
    zip_code text,
    property_type text CHECK (property_type IN ('apartment', 'house', 'mansion', 'commercial')),
    sq_ft integer,
    beds integer,
    baths integer,
    has_pets boolean DEFAULT false,
    notes text,
    created_at timestamptz DEFAULT now()
);

-- 5. Quotes / Leads
CREATE TABLE IF NOT EXISTS public.quotes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id uuid REFERENCES public.profiles(id),
    property_id uuid REFERENCES public.properties(id),
    service_id uuid REFERENCES public.services(id),
    estimated_price numeric,
    status text CHECK (status IN ('draft', 'sent', 'converted', 'expired')) DEFAULT 'draft',
    ai_score numeric, -- Lead quality score
    lead_source text,
    created_at timestamptz DEFAULT now()
);

-- 6. Appointments
CREATE TABLE IF NOT EXISTS public.appointments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    quote_id uuid REFERENCES public.quotes(id),
    customer_id uuid REFERENCES public.profiles(id),
    cleaner_id uuid REFERENCES public.profiles(id),
    status text CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')) DEFAULT 'scheduled',
    scheduled_at timestamptz NOT NULL,
    duration_minutes integer,
    payment_status text CHECK (payment_status IN ('unpaid', 'deposit_paid', 'fully_paid', 'refunded')) DEFAULT 'unpaid',
    stripe_payment_id text,
    created_at timestamptz DEFAULT now()
);

-- 7. Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    appointment_id uuid REFERENCES public.appointments(id),
    customer_id uuid REFERENCES public.profiles(id),
    rating integer CHECK (rating >= 1 AND rating <= 5),
    comment text,
    is_public boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- 8. Programmatic SEO Pages
CREATE TABLE IF NOT EXISTS public.seo_pages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    city text NOT NULL,
    zip_code text,
    slug text UNIQUE NOT NULL,
    title text,
    meta_description text,
    content_json jsonb,
    is_published boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- RLS POLICIES

-- Profiles: Users can view their own profile, admins view all
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Properties: Users view own, admins view all
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own properties" ON public.properties FOR SELECT USING (owner_id = auth.uid());
CREATE POLICY "Users can insert own properties" ON public.properties FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Appointments: Customers view own, Cleaners view assigned, Admins view all
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers view own appointments" ON public.appointments FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Cleaners view assigned appointments" ON public.appointments FOR SELECT USING (cleaner_id = auth.uid());

-- Insert some default services
INSERT INTO public.services (name, slug, base_price, multiplier) VALUES
('Standard Cleaning', 'standard-cleaning', 120, 1.0),
('Deep Cleaning', 'deep-cleaning', 180, 1.5),
('Move In/Out', 'move-in-out', 250, 2.0),
('Luxury Mansion Care', 'mansion-care', 500, 3.0);
