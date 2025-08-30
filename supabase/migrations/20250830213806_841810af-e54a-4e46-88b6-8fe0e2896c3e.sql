-- Vérifier les politiques actuelles de la table coaching_sessions
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
from pg_policies 
where schemaname = 'public' and tablename = 'coaching_sessions'
order by cmd, policyname;