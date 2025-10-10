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

const ProjectMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

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

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
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
          title: project.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#10b981",
            fillOpacity: 0.8,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold;">${project.name}</h3>
              <p style="margin: 4px 0;"><strong>Location:</strong> ${project.location}</p>
              <p style="margin: 4px 0;"><strong>Capacity:</strong> ${project.capacity_mw} MW</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    });
  };

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
