import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const FAQ = () => {
  const faqs = [
    {
      id: "q1",
      question: "Qui est le Pasteur Abel Fabrice Ekra ?",
      answer: "Le Pasteur Abel Fabrice Ekra est un leader spirituel, coach et entrepreneur chrétien, fondateur du ministère LADÉ (Les Anges de l'Évangile) en Côte d'Ivoire."
    },
    {
      id: "q2", 
      question: "Qu'est-ce que le Ministère LADÉ ?",
      answer: "Le Ministère LADÉ signifie \"Les Anges de l'Évangile\". C'est une mission chrétienne qui œuvre pour la délivrance, l'évangélisation et l'édification spirituelle."
    },
    {
      id: "q3",
      question: "Qu'est-ce que le Séminaire BARA ?",
      answer: "Le Séminaire BARA est une conférence spirituelle annuelle initiée par le Pasteur Abel Fabrice Ekra. Depuis plus de 3 ans, elle impacte des milliers de vies en Côte d'Ivoire et à l'international."
    },
    {
      id: "q4",
      question: "Comment participer aux événements du Pasteur Abel Fabrice Ekra ?",
      answer: "Vous pouvez suivre le calendrier des activités directement sur le site, et vous inscrire via le formulaire de contact ou en rejoignant la communauté WhatsApp officielle."
    },
    {
      id: "q5",
      question: "Comment entrer en contact avec le Pasteur Abel Fabrice Ekra ?",
      answer: "Vous pouvez utiliser la page Contact du site, envoyer un e-mail, ou écrire directement via WhatsApp en cliquant sur l'icône dédiée."
    },
    {
      id: "q6",
      question: "Le Pasteur Abel Fabrice Ekra propose-t-il des ressources en ligne ?",
      answer: "Oui. Vous trouverez des enseignements, vidéos, audios et publications du Pasteur disponibles dans les sections **Ressources** et **Médias** du site."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-glow">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Questions Fréquentes
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur le ministère et les enseignements du Pasteur Abel Fabrice Ekra
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="bg-card border border-border/50 rounded-xl px-6 shadow-sm hover:shadow-md transition-smooth animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 text-lg font-semibold text-primary">
                  <span className="flex items-start gap-3">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold text-sm mt-1">
                      👉
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2 text-muted-foreground leading-relaxed">
                  <div className="pl-6 border-l-2 border-primary/20">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;