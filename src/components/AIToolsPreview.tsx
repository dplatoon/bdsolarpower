
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Calculator, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AIToolsPreview = () => {
  const [landImage, setLandImage] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLandImage(file);
      toast({
        title: "Image uploaded successfully",
        description: "Ready for AI terrain analysis",
      });
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalysisResult(`
Solar Potential Analysis Report

Land Assessment: High suitability detected
• Terrain: Relatively flat with minimal shading
• Estimated capacity: 5.2 MW potential
• Optimal panel orientation: South-facing, 23° tilt
• Annual energy production: ~9.8 GWh/year

Environmental Factors:
• Solar irradiation: 4.8 kWh/m²/day (excellent for Bangladesh)
• Monsoon considerations: Elevated mounting recommended
• Grid connectivity: Within 2km of existing infrastructure

Investment Projection:
• Installation cost: ~$3.12M USD
• ROI timeline: 7-9 years
• Carbon offset: 4,900 tons CO₂/year
      `);
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "Your solar potential report is ready",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Solar Potential Analyzer */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-purple-600" />
              AI Solar Potential Analyzer
            </CardTitle>
            <CardDescription>
              Upload land photos for GPT-4 Vision terrain analysis and capacity estimation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="land-upload"
              />
              <label htmlFor="land-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">
                  Click to upload land image or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 10MB
                </p>
              </label>
            </div>

            {landImage && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {landImage.name}
                  </Badge>
                </div>
                <Button 
                  onClick={simulateAnalysis} 
                  disabled={isAnalyzing}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? "Analyzing terrain..." : "Start AI Analysis"}
                </Button>
              </div>
            )}

            {analysisResult && (
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-900">Analysis Complete</span>
                </div>
                <pre className="text-xs whitespace-pre-wrap text-purple-800">
                  {analysisResult}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Policy Insight Generator */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              Policy Insight Generator
            </CardTitle>
            <CardDescription>
              AI-powered analysis of Bangladesh's renewable energy policies and regulations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Latest Policy Updates</h4>
              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h5 className="font-medium text-emerald-900">Renewable Energy Policy 2024</h5>
                  <p className="text-sm text-emerald-700 mt-1">
                    Target: 40% clean energy by 2041. Net metering guidelines updated for commercial installations.
                  </p>
                  <Badge variant="secondary" className="mt-2 bg-emerald-100 text-emerald-800">
                    Active
                  </Badge>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-900">ADB LEAP 2 Funding</h5>
                  <p className="text-sm text-blue-700 mt-1">
                    $515M available for renewable projects. Priority given to grid-connected solar installations.
                  </p>
                  <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
                    Open Applications
                  </Badge>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <h5 className="font-medium text-amber-900">BSTI Solar Standards</h5>
                  <p className="text-sm text-amber-700 mt-1">
                    Updated technical standards for PV modules and inverters. Mandatory certification for imports.
                  </p>
                  <Badge variant="secondary" className="mt-2 bg-amber-100 text-amber-800">
                    Effective Jan 2024
                  </Badge>
                </div>
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Get Detailed Policy Analysis
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Carbon Calculator */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-600" />
            Carbon Savings Calculator
          </CardTitle>
          <CardDescription>
            Calculate environmental impact and solar recommendations based on energy consumption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Monthly Energy Usage (kWh)</label>
              <Input placeholder="e.g., 500" type="number" />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Property Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Location</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Dhaka</option>
                <option>Chittagong</option>
                <option>Sylhet</option>
                <option>Rajshahi</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <h4 className="font-semibold text-green-900">Recommended System</h4>
              <p className="text-2xl font-bold text-green-700 mt-1">8.5 kW</p>
              <p className="text-sm text-green-600">~34 panels needed</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <h4 className="font-semibold text-blue-900">Annual Savings</h4>
              <p className="text-2xl font-bold text-blue-700 mt-1">৳87,000</p>
              <p className="text-sm text-blue-600">~$820 USD</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <h4 className="font-semibold text-purple-900">CO₂ Offset</h4>
              <p className="text-2xl font-bold text-purple-700 mt-1">6.2 tons</p>
              <p className="text-sm text-purple-600">per year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIToolsPreview;
