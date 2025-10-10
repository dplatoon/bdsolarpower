import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CarbonCalculator = () => {
  const [systemSize, setSystemSize] = useState<string>("");
  const [projectType, setProjectType] = useState<string>("rooftop");
  const [results, setResults] = useState<{
    annualGeneration: number;
    co2Offset: number;
    treesEquivalent: number;
    coalEquivalent: number;
    homesEquivalent: number;
  } | null>(null);

  // Bangladesh-specific solar parameters
  const BANGLADESH_SOLAR_IRRADIANCE = 4.5; // kWh/m²/day average
  const PERFORMANCE_RATIO = 0.75; // Accounting for losses
  const CO2_PER_KWH = 0.8; // kg CO2 per kWh (Bangladesh grid average)
  const TREE_CO2_ABSORPTION = 21.77; // kg CO2 per tree per year
  const COAL_CO2_PER_KWH = 0.96; // kg CO2 per kWh from coal
  const AVG_HOME_CONSUMPTION = 3600; // kWh per year in Bangladesh

  const calculateCarbon = () => {
    const size = parseFloat(systemSize);
    if (!size || size <= 0) return;

    // Calculate annual generation (kWh)
    const annualGeneration = size * BANGLADESH_SOLAR_IRRADIANCE * 365 * PERFORMANCE_RATIO;
    
    // Calculate CO2 offset (tons)
    const co2Offset = (annualGeneration * CO2_PER_KWH) / 1000;
    
    // Calculate tree equivalent
    const treesEquivalent = Math.round((co2Offset * 1000) / TREE_CO2_ABSORPTION);
    
    // Calculate coal equivalent (tons)
    const coalEquivalent = (annualGeneration * COAL_CO2_PER_KWH) / 1000;
    
    // Calculate homes powered
    const homesEquivalent = Math.round(annualGeneration / AVG_HOME_CONSUMPTION);

    setResults({
      annualGeneration: Math.round(annualGeneration),
      co2Offset: parseFloat(co2Offset.toFixed(2)),
      treesEquivalent,
      coalEquivalent: parseFloat(coalEquivalent.toFixed(2)),
      homesEquivalent,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-emerald-600" />
          Carbon Offset Calculator
        </CardTitle>
        <CardDescription>
          Calculate CO₂ emissions reduction using Bangladesh-specific solar data (4.5 kWh/m²/day avg irradiance)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systemSize">System Size (kW)</Label>
              <Input
                id="systemSize"
                type="number"
                placeholder="e.g., 100"
                value={systemSize}
                onChange={(e) => setSystemSize(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger id="projectType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rooftop">Rooftop Solar</SelectItem>
                  <SelectItem value="ground">Ground-Mounted</SelectItem>
                  <SelectItem value="floating">Floating Solar</SelectItem>
                  <SelectItem value="agrivoltaic">Agrivoltaic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateCarbon} className="w-full">
            Calculate Carbon Impact
          </Button>

          {results && (
            <div className="space-y-4 mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-900">Annual Environmental Impact</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Energy Generation</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {results.annualGeneration.toLocaleString()} kWh
                  </p>
                </div>

                <div className="bg-background p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">CO₂ Offset</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {results.co2Offset.toLocaleString()} tons
                  </p>
                </div>

                <div className="bg-background p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Equivalent Trees Planted</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {results.treesEquivalent.toLocaleString()}
                  </p>
                </div>

                <div className="bg-background p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Coal Avoided</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {results.coalEquivalent.toLocaleString()} tons
                  </p>
                </div>

                <div className="bg-background p-4 rounded-lg border md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Homes Powered Annually</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {results.homesEquivalent.toLocaleString()} households
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Based on avg. 3,600 kWh/year per home in Bangladesh
                  </Badge>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900">
                  <strong>Context:</strong> This calculation uses Bangladesh's average solar irradiance (4.5 kWh/m²/day) 
                  and grid emission factor (0.8 kg CO₂/kWh). Actual results may vary based on location, panel efficiency, 
                  and seasonal variations.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonCalculator;
