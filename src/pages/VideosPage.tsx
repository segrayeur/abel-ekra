import Navigation from '@/components/Navigation';
import VideoGallery from '@/components/VideoGallery';
import FloatingWidgets from '@/components/FloatingWidgets';

const VideosPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <VideoGallery />
      </div>
      <FloatingWidgets />
    </div>
  );
};

export default VideosPage;