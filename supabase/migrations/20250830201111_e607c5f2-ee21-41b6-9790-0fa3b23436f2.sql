-- Nettoyer les audios existants et ne garder que les audios du portfolio
DELETE FROM public.media WHERE media_type = 'audio';

-- Insérer seulement les audios du portfolio
INSERT INTO public.media (title, description, media_type, file_url, tags, duration, featured) VALUES
('Prédication BARA - La Vision', 'Enseignement du séminaire BARA sur la vision spirituelle', 'audio', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', ARRAY['Formation', 'BARA'], 1845, true),
('Témoignage de Guérison', 'Histoire inspirante de guérison divine', 'audio', 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', ARRAY['Témoignage'], 1515, false)
ON CONFLICT DO NOTHING;