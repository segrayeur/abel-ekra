-- Insert sample audio tracks for demo
INSERT INTO public.media (title, description, media_type, file_url, tags, duration, featured) VALUES
('La Foi au Quotidien', 'Audio extrait de vidéo TikTok - Message inspirant sur la foi quotidienne', 'audio', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', ARRAY['TikTok'], 225, true),
('Transformation Spirituelle', 'Audio extrait de vidéo TikTok - Témoignage de transformation', 'audio', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', ARRAY['TikTok'], 135, false),
('Miracle et Délivrance', 'Audio extrait de vidéo TikTok - Message sur les miracles de Dieu', 'audio', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', ARRAY['TikTok'], 270, false),
('Prédication BARA - La Vision', 'Enseignement du séminaire BARA sur la vision spirituelle', 'audio', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', ARRAY['Formation', 'BARA'], 1845, true),
('Témoignage de Guérison', 'Histoire inspirante de guérison divine', 'audio', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', ARRAY['Témoignage'], 1515, false)
ON CONFLICT DO NOTHING;