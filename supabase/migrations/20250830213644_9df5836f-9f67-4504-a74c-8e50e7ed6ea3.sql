-- Get all existing policies and recreate them securely
-- First get the current policies to see what exists
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
from pg_policies 
where schemaname = 'public' and tablename = 'contact_messages';