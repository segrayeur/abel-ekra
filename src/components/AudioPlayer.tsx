import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, SkipBack, SkipForward, Download, Music, Volume2 } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioTracks = [
    {
      title: "La Foi au Quotidien",
      description: "Audio extrait de vidéo TikTok - Message inspirant sur la foi quotidienne",
      duration: "3:45",
      category: "TikTok",
      date: "2024-01-20",
      source: "https://www.tiktok.com/@abelfabriceekra/video/7486104899072150790"
    },
    {
      title: "Transformation Spirituelle",
      description: "Audio extrait de vidéo TikTok - Témoignage de transformation",
      duration: "2:15",
      category: "TikTok",
      date: "2024-01-18",
      source: "https://www.tiktok.com/@abelfabriceekra/video/7486837785354145029"
    },
    {
      title: "Miracle et Délivrance",
      description: "Audio extrait de vidéo TikTok - Message sur les miracles de Dieu",
      duration: "4:30",
      category: "TikTok",
      date: "2024-01-15",
      source: "https://www.tiktok.com/@abelfabriceekra/video/7536265953848429880"
    },
    {
      title: "La Puissance de la Foi",
      description: "Prédication sur l'importance de la foi dans nos vies",
      duration: "45:30",
      category: "Prédication",
      date: "2024-01-15"
    },
    {
      title: "Témoignage de Transformation",
      description: "Histoire inspirante de changement spirituel",
      duration: "25:15",
      category: "Témoignage", 
      date: "2024-01-10"
    },
    {
      title: "Séminaire BARA - Session 1",
      description: "Première session du séminaire de formation",
      duration: "1:12:45",
      category: "Formation",
      date: "2024-01-05"
    },
    {
      title: "Prière de Délivrance",
      description: "Moment de prière puissant pour la libération",
      duration: "30:20",
      category: "Prière",
      date: "2023-12-28"
    },
    {
      title: "Vision du Ministère LADÉ",
      description: "Partage de la vision et mission du ministère",
      duration: "38:45",
      category: "Vision",
      date: "2023-12-20"
    },
    {
      title: "Guérison et Miracles",
      description: "Enseignement sur les dons spirituels",
      duration: "42:10",
      category: "Enseignement",
      date: "2023-12-15"
    }
  ];

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % audioTracks.length;
    setCurrentTrack(next);
    setIsPlaying(true);
  };

  const previousTrack = () => {
    const prev = currentTrack === 0 ? audioTracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prev);
    setIsPlaying(true);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'TikTok': 'bg-pink-500/20 text-pink-700',
      'Prédication': 'bg-primary/20 text-primary',
      'Témoignage': 'bg-secondary/20 text-secondary-foreground',
      'Formation': 'bg-accent/20 text-accent-foreground',
      'Prière': 'bg-purple-500/20 text-purple-700',
      'Vision': 'bg-green-500/20 text-green-700',
      'Enseignement': 'bg-blue-500/20 text-blue-700'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <section id="audio" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Audio Player
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Écoutez les prédications, témoignages et enseignements spirituels d'Abel Fabrice Ekra
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Player */}
          <Card className="mb-8 overflow-hidden shadow-spiritual animate-slide-up">
            <CardContent className="p-0">
              <div className="relative">
                {/* Background Gradient */}
                <div className="absolute inset-0 spiritual-gradient opacity-10"></div>
                
                <div className="relative p-8">
                  {/* Current Track Info */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getCategoryColor(audioTracks[currentTrack].category)}>
                          {audioTracks[currentTrack].category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {audioTracks[currentTrack].date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {audioTracks[currentTrack].title}
                      </h3>
                      <p className="text-muted-foreground">
                        {audioTracks[currentTrack].description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>0:00</span>
                      <span>{audioTracks[currentTrack].duration}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-1/3 relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={previousTrack}
                      className="hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    
                    <Button 
                      size="lg"
                      onClick={togglePlay}
                      className="spiritual-gradient hover:scale-105 transition-bounce shadow-glow w-16 h-16 rounded-full"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-1" />
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={nextTrack}
                      className="hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Playlist */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center mb-6 animate-fade-in-delay">
              Playlist Complète
            </h3>
            
            {audioTracks.map((track, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-smooth hover:shadow-spiritual animate-slide-up ${
                  index === currentTrack ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => playTrack(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Track Number / Play Button */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                        {index === currentTrack && isPlaying ? (
                          <div className="flex items-center justify-center">
                            <div className="w-1 h-4 bg-primary animate-pulse mr-1"></div>
                            <div className="w-1 h-6 bg-primary animate-pulse mr-1"></div>
                            <div className="w-1 h-3 bg-primary animate-pulse"></div>
                          </div>
                        ) : (
                          <Music className="w-5 h-5" />
                        )}
                      </div>
                      
                      {/* Track Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-primary">{track.title}</h4>
                          <Badge className={getCategoryColor(track.category)}>
                            {track.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{track.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{track.date}</p>
                      </div>
                    </div>
                    
                    {/* Duration */}
                    <div className="text-sm text-muted-foreground">
                      {track.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Download All */}
          <div className="text-center mt-12 animate-fade-in-delay">
            <Card className="card-gradient border-dashed border-2 border-primary/30">
              <CardContent className="p-8">
                <Music className="w-16 h-16 mx-auto text-primary mb-4 animate-float" />
                <h3 className="text-xl font-bold mb-2">Télécharger Tout</h3>
                <p className="text-muted-foreground mb-6">
                  Accédez à toute la collection audio pour l'écoute hors ligne
                </p>
                <Button className="spiritual-gradient hover:scale-105 transition-bounce">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger la Collection
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;