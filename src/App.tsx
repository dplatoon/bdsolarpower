import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./contexts/AuthContext";
import { trackPageView } from "@/lib/analytics";

// Route-level code splitting: each page loads on demand, so the initial JS
// bundle only contains the shell + the current page's chunk.
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AITools = lazy(() => import("./pages/AITools"));
const Investors = lazy(() => import("./pages/Investors"));
const Learn = lazy(() => import("./pages/Learn"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Auth = lazy(() => import("./pages/Auth"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SolarSystem5kW = lazy(() => import("./pages/SolarSystem5kW"));
const SolarSystem3kW = lazy(() => import("./pages/SolarSystem3kW"));
const SolarSystem10kW = lazy(() => import("./pages/SolarSystem10kW"));
const SolarInverterPrice = lazy(() => import("./pages/SolarInverterPrice"));
const SolarBatteryPrice = lazy(() => import("./pages/SolarBatteryPrice"));
const SolarPricing = lazy(() => import("./pages/SolarPricing"));
const SolarCalculator = lazy(() => import("./pages/SolarCalculator"));
const MarketingPage = lazy(() => import("./pages/MarketingPage"));
const Projects = lazy(() => import("./pages/Projects"));
const BlogGuide = lazy(() => import("./pages/BlogGuide"));

const queryClient = new QueryClient();

type AppProps = {
  /** When set (build-time prerender), routing is static instead of history-based. */
  ssrLocation?: string;
  /** Build-time prerender: collects head tags emitted by Helmet. */
  helmetContext?: object;
};

/** Sends SPA page views; index.html loads gtag with send_page_view disabled. */
const PageViewTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
};

const App = ({ ssrLocation, helmetContext }: AppProps) => {
  const Router = ({ children }: { children: React.ReactNode }) =>
    ssrLocation !== undefined ? (
      <StaticRouter location={ssrLocation}>{children}</StaticRouter>
    ) : (
      <BrowserRouter>{children}</BrowserRouter>
    );

  return (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <PageViewTracker />
            <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ai-tools" element={<AITools />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/solar-panel-price-bangladesh" element={<BlogGuide />} />
                <Route path="/blog/5kw-solar-system-bangladesh" element={<BlogGuide />} />
                <Route path="/blog/net-metering-bangladesh-guide" element={<BlogGuide />} />
                <Route path="/blog/grid-tied-vs-hybrid-solar-bangladesh" element={<BlogGuide />} />
                <Route path="/blog/solar-panel-maintenance-bangladesh" element={<BlogGuide />} />
                <Route path="/blog/how-to-reduce-electricity-bill-bangladesh" element={<BlogGuide />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/solar-inverter-price-bangladesh" element={<SolarInverterPrice />} />
                <Route path="/solar-battery-price-bangladesh" element={<SolarBatteryPrice />} />
                <Route path="/solar-system-price-bangladesh" element={<SolarPricing />} />
                <Route path="/1kw-solar-system-price-bangladesh" element={<SolarPricing />} />
                <Route path="/3kw-solar-system-price-bangladesh" element={<SolarPricing />} />
                <Route path="/5kw-solar-system-price-bangladesh" element={<SolarPricing />} />
                <Route path="/10kw-solar-system-price-bangladesh" element={<SolarPricing />} />
                <Route path="/solar-calculator-bangladesh" element={<SolarCalculator />} />
                <Route path="/solar-projects-bangladesh" element={<Projects />} />
                <Route path="/net-metering-bangladesh" element={<MarketingPage />} />
                <Route path="/residential-solar-bangladesh" element={<MarketingPage />} />
                <Route path="/commercial-solar-bangladesh" element={<MarketingPage />} />
                <Route path="/factory-solar-bangladesh" element={<MarketingPage />} />
                <Route path="/office-solar-bangladesh" element={<MarketingPage />} />
                <Route path="/school-solar-bangladesh" element={<MarketingPage />} />
                <Route path="/hospital-solar-bangladesh" element={<MarketingPage />} />
                <Route path="/solar-company-dhaka" element={<MarketingPage />} />
                <Route path="/solar-company-chittagong" element={<MarketingPage />} />
                <Route path="/solar-company-sylhet" element={<MarketingPage />} />
                <Route path="/solar-company-rajshahi" element={<MarketingPage />} />
                <Route path="/solar-company-mymensingh" element={<MarketingPage />} />
                <Route path="/about" element={<MarketingPage />} />
                <Route path="/contact" element={<MarketingPage />} />
                <Route path="/solar-system-prices/3kw" element={<Navigate to="/3kw-solar-system-price-bangladesh" replace />} />
                <Route path="/solar-system-prices/5kw" element={<Navigate to="/5kw-solar-system-price-bangladesh" replace />} />
                <Route path="/solar-system-prices/10kw" element={<Navigate to="/10kw-solar-system-price-bangladesh" replace />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/my-dashboard" element={<UserDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
