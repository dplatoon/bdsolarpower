
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvestorMetrics from "@/components/InvestorMetrics";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Calculator, BookOpen, ArrowRight } from "lucide-react";

const Investors = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SEO 
        title="Solar Investment Opportunities Bangladesh | ROI 3-4 Years"
        description="Solar investment portal Bangladesh. 3-4 year ROI, 36% cost reduction with 1% import duty. BPDB tender analysis. Commercial solar projects. Net metering revenue."
        keywords="solar investment Bangladesh, commercial solar installation Bangladesh, BPDB solar tenders, solar project financing Bangladesh, solar ROI Bangladesh"
        canonicalUrl="https://bdsolarpower.com/investors"
      />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investor Intelligence Portal</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive market analysis, tender opportunities, and risk assessment for solar energy investments in Bangladesh
          </p>
        </div>
        <InvestorMetrics />

        {/* Cross-links Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200 hover:border-emerald-400">
                <CardContent className="p-4 flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Market Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Live capacity & pricing data</p>
                  </div>
                  <ArrowRight className="h-5 w-5 ml-auto text-gray-400" />
                </CardContent>
              </Card>
            </Link>
            <Link to="/ai-tools">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200 hover:border-purple-400">
                <CardContent className="p-4 flex items-center gap-3">
                  <Calculator className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">ROI Calculator</h3>
                    <p className="text-sm text-muted-foreground">AI-powered investment analysis</p>
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
                    <h3 className="font-medium text-gray-900">Policy Guides</h3>
                    <p className="text-sm text-muted-foreground">Regulations & financing options</p>
                  </div>
                  <ArrowRight className="h-5 w-5 ml-auto text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Investors;
