import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, Phone, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const FloatingWidgets = () => {
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatMessage, setAiChatMessage] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis l\'assistant IA d\'Abel Fabrice Ekra. Posez-moi toutes vos questions spirituelles ! 🤖✨' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleWhatsApp = () => {
    window.open('https://wa.me/2250757480317?text=Bonjour%2C%20bienvenue%2C%20b%C3%A9nie%20de%20Dieu.%20Comment%20puis-je%20t%27aider%20%3F', '_blank');
  };

  const handleCall = () => {
    window.open('tel:+2250757480317', '_blank');
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Simuler une réponse automatique
      setTimeout(() => {
        alert(`Merci pour votre message : "${chatMessage}". Abel Fabrice Ekra vous contactera bientôt !`);
        setChatMessage('');
        setIsChatOpen(false);
      }, 1000);
    }
  };

  const handleAiChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiChatMessage.trim()) return;

    const userMessage = aiChatMessage.trim();
    setAiChatMessage('');
    setIsLoading(true);

    // Ajouter le message de l'utilisateur
    const newMessages = [...aiMessages, { role: 'user', content: userMessage }];
    setAiMessages(newMessages);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: userMessage,
          context: aiMessages 
        }
      });

      if (error) {
        throw new Error(error.message || 'Erreur de l\'API');
      }

      if (!data.success) {
        throw new Error(data.error || 'Erreur inconnue');
      }

      setAiMessages([...newMessages, { role: 'assistant', content: data.response }]);
      
      toast({
        title: "Message envoyé",
        description: "L'assistant IA a répondu avec succès",
      });
    } catch (error) {
      console.error('Erreur:', error);
      setAiMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Désolé, je rencontre un problème technique. Veuillez réessayer plus tard.' 
      }]);
      
      toast({
        title: "Erreur",
        description: "Impossible d'obtenir une réponse de l'IA",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickResponses = [
    "Demande de prière 🙏",
    "Question spirituelle ❓",
    "Inscription séminaire 📚",
    "Conseil personnel 💬"
  ];

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        
        {/* Phone Call Button */}
        <Button
          onClick={handleCall}
          size="lg"
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-glow animate-float"
          style={{animationDelay: '1s'}}
        >
          <Phone className="w-6 h-6" />
        </Button>

        {/* WhatsApp Button */}
        <Button
          onClick={handleWhatsApp}
          size="lg" 
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-glow animate-scale-bounce"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* AI Chatbot OpenAI - Nouveau chatbot au-dessus */}
      <div className="fixed bottom-24 left-6 z-50">
        <Button
          onClick={() => setIsAiChatOpen(!isAiChatOpen)}
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-glow animate-bounce"
        >
          {isAiChatOpen ? <X className="w-6 h-6" /> : <Brain className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chatbot Floating Button - Chatbot existant */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          size="lg"
          className="w-14 h-14 rounded-full spiritual-gradient text-white shadow-glow animate-glow"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </Button>
      </div>

      {/* AI Chatbot Widget OpenAI */}
      {isAiChatOpen && (
        <div className="fixed bottom-44 left-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-slide-up">
          <Card className="shadow-spiritual border-blue-500/20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-lg">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                 <div className="flex-1">
                   <h3 className="font-semibold">Assistant IA</h3>
                   <p className="text-xs opacity-90">Questions spirituelles illimitées</p>
                 </div>
               </div>
             </div>

             <CardContent className="p-0">
               {/* Chat Messages */}
              <div className="p-4 max-h-80 overflow-y-auto space-y-3">
                {aiMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-[85%] ${
                      message.role === 'user'
                        ? 'ml-auto bg-blue-600 text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <p className="text-sm">L'IA réfléchit...</p>
                    </div>
                  </div>
                )}
              </div>

               {/* Chat Input */}
               <div className="border-t p-3">
                 <form onSubmit={handleAiChatSubmit} className="flex gap-2">
                   <input
                     type="text"
                     value={aiChatMessage}
                     onChange={(e) => setAiChatMessage(e.target.value)}
                     placeholder="Posez votre question spirituelle..."
                     disabled={isLoading}
                     className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                   />
                   <Button 
                     type="submit" 
                     size="sm"
                     disabled={isLoading || !aiChatMessage.trim()}
                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                   >
                     <Send className="w-4 h-4" />
                   </Button>
                 </form>
                
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    Réponses IA instantanées
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAiMessages([
                        { role: 'assistant', content: 'Bonjour ! Je suis l\'assistant IA d\'Abel Fabrice Ekra. Posez-moi toutes vos questions spirituelles ! 🤖✨' }
                      ]);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto"
                  >
                    Nouvelle conversation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chatbot Widget - Chatbot existant */}
      {isChatOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 max-w-[calc(100vw-3rem)] animate-slide-up">
          <Card className="shadow-spiritual border-primary/20">
            <div className="spiritual-gradient p-4 rounded-t-lg">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Assistant Spirituel</h3>
                  <p className="text-xs opacity-90">Abel Fabrice Ekra</p>
                </div>
              </div>
            </div>

            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="p-4 max-h-60 overflow-y-auto space-y-3">
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">Bonjour ! Je suis l'assistant d'Abel Fabrice Ekra. Comment puis-je vous aider aujourd'hui ? 🙏</p>
                </div>
                
                {/* Quick Response Buttons */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Réponses rapides :</p>
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start text-xs h-8 hover:bg-primary hover:text-primary-foreground transition-smooth"
                      onClick={() => setChatMessage(response)}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t p-3">
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button 
                    type="submit" 
                    size="sm"
                    className="spiritual-gradient hover:scale-105 transition-bounce"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    Réponse sous 24h max
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleWhatsApp}
                    className="text-xs text-green-600 hover:text-green-700 p-0 h-auto"
                  >
                    WhatsApp direct
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mobile Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t p-3">
        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleCall}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Phone className="w-4 h-4 mr-2" />
            Appeler
          </Button>
          <Button
            onClick={handleWhatsApp}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </>
  );
};

export default FloatingWidgets;