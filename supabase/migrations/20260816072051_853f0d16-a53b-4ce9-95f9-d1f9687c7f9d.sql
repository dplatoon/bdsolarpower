DROP VIEW IF EXISTS public.tender_opportunities_public;

CREATE VIEW public.tender_opportunities_public
WITH (security_invoker = true) AS
SELECT
  t.id,
  t.title,
  t.organization,
  t.location,
  t.deadline,
  t.status,
  t.capacity_mw,
  t.minimum_bid,
  t.description,
  t.estimated_budget,
  t.created_at,
  t.updated_at
FROM public.tender_opportunities t;

GRANT SELECT ON public.tender_opportunities_public TO anon, authenticated;
GRANT ALL ON public.tender_opportunities_public TO service_role;