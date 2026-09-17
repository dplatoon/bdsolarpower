import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/solar-system-prices/5kw" element={<SolarSystem5kW />} />
                <Route path="/solar-system-prices/3kw" element={<SolarSystem3kW />} />
                <Route path="/solar-system-prices/10kw" element={<SolarSystem10kW />} />
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
