import Header from "@/components/Header";
import SolarAnalyzer from "@/components/SolarAnalyzer";
import ProjectMap from "@/components/ProjectMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AITools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI-Powered Solar Tools</h1>
          <p className="text-gray-600 mt-2">
            Advanced tools for solar analysis and project visualization
          </p>
        </div>

        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analyzer">Solar Analyzer</TabsTrigger>
            <TabsTrigger value="map">Project Map</TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer">
            <SolarAnalyzer />
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
