
-- Create profiles table for additional user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  organization TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create solar projects table for storing project data
CREATE TABLE public.solar_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity_mw DECIMAL NOT NULL,
  status TEXT DEFAULT 'planned',
  investment_amount DECIMAL,
  carbon_offset_tons DECIMAL,
  completion_date DATE,
  latitude DECIMAL,
  longitude DECIMAL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tender opportunities table
CREATE TABLE public.tender_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  capacity_mw DECIMAL NOT NULL,
  location TEXT NOT NULL,
  deadline DATE NOT NULL,
  minimum_bid DECIMAL,
  status TEXT DEFAULT 'open',
  description TEXT,
  requirements TEXT,
  bid_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user project interactions table
CREATE TABLE public.user_project_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.solar_projects(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL, -- 'bookmark', 'inquiry', 'investment_interest'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, project_id, interaction_type)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solar_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tender_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_project_interactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Solar projects policies (public read, authenticated users can create)
CREATE POLICY "Anyone can view solar projects" ON public.solar_projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create projects" ON public.solar_projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own projects" ON public.solar_projects
  FOR UPDATE USING (auth.uid() = created_by);

-- Tender opportunities policies (public read)
CREATE POLICY "Anyone can view tender opportunities" ON public.tender_opportunities
  FOR SELECT USING (true);

-- User project interactions policies
CREATE POLICY "Users can view their own interactions" ON public.user_project_interactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interactions" ON public.user_project_interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions" ON public.user_project_interactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions" ON public.user_project_interactions
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data for demonstration
INSERT INTO public.solar_projects (name, location, capacity_mw, status, investment_amount, carbon_offset_tons, latitude, longitude, description) VALUES
('Mymensingh Solar Plant', 'Mymensingh, Bangladesh', 20.0, 'operational', 25000000, 37900, 24.7471, 90.4203, 'ADB-funded 20 MW solar plant generating 37.9 GWh annually'),
('Pabna Solar Project', 'Pabna, Bangladesh', 100.0, 'under_construction', 120000000, 189500, 24.0064, 89.2372, 'Large-scale 100 MW solar installation'),
('Rangpur Solar Farm', 'Rangpur, Bangladesh', 50.0, 'planned', 60000000, 94750, 25.7439, 89.2752, 'Planned solar facility in northern Bangladesh'),
('Chattogram Solar Initiative', 'Chattogram, Bangladesh', 75.0, 'tendering', 90000000, 142125, 22.3569, 91.7832, 'Coastal solar project with high potential');

INSERT INTO public.tender_opportunities (title, capacity_mw, location, deadline, minimum_bid, status, description) VALUES
('Package 4 Solar Tender - Lot 1', 50.0, 'Cumilla, Bangladesh', '2024-08-15', 55000000, 'open', 'Part of BPDB 2,605 MW solar tender program'),
('Package 4 Solar Tender - Lot 2', 75.0, 'Sylhet, Bangladesh', '2024-08-15', 82500000, 'open', 'Strategic location with excellent solar irradiance'),
('Package 4 Solar Tender - Lot 3', 100.0, 'Rajshahi, Bangladesh', '2024-09-01', 110000000, 'open', 'Large capacity tender with zero bids currently');
