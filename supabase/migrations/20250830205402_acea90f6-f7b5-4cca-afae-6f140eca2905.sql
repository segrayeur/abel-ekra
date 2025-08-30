-- CRITICAL SECURITY FIX: Secure coaching_sessions table to protect sensitive client data

-- Drop ALL existing policies on coaching_sessions to start fresh
DROP POLICY IF EXISTS "Anyone can view coaching sessions" ON public.coaching_sessions;
DROP POLICY IF EXISTS "Public can view coaching sessions" ON public.coaching_sessions;
DROP POLICY IF EXISTS "Users can view coaching sessions" ON public.coaching_sessions;
DROP POLICY IF EXISTS "Only admins can view coaching sessions" ON public.coaching_sessions;
DROP POLICY IF EXISTS "Admins can update coaching sessions" ON public.coaching_sessions;
DROP POLICY IF EXISTS "Anyone can submit coaching requests" ON public.coaching_sessions;

-- Ensure RLS is enabled on coaching_sessions table
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;

-- Create secure policies with unique names
-- CRITICAL: Only authenticated administrators can view sensitive coaching session data
CREATE POLICY "Authenticated admins only - view coaching data" 
ON public.coaching_sessions 
FOR SELECT 
TO authenticated
USING (public.is_current_user_admin());

-- CRITICAL: Only authenticated administrators can update coaching sessions
CREATE POLICY "Authenticated admins only - update coaching data" 
ON public.coaching_sessions 
FOR UPDATE 
TO authenticated
USING (public.is_current_user_admin());

-- Allow public submissions for coaching requests (secure: they can submit but not read)
CREATE POLICY "Public coaching request submission only" 
ON public.coaching_sessions 
FOR INSERT 
WITH CHECK (true);

-- No DELETE policy = DELETE operations blocked for everyone (data preservation)