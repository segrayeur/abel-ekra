import Navigation from '@/components/Navigation';
import Gallery from '@/components/Gallery';
import FloatingWidgets from '@/components/FloatingWidgets';

const PhotosPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <Gallery />
      </div>
      <FloatingWidgets />
    </div>
  );
};

export default PhotosPage;