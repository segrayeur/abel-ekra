import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Award, Users, Heart, BookOpen } from 'lucide-react';

const Biography = () => {
  const milestones = [
    {
      year: "2020",
      title: "Fondation du Ministère LADÉ",
      description: "Création du ministère 'Les Anges De L'Évangile' avec une vision claire de transformation spirituelle",
      icon: Heart,
      color: "text-primary"
    },
    {
      year: "2021", 
      title: "Lancement du Séminaire BARA",
      description: "Début des formations intensives qui ont transformé des centaines de vies pendant 3 années consécutives",
      icon: BookOpen,
      color: "text-secondary"
    },
    {
      year: "2022",
      title: "Expansion du Ministère",
      description: "Élargissement des activités avec des événements d'envergure et des partenariats stratégiques",
      icon: Users,
      color: "text-accent"
    },
    {
      year: "2023",
      title: "Reconnaissance Internationale",
      description: "Participation à des conférences internationales et établissement de partenariats globaux",
      icon: Award,
      color: "text-primary"
    },
    {
      year: "2024",
      title: "Vision Numérique",
      description: "Développement de la présence digitale pour toucher plus d'âmes à travers le monde",
      icon: MapPin,
      color: "text-secondary"
    }
  ];

  const qualities = [
    { title: "Intégrité", description: "Homme de principes et de valeurs" },
    { title: "Délivrance", description: "Don de libération spirituelle" },
    { title: "Miracles", description: "Témoignages de guérisons" },
    { title: "Prophétique", description: "Révélations et visions" },
    { title: "Leadership", description: "Guide spirituel inspirant" },
    { title: "Enseignement", description: "Formateur et mentor" }
  ];

  const achievements = [
    { number: "1000+", label: "Vies Transformées" },
    { number: "3", label: "Années BARA" },
    { number: "50+", label: "Événements" },
    { number: "5", label: "Pays Touchés" }
  ];

  return (
    <section id="biography" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Biographie & Parcours
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez le parcours spirituel et professionnel d'Abel Fabrice Ekra, homme de Dieu dévoué
          </p>
        </div>

        {/* Hero Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Portrait */}
          <div className="animate-slide-up">
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-spiritual">
                <img 
                  src="/lovable-uploads/e6076b8f-9dc0-46f8-bbd7-419a3ff88b03.png"
                  alt="Abel Fabrice Ekra - Portrait"
                  className="w-full h-full object-cover hover:scale-105 transition-smooth duration-700"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 spiritual-gradient p-4 rounded-2xl shadow-glow animate-float">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Biography Text */}
          <div className="animate-fade-in-delay">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-4">Abel Fabrice Ekra</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {qualities.map((quality, index) => (
                    <Badge key={index} variant="secondary" className="bg-secondary/20">
                      {quality.title}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong className="text-primary">Homme de qualité et d'intégrité, de délivrance et de miracles</strong>, 
                  l'évangéliste et prophète Abel Ekra est le président du ministère <strong className="text-secondary">LADÉ</strong> 
                  et le visionnaire du séminaire <strong className="text-accent">BARA</strong> qui pendant 3 ans n'a cessé 
                  de transformer et d'impacter le corps de Christ.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong className="text-primary">Amoureux des âmes et du prophétique</strong>, il continue depuis 
                  plusieurs années d'user de la grâce de Dieu sur sa vie pour rassembler et proclamer les merveilles 
                  de la bonne nouvelle en Christ.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  En tant que <strong className="text-accent">coach, entrepreneur et pasteur</strong>, Abel Fabrice Ekra 
                  combine sa vision spirituelle avec un leadership moderne pour impacter positivement les communautés 
                  à travers l'Afrique et au-delà.
                </p>
              </div>

              {/* Achievements */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-4 card-gradient rounded-xl border">
                    <div className="text-2xl font-bold text-primary mb-1">{achievement.number}</div>
                    <div className="text-sm text-muted-foreground">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 animate-slide-up">
            Parcours et Étapes Clés
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  } animate-slide-up`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card className="card-gradient border hover:shadow-spiritual transition-smooth">
                      <CardContent className="p-6">
                        <div className={`flex items-center gap-3 mb-3 ${
                          index % 2 === 0 ? 'justify-end' : 'justify-start'
                        }`}>
                          <Badge className="spiritual-gradient text-white">
                            {milestone.year}
                          </Badge>
                          <milestone.icon className={`w-5 h-5 ${milestone.color}`} />
                        </div>
                        <h4 className="text-xl font-bold text-primary mb-2">
                          {milestone.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-6 h-6 spiritual-gradient rounded-full shadow-glow animate-pulse"></div>
                  </div>
                  
                  {/* Spacer */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ministry Vision */}
        <div className="text-center animate-fade-in-delay">
          <Card className="card-gradient border-2 border-primary/20">
            <CardContent className="p-12">
              <div className="max-w-3xl mx-auto">
                <Heart className="w-16 h-16 mx-auto text-primary mb-6 animate-float" />
                <h3 className="text-3xl font-bold mb-6">Vision du Ministère LADÉ</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  "Rassembler les âmes, proclamer les merveilles de Dieu et transformer les cœurs par la puissance 
                  de l'Évangile. Notre mission est de voir chaque personne découvrir sa destinée en Christ et 
                  marcher dans la plénitude de sa grâce."
                </p>
                <div className="flex justify-center gap-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary px-4 py-2">
                    Les Anges De L'Évangile
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground px-4 py-2">
                    Séminaire BARA
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/20 text-accent-foreground px-4 py-2">
                    Transformation
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Biography;