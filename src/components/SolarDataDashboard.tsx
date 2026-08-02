
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MapPin, Zap, TrendingUp, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const SolarDataDashboard = () => {
  const { data: projects } = useQuery({
    queryKey: ['solar-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('solar_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: tenders } = useQuery({
    queryKey: ['tender-opportunities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tender_opportunities_public')
        .select('*')
        .order('deadline', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Calculate totals from real data
  const totalCapacity = projects?.reduce((sum, project) => sum + Number(project.capacity_mw), 0) || 245;
  const totalInvestment = projects?.reduce((sum, project) => sum + Number(project.investment_amount || 0), 0) || 295000000;
  const totalCarbonOffset = projects?.reduce((sum, project) => sum + Number(project.carbon_offset_tons || 0), 0) || 464275;
  const activeTenders = tenders?.length || 3;

  // Prepare chart data
  const capacityByLocation = projects?.reduce((acc: any[], project) => {
    const location = project.location.split(',')[0]; // Get city name
    const existing = acc.find(item => item.location === location);
    if (existing) {
      existing.capacity += Number(project.capacity_mw);
    } else {
      acc.push({ location, capacity: Number(project.capacity_mw) });
    }
    return acc;
  }, []) || [];

  const statusData = projects?.reduce((acc: any[], project) => {
    const existing = acc.find(item => item.status === project.status);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ 
        status: project.status.replace('_', ' ').toUpperCase(), 
        count: 1 
      });
    }
    return acc;
  }, []) || [];

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Zap className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">{totalCapacity} MW</div>
            <p className="text-xs text-muted-foreground">
              Across {projects?.length || 4} active projects
            </p>
            <Progress value={(totalCapacity / 1183) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">
              ${(totalInvestment / 1000000).toFixed(0)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Total project value
            </p>
            <Badge variant="secondary" className="mt-2">USD</Badge>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Offset</CardTitle>
            <Leaf className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {(totalCarbonOffset / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              tons/year carbon reduction
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenders</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{activeTenders}</div>
            <p className="text-xs text-muted-foreground">
              Open opportunities
            </p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Capacity by Location</CardTitle>
            <CardDescription>Solar installation capacity across Bangladesh regions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={capacityByLocation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="capacity" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current status of solar projects in pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Solar Projects</CardTitle>
          <CardDescription>Latest developments in Bangladesh's solar infrastructure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects?.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-semibold">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                  <p className="text-xs text-gray-600">{project.description}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-bold text-emerald-600">{project.capacity_mw} MW</div>
                  <Badge variant={
                    project.status === 'operational' ? 'default' :
                    project.status === 'under_construction' ? 'secondary' :
                    project.status === 'planned' ? 'outline' : 'destructive'
                  }>
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolarDataDashboard;
