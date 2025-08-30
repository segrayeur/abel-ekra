-- Create enum types
CREATE TYPE public.media_type AS ENUM ('image', 'video', 'audio', 'document');
CREATE TYPE public.event_type AS ENUM ('seminar', 'worship', 'conference', 'prayer', 'coaching');
CREATE TYPE public.request_status AS ENUM ('pending', 'in_progress', 'completed');

-- Create sermons table for spiritual teachings
CREATE TABLE public.sermons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  scripture_reference TEXT,
  audio_url TEXT,
  video_url TEXT,
  duration INTEGER, -- in minutes
  date_preached DATE,
  location TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table for BARA seminars and other events
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type event_type NOT NULL,
  date_start TIMESTAMP WITH TIME ZONE NOT NULL,
  date_end TIMESTAMP WITH TIME ZONE,
  location TEXT,
  image_url TEXT,
  registration_link TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media table for gallery (photos, videos, audios)
CREATE TABLE public.media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  media_type media_type NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER, -- for video/audio in seconds
  tags TEXT[],
  event_id UUID REFERENCES public.events(id),
  sermon_id UUID REFERENCES public.sermons(id),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prayer requests table
CREATE TABLE public.prayer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status request_status DEFAULT 'pending',
  private BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status request_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ministry updates table for LADÉ news
CREATE TABLE public.ministry_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create coaching sessions table
CREATE TABLE public.coaching_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  session_type TEXT NOT NULL,
  preferred_date TIMESTAMP WITH TIME ZONE,
  message TEXT,
  status request_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministry_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio content)
CREATE POLICY "Public can view published sermons" 
ON public.sermons FOR SELECT 
USING (true);

CREATE POLICY "Public can view published events" 
ON public.events FOR SELECT 
USING (true);

CREATE POLICY "Public can view approved media" 
ON public.media FOR SELECT 
USING (true);

CREATE POLICY "Public can view approved testimonials" 
ON public.testimonials FOR SELECT 
USING (approved = true);

CREATE POLICY "Public can view published ministry updates" 
ON public.ministry_updates FOR SELECT 
USING (published = true);

-- Policies for public form submissions
CREATE POLICY "Anyone can submit prayer requests" 
ON public.prayer_requests FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit coaching requests" 
ON public.coaching_sessions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit testimonials" 
ON public.testimonials FOR INSERT 
WITH CHECK (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_sermons_updated_at
BEFORE UPDATE ON public.sermons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_media_updated_at
BEFORE UPDATE ON public.media
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prayer_requests_updated_at
BEFORE UPDATE ON public.prayer_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ministry_updates_updated_at
BEFORE UPDATE ON public.ministry_updates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coaching_sessions_updated_at
BEFORE UPDATE ON public.coaching_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_sermons_featured ON public.sermons(featured);
CREATE INDEX idx_sermons_date ON public.sermons(date_preached);
CREATE INDEX idx_events_featured ON public.events(featured);
CREATE INDEX idx_events_date ON public.events(date_start);
CREATE INDEX idx_media_type ON public.media(media_type);
CREATE INDEX idx_media_featured ON public.media(featured);
CREATE INDEX idx_testimonials_approved ON public.testimonials(approved);
CREATE INDEX idx_ministry_updates_published ON public.ministry_updates(published);
CREATE INDEX idx_prayer_requests_status ON public.prayer_requests(status);
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_coaching_sessions_status ON public.coaching_sessions(status);