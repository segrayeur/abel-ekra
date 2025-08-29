import Navigation from '@/components/Navigation';
import AudioPlayer from '@/components/AudioPlayer';
import FloatingWidgets from '@/components/FloatingWidgets';

const AudioPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <AudioPlayer />
      </div>
      <FloatingWidgets />
    </div>
  );
};

export default AudioPage;