-- Harden coaching_sessions against abuse via INSERT while keeping public submission intact
-- 1) Ensure RLS is enabled and enforced
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_sessions FORCE ROW LEVEL SECURITY;

-- 2) Replace overly broad restrictive policy that could block inserts
DROP POLICY IF EXISTS "Block all unauthorized access to coaching data" ON public.coaching_sessions;

-- Add targeted restrictive policies for read/write destructive ops (defense-in-depth)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'coaching_sessions' AND policyname = 'Block unauthorized read of coaching data'
  ) THEN
    CREATE POLICY "Block unauthorized read of coaching data"
    ON public.coaching_sessions
    AS RESTRICTIVE
    FOR SELECT
    TO public
    USING (false);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'coaching_sessions' AND policyname = 'Block unauthorized update of coaching data'
  ) THEN
    CREATE POLICY "Block unauthorized update of coaching data"
    ON public.coaching_sessions
    AS RESTRICTIVE
    FOR UPDATE
    TO public
    USING (false);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'coaching_sessions' AND policyname = 'Block unauthorized delete of coaching data'
  ) THEN
    CREATE POLICY "Block unauthorized delete of coaching data"
    ON public.coaching_sessions
    AS RESTRICTIVE
    FOR DELETE
    TO public
    USING (false);
  END IF;
END $$;

-- 3) Tighten the public INSERT policy with validation
DROP POLICY IF EXISTS "Public coaching request submission only" ON public.coaching_sessions;

CREATE POLICY "Public coaching request submission only"
ON public.coaching_sessions
FOR INSERT
TO public
WITH CHECK (
  -- Only allow pending status from public
  (status IS NULL OR status = 'pending'::request_status)
  -- Basic validation to reduce spam/abuse
  AND length(client_name) BETWEEN 1 AND 120
  AND length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR phone ~ '^[0-9+()\-\s]{7,20}$')
  AND (message IS NULL OR length(message) <= 5000)
);

-- 4) BEFORE INSERT trigger to normalize and enforce pending status
CREATE OR REPLACE FUNCTION public.enforce_coaching_sessions_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  -- Normalize basic fields
  IF NEW.client_name IS NOT NULL THEN NEW.client_name := trim(NEW.client_name); END IF;
  IF NEW.email IS NOT NULL THEN NEW.email := lower(trim(NEW.email)); END IF;
  IF NEW.phone IS NOT NULL THEN NEW.phone := trim(NEW.phone); END IF;

  -- Force status to pending regardless of input
  NEW.status := 'pending'::request_status;

  -- Required fields safety check
  IF NEW.client_name IS NULL OR NEW.client_name = '' THEN
    RAISE EXCEPTION 'Client name is required';
  END IF;

  IF NEW.email IS NULL OR NEW.email = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_coaching_sessions_insert ON public.coaching_sessions;
CREATE TRIGGER trg_enforce_coaching_sessions_insert
BEFORE INSERT ON public.coaching_sessions
FOR EACH ROW
EXECUTE FUNCTION public.enforce_coaching_sessions_insert();