DROP POLICY IF EXISTS "Tender opportunities are viewable by everyone" ON public.tender_opportunities;

CREATE POLICY "Admins can view raw tender opportunities"
ON public.tender_opportunities
FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));

ALTER VIEW public.tender_opportunities_public SET (security_invoker = false);

GRANT SELECT ON public.tender_opportunities_public TO anon, authenticated;