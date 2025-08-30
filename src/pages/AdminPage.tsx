import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import FloatingWidgets from '@/components/FloatingWidgets';
import AdminPhotos from '@/components/admin/AdminPhotos';
import AdminVideos from '@/components/admin/AdminVideos';
import AdminAudios from '@/components/admin/AdminAudios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, LogOut, User, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_auth');
    if (adminAuth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Vérification des identifiants
    if (loginData.username === 'ekra-abel' && loginData.password === '1admin@2') {
      localStorage.setItem('admin_auth', 'authenticated');
      setIsAuthenticated(true);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'espace administrateur",
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants incorrects",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-spiritual">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full spiritual-gradient flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Espace Administrateur
              </span>
            </CardTitle>
            <p className="text-muted-foreground">Connexion sécurisée requise</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nom d'utilisateur
                </label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Mot de passe
                </label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full spiritual-gradient hover:scale-105 transition-bounce"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Espace Administrateur
                </span>
              </h1>
              <p className="text-muted-foreground">Gestion des contenus média</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>

          {/* Tabs pour gérer les différents types de médias */}
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="videos">Vidéos</TabsTrigger>
              <TabsTrigger value="audios">Audios</TabsTrigger>
            </TabsList>
            
            <TabsContent value="photos" className="mt-6">
              <AdminPhotos />
            </TabsContent>
            
            <TabsContent value="videos" className="mt-6">
              <AdminVideos />
            </TabsContent>
            
            <TabsContent value="audios" className="mt-6">
              <AdminAudios />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <FloatingWidgets />
    </div>
  );
};

export default AdminPage;