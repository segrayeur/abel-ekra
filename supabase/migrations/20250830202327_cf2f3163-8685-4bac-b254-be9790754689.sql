-- Créer un système de rôles utilisateur pour la sécurité
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Créer une table pour les rôles utilisateurs
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Activer RLS sur la table des rôles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Créer une fonction sécurisée pour vérifier les rôles (évite la récursion RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Créer une fonction pour vérifier si l'utilisateur actuel est admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::app_role)
$$;

-- Politique pour que les utilisateurs voient leurs propres rôles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Politique pour que les admins voient tous les rôles
CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.is_current_user_admin());

-- Sécuriser la table contact_messages - SEULS LES ADMINS peuvent voir les messages
CREATE POLICY "Only admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
TO authenticated
USING (public.is_current_user_admin());

-- Permettre aux admins de mettre à jour le statut des messages
CREATE POLICY "Admins can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
TO authenticated
USING (public.is_current_user_admin());

-- Permettre aux admins de supprimer les messages si nécessaire
CREATE POLICY "Admins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
TO authenticated
USING (public.is_current_user_admin());

-- Appliquer les mêmes protections aux autres tables sensibles
CREATE POLICY "Only admins can view prayer requests" 
ON public.prayer_requests 
FOR SELECT 
TO authenticated
USING (public.is_current_user_admin());

CREATE POLICY "Admins can update prayer requests" 
ON public.prayer_requests 
FOR UPDATE 
TO authenticated
USING (public.is_current_user_admin());

CREATE POLICY "Only admins can view coaching sessions" 
ON public.coaching_sessions 
FOR SELECT 
TO authenticated
USING (public.is_current_user_admin());

CREATE POLICY "Admins can update coaching sessions" 
ON public.coaching_sessions 
FOR UPDATE 
TO authenticated
USING (public.is_current_user_admin());

-- Créer un trigger pour mettre à jour updated_at
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();