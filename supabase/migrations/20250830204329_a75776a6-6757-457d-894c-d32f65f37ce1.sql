-- CORRECTION CRITIQUE DE SÉCURITÉ : Restreindre les opérations sur les médias aux administrateurs uniquement

-- Supprimer les politiques dangereusement permissives
DROP POLICY IF EXISTS "Anyone can insert media" ON public.media;
DROP POLICY IF EXISTS "Anyone can update media" ON public.media;
DROP POLICY IF EXISTS "Anyone can delete media" ON public.media;

-- Créer des politiques sécurisées pour les administrateurs authentifiés uniquement
CREATE POLICY "Only authenticated admins can insert media" 
ON public.media 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Only authenticated admins can update media" 
ON public.media 
FOR UPDATE 
TO authenticated
USING (public.is_current_user_admin());

CREATE POLICY "Only authenticated admins can delete media" 
ON public.media 
FOR DELETE 
TO authenticated
USING (public.is_current_user_admin());