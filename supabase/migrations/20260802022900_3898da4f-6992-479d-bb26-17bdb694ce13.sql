-- 1. Move has_role into a private schema not exposed via the API
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO anon, authenticated, service_role;

-- 2. Repoint all policies to private.has_role
DROP POLICY IF EXISTS "Admins can delete solar projects" ON public.solar_projects;
DROP POLICY IF EXISTS "Admins can insert solar projects" ON public.solar_projects;
DROP POLICY IF EXISTS "Admins can update solar projects" ON public.solar_projects;
CREATE POLICY "Admins can delete solar projects" ON public.solar_projects FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert solar projects" ON public.solar_projects FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update solar projects" ON public.solar_projects FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete tender opportunities" ON public.tender_opportunities;
DROP POLICY IF EXISTS "Admins can insert tender opportunities" ON public.tender_opportunities;
DROP POLICY IF EXISTS "Admins can update tender opportunities" ON public.tender_opportunities;
CREATE POLICY "Admins can delete tender opportunities" ON public.tender_opportunities FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert tender opportunities" ON public.tender_opportunities FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update tender opportunities" ON public.tender_opportunities FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can assign roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can revoke roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can assign roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin') AND auth.uid() <> user_id);
CREATE POLICY "Admins can revoke roles" ON public.user_roles FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin') AND auth.uid() <> user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 3. Revoke API execute on internal trigger functions
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 4. Public tender view masking bid_count until the deadline passes
CREATE OR REPLACE VIEW public.tender_opportunities_public
WITH (security_invoker = true) AS
SELECT
  id, title, organization, location, deadline, status,
  capacity_mw, minimum_bid, description, estimated_budget,
  created_at, updated_at,
  CASE
    WHEN deadline <= now() OR private.has_role(auth.uid(), 'admin') THEN bid_count
    ELSE NULL
  END AS bid_count
FROM public.tender_opportunities;

GRANT SELECT ON public.tender_opportunities_public TO anon, authenticated;
GRANT ALL ON public.tender_opportunities_public TO service_role;