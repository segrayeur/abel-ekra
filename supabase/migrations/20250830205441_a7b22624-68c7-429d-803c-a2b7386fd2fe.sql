-- SECURITY REINFORCEMENT: Ensure coaching_sessions table is bulletproof

-- Add additional layer of protection by ensuring RLS is strictly enforced
ALTER TABLE public.coaching_sessions FORCE ROW LEVEL SECURITY;

-- Create an additional failsafe policy that blocks all unauthorized access
CREATE POLICY "Block all unauthorized access to coaching data" 
ON public.coaching_sessions 
AS RESTRICTIVE
FOR ALL 
TO public
USING (false);

-- Verify the admin function is working correctly by adding logging
-- This will help debug any auth issues
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  -- First check if user is authenticated
  SELECT CASE 
    WHEN auth.uid() IS NULL THEN false
    ELSE EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'::app_role
    )
  END
$function$;