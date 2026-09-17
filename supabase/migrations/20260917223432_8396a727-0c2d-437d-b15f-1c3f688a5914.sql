CREATE TABLE public.project_quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.solar_projects(id) ON DELETE SET NULL,
  project_name text,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  company text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.project_quote_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.project_quote_requests TO authenticated;
GRANT ALL ON public.project_quote_requests TO service_role;

ALTER TABLE public.project_quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a project quote request"
ON public.project_quote_requests FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view quote requests"
ON public.project_quote_requests FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update quote requests"
ON public.project_quote_requests FOR UPDATE TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete quote requests"
ON public.project_quote_requests FOR DELETE TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_project_quote_requests_updated_at
BEFORE UPDATE ON public.project_quote_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();