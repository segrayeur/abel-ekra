import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Image, Video, Music, BookOpen, Phone, MessageCircle } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Accueil', href: '/' },
    { icon: Image, label: 'Photos', href: '/photos' },
    { icon: Video, label: 'Vidéos', href: '/videos' },
    { icon: Music, label: 'Audio', href: '/audio' },
    { icon: BookOpen, label: 'Biographie', href: '/biographie' },
    { icon: Phone, label: 'Contact', href: '/#contact' }
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      // Handle anchor links on home page
      if (window.location.pathname !== '/') {
        window.location.href = href;
      } else {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Handle page navigation
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-spiritual transition-smooth">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full spiritual-gradient flex items-center justify-center animate-glow">
              <span className="text-white font-bold text-lg">AE</span>
            </div>
            <span className="hidden md:block font-bold text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Abel Fabrice Ekra
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.href)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth group"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-bounce" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-md animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;