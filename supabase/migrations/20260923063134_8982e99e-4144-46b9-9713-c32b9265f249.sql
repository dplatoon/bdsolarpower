CREATE TABLE public.site_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  contact_name TEXT,
  contact_phone TEXT,
  district TEXT,
  site_type TEXT,
  area_sqft NUMERIC,
  monthly_bill_bdt NUMERIC,
  grid_connected BOOLEAN,
  notes TEXT,
  photo_count INTEGER NOT NULL DEFAULT 0,
  suitability_score INTEGER,
  recommended_system_kw NUMERIC,
  estimated_annual_kwh NUMERIC,
  estimated_cost_bdt_min NUMERIC,
  estimated_cost_bdt_max NUMERIC,
  payback_years NUMERIC,
  summary TEXT,
  assessment JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_assessments TO authenticated;
GRANT ALL ON public.site_assessments TO service_role;

ALTER TABLE public.site_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own site assessments"
ON public.site_assessments FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all site assessments"
ON public.site_assessments FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE INDEX idx_site_assessments_user_created ON public.site_assessments (user_id, created_at DESC);