import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Phone, MessageCircle, Download } from 'lucide-react';

const Hero = () => {
  const roles = [
    "Coach & Motivateur",
    "Entrepreneur", 
    "Pasteur",
    "Leader du ministère LADÉ"
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/2250757480317', '_blank');
  };

  const handleCall = () => {
    window.open('tel:+2250757480317', '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      {/* Hero Image */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 md:opacity-60">
        <img 
          src="/lovable-uploads/e6076b8f-9dc0-46f8-bbd7-419a3ff88b03.png" 
          alt="Abel Fabrice Ekra"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center lg:text-left">
          
          {/* Main Title */}
          <div className="animate-slide-up">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Pasteur Abel Fabrice Ekra
              </span>
              <br />
              <span className="text-foreground animate-glow text-xl md:text-3xl lg:text-4xl">
                Leader du Ministère LADÉ en Côte d'Ivoire
              </span>
            </h1>
          </div>

          {/* Roles Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 animate-fade-in-delay">
            {roles.map((role, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="text-sm md:text-base px-4 py-2 bg-secondary/90 text-secondary-foreground shadow-spiritual hover:scale-105 transition-bounce"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {role}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <div className="animate-fade-in-delay" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8 max-w-4xl mx-auto lg:mx-0">
              <p className="text-xl md:text-2xl font-medium text-white leading-relaxed text-center lg:text-left">
                <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent font-bold">
                  Homme de qualité et d'intégrité, de délivrance et de miracles
                </span>, 
                l'évangéliste et prophète <span className="text-accent font-bold">Abel Ekra</span> est le président du ministère{' '}
                <span className="bg-primary/20 text-primary font-bold px-2 py-1 rounded-md">LADÉ</span>{' '}
                et le visionnaire du séminaire{' '}
                <span className="bg-accent/20 text-accent font-bold px-2 py-1 rounded-md">BARA</span>{' '}
                qui pendant 3 ans n'a cessé de transformer et d'impacter le corps de Christ.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-delay" style={{animationDelay: '0.8s'}}>
            <Button 
              size="lg" 
              className="spiritual-gradient hover:scale-105 transition-bounce shadow-spiritual text-white font-semibold px-8 py-4 text-lg"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactez-moi
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth px-8 py-4 text-lg"
              onClick={handleCall}
            >
              <Phone className="w-5 h-5 mr-2" />
              Appeler
            </Button>
          </div>

          {/* Social Stats */}
          <div className="flex justify-center lg:justify-start gap-8 mt-12 animate-fade-in-delay" style={{animationDelay: '1s'}}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">3+</div>
              <div className="text-sm text-muted-foreground">Années d'Impact</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary">1000+</div>
              <div className="text-sm text-muted-foreground">Vies Transformées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Événements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;