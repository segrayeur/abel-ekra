import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Facebook,
  Instagram,
  Video
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/fabrice.ekra.754",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50"
    },
    {
      icon: Video,
      name: "TikTok", 
      url: "https://www.tiktok.com/@abelfabriceekra",
      color: "hover:text-pink-600",
      bgColor: "hover:bg-pink-50"
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/abelfabriceekra/",
      color: "hover:text-purple-600", 
      bgColor: "hover:bg-purple-50"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Appel Direct",
      description: "+225 0757 48 03 17",
      action: () => window.open('tel:+2250757480317'),
      color: "text-green-600 bg-green-50"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat instantané",
      action: () => window.open('https://wa.me/2250757480317?text=Bonjour%2C%20bienvenue%2C%20b%C3%A9nie%20de%20Dieu.%20Comment%20puis-je%20t%27aider%20%3F'),
      color: "text-green-600 bg-green-50"
    },
    {
      icon: Mail,
      title: "Email",
      description: "fabrice.fabrice.ekra@gmail.com",
      action: () => window.open('mailto:fabrice.fabrice.ekra@gmail.com'),
      color: "text-blue-600 bg-blue-50"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Contactez-moi
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour vos questions spirituelles, demandes de prière ou collaborations
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="animate-slide-up">
              <Card className="shadow-spiritual card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Send className="w-5 h-5" />
                    Envoyez un Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Nom complet</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                          required
                          className="transition-smooth focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                          required
                          className="transition-smooth focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Sujet</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Sujet de votre message"
                        required
                        className="transition-smooth focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Votre message..."
                        rows={6}
                        required
                        className="transition-smooth focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full spiritual-gradient hover:scale-105 transition-bounce text-white font-semibold py-3"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in-delay">
              
              {/* Quick Contact Methods */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">Contact Rapide</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <Card 
                      key={index}
                      className="cursor-pointer hover:shadow-spiritual transition-smooth group"
                      onClick={method.action}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${method.color} group-hover:scale-110 transition-bounce`}>
                            <method.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-primary">{method.title}</h4>
                            <p className="text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">Réseaux Sociaux</h3>
                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((social, index) => (
                    <Card 
                      key={index}
                      className="cursor-pointer hover:shadow-spiritual transition-smooth group"
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full bg-muted group-hover:scale-110 transition-bounce ${social.bgColor}`}>
                              <social.icon className={`w-5 h-5 ${social.color} transition-smooth`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-primary">{social.name}</h4>
                              <p className="text-sm text-muted-foreground">Suivez-moi sur {social.name}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                            Suivre
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Information Card */}
              <Card className="card-gradient border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 spiritual-gradient rounded-full">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Informations</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Disponible 7j/7 pour les urgences spirituelles</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>Réponse sous 24h maximum</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp privilégié pour les urgences</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ministry Card */}
              <Card className="spiritual-gradient text-white">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold mb-2">Ministère LADÉ</h4>
                  <p className="mb-4 opacity-90">Les Anges De L'Évangile</p>
                  <Badge className="bg-white/20 text-white border-white/30">
                    Transformation & Guérison
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;