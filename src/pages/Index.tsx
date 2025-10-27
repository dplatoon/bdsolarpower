import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, TrendingUp, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import SolarDataDashboard from "@/components/SolarDataDashboard";
import AIToolsPreview from "@/components/AIToolsPreview";
import InvestorMetrics from "@/components/InvestorMetrics";
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <SEO title="Solar Panel Bangladesh | 5kW System from BDT 275,000" description="Leading solar panel installation in Bangladesh. 5kW system from BDT 275,000. Rooftop solar, net metering, 3-4 year ROI. 500+ installations. Get free quote today!" keywords="solar panel Bangladesh, solar panel price Bangladesh 2025, rooftop solar installation Bangladesh, net metering Bangladesh, 5kW solar system Bangladesh, solar panel Dhaka, solar panel Chittagong, commercial solar Bangladesh, 3000 MW solar program Bangladesh" canonicalUrl="https://bdsolarpower.com/" />
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Solar Panel Bangladesh
              <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent"> 5kW from BDT 275,000</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Leading solar panel installation in Bangladesh. Rooftop solar with net metering. 3-4 year ROI. 500+ installations. Government 3000 MW program support. Get your free quote today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/ai-tools">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Calculate Your Savings
                </Button>
              </Link>
              <Link to="/learn">
                <Button variant="outline" size="lg">
                  Net Metering Guide
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">36% Cost Reduction</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">1% Import Duty</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Solar Capacity</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700">1,183 MW</div>
                <p className="text-xs text-muted-foreground">
                  4.5% of national grid
                </p>
                <Progress value={4.5} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tenders</CardTitle>
                <Calendar className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700">55 Sites</div>
                <p className="text-xs text-muted-foreground">
                  BPDB renewable projects
                </p>
                <Badge variant="secondary" className="mt-2">2,605 MW Target</Badge>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CO₂ Offset</CardTitle>
                <ArrowUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">18,344</div>
                <p className="text-xs text-muted-foreground">
                  tons/year from 20 MW plants
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Grid Access</CardTitle>
                <MapPin className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">97%</div>
                <p className="text-xs text-muted-foreground">
                  Population electrification
                </p>
                <Progress value={97} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Comprehensive Solar Intelligence Platform
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Advanced analytics, AI-powered insights, and real-time data for Bangladesh's renewable energy sector
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Live Dashboard</TabsTrigger>
              <TabsTrigger value="ai-tools">AI Analysis</TabsTrigger>
              <TabsTrigger value="investors">Investor Portal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-8">
              <SolarDataDashboard />
            </TabsContent>
            
            <TabsContent value="ai-tools" className="mt-8">
              <AIToolsPreview />
            </TabsContent>
            
            <TabsContent value="investors" className="mt-8">
              <InvestorMetrics />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-emerald-600 to-amber-500 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Install Solar Panels in Bangladesh?</h2>
          <p className="mt-4 text-xl text-emerald-100">
            Get free quote for your 5kW rooftop solar system. Join 500+ satisfied customers. 3-4 year ROI with net metering.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-tools">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Calculate Your Savings
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white hover:bg-white text-slate-900">
                Learn About Government Program
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;