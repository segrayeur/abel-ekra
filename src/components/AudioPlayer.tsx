import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, SkipBack, SkipForward, Download, Music, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [audioTracks, setAudioTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  // Fetch audio data from Supabase
  useEffect(() => {
    const fetchAudioTracks = async () => {
      try {
        const { data, error } = await supabase
          .from('media')
          .select('*')
          .eq('media_type', 'audio')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setAudioTracks(data);
        } else {
          // Fallback to demo data if no audio in database
          setAudioTracks([
            {
              id: 'demo-1',
              title: "La Foi au Quotidien",
              description: "Audio extrait de vidéo TikTok - Message inspirant sur la foi quotidienne",
              duration: 225, // en secondes
              tags: ["TikTok"],
              created_at: "2024-01-20",
              file_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
            },
            {
              id: 'demo-2',
              title: "Transformation Spirituelle", 
              description: "Audio extrait de vidéo TikTok - Témoignage de transformation",
              duration: 135,
              tags: ["TikTok"],
              created_at: "2024-01-18",
              file_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
            },
            {
              id: 'demo-3',
              title: "Miracle et Délivrance",
              description: "Audio extrait de vidéo TikTok - Message sur les miracles de Dieu", 
              duration: 270,
              tags: ["TikTok"],
              created_at: "2024-01-15",
              file_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching audio:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les fichiers audio",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAudioTracks();
  }, [toast]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      nextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  // Control playback when isPlaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        toast({
          title: "Erreur de lecture",
          description: "Impossible de lire ce fichier audio",
          variant: "destructive"
        });
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, toast]);

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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (tags: string[]) => {
    const category = tags?.[0] || 'Autre';
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

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement des audios...</p>
        </div>
      </section>
    );
  }

  if (audioTracks.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Music className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Aucun audio disponible</h3>
          <p className="text-muted-foreground">Les fichiers audio seront bientôt disponibles.</p>
        </div>
      </section>
    );
  }

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
          {/* Hidden Audio Element */}
          <audio 
            ref={audioRef} 
            src={audioTracks[currentTrack]?.file_url} 
            preload="metadata"
          />
          
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
                        <Badge className={getCategoryColor(audioTracks[currentTrack]?.tags || [])}>
                          {audioTracks[currentTrack]?.tags?.[0] || 'Audio'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(audioTracks[currentTrack]?.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {audioTracks[currentTrack]?.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {audioTracks[currentTrack]?.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          if (audioTracks[currentTrack]?.file_url) {
                            window.open(audioTracks[currentTrack].file_url, '_blank');
                          }
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-muted-foreground" />
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.1"
                          value={volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-16 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <div 
                      className="w-full bg-muted rounded-full h-3 cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full relative transition-all duration-300"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      >
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md"></div>
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
                            <Badge className={getCategoryColor(track.tags || [])}>
                              {track.tags?.[0] || 'Audio'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{track.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(track.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      
                      {/* Duration */}
                      <div className="text-sm text-muted-foreground">
                        {formatTime(track.duration || 0)}
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