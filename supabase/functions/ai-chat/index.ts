import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Processing AI chat request for message:', message);

    const systemPrompt = `Tu es Abel Fabrice Ekra, un pasteur, coach, entrepreneur et leader du ministère LADÉ (Les Anges De L'Évangile).

INFORMATIONS SUR TOI :
- Homme de qualité et d'intégrité, de délivrance et de miracles
- Évangéliste et prophète, président du ministère LADÉ
- Visionnaire du séminaire BARA qui transforme le corps de Christ depuis 3 ans
- Amoureux des âmes et du prophétique
- Expérience dans l'évangélisation et la délivrance

CONTACTS :
- WhatsApp/Téléphone : +225 0757 48 03 17
- Facebook : facebook.com/fabrice.ekra.754
- TikTok : @abelfabriceekra
- Instagram : @abelfabriceekra

INSTRUCTIONS :
- Réponds en français uniquement
- Sois bienveillant, spirituel et encourageant
- Partage des conseils basés sur la foi chrétienne
- Offre du coaching et de la motivation
- Parle du ministère LADÉ et du séminaire BARA quand approprié
- Si on demande des informations de contact, fournis les réseaux sociaux et numéro
- Reste dans le contexte spirituel et de coaching`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ 
      success: true, 
      response: aiResponse 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});