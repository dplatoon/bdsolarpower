DROP POLICY IF EXISTS "Solar projects are viewable by everyone" ON public.solar_projects;
CREATE POLICY "Published solar projects are viewable"
ON public.solar_projects
FOR SELECT
USING (status = ANY (ARRAY['planned','under_construction','operational','completed']));

DROP POLICY IF EXISTS "Tender opportunities are viewable by everyone" ON public.tender_opportunities;
CREATE POLICY "Listed tender opportunities are viewable"
ON public.tender_opportunities
FOR SELECT
USING (status = ANY (ARRAY['open','closed','awarded']));