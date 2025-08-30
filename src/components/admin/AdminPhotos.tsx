import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Upload, Calendar, Image as ImageIcon, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminPhotos = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    file: null as File | null
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Charger les photos existantes
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('media_type', 'image')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les photos",
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
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un fichier image",
          variant: "destructive"
        });
        return;
      }
      setNewPhoto({ ...newPhoto, file });
    }
  };

  const uploadPhoto = async () => {
    if (!newPhoto.file || !newPhoto.title) {
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
      const fileExt = newPhoto.file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, newPhoto.file);

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
        .from('photos')
        .getPublicUrl(filePath);

      // Insérer dans la base de données
      const { error: dbError } = await supabase
        .from('media')
        .insert({
          title: newPhoto.title,
          description: newPhoto.description,
          media_type: 'image',
          file_url: publicUrl,
          thumbnail_url: publicUrl,
          tags: ['Admin'],
          featured: false
        });

      if (dbError) throw dbError;

      toast({
        title: "Succès",
        description: "Photo ajoutée avec succès",
      });

      // Réinitialiser le formulaire
      setNewPhoto({ title: '', description: '', file: null });
      setIsDialogOpen(false);
      fetchPhotos();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload de la photo",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (photoId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) return;

    try {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', photoId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Photo supprimée avec succès",
      });
      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Chargement des photos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec bouton d'ajout */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Photos</h2>
          <p className="text-muted-foreground">Ajoutez et gérez vos photos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="spiritual-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une photo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle photo</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous pour ajouter une nouvelle photo à votre galerie.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="photo-title" className="text-sm font-medium">
                  Nom de la photo *
                </label>
                <Input
                  id="photo-title"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  placeholder="Titre de la photo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="photo-description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="photo-description"
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  placeholder="Description de la photo (optionnel)"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="photo-file" className="text-sm font-medium">
                  Fichier photo *
                </label>
                <Input
                  id="photo-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              <Button 
                onClick={uploadPhoto} 
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
                    Ajouter la photo
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grille des photos */}
      {photos.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune photo</h3>
            <p className="text-muted-foreground">Commencez par ajouter votre première photo</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden shadow-spiritual hover:shadow-glow transition-smooth">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.thumbnail_url || photo.file_url}
                  alt={photo.title}
                  className="w-full h-full object-cover hover:scale-105 transition-smooth duration-700"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-primary line-clamp-1">{photo.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePhoto(photo.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {photo.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {photo.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(photo.created_at).toLocaleDateString('fr-FR')}
                  </Badge>
                  <Badge className="bg-primary/20 text-primary">
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

export default AdminPhotos;