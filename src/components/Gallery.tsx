import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ZoomIn, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [adminPhotos, setAdminPhotos] = useState<any[]>([]);
  const { toast } = useToast();

  // Charger les photos admin depuis Supabase
  useEffect(() => {
    const fetchAdminPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from('media')
          .select('*')
          .eq('media_type', 'image')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAdminPhotos(data || []);
      } catch (error) {
        console.error('Error fetching admin photos:', error);
      }
    };

    fetchAdminPhotos();
  }, []);

  const galleryImages = [
    {
      src: "/lovable-uploads/0b2b9071-159f-4de4-9703-9e080ec9976a.png",
      alt: "Abel Fabrice Ekra avec son équipe",
      category: "Équipe",
      title: undefined,
      description: undefined,
      date: undefined
    },
    {
      src: "/lovable-uploads/64aa1a73-7b7a-47eb-aee1-bf9bafa9b402.png", 
      alt: "Séminaire et formation",
      category: "Formation",
      title: undefined,
      description: undefined,
      date: undefined
    },
    {
      src: "/lovable-uploads/d6dcb6a9-5f5e-4bad-8541-2269cc7ae657.png",
      alt: "Événement ministériel",
      category: "Événement",
      title: undefined,
      description: undefined,
      date: undefined
    },
    {
      src: "/lovable-uploads/f163ef52-7f5d-4eff-9a59-07f9ee9e1787.png",
      alt: "Moment de prédication",
      category: "Prédication",
      title: undefined,
      description: undefined,
      date: undefined
    },
    {
      src: "/lovable-uploads/99ddb8ed-4bc0-4f9d-beea-3fa0fb683523.png",
      alt: "Abel Fabrice Ekra en action",
      category: "Ministère",
      title: undefined,
      description: undefined,
      date: undefined
    },
    {
      src: "/lovable-uploads/fad91b84-bf23-47c6-b0a2-681e6b8c638e.png",
      alt: "Conférence spirituelle",
      category: "Conférence",
      title: undefined,
      description: undefined,
      date: undefined
    },
    {
      src: "/lovable-uploads/7bc07e4f-c190-4b8a-984b-620e78ef8966.png",
      alt: "Média et interview",
      category: "Média",
      title: undefined,
      description: undefined,
      date: undefined
    },
    {
      src: "/lovable-uploads/a1f224e8-7c76-448d-b698-160f36e46932.png",
      alt: "Intervention publique",
      category: "Public",
      title: undefined,
      description: undefined,
      date: undefined
    },
    {
      src: "/lovable-uploads/e6076b8f-9dc0-46f8-bbd7-419a3ff88b03.png",
      alt: "Portrait officiel",
      category: "Portrait",
      title: undefined,
      description: undefined,
      date: undefined
    }
  ];

  // Combiner les images statiques et les photos admin
  const adminImages = adminPhotos.map(photo => ({
    src: photo.file_url,
    alt: photo.description || photo.title,
    category: photo.tags?.[0] || 'Admin',
    title: photo.title,
    description: photo.description,
    date: photo.created_at
  }));

  const allImages = [...galleryImages, ...adminImages];

  const categories = ["Tous", ...Array.from(new Set(allImages.map(img => img.category)))];
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredImages = activeCategory === "Tous" 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Galerie Photos
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les moments marquants du ministère et des événements spirituels d'Abel Fabrice Ekra
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-delay">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`transition-smooth ${
                activeCategory === category 
                  ? "spiritual-gradient text-white shadow-spiritual" 
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-spiritual hover:shadow-glow transition-smooth animate-slide-up card-gradient"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-3">
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs bg-secondary/90 w-fit">
                    {image.category}
                  </Badge>
                  {image.title && (
                    <h4 className="text-white text-sm font-semibold line-clamp-1">{image.title}</h4>
                  )}
                  <p className="text-white/90 text-xs line-clamp-2">{image.alt}</p>
                  {image.description && image.description !== image.alt && (
                    <p className="text-white/70 text-xs line-clamp-1">{image.description}</p>
                  )}
                  {image.date && (
                    <p className="text-white/60 text-xs">
                      {new Date(image.date).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 w-8 h-8"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <ZoomIn className="w-3 h-3 text-white" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full h-full max-h-[90vh] p-0 bg-black/95 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Image agrandie"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;