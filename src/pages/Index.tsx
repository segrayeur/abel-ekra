import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Contact from '@/components/Contact';
import SocialLinks from '@/components/SocialLinks';
import FloatingWidgets from '@/components/FloatingWidgets';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Video, Music, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const sections = [
    {
      title: "Galerie Photos",
      description: "Découvrez les moments marquants du ministère et des événements spirituels",
      icon: Camera,
      link: "/photos",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Galerie Vidéos", 
      description: "Plongez dans l'univers spirituel à travers nos vidéos et prédications",
      icon: Video,
      link: "/videos",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Messages Audio",
      description: "Écoutez les prédications et enseignements inspirants",
      icon: Music,
      link: "/audio", 
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Biographie",
      description: "Découvrez le parcours et la vision d'Abel Fabrice Ekra",
      icon: BookOpen,
      link: "/biographie",
      gradient: "from-green-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Quick Access Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Explorez le Ministère
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez toutes les facettes du ministère d'Abel Fabrice Ekra à travers nos différentes sections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card
                  key={index}
                  className="group overflow-hidden hover:shadow-spiritual transition-smooth animate-slide-up border-0 card-gradient"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${section.gradient} flex items-center justify-center group-hover:scale-110 transition-smooth shadow-glow`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-primary">{section.title}</h3>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {section.description}
                    </p>
                    <Button 
                      className="w-full spiritual-gradient hover:scale-105 transition-bounce"
                      asChild
                    >
                      <Link to={section.link}>
                        Découvrir
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <SocialLinks />
      <Contact />
      <FloatingWidgets />
    </div>
  );
};

export default Index;
