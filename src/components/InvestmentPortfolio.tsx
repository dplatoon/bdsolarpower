import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Investment {
  project_name: string;
  amount_usd: number;
  roi_percentage: number;
  investment_date: string;
  status: string;
}

const InvestmentPortfolio = () => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalInvested, setTotalInvested] = useState(0);
  const [avgROI, setAvgROI] = useState(0);

  useEffect(() => {
    if (user) {
      fetchInvestments();
    }
  }, [user]);

  const fetchInvestments = async () => {
    try {
      // This would fetch from a real investments table
      // For now, using mock data
      const mockInvestments: Investment[] = [
        {
          project_name: "Dhaka Rooftop Solar - 5MW",
          amount_usd: 150000,
          roi_percentage: 18.5,
          investment_date: "2024-01-15",
          status: "Active"
        },
        {
          project_name: "Chittagong Solar Farm - 20MW",
          amount_usd: 500000,
          roi_percentage: 22.3,
          investment_date: "2023-08-20",
          status: "Active"
        },
        {
          project_name: "Sylhet Hybrid Project - 10MW",
          amount_usd: 300000,
          roi_percentage: 15.8,
          investment_date: "2023-11-10",
          status: "Pending"
        }
      ];

      setInvestments(mockInvestments);
      
      const total = mockInvestments.reduce((sum, inv) => sum + inv.amount_usd, 0);
      setTotalInvested(total);
      
      const avgRoi = mockInvestments.reduce((sum, inv) => sum + inv.roi_percentage, 0) / mockInvestments.length;
      setAvgROI(avgRoi);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investments:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600" />
          Investment Portfolio Tracker
        </CardTitle>
        <CardDescription>
          Monitor your solar project investments and returns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Total Invested</p>
              </div>
              <p className="text-2xl font-bold text-blue-700">
                ${(totalInvested / 1000).toFixed(0)}K
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <p className="text-sm font-medium text-emerald-900">Avg. ROI</p>
              </div>
              <p className="text-2xl font-bold text-emerald-700">
                {avgROI.toFixed(1)}%
              </p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-4 w-4 text-amber-600" />
                <p className="text-sm font-medium text-amber-900">Active Projects</p>
              </div>
              <p className="text-2xl font-bold text-amber-700">
                {investments.filter(i => i.status === "Active").length}
              </p>
            </div>
          </div>

          {/* Investment List */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Your Investments</h4>
            {investments.map((investment, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground">{investment.project_name}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Invested: {new Date(investment.investment_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant={investment.status === "Active" ? "default" : "secondary"}>
                    {investment.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Investment Amount</p>
                    <p className="text-lg font-semibold text-foreground">
                      ${(investment.amount_usd / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Expected ROI</p>
                    <p className="text-lg font-semibold text-emerald-600">
                      {investment.roi_percentage}%
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-medium">{investment.roi_percentage}%</span>
                  </div>
                  <Progress value={investment.roi_percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>

          {investments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No investments yet. Start investing in solar projects!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentPortfolio;
