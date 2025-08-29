import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import VideoGallery from '@/components/VideoGallery';
import AudioPlayer from '@/components/AudioPlayer';
import Biography from '@/components/Biography';
import Contact from '@/components/Contact';
import SocialLinks from '@/components/SocialLinks';
import FloatingWidgets from '@/components/FloatingWidgets';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Gallery />
      <VideoGallery />
      <AudioPlayer />
      <Biography />
      <SocialLinks />
      <Contact />
      <FloatingWidgets />
    </div>
  );
};

export default Index;
