
import Header from "@/components/Header";
import InvestorMetrics from "@/components/InvestorMetrics";

const Investors = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
