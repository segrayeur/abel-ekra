-- Create public audio bucket and public read policy
insert into storage.buckets (id, name, public)
values ('audio', 'audio', true)
on conflict (id) do nothing;

-- Public can read files in audio bucket
create policy if not exists "Public read audio files"
on storage.objects for select
using (bucket_id = 'audio');