import Header from "@/components/Header";
import SolarAnalyzer from "@/components/SolarAnalyzer";
import ProjectMap from "@/components/ProjectMap";
import CarbonCalculator from "@/components/CarbonCalculator";
import PolicySummarizer from "@/components/PolicySummarizer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEO } from "@/components/SEO";

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
      </div>
    </div>
  );
};

export default AITools;
