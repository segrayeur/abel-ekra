import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Facebook, Instagram, Video, Users, Heart, Eye } from 'lucide-react';

const SocialLinks = () => {
  const socialPlatforms = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/fabrice.ekra.754",
      icon: Facebook,
      color: "from-blue-600 to-blue-800",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      followers: "5K+",
      description: "Prédications, événements et moments spirituels partagés quotidiennement",
      features: ["Lives spirituels", "Événements", "Communauté"]
    },
    {
      name: "TikTok", 
      url: "https://www.tiktok.com/@abelfabriceekra",
      icon: Video,
      color: "from-pink-500 to-purple-600",
      textColor: "text-pink-600",
      bgColor: "bg-pink-50",
      followers: "2.5K+",
      description: "Messages inspirants courts et témoignages transformateurs",
      features: ["Messages courts", "Témoignages", "Inspiration"]
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/abelfabriceekra/",
      icon: Instagram,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50", 
      followers: "3K+",
      description: "Photos d'événements, citations spirituelles et moments privilégiés",
      features: ["Photos événements", "Citations", "Stories"]
    }
  ];

  const stats = [
    { label: "Abonnés Total", value: "10K+", icon: Users },
    { label: "Vues Mensuelles", value: "50K+", icon: Eye },
    { label: "Engagement", value: "95%", icon: Heart }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Réseaux Sociaux
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rejoignez notre communauté spirituelle sur les réseaux sociaux pour des contenus inspirants quotidiens
          </p>
        </div>

        {/* Social Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="text-center card-gradient border hover:shadow-spiritual transition-smooth animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <stat.icon className="w-12 h-12 mx-auto text-primary mb-3 animate-float" />
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {socialPlatforms.map((platform, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-glow transition-smooth animate-slide-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              {/* Header with gradient */}
              <div className={`h-32 bg-gradient-to-br ${platform.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {platform.followers} abonnés
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <platform.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{platform.name}</h3>
                      <p className="text-white/80 text-sm">@abelfabriceekra</p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Description */}
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {platform.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {platform.features.map((feature, idx) => (
                    <Badge 
                      key={idx}
                      variant="outline" 
                      className={`text-xs ${platform.bgColor} ${platform.textColor} border-current`}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => window.open(platform.url, '_blank')}
                    className="w-full group-hover:scale-105 transition-bounce"
                    style={{
                      background: `linear-gradient(135deg, ${platform.color.split(' ')[1]}, ${platform.color.split(' ')[3]})`
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Suivre sur {platform.name}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className={`w-full ${platform.textColor} border-current hover:${platform.bgColor}`}
                  >
                    Voir le contenu
                  </Button>
                </div>

                {/* Activity Indicator */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Actif aujourd'hui</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-delay">
          <Card className="card-gradient border-2 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="spiritual-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Rejoignez Notre Communauté</h3>
              <p className="text-muted-foreground mb-6">
                Connectez-vous avec des milliers de personnes en quête de transformation spirituelle
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg"
                  className="spiritual-gradient hover:scale-105 transition-bounce"
                  onClick={() => window.open('https://www.facebook.com/fabrice.ekra.754', '_blank')}
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Suivre sur Facebook
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open('https://www.tiktok.com/@abelfabriceekra', '_blank')}
                >
                  <Video className="w-5 h-5 mr-2" />
                  Découvrir TikTok
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;