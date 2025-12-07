import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    google: any;
  }
}

interface Project {
  id: string;
  name: string;
  location: string;
  capacity_mw: number;
  latitude?: number;
  longitude?: number;
}

// Sanitize text to prevent XSS attacks
const sanitizeText = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

const ProjectMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('solar_projects')
      .select('*')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null);

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!mapRef.current || projects.length === 0) return;

    // Use environment variable for Google Maps API key
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
      console.warn('Google Maps API key not configured. Set VITE_GOOGLE_MAPS_API_KEY environment variable.');
      setApiKeyMissing(true);
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [projects]);

  const initMap = () => {
    if (!window.google || !mapRef.current) return;

    const bangladesh = { lat: 23.8103, lng: 90.4125 }; // Dhaka center
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 7,
      center: bangladesh,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    // Add markers for each project
    projects.forEach(project => {
      if (project.latitude && project.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: project.latitude, lng: project.longitude },
          map,
          title: sanitizeText(project.name),
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#10b981",
            fillOpacity: 0.8,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }
        });

        // Create InfoWindow content using DOM elements to prevent XSS
        const contentDiv = document.createElement('div');
        contentDiv.style.padding = '8px';
        contentDiv.style.minWidth = '200px';

        const titleEl = document.createElement('h3');
        titleEl.style.margin = '0 0 8px 0';
        titleEl.style.fontWeight = 'bold';
        titleEl.textContent = project.name; // Safe: textContent escapes HTML

        const locationEl = document.createElement('p');
        locationEl.style.margin = '4px 0';
        locationEl.innerHTML = '<strong>Location:</strong> ';
        const locationText = document.createTextNode(project.location);
        locationEl.appendChild(locationText);

        const capacityEl = document.createElement('p');
        capacityEl.style.margin = '4px 0';
        capacityEl.innerHTML = '<strong>Capacity:</strong> ';
        const capacityText = document.createTextNode(`${project.capacity_mw} MW`);
        capacityEl.appendChild(capacityText);

        contentDiv.appendChild(titleEl);
        contentDiv.appendChild(locationEl);
        contentDiv.appendChild(capacityEl);

        const infoWindow = new window.google.maps.InfoWindow({
          content: contentDiv
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    });
  };

  if (apiKeyMissing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-600" />
            Solar Projects Map
          </CardTitle>
          <CardDescription>
            Interactive map showing solar projects across Bangladesh
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[500px] text-muted-foreground">
            <MapPin className="h-12 w-12 mb-4 text-muted-foreground/50" />
            <p className="text-center">Google Maps API key not configured.</p>
            <p className="text-sm text-center mt-2">Please set the VITE_GOOGLE_MAPS_API_KEY environment variable.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-emerald-600" />
          Solar Projects Map
        </CardTitle>
        <CardDescription>
          Interactive map showing solar projects across Bangladesh
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[500px]">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <div ref={mapRef} className="w-full h-[500px] rounded-lg overflow-hidden border" />
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectMap;
