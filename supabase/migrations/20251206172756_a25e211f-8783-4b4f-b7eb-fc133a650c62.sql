-- Drop the view since it's causing false positive security warnings
-- We'll handle bid_count masking in the application layer instead
DROP VIEW IF EXISTS public.tender_opportunities_public;