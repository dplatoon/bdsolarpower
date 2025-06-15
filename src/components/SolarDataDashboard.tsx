
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, Calendar, ArrowUp } from "lucide-react";

const SolarDataDashboard = () => {
  const projectData = [
    { location: "Mymensingh", capacity: "20 MW", output: "37.9 GWh/year", status: "ADB Funded", color: "emerald" },
    { location: "Pabna", capacity: "100 MW", output: "189.5 GWh/year", status: "Under Construction", color: "blue" },
    { location: "Rangpur", capacity: "50 MW", output: "94.8 GWh/year", status: "Tender Open", color: "amber" },
    { location: "Cumilla", capacity: "75 MW", output: "142.1 GWh/year", status: "Planning", color: "purple" },
  ];

  const tenderStats = [
    { package: "Package 1", sites: 14, capacity: "830 MW", bids: 12 },
    { package: "Package 2", sites: 12, capacity: "720 MW", bids: 8 },
    { package: "Package 3", sites: 15, capacity: "905 MW", bids: 7 },
    { package: "Package 4", sites: 14, capacity: "150 MW", bids: 9 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Solar Capacity */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              National Solar Progress
            </CardTitle>
            <CardDescription>Bangladesh's renewable energy advancement toward 2041 targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Solar Capacity</span>
                <span className="font-semibold">1,183 MW</span>
              </div>
              <Progress value={4.5} className="h-2" />
              <p className="text-xs text-muted-foreground">4.5% of total grid capacity</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>2041 Clean Energy Target</span>
                <span className="font-semibold">40%</span>
              </div>
              <Progress value={11.25} className="h-2" />
              <p className="text-xs text-muted-foreground">11.25% progress toward goal</p>
            </div>

            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Carbon Offset</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  1.2M tons CO₂/year
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Locations */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Key Solar Projects
            </CardTitle>
            <CardDescription>Major installations across Bangladesh districts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projectData.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium">{project.location}</p>
                    <p className="text-sm text-muted-foreground">{project.capacity} • {project.output}</p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${
                      project.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                      project.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      project.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tender Dashboard */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-600" />
            BPDB Solar Tender Analysis
          </CardTitle>
          <CardDescription>Live tracking of renewable energy procurement packages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tenderStats.map((tender, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <h4 className="font-semibold text-gray-900">{tender.package}</h4>
                <p className="text-sm text-muted-foreground mt-1">{tender.sites} sites • {tender.capacity}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Active Bids</span>
                  <Badge variant={tender.bids > 10 ? "default" : tender.bids > 5 ? "secondary" : "destructive"}>
                    {tender.bids} bids
                  </Badge>
                </div>
                <Progress 
                  value={(tender.bids / tender.sites) * 100} 
                  className="mt-2 h-1" 
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Investment Alert:</strong> 9 plants in Package 4 received zero bids, presenting unique opportunities for strategic investors.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolarDataDashboard;
