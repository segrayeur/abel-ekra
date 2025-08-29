import Navigation from '@/components/Navigation';
import Biography from '@/components/Biography';
import FloatingWidgets from '@/components/FloatingWidgets';

const BiographyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <Biography />
      </div>
      <FloatingWidgets />
    </div>
  );
};

export default BiographyPage;