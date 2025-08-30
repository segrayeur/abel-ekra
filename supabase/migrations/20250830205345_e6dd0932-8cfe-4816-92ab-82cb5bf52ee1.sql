-- CRITICAL SECURITY FIX: Secure coaching_sessions table to protect sensitive client data

-- Drop any potentially problematic policies on coaching_sessions
DROP POLICY IF EXISTS "Anyone can view coaching sessions" ON public.coaching_sessions;
DROP POLICY IF EXISTS "Public can view coaching sessions" ON public.coaching_sessions;
DROP POLICY IF EXISTS "Users can view coaching sessions" ON public.coaching_sessions;

-- Ensure RLS is enabled on coaching_sessions table
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;

-- Recreate secure policies for coaching_sessions
-- Only authenticated administrators can view sensitive coaching session data
CREATE POLICY "Only authenticated admins can view coaching sessions" 
ON public.coaching_sessions 
FOR SELECT 
TO authenticated
USING (public.is_current_user_admin());

-- Only authenticated administrators can update coaching sessions (status, etc.)
CREATE POLICY "Only authenticated admins can update coaching sessions" 
ON public.coaching_sessions 
FOR UPDATE 
TO authenticated
USING (public.is_current_user_admin());

-- Allow public to submit coaching requests (but they won't be able to read them)
CREATE POLICY "Anyone can submit coaching requests" 
ON public.coaching_sessions 
FOR INSERT 
WITH CHECK (true);

-- Ensure no DELETE operations are allowed (preserve data integrity)
-- No DELETE policy means DELETE is blocked for everyone