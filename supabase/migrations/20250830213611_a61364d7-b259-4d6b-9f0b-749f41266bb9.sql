-- Fix contact_messages security issue by adding restrictive RLS policies
-- This prevents unauthorized access to sensitive contact form data

-- First, drop any existing potentially permissive policies
drop policy if exists "Only admins can view contact messages" on public.contact_messages;
drop policy if exists "Admins can update contact messages" on public.contact_messages;
drop policy if exists "Admins can delete contact messages" on public.contact_messages;
drop policy if exists "Anyone can submit contact messages" on public.contact_messages;

-- Add strict restrictive policies first (deny by default)
create policy "Block unauthorized read of contact data"
  on public.contact_messages
  for select
  using (false);

create policy "Block unauthorized update of contact data"
  on public.contact_messages
  for update
  using (false);

create policy "Block unauthorized delete of contact data"
  on public.contact_messages
  for delete
  using (false);

-- Allow only authenticated admins to read contact messages
create policy "Authenticated admins only - view contact data"
  on public.contact_messages
  for select
  using (is_current_user_admin());

-- Allow only authenticated admins to update contact messages  
create policy "Authenticated admins only - update contact data"
  on public.contact_messages
  for update
  using (is_current_user_admin());

-- Allow only authenticated admins to delete contact messages
create policy "Authenticated admins only - delete contact data"
  on public.contact_messages
  for delete
  using (is_current_user_admin());

-- Allow public to submit contact messages (but with data validation)
create policy "Public contact form submission only"
  on public.contact_messages
  for insert
  with check (
    -- Validate required fields are present and within reasonable limits
    name is not null and length(name) >= 1 and length(name) <= 100 and
    email is not null and length(email) >= 3 and length(email) <= 320 and
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and
    subject is not null and length(subject) >= 1 and length(subject) <= 200 and
    message is not null and length(message) >= 1 and length(message) <= 5000 and
    (phone is null or phone ~ '^[0-9+()\-\s]{7,20}$')
  );