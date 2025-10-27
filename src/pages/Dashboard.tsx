
import Header from "@/components/Header";
import SolarDataDashboard from "@/components/SolarDataDashboard";
import { SEO } from "@/components/SEO";

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
      </div>
    </div>
  );
};

export default Dashboard;
