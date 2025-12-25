import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SolarAnalyzer from "@/components/SolarAnalyzer";
import ProjectMap from "@/components/ProjectMap";
import CarbonCalculator from "@/components/CarbonCalculator";
import PolicySummarizer from "@/components/PolicySummarizer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { BarChart3, TrendingUp, BookOpen, ArrowRight } from "lucide-react";

const AITools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <SEO 
        title="Solar ROI Calculator Bangladesh | AI Analysis Tools"
        description="Free solar ROI calculator & AI tools for Bangladesh. Calculate payback period, carbon offset, net metering savings. 5kW solar system analysis. Project visualization."
        keywords="solar ROI calculator Bangladesh, solar calculator, solar payback period Bangladesh, carbon calculator, solar analysis tools, net metering calculator"
        canonicalUrl="https://bdsolarpower.com/ai-tools"
      />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI-Powered Solar Tools</h1>
          <p className="text-gray-600 mt-2">
            Advanced tools for solar analysis and project visualization
          </p>
        </div>

        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analyzer">Solar Analyzer</TabsTrigger>
            <TabsTrigger value="carbon">Carbon Calculator</TabsTrigger>
            <TabsTrigger value="policy">Policy Summarizer</TabsTrigger>
            <TabsTrigger value="map">Project Map</TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer">
            <SolarAnalyzer />
          </TabsContent>

          <TabsContent value="carbon">
            <CarbonCalculator />
          </TabsContent>

          <TabsContent value="policy">
            <PolicySummarizer />
          </TabsContent>

          <TabsContent value="map">
            <ProjectMap />
          </TabsContent>
        </Tabs>

        {/* Cross-links Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Your Solar Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200 hover:border-emerald-400">
                <CardContent className="p-4 flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Analytics Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Real-time solar market data</p>
                  </div>
                  <ArrowRight className="h-5 w-5 ml-auto text-gray-400" />
                </CardContent>
              </Card>
            </Link>
            <Link to="/investors">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200 hover:border-blue-400">
                <CardContent className="p-4 flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Investor Portal</h3>
                    <p className="text-sm text-muted-foreground">BPDB tenders & ROI analysis</p>
                  </div>
                  <ArrowRight className="h-5 w-5 ml-auto text-gray-400" />
                </CardContent>
              </Card>
            </Link>
            <Link to="/learn">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-amber-200 hover:border-amber-400">
                <CardContent className="p-4 flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-amber-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Learning Hub</h3>
                    <p className="text-sm text-muted-foreground">Net metering & policy guides</p>
                  </div>
                  <ArrowRight className="h-5 w-5 ml-auto text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITools;
