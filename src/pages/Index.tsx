import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, TrendingUp, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SolarDataDashboard from "@/components/SolarDataDashboard";
import AIToolsPreview from "@/components/AIToolsPreview";
import InvestorMetrics from "@/components/InvestorMetrics";
import Testimonials, { generateReviewSchema } from "@/components/Testimonials";
import FAQSection, { generateFAQSchema } from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "5kW Solar System Bangladesh",
  "description": "Complete 5kW rooftop solar system with net metering. 3-4 year ROI. Government approved.",
  "brand": { "@type": "Brand", "name": "BD Solar Power" },
  "offers": {
    "@type": "Offer",
    "price": "275000",
    "priceCurrency": "BDT",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": { "@type": "Organization", "name": "BD Solar Power" }
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Solar Panel Installation",
  "provider": {
    "@type": "Organization",
    "name": "BD Solar Power",
    "url": "https://bdsolarpower.com"
  },
  "areaServed": { "@type": "Country", "name": "Bangladesh" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Solar Installation Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "5kW Residential Solar System" },
        "price": "275000",
        "priceCurrency": "BDT"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "10kW Commercial Solar System" },
        "price": "550000",
        "priceCurrency": "BDT"
      }
    ]
  }
};

const Index = () => {
  const faqSchema = generateFAQSchema();
  const reviewSchema = generateReviewSchema();

  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <SEO 
        title="Solar Panels Bangladesh from BDT 275,000" 
        description="Solar panel installation across Bangladesh. 5kW systems from BDT 275,000, net metering and 3-4 year ROI. Get your free quote today." 
        keywords="solar panel Bangladesh, solar panel price Bangladesh 2026, rooftop solar installation Bangladesh, net metering Bangladesh, 5kW solar system Bangladesh, solar panel Dhaka, solar panel Chittagong, commercial solar Bangladesh, 3000 MW solar program Bangladesh"
        canonicalUrl="https://bdsolarpower.com/"
        faqSchema={faqSchema}
        reviewSchema={reviewSchema}
        extraSchemas={[productSchema, serviceSchema]}
      />

      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Best Solar Panel Company in Bangladesh
              <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent"> Save 70% on Bills</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Transform your home or business with premium solar panel systems in Bangladesh. Get 5kW rooftop solar installation from BDT 275,000 with 3-4 year payback period. Government net metering approved • 25-year warranty • Free site survey.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
              <Link to="/ai-tools" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                  Calculate Your Savings
                </Button>
              </Link>
              <Link to="/learn" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Net Metering Guide
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">36% Cost Reduction</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">1% Import Duty</Badge>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Solar Capacity</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700">1,183 MW</div>
                <p className="text-xs text-muted-foreground">
                  4.5% of national grid
                </p>
                <Progress value={4.5} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tenders</CardTitle>
                <Calendar className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700">55 Sites</div>
                <p className="text-xs text-muted-foreground">
                  BPDB renewable projects
                </p>
                <Badge variant="secondary" className="mt-2">2,605 MW Target</Badge>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CO₂ Offset</CardTitle>
                <ArrowUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">18,344</div>
                <p className="text-xs text-muted-foreground">
                  tons/year from 20 MW plants
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Grid Access</CardTitle>
                <MapPin className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">97%</div>
                <p className="text-xs text-muted-foreground">
                  Population electrification
                </p>
                <Progress value={97} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Comprehensive Solar Intelligence Platform
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Advanced analytics, AI-powered insights, and real-time data for Bangladesh's renewable energy sector
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Live Dashboard</TabsTrigger>
              <TabsTrigger value="ai-tools">AI Analysis</TabsTrigger>
              <TabsTrigger value="investors">Investor Portal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-8">
              <SolarDataDashboard />
            </TabsContent>
            
            <TabsContent value="ai-tools" className="mt-8">
              <AIToolsPreview />
            </TabsContent>
            
            <TabsContent value="investors" className="mt-8">
              <InvestorMetrics />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose BD Solar Power?</h2>
            <p className="mt-4 text-lg text-gray-600">Bangladesh's Most Trusted Solar Installer</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-700">✅ Bangladesh's Trusted Solar Installer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">500+ successful installations across Dhaka, Chittagong & nationwide</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-700">✅ Lowest Prices Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">5kW system from BDT 275,000 (competitors charge BDT 350,000+)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-700">✅ Fastest Installation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Complete rooftop solar setup in just 2 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-700">✅ Maximum Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Reduce electricity bills by 70%, earn from excess power via net metering</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-700">✅ Government Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">IDCOL certified, eligible for 3,000 MW rooftop solar program</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-700">✅ Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tier-1 solar panels (Trina, JA Solar, REC) with 25-year warranty</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solar Solutions Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-amber-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Solar Solutions</h2>
            <p className="mt-4 text-lg text-gray-600">Customized systems for every need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-2xl">Residential Solar Systems</CardTitle>
                <CardDescription>Perfect solutions for homes and apartments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-bold text-lg">Small Homes (1-3kW)</h3>
                  <p className="text-gray-600">Perfect for apartments, BDT 85,000-255,000</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-bold text-lg">Medium Homes (5kW)</h3>
                  <p className="text-gray-600">Most popular, BDT 275,000, saves BDT 4,500/month</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-bold text-lg">Large Homes (10kW+)</h3>
                  <p className="text-gray-600">For villas & commercial, BDT 500,000+, ROI in 3 years</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl">Commercial Solar Solutions</CardTitle>
                <CardDescription>Reduce business operating costs significantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="font-bold text-lg">Offices & Shops</h3>
                  <p className="text-gray-600">Reduce operating costs by 60%</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="font-bold text-lg">Factories & Industries</h3>
                  <p className="text-gray-600">Mega solar installations 100kW-1MW</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="font-bold text-lg">Hospitals & Schools</h3>
                  <p className="text-gray-600">Reliable backup power + grid savings</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-emerald-600 to-amber-500 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Install Solar Panels in Bangladesh?</h2>
          <p className="mt-4 text-xl text-emerald-100">
            Get free quote for your 5kW rooftop solar system. Join 500+ satisfied customers. 3-4 year ROI with net metering. Beat load shedding forever!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-tools">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Calculate Your Savings
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white hover:bg-white text-slate-900">
                Learn About Government Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;