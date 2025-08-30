import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const VideoGallery = () => {
  const [adminVideos, setAdminVideos] = useState<any[]>([]);

  // Charger les vidéos admin depuis Supabase
  useEffect(() => {
    const fetchAdminVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('media')
          .select('*')
          .eq('media_type', 'video')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAdminVideos(data || []);
      } catch (error) {
        console.error('Error fetching admin videos:', error);
      }
    };

    fetchAdminVideos();
  }, []);

  // Vidéos TikTok spécifiques d'Abel Fabrice Ekra
  const tiktokVideos = [
    {
      id: "7486104899072150790",
      url: "https://www.tiktok.com/@abelfabriceekra/video/7486104899072150790",
      title: "Message spirituel inspirant",
      description: "Enseignement sur la foi et la transformation"
    },
    {
      id: "7486837785354145029", 
      url: "https://www.tiktok.com/@abelfabriceekra/video/7486837785354145029",
      title: "Prédication puissante",
      description: "Message de délivrance et de miracles"
    },
    {
      id: "7542886098343628037",
      url: "https://www.tiktok.com/@abelfabriceekra/video/7542886098343628037", 
      title: "Témoignage de foi",
      description: "Partage d'expérience spirituelle édifiante"
    }
  ];

  const socialMediaEmbeds = [
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@abelfabriceekra",
      embedId: "abelfabriceekra",
      title: "Messages inspirants sur TikTok",
      description: "Découvrez les enseignements quotidiens et moments spirituels partagés",
      color: "from-pink-500 to-purple-600"
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/fabrice.ekra.754",
      embedId: "fabrice.ekra.754", 
      title: "Prédications et événements Facebook",
      description: "Suivez les diffusions en direct et événements du ministère",
      color: "from-blue-600 to-blue-800"
    }
  ];


  return (
    <section id="videos" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Galerie Vidéos
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plongez dans l'univers spirituel à travers nos vidéos, prédications et témoignages inspirants
          </p>
        </div>

        {/* Vidéos ajoutées par l'administrateur */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Vidéos du Ministère
              </span>
            </h3>
            <p className="text-muted-foreground">Collection de vidéos, enseignements et moments spirituels</p>
          </div>
          
          {adminVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="group relative overflow-hidden rounded-2xl shadow-spiritual hover:shadow-glow transition-smooth animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="relative p-6 card-gradient border">
                    {/* Video Thumbnail/Player Area */}
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl overflow-hidden group/video mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="lg"
                          onClick={() => window.open(video.file_url, '_blank')}
                          className="spiritual-gradient shadow-glow group-hover/video:scale-110 transition-bounce"
                        >
                          <Play className="w-6 h-6 mr-2" />
                          Regarder
                        </Button>
                      </div>
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary/20 text-primary">
                          {video.tags?.[0] || 'Vidéo'}
                        </Badge>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-primary line-clamp-2">{video.title}</h4>
                      {video.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                      )}
                      
                      <Button
                        variant="outline"
                        onClick={() => window.open(video.file_url, '_blank')}
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Regarder la vidéo
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune vidéo disponible pour le moment</p>
            </div>
          )}
        </div>

        {/* Vidéos TikTok Récentes */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Dernières Vidéos TikTok
              </span>
            </h3>
            <p className="text-muted-foreground">Messages récents et enseignements spirituels</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tiktokVideos.map((video, index) => (
              <div
                key={video.id}
                className="group relative overflow-hidden rounded-2xl shadow-spiritual hover:shadow-glow transition-smooth animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative p-6 card-gradient border">
                  {/* Video Thumbnail/Player Area */}
                  <div className="relative aspect-[9/16] bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl overflow-hidden group/video mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="lg"
                        onClick={() => window.open(video.url, '_blank')}
                        className="spiritual-gradient shadow-glow group-hover/video:scale-110 transition-bounce"
                      >
                        <Play className="w-6 h-6 mr-2" />
                        Regarder
                      </Button>
                    </div>
                    
                    {/* TikTok branding */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                        T
                      </div>
                      <span className="text-xs text-white font-medium bg-black/50 px-2 py-1 rounded">TikTok</span>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-primary line-clamp-2">{video.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                    
                    <Button
                      variant="outline"
                      onClick={() => window.open(video.url, '_blank')}
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ouvrir sur TikTok
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Social Media Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {socialMediaEmbeds.map((social, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-spiritual hover:shadow-glow transition-smooth animate-slide-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-10 group-hover:opacity-20 transition-smooth`}></div>
              
              <div className="relative p-8 card-gradient border">
                {/* Platform Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white font-bold text-lg animate-glow`}>
                      {social.platform[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">{social.platform}</h3>
                      <p className="text-sm text-muted-foreground">@{social.embedId}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(social.url, '_blank')}
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">{social.title}</h4>
                  <p className="text-muted-foreground">{social.description}</p>
                </div>

                {/* Mock Video Player */}
                <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl overflow-hidden group/video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={() => window.open(social.url, '_blank')}
                      className={`spiritual-gradient shadow-glow group-hover/video:scale-110 transition-bounce`}
                    >
                      <Play className="w-6 h-6 mr-2" />
                      Voir sur {social.platform}
                    </Button>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-4 left-10 text-xs text-muted-foreground">EN DIRECT</div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <Button
                    className="w-full spiritual-gradient hover:scale-105 transition-bounce"
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Suivre sur {social.platform}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Playlist Section */}
        <div className="text-center animate-fade-in-delay">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">Playlist Complète</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Accédez à toutes nos vidéos, prédications et enseignements classés par thèmes pour votre croissance spirituelle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="spiritual-gradient hover:scale-105 transition-bounce"
                onClick={() => window.open('https://www.tiktok.com/@abelfabriceekra', '_blank')}
              >
                <Play className="w-5 h-5 mr-2" />
                Voir toutes les vidéos
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                S'abonner aux notifications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;