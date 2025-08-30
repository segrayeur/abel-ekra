import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, Calendar, Video, Trash2, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    group: '',
    file: null as File | null
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const videoGroups = [
    'Prédications',
    'Témoignages', 
    'Séminaires',
    'Formations',
    'Événements',
    'Interviews',
    'Conférences'
  ];

  // Charger les vidéos existantes
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('media_type', 'video')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les vidéos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un fichier vidéo",
          variant: "destructive"
        });
        return;
      }
      setNewVideo({ ...newVideo, file });
    }
  };

  const uploadVideo = async () => {
    if (!newVideo.file || !newVideo.title || !newVideo.group) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      // Upload du fichier vers Supabase Storage
      const fileExt = newVideo.file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, newVideo.file);

      if (uploadError) {
        // Si le bucket n'existe pas, afficher un message d'information
        if (uploadError.message.includes('not found')) {
          toast({
            title: "Configuration requise",
            description: "Le bucket de stockage vidéo doit être configuré. Contactez l'administrateur système.",
            variant: "destructive"
          });
          return;
        }
        throw uploadError;
      }

      // Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      // Insérer dans la base de données
      const { error: dbError } = await supabase
        .from('media')
        .insert({
          title: newVideo.title,
          description: newVideo.description,
          media_type: 'video',
          file_url: publicUrl,
          tags: [newVideo.group, 'Admin'],
          featured: false
        });

      if (dbError) throw dbError;

      toast({
        title: "Succès",
        description: "Vidéo ajoutée avec succès",
      });

      // Réinitialiser le formulaire
      setNewVideo({ title: '', description: '', group: '', file: null });
      setIsDialogOpen(false);
      fetchVideos();
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload de la vidéo",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteVideo = async (videoId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) return;

    try {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', videoId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Vidéo supprimée avec succès",
      });
      fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive"
      });
    }
  };

  const getCategoryColor = (tags: string[]) => {
    const category = tags?.[0] || 'Autre';
    const colors = {
      'Prédications': 'bg-primary/20 text-primary',
      'Témoignages': 'bg-secondary/20 text-secondary-foreground',
      'Séminaires': 'bg-accent/20 text-accent-foreground',
      'Formations': 'bg-blue-500/20 text-blue-700',
      'Événements': 'bg-green-500/20 text-green-700',
      'Interviews': 'bg-purple-500/20 text-purple-700',
      'Conférences': 'bg-orange-500/20 text-orange-700'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Chargement des vidéos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec bouton d'ajout */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Vidéos</h2>
          <p className="text-muted-foreground">Ajoutez et gérez vos vidéos par groupe thématique</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="spiritual-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une vidéo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle vidéo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="video-group" className="text-sm font-medium">
                  Groupe de la vidéo *
                </label>
                <Select value={newVideo.group} onValueChange={(value) => setNewVideo({ ...newVideo, group: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un groupe" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoGroups.map((group) => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="video-title" className="text-sm font-medium">
                  Nom du thème de la vidéo *
                </label>
                <Input
                  id="video-title"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  placeholder="Titre de la vidéo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="video-description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="video-description"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  placeholder="Description de la vidéo (optionnel)"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="video-file" className="text-sm font-medium">
                  Fichier vidéo *
                </label>
                <Input
                  id="video-file"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              <Button 
                onClick={uploadVideo} 
                disabled={uploading}
                className="w-full spiritual-gradient"
              >
                {uploading ? (
                  <>
                    <Upload className="w-4 h-4 mr-2 animate-spin" />
                    Upload en cours...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Ajouter la vidéo
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grille des vidéos */}
      {videos.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune vidéo</h3>
            <p className="text-muted-foreground">Commencez par ajouter votre première vidéo</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden shadow-spiritual hover:shadow-glow transition-smooth">
              <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={() => window.open(video.file_url, '_blank')}
                    className="spiritual-gradient shadow-glow hover:scale-110 transition-bounce"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Regarder
                  </Button>
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(video.tags || [])}>
                    {video.tags?.[0] || 'Vidéo'}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-primary line-clamp-1">{video.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteVideo(video.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {video.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {video.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(video.created_at).toLocaleDateString('fr-FR')}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-700">
                    Admin
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVideos;