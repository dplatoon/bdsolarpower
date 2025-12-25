import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl font-bold text-emerald-600 mb-4">404</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-gray-500 mb-4">You might find these helpful:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/dashboard" className="text-emerald-600 hover:underline">Dashboard</Link>
              <Link to="/ai-tools" className="text-emerald-600 hover:underline">AI Tools</Link>
              <Link to="/investors" className="text-emerald-600 hover:underline">Investors</Link>
              <Link to="/learn" className="text-emerald-600 hover:underline">Learn</Link>
              <Link to="/blog" className="text-emerald-600 hover:underline">Blog</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;