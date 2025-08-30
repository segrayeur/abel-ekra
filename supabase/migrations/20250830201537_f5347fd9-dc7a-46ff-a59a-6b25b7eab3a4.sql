-- Créer les buckets de stockage pour les médias admin
INSERT INTO storage.buckets (id, name, public) VALUES 
('photos', 'photos', true),
('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Créer les politiques pour les photos
CREATE POLICY "Public can view photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'photos');

CREATE POLICY "Admin can upload photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Admin can update photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'photos');

CREATE POLICY "Admin can delete photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'photos');

-- Créer les politiques pour les vidéos
CREATE POLICY "Public can view videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'videos');

CREATE POLICY "Admin can upload videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Admin can update videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'videos');

CREATE POLICY "Admin can delete videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'videos');