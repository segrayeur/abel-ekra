-- Relaxed, temporary policies to unblock media uploads for now.
-- NOTE: These can be tightened once admin authentication is in place.

-- Storage policies: allow public read and uploads to media buckets
drop policy if exists "Public can read media buckets" on storage.objects;
drop policy if exists "Anyone can upload to media buckets" on storage.objects;

create policy "Public can read media buckets"
  on storage.objects
  for select
  using (bucket_id in ('photos','videos','audio'));

create policy "Anyone can upload to media buckets"
  on storage.objects
  for insert
  with check (bucket_id in ('photos','videos','audio'));

-- Media table: allow public inserts temporarily so the admin UI can add records without auth
drop policy if exists "Public can insert media temporarily" on public.media;

create policy "Public can insert media temporarily"
  on public.media
  for insert
  with check (true);