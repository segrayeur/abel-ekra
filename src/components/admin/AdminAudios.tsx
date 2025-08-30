import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, Calendar, Music, Trash2, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminAudios = () => {
  const [audios, setAudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newAudio, setNewAudio] = useState({
    title: '',
    description: '',
    group: '',
    file: null as File | null
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const audioGroups = [
    'Prédications',
    'Témoignages', 
    'Formations',
    'Prières',
    'Enseignements',
    'Méditations',
    'Séminaires BARA'
  ];

  // Charger les audios existants
  useEffect(() => {
    fetchAudios();
  }, []);

  const fetchAudios = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('media_type', 'audio')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAudios(data || []);
    } catch (error) {
      console.error('Error fetching audios:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les audios",
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
      if (!file.type.startsWith('audio/')) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un fichier audio",
          variant: "destructive"
        });
        return;
      }
      setNewAudio({ ...newAudio, file });
    }
  };

  const uploadAudio = async () => {
    if (!newAudio.file || !newAudio.title || !newAudio.group) {
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
      const fileExt = newAudio.file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `audio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('audio')
        .upload(filePath, newAudio.file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          title: "Erreur d'upload",
          description: `Erreur lors de l'upload: ${uploadError.message}`,
          variant: "destructive"
        });
        throw uploadError;
      }

      // Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('audio')
        .getPublicUrl(filePath);

      // Calculer la durée approximative (estimation basée sur la taille du fichier)
      const estimatedDuration = Math.round(newAudio.file.size / 16000); // Estimation approximative

      // Insérer dans la base de données
      const { error: dbError } = await supabase
        .from('media')
        .insert({
          title: newAudio.title,
          description: newAudio.description,
          media_type: 'audio',
          file_url: publicUrl,
          tags: [newAudio.group, 'Admin'],
          duration: estimatedDuration,
          featured: false
        });

      if (dbError) throw dbError;

      toast({
        title: "Succès",
        description: "Audio ajouté avec succès",
      });

      // Réinitialiser le formulaire
      setNewAudio({ title: '', description: '', group: '', file: null });
      setIsDialogOpen(false);
      fetchAudios();
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload de l'audio",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteAudio = async (audioId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet audio ?')) return;

    try {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', audioId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Audio supprimé avec succès",
      });
      fetchAudios();
      // Rechargement automatique de la page
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Error deleting audio:', error);
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
      'Formations': 'bg-blue-500/20 text-blue-700',
      'Prières': 'bg-purple-500/20 text-purple-700',
      'Enseignements': 'bg-green-500/20 text-green-700',
      'Méditations': 'bg-indigo-500/20 text-indigo-700',
      'Séminaires BARA': 'bg-accent/20 text-accent-foreground'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const formatTime = (time: number) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Chargement des audios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec bouton d'ajout */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Audios</h2>
          <p className="text-muted-foreground">Ajoutez et gérez vos fichiers audio par groupe thématique</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="spiritual-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un audio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau fichier audio</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous pour ajouter un nouveau fichier audio à votre collection.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="audio-group" className="text-sm font-medium">
                  Groupe de l'audio *
                </label>
                <Select value={newAudio.group} onValueChange={(value) => setNewAudio({ ...newAudio, group: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un groupe" />
                  </SelectTrigger>
                  <SelectContent>
                    {audioGroups.map((group) => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="audio-title" className="text-sm font-medium">
                  Nom du thème de l'audio *
                </label>
                <Input
                  id="audio-title"
                  value={newAudio.title}
                  onChange={(e) => setNewAudio({ ...newAudio, title: e.target.value })}
                  placeholder="Titre de l'audio"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="audio-description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="audio-description"
                  value={newAudio.description}
                  onChange={(e) => setNewAudio({ ...newAudio, description: e.target.value })}
                  placeholder="Description de l'audio (optionnel)"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="audio-file" className="text-sm font-medium">
                  Fichier audio *
                </label>
                <Input
                  id="audio-file"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              <Button 
                onClick={uploadAudio} 
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
                    Ajouter l'audio
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Liste des audios */}
      {audios.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Music className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun audio</h3>
            <p className="text-muted-foreground">Commencez par ajouter votre premier fichier audio</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {audios.map((audio) => (
            <Card key={audio.id} className="shadow-spiritual hover:shadow-glow transition-smooth">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                      <Music className="w-5 h-5" />
                    </div>
                    
                    {/* Audio Info */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-primary">{audio.title}</h4>
                        <Badge className={getCategoryColor(audio.tags || [])}>
                          {audio.tags?.[0] || 'Audio'}
                        </Badge>
                      </div>
                      {audio.description && (
                        <p className="text-sm text-muted-foreground">{audio.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-1">
                        <Badge variant="secondary">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(audio.created_at).toLocaleDateString('fr-FR')}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatTime(audio.duration || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(audio.file_url, '_blank')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Écouter
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteAudio(audio.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAudios;