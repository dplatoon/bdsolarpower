ALTER TABLE public.solar_projects
  ADD COLUMN IF NOT EXISTS latitude double precision,
  ADD COLUMN IF NOT EXISTS longitude double precision;

UPDATE public.solar_projects SET latitude = 23.8103, longitude = 90.4125 WHERE location ILIKE 'Dhaka%' AND latitude IS NULL;
UPDATE public.solar_projects SET latitude = 22.3569, longitude = 91.7832 WHERE (location ILIKE 'Chittagong%' OR location ILIKE 'Chattogram%') AND latitude IS NULL;
UPDATE public.solar_projects SET latitude = 21.4272, longitude = 92.0058 WHERE location ILIKE 'Cox%' AND latitude IS NULL;
UPDATE public.solar_projects SET latitude = 25.7439, longitude = 89.2752 WHERE location ILIKE 'Rangpur%' AND latitude IS NULL;