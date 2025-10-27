
import Header from "@/components/Header";
import InvestorMetrics from "@/components/InvestorMetrics";
import { SEO } from "@/components/SEO";

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
      </div>
    </div>
  );
};

export default Investors;
