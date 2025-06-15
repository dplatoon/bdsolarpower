
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, DollarSign, Calendar } from "lucide-react";

const InvestorMetrics = () => {
  const tenderOpportunities = [
    {
      package: "Package 1-A",
      location: "Northern Region",
      capacity: "145 MW",
      sites: 8,
      deadline: "March 15, 2024",
      bids: 3,
      status: "Under-subscribed",
      riskLevel: "Medium",
      estimatedROI: "12-15%"
    },
    {
      package: "Package 2-B",
      location: "Central Region", 
      capacity: "89 MW",
      sites: 5,
      deadline: "April 2, 2024",
      bids: 0,
      status: "Zero Bids",
      riskLevel: "High Opportunity",
      estimatedROI: "18-22%"
    },
    {
      package: "Package 3-C",
      location: "Southern Region",
      capacity: "203 MW", 
      sites: 12,
      deadline: "May 10, 2024",
      bids: 7,
      status: "Competitive",
      riskLevel: "Low",
      estimatedROI: "10-13%"
    }
  ];

  const investmentMetrics = [
    { label: "Total Market Size", value: "2,605 MW", change: "+15%" },
    { label: "Avg. Installation Cost", value: "$0.62/W", change: "-8%" },
    { label: "Grid Tariff Rate", value: "৳6.8/kWh", change: "+3%" },
    { label: "Policy Stability Index", value: "7.2/10", change: "+0.5" }
  ];

  const fundingSources = [
    { name: "ADB LEAP 2", amount: "$515M", status: "Available", focus: "Grid-connected solar" },
    { name: "World Bank IDA", amount: "$300M", status: "Phase 2", focus: "Rural electrification" },
    { name: "Green Climate Fund", amount: "$180M", status: "Under Review", focus: "Climate adaptation" },
    { name: "Private Investment", amount: "$1.2B", status: "Active", focus: "Commercial & Industrial" }
  ];

  return (
    <div className="space-y-6">
      {/* Investment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {investmentMetrics.map((metric, index) => (
          <Card key={index} className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-xl font-bold text-blue-700">{metric.value}</p>
                </div>
                <Badge variant={metric.change.startsWith('+') ? "default" : "secondary"} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Tender Opportunities */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Active Tender Opportunities
            </CardTitle>
            <CardDescription>
              Live BPDB solar procurement with bid analysis and risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tenderOpportunities.map((tender, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{tender.package}</h4>
                    <p className="text-sm text-muted-foreground">{tender.location} • {tender.capacity}</p>
                  </div>
                  <Badge 
                    variant={
                      tender.status === "Zero Bids" ? "destructive" :
                      tender.status === "Under-subscribed" ? "secondary" : "default"
                    }
                  >
                    {tender.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Sites:</span> {tender.sites}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Deadline:</span> {tender.deadline}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Current Bids:</span> {tender.bids}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Est. ROI:</span> {tender.estimatedROI}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-amber-700">{tender.riskLevel} Risk</span>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Funding Sources */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Available Funding Sources
            </CardTitle>
            <CardDescription>
              International and domestic financing options for solar projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fundingSources.map((source, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{source.name}</h4>
                  <Badge 
                    variant={
                      source.status === "Available" ? "default" :
                      source.status === "Active" ? "secondary" : "outline"
                    }
                  >
                    {source.status}
                  </Badge>
                </div>
                
                <div className="text-2xl font-bold text-green-700 mb-1">{source.amount}</div>
                <p className="text-sm text-muted-foreground">{source.focus}</p>
                
                {source.status === "Available" && (
                  <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                    Apply Now
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risk Analysis Dashboard */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            Market Risk Analysis
          </CardTitle>
          <CardDescription>
            Key risk factors and policy volatility indicators for solar investments in Bangladesh
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Policy Risk</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Regulatory Stability</span>
                  <span className="font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  31 projects cancelled in 2023 due to policy changes
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Financial Risk</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Payment Security</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Government payment delays averaging 45 days
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Technical Risk</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Grid Integration</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Strong transmission infrastructure in target areas
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h5 className="font-semibold text-red-900">Investment Advisory</h5>
                <p className="text-sm text-red-700 mt-1">
                  Due diligence recommended for projects over 50 MW. Recent policy volatility has affected 23% of large-scale solar developments. Consider diversified portfolio approach across multiple smaller projects.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorMetrics;
