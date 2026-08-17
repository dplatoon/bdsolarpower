import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SolarAnalyzer = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [roofArea, setRoofArea] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile || !roofArea || !location) {
      toast({
        title: "Missing Information",
        description: "Please provide all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setAnalysis("");

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        const { data, error } = await supabase.functions.invoke('analyze-solar-potential', {
          body: {
            imageUrl: base64Image,
            roofArea,
            location,
          }
        });

        if (error) throw error;

        setAnalysis(data.analysis);
        toast({
          title: "Analysis Complete",
          description: "Your solar potential analysis is ready",
        });
      };
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600" />
            Solar Potential Analyzer
          </CardTitle>
          <CardDescription>
            Upload a roof image to get AI-powered solar installation analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roof-image">Roof Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-emerald-500 transition-colors">
              <Input
                id="roof-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="roof-image" className="cursor-pointer">
                {imagePreview ? (
                  <img src={imagePreview} alt="Roof preview" className="max-h-48 mx-auto rounded" />
                ) : (
                  <div className="py-8">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload roof image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="roof-area">Roof Area (sq ft)</Label>
            <Input
              id="roof-area"
              type="number"
              value={roofArea}
              onChange={(e) => setRoofArea(e.target.value)}
              placeholder="e.g., 1500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Mymensingh, Bangladesh"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading || !imageFile || !roofArea || !location}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Solar Potential'
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>
            AI-powered assessment of your solar installation potential
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
          ) : analysis ? (
            <Textarea
              value={analysis}
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Zap className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Upload an image and click analyze to see results</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SolarAnalyzer;
