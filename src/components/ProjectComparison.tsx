import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { GitCompare, MapPin, Zap, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  name: string;
  location: string;
  capacity_mw: number;
  status: string;
  investment_amount: number;
  completion_date: string;
}

const ProjectComparison = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('solar_projects')
        .select('*')
        .limit(10);

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Could not load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleProject = (id: string) => {
    setSelectedProjects(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id);
      }
      if (prev.length >= 3) {
        toast({
          title: "Limit Reached",
          description: "You can compare up to 3 projects at a time",
        });
        return prev;
      }
      return [...prev, id];
    });
  };

  const selectedProjectsData = projects.filter(p => selectedProjects.includes(p.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-purple-600" />
          Project Comparison Tool
        </CardTitle>
        <CardDescription>
          Select up to 3 projects to compare capacity, costs, and timelines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Project Selection */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Select Projects to Compare</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {loading ? (
                <p className="text-muted-foreground text-sm">Loading projects...</p>
              ) : projects.length === 0 ? (
                <p className="text-muted-foreground text-sm">No projects available</p>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => toggleProject(project.id)}
                  >
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={() => toggleProject(project.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.location}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {project.capacity_mw} MW
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedProjectsData.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Metric</th>
                      {selectedProjectsData.map((project) => (
                        <th key={project.id} className="text-left p-3 text-sm font-medium">
                          {project.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 text-sm font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        Location
                      </td>
                      {selectedProjectsData.map((project) => (
                        <td key={project.id} className="p-3 text-sm">{project.location}</td>
                      ))}
                    </tr>
                    <tr className="border-t bg-muted/50">
                      <td className="p-3 text-sm font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        Capacity
                      </td>
                      {selectedProjectsData.map((project) => (
                        <td key={project.id} className="p-3 text-sm font-semibold">
                          {project.capacity_mw} MW
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-sm font-medium flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        Est. Cost
                      </td>
                      {selectedProjectsData.map((project) => (
                        <td key={project.id} className="p-3 text-sm">
                          ${(project.investment_amount / 1000000).toFixed(1)}M
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t bg-muted/50">
                      <td className="p-3 text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Completion
                      </td>
                      {selectedProjectsData.map((project) => (
                        <td key={project.id} className="p-3 text-sm">
                          {new Date(project.completion_date).toLocaleDateString()}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-sm font-medium">Status</td>
                      {selectedProjectsData.map((project) => (
                        <td key={project.id} className="p-3">
                          <Badge variant="secondary">{project.status}</Badge>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedProjectsData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <GitCompare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Select 2-3 projects above to start comparison</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectComparison;
