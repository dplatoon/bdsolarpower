ALTER VIEW public.tender_opportunities_public SET (security_invoker = true);

DROP POLICY IF EXISTS "Admins can view raw tender opportunities" ON public.tender_opportunities;

CREATE POLICY "Tender opportunities are viewable by everyone"
ON public.tender_opportunities
FOR SELECT
USING (true);

REVOKE SELECT ON public.tender_opportunities FROM anon, authenticated;
GRANT SELECT (id, title, organization, location, deadline, status, capacity_mw, minimum_bid, description, estimated_budget, created_at, updated_at)
ON public.tender_opportunities TO anon, authenticated;
GRANT ALL ON public.tender_opportunities TO service_role;

CREATE OR REPLACE FUNCTION private.tender_visible_bid_count(_tender_id uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, private
AS $$
  SELECT CASE
    WHEN t.deadline <= now() OR private.has_role(auth.uid(), 'admin'::app_role) THEN t.bid_count
    ELSE NULL::integer
  END
  FROM public.tender_opportunities t
  WHERE t.id = _tender_id
$$;

CREATE OR REPLACE VIEW public.tender_opportunities_public
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
  t.updated_at,
  private.tender_visible_bid_count(t.id) AS bid_count
FROM public.tender_opportunities t;

GRANT SELECT ON public.tender_opportunities_public TO anon, authenticated;
GRANT ALL ON public.tender_opportunities_public TO service_role;