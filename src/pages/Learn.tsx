import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, FileText, TrendingUp, ArrowUp, BarChart3, Calculator, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Learn = () => {
  const timelineEvents = [
    { year: "2000", event: "20% electrification rate", description: "Rural areas largely without power access" },
    { year: "2009", event: "Renewable Energy Policy", description: "First comprehensive RE framework established" },
    { year: "2012", event: "Solar Home Systems", description: "1.6M+ systems installed in off-grid areas" },
    { year: "2018", event: "Net Metering Guidelines", description: "Grid-connected solar regulations introduced" },
    { year: "2021", event: "Mujib Climate Prosperity Plan", description: "Vision 2041 with 40% clean energy target" },
    { year: "2024", event: "97% grid access", description: "Near-universal electrification achieved" }
  ];

  const policyGuides = [
    {
      title: "Net Metering Implementation Guide",
      description: "Step-by-step process for grid-connected solar installations",
      category: "Regulation",
      lastUpdated: "Jan 2024"
    },
    {
      title: "ADB LEAP 2 Funding Application",
      description: "How to access $515M in renewable energy financing",
      category: "Financing",
      lastUpdated: "Dec 2023"
    },
    {
      title: "BSTI Solar Standards Compliance",
      description: "Technical requirements for PV modules and inverters",
      category: "Technical",
      lastUpdated: "Feb 2024"
    },
    {
      title: "Environmental Impact Assessment",
      description: "EIA requirements for large-scale solar projects",
      category: "Environment",
      lastUpdated: "Nov 2023"
    }
  ];

  const educationalVideos = [
    { title: "Solar Farm Construction in Bangladesh", duration: "12:34", views: "45K" },
    { title: "Understanding Grid Integration", duration: "8:45", views: "23K" },
    { title: "Monsoon-Proof Solar Design", duration: "15:22", views: "67K" },
    { title: "ROI Calculation for Solar Projects", duration: "9:18", views: "34K" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      <SEO 
        title="Net Metering Bangladesh | Solar Policy & 3000 MW Program Guide"
        description="Complete guide to Bangladesh solar policy, net metering, 3000 MW rooftop program. Government incentives, 1% import duty savings. ROI calculators & implementation guides."
        keywords="net metering Bangladesh policy, 3000 MW solar program Bangladesh, solar policy Bangladesh, solar energy education, renewable energy Bangladesh, SREDA guidelines, BPDB solar regulations"
        canonicalUrl="https://bdsolarpower.com/learn"
      />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Solar Energy Education Hub</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive resources on Bangladesh's renewable energy journey, policies, and implementation guides
          </p>
        </div>

        <div className="space-y-8">
          {/* Bangladesh Solar Timeline */}
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                Bangladesh's Solar Energy Journey
              </CardTitle>
              <CardDescription>
                From 20% electrification in 2000 to 97% grid access and ambitious 2041 renewable targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="bg-amber-100 text-amber-800 font-bold text-sm py-1 px-2 rounded-full">
                        {event.year}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-gray-900">{event.event}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                    {index < timelineEvents.length - 1 && (
                      <div className="absolute left-8 mt-8 w-0.5 h-8 bg-amber-200"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-amber-100 to-emerald-100 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">2041 Clean Energy Vision</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress toward 40% renewable target</span>
                    <span className="font-medium">11.25%</span>
                  </div>
                  <Progress value={11.25} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Current renewable capacity: 4.5% of grid • Target: 40% by 2041
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Policy Guides */}
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  Policy & Implementation Guides
                </CardTitle>
                <CardDescription>
                  Essential documentation for navigating Bangladesh's renewable energy regulatory framework
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {policyGuides.map((guide, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{guide.title}</h4>
                      <Badge variant="secondary">{guide.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Updated: {guide.lastUpdated}</span>
                      <Button size="sm" variant="outline">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Educational Videos */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Educational Video Library
                </CardTitle>
                <CardDescription>
                  Visual guides on solar technology, installation, and best practices for Bangladesh's climate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {educationalVideos.map((video, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-600">▶</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900">{video.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span>{video.duration}</span>
                          <span>•</span>
                          <span>{video.views} views</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Watch
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Q&A Chatbot Section */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUp className="h-5 w-5 text-purple-600" />
                AI Solar Assistant
              </CardTitle>
              <CardDescription>
                Get instant answers to technical questions about solar energy implementation in Bangladesh
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  Ask anything about solar energy in Bangladesh
                </h3>
                <p className="text-purple-700 mb-4">
                  "How does net metering work?" • "What are the monsoon considerations?" • "Which permits do I need?"
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Start Conversation
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-1">Technical Questions</h5>
                  <p className="text-sm text-muted-foreground">Panel specifications, inverter compatibility, grid integration</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-1">Policy Clarification</h5>
                  <p className="text-sm text-muted-foreground">Permits, approvals, regulatory compliance</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-1">Financial Planning</h5>
                  <p className="text-sm text-muted-foreground">ROI calculations, financing options, incentives</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cross-links Section */}
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Take Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/dashboard">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200 hover:border-emerald-400">
                  <CardContent className="p-4 flex items-center gap-3">
                    <BarChart3 className="h-8 w-8 text-emerald-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Market Dashboard</h3>
                      <p className="text-sm text-muted-foreground">View real-time solar data</p>
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
                      <h3 className="font-medium text-gray-900">Calculate Savings</h3>
                      <p className="text-sm text-muted-foreground">ROI & carbon offset tools</p>
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
                      <h3 className="font-medium text-gray-900">Investment Portal</h3>
                      <p className="text-sm text-muted-foreground">Explore tender opportunities</p>
                    </div>
                    <ArrowRight className="h-5 w-5 ml-auto text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Learn;
