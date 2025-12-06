-- Create a secure view that masks bid_count before deadline for non-admins
-- This prevents competitors from seeing how many bids a tender has received before it closes
CREATE OR REPLACE VIEW public.tender_opportunities_public AS
SELECT 
  id,
  title,
  organization,
  location,
  description,
  capacity_mw,
  minimum_bid,
  deadline,
  status,
  estimated_budget,
  created_at,
  updated_at,
  CASE 
    WHEN deadline <= now() THEN bid_count  -- Show after deadline has passed
    WHEN public.has_role(auth.uid(), 'admin') THEN bid_count  -- Admins always see bid counts
    ELSE NULL  -- Hide from regular users before deadline
  END as bid_count
FROM public.tender_opportunities;

-- Grant SELECT on the view to both anonymous and authenticated users
GRANT SELECT ON public.tender_opportunities_public TO anon, authenticated;

-- Add a comment explaining the view's purpose
COMMENT ON VIEW public.tender_opportunities_public IS 'Secure view that masks bid_count from non-admins before tender deadline to prevent competitive intelligence leaks';