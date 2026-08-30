import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectComparison from "@/components/ProjectComparison";
import InvestmentPortfolio from "@/components/InvestmentPortfolio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";

const UserDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [bookmarkedTenders, setBookmarkedTenders] = useState([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profileData) setProfile(profileData);
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <SEO title="My Dashboard" description="Manage your solar projects and bookmarks" noIndex={true} includeLocalBusiness={false} />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Manage your bookmarks and track your solar journey
          </p>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tenders">Tenders</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            {bookmarkedProjects.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No bookmarked projects yet</p>
                  <Button onClick={() => navigate('/dashboard')} className="mx-auto block mt-4">
                    Browse Projects
                  </Button>
                </CardContent>
              </Card>
            ) : (
              bookmarkedProjects.map((bookmark: any) => (
                <Card key={bookmark.id}>
                  <CardHeader>
                    <CardTitle>{bookmark.solar_projects.name}</CardTitle>
                    <CardDescription>{bookmark.solar_projects.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Capacity:</span> {bookmark.solar_projects.capacity_mw} MW
                      </div>
                      <div>
                        <span className="font-semibold">Status:</span> {bookmark.solar_projects.status}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="tenders" className="space-y-4">
            {bookmarkedTenders.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No bookmarked tenders yet</p>
                  <Button onClick={() => navigate('/investors')} className="mx-auto block mt-4">
                    Browse Tenders
                  </Button>
                </CardContent>
              </Card>
            ) : (
              bookmarkedTenders.map((bookmark: any) => (
                <Card key={bookmark.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{bookmark.tender_opportunities.title}</CardTitle>
                        <CardDescription>{bookmark.tender_opportunities.organization}</CardDescription>
                      </div>
                      <Badge>{bookmark.tender_opportunities.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Budget:</span> {bookmark.tender_opportunities.estimated_budget}
                      </div>
                      <div>
                        <span className="font-semibold">Deadline:</span>{' '}
                        {new Date(bookmark.tender_opportunities.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="compare">
            <ProjectComparison />
          </TabsContent>

          <TabsContent value="portfolio">
            <InvestmentPortfolio />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
