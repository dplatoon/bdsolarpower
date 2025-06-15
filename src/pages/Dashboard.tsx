
import Header from "@/components/Header";
import SolarDataDashboard from "@/components/SolarDataDashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
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
