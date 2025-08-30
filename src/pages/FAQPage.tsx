import Navigation from '@/components/Navigation';
import FAQ from '@/components/FAQ';

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Questions Fréquentes
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
            Découvrez tout ce que vous devez savoir sur le Pasteur Abel Fabrice Ekra, son ministère LADÉ et le séminaire BARA
          </p>
        </div>
      </section>

      <FAQ />
    </div>
  );
};

export default FAQPage;