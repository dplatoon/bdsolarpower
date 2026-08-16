
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, MapPin, Users, Bookmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const InvestorMetrics = () => {
  const { user } = useAuth();

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

  const { data: projects } = useQuery({
    queryKey: ['solar-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('solar_projects')
        .select('*')
        .order('capacity_mw', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleBookmarkTender = async (tenderId: string) => {
    if (!user) {
      toast.error("Please sign in to bookmark tenders");
      return;
    }

    const { error } = await supabase
      .from('user_project_interactions')
      .upsert({
        user_id: user.id,
        project_id: tenderId,
        interaction_type: 'bookmark',
        notes: 'Bookmarked tender opportunity'
      });

    if (error) {
      toast.error("Failed to bookmark tender");
    } else {
      toast.success("Tender bookmarked successfully!");
    }
  };

  // Calculate metrics
  const totalTenderValue = tenders?.reduce((sum, tender) => sum + Number(tender.minimum_bid || 0), 0) || 247500000;
  const highCapacityProjects = projects?.filter(p => Number(p.capacity_mw) >= 50).length || 3;

  return (
    <div className="space-y-6">
      {/* Investment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opportunity Value</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              ${(totalTenderValue / 1000000).toFixed(0)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Active tender minimum bids
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competition Level</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">Confidential</div>
            <p className="text-xs text-muted-foreground">
              Bid counts disclosed after deadline
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Large Scale Projects</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{highCapacityProjects}</div>
            <p className="text-xs text-muted-foreground">
              Projects ≥50 MW capacity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Tenders */}
      <Card>
        <CardHeader>
          <CardTitle>Active Tender Opportunities</CardTitle>
          <CardDescription>
            Current BPDB solar tenders available for bidding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tenders?.map((tender) => (
              <div key={tender.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">{tender.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {tender.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Deadline: {new Date(tender.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant={tender.status === 'open' ? 'default' : 'secondary'}>
                      {tender.status.toUpperCase()}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleBookmarkTender(tender.id)}
                    >
                      <Bookmark className="h-3 w-3 mr-1" />
                      Bookmark
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm font-medium text-emerald-600">Capacity</span>
                    <p className="font-bold">{tender.capacity_mw} MW</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-600">Minimum Bid</span>
                    <p className="font-bold">${(Number(tender.minimum_bid) / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-purple-600">Current Bids</span>
                    <p className="font-bold">Hidden until deadline</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{tender.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Days remaining: {Math.max(0, Math.ceil((new Date(tender.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" disabled={!user}>
                      {user ? 'Submit Bid' : 'Sign In to Bid'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>Key trends and opportunities in Bangladesh's solar market</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">High-Opportunity Regions</h4>
              {projects?.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{project.location}</p>
                    <p className="text-sm text-muted-foreground">{project.capacity_mw} MW capacity</p>
                  </div>
                  <Badge variant="outline">{project.status.replace('_', ' ')}</Badge>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Investment Tips</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900">Low Competition</p>
                  <p className="text-sm text-blue-700">Several tenders have zero bids - early mover advantage</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-900">ADB Backing</p>
                  <p className="text-sm text-green-700">Projects backed by Asian Development Bank financing</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="font-medium text-amber-900">Policy Support</p>
                  <p className="text-sm text-amber-700">Government target: 40% renewable energy by 2041</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorMetrics;
