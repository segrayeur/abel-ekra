-- Ajouter les politiques manquantes pour permettre aux administrateurs de gérer les médias

-- Politique pour permettre l'insertion de médias (temporaire - pour tous les utilisateurs)
-- Note: Cette politique est permissive pour les besoins immédiats. 
-- Il serait recommandé d'implémenter une authentification Supabase appropriée plus tard.
CREATE POLICY "Anyone can insert media" 
ON public.media 
FOR INSERT 
WITH CHECK (true);

-- Politique pour permettre la mise à jour de médias (temporaire - pour tous les utilisateurs)
CREATE POLICY "Anyone can update media" 
ON public.media 
FOR UPDATE 
USING (true);

-- Politique pour permettre la suppression de médias (temporaire - pour tous les utilisateurs)
CREATE POLICY "Anyone can delete media" 
ON public.media 
FOR DELETE 
USING (true);

-- Note: Ces politiques sont temporaires et permissives. 
-- Pour une sécurité renforcée, il faudrait :
-- 1. Implémenter l'authentification Supabase dans l'application
-- 2. Remplacer ces politiques par des vérifications de rôles admin appropriées