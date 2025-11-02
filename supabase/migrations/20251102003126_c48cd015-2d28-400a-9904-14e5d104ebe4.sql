-- Fix infinite recursion in user_roles RLS policy
-- Drop the problematic policy that queries user_roles directly
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Recreate it using the has_role() security definer function to avoid recursion
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add INSERT policy: Allow admins to assign roles to OTHER users (prevent self-promotion)
CREATE POLICY "Admins can assign roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  AND auth.uid() != user_id
);

-- Add DELETE policy: Allow admins to revoke roles from OTHER users (prevent self-demotion)
CREATE POLICY "Admins can revoke roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  AND auth.uid() != user_id
);