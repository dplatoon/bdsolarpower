
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SolarDataDashboard from "@/components/SolarDataDashboard";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, BookOpen, TrendingUp, ArrowRight } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <SEO 
        title="Solar Analytics Dashboard Bangladesh | Real-time Data"
        description="Real-time solar energy monitoring dashboard for Bangladesh. Track capacity, tenders, pricing trends. 1,183 MW capacity analysis. Government 3000 MW program updates."
        keywords="solar analytics Bangladesh, solar market data, BPDB solar tenders, solar capacity Bangladesh, renewable energy dashboard"
        canonicalUrl="https://bdsolarpower.com/dashboard"
      />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Solar Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Real-time monitoring of Bangladesh's renewable energy infrastructure and market dynamics
          </p>
        </div>
        <SolarDataDashboard />

        {/* Cross-links Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore More Tools & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/ai-tools">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200 hover:border-purple-400">
                <CardContent className="p-4 flex items-center gap-3">
                  <Calculator className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">AI Solar Tools</h3>
                    <p className="text-sm text-muted-foreground">Calculate ROI & analyze sites</p>
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
                    <p className="text-sm text-muted-foreground">Tender opportunities & analysis</p>
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
                    <p className="text-sm text-muted-foreground">Policies & implementation guides</p>
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

export default Dashboard;
