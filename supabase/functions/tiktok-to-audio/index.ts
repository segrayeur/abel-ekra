import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { tiktokUrl, title, description } = await req.json()
    
    if (!tiktokUrl) {
      throw new Error('URL TikTok requise')
    }

    console.log('Processing TikTok URL:', tiktokUrl)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Extract video ID from TikTok URL
    const videoId = tiktokUrl.match(/video\/(\d+)/)?.[1] || 'unknown'
    
    // For demo purposes, we'll create a placeholder audio entry
    // In a real implementation, you would use a service like FFmpeg to extract audio
    const audioUrl = `https://placeholder-audio-url.com/${videoId}.mp3`
    
    // Insert into media table
    const { data: mediaData, error: mediaError } = await supabase
      .from('media')
      .insert({
        title: title || `Audio TikTok ${videoId}`,
        description: description || 'Audio extrait de vidéo TikTok',
        media_type: 'audio',
        file_url: audioUrl,
        tags: ['tiktok', 'conversion'],
        featured: false
      })
      .select()
      .single()

    if (mediaError) {
      console.error('Error inserting media:', mediaError)
      throw new Error('Erreur lors de l\'ajout du média')
    }

    console.log('Media created:', mediaData)

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Audio ajouté avec succès',
        mediaId: mediaData.id,
        audioUrl: audioUrl
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in tiktok-to-audio function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Erreur interne du serveur'
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})