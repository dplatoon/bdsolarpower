import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import { BlogPostCard, BlogPost } from "@/components/BlogPostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "2025 Solar Panel Price Guide Bangladesh",
      excerpt: "Complete solar panel prices Bangladesh 2025. 1kW-10kW systems from BDT 85,000. New year savings positioning with government incentives and ROI analysis.",
      author: "BD Solar Expert Team",
      date: "January 2025",
      category: "Pricing",
      readTime: "8 min read",
      equipment: "solar-panel"
    },
    {
      id: "2",
      title: "Government 3000 MW Solar Program: How to Apply",
      excerpt: "Complete guide to Bangladesh government 3000 MW rooftop solar program. Application process, eligibility, benefits. Capitalize on government initiative.",
      author: "Policy Analyst",
      date: "January 2025",
      category: "Government",
      readTime: "6 min read",
      equipment: "solar-panel"
    },
    {
      id: "3",
      title: "5kW Solar System ROI Calculator Bangladesh",
      excerpt: "Calculate your solar investment returns. Interactive tool shows payback period, monthly savings, and 25-year earnings. Perfect for large homes.",
      author: "Financial Expert",
      date: "January 2025",
      category: "Financial",
      readTime: "5 min read",
      equipment: "solar-panel"
    },
    {
      id: "4",
      title: "Top 10 Solar Companies in Bangladesh 2025",
      excerpt: "Comprehensive comparison of leading solar installers in Bangladesh. Competitive analysis, pricing, service quality, and customer reviews.",
      author: "BD Solar Review Team",
      date: "January 2025",
      category: "Comparison",
      readTime: "10 min read",
      equipment: "solar-panel"
    },
    {
      id: "5",
      title: "Net Metering Policy Bangladesh: Complete Guide",
      excerpt: "Sell excess solar power to BPDB and earn monthly income. Complete guide to net metering policy, application process, and benefits.",
      author: "Grid Connection Expert",
      date: "February 2025",
      category: "Policy",
      readTime: "7 min read",
      equipment: "inverter"
    },
    {
      id: "6",
      title: "Commercial Solar Installation: Factory Case Study",
      excerpt: "How a Chittagong textile factory reduced electricity costs by 65% with 200kW solar installation. B2B case study with ROI breakdown.",
      author: "Commercial Solar Team",
      date: "February 2025",
      category: "Case Study",
      readTime: "9 min read",
      equipment: "solar-panel"
    },
    {
      id: "7",
      title: "Solar Panel Maintenance Tips for Bangladesh Climate",
      excerpt: "Professional maintenance guide for monsoon and tropical conditions. Increase efficiency by 15% with proper cleaning and care.",
      author: "Maintenance Specialists",
      date: "February 2025",
      category: "Maintenance",
      readTime: "6 min read",
      equipment: "solar-panel"
    },
    {
      id: "8",
      title: "Monocrystalline vs Polycrystalline Solar Panels",
      excerpt: "Technical comparison of solar panel technologies. Efficiency, cost, durability, and best choice for Bangladesh climate conditions.",
      author: "Technical Team",
      date: "February 2025",
      category: "Technical",
      readTime: "8 min read",
      equipment: "solar-panel"
    },
    {
      id: "9",
      title: "Best Time to Install Solar Panels in Bangladesh",
      excerpt: "Seasonal guide to solar installation. Why spring installations maximize first-year returns. Weather patterns and optimal timing.",
      author: "Installation Experts",
      date: "March 2025",
      category: "Seasonal",
      readTime: "5 min read",
      equipment: "solar-panel"
    },
    {
      id: "10",
      title: "Solar Panel Financing Options Bangladesh 2025",
      excerpt: "Complete guide to solar loans, EMI options, and financing. 8-9% interest rates, bank partnerships. Make solar affordable for everyone.",
      author: "Finance Team",
      date: "March 2025",
      category: "Financial",
      readTime: "7 min read",
      equipment: "solar-panel"
    },
    {
      id: "11",
      title: "Dhaka Solar Installation: Complete Area Guide",
      excerpt: "Solar installation services in Gulshan, Dhanmondi, Uttara, Mirpur. Area-specific coverage, local regulations, and pricing.",
      author: "Dhaka Team",
      date: "March 2025",
      category: "Location",
      readTime: "6 min read",
      equipment: "solar-panel"
    },
    {
      id: "12",
      title: "Industrial Solar Solutions: Reduce Factory Costs",
      excerpt: "Mega solar installations 100kW-1MW for manufacturing sector. Target heavy industries with high electricity consumption.",
      author: "Industrial Solar Team",
      date: "March 2025",
      category: "Commercial",
      readTime: "10 min read",
      equipment: "solar-panel"
    },
    {
      id: "13",
      title: "Solar Panel Efficiency in Bangladesh Hot Climate",
      excerpt: "How solar panels perform in summer heat. Temperature coefficients, efficiency ratings, and choosing heat-resistant panels.",
      author: "Technical Expert",
      date: "April 2025",
      category: "Technical",
      readTime: "7 min read",
      equipment: "solar-panel"
    },
    {
      id: "14",
      title: "Hospital Solar Installation: Uninterrupted Power",
      excerpt: "Healthcare sector solar solutions. Reliable backup power for critical equipment. Case study from Dhaka hospital.",
      author: "Healthcare Solar Team",
      date: "April 2025",
      category: "Case Study",
      readTime: "8 min read",
      equipment: "battery"
    },
    {
      id: "15",
      title: "Solar vs Generator: Cost Comparison Bangladesh",
      excerpt: "Solar wins with 70% lower lifetime costs. No fuel needed, silent operation, zero emissions. Complete cost breakdown.",
      author: "Comparison Analyst",
      date: "April 2025",
      category: "Comparison",
      readTime: "6 min read",
      equipment: "solar-panel"
    }
  ];

  const filterByCategory = (category: string) => {
    if (category === 'all') return blogPosts;
    return blogPosts.filter(post => 
      post.category.toLowerCase().includes(category.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      <SEO 
        title="Solar Panel Price Bangladesh 2025 | Equipment Reviews & Guides"
        description="Solar equipment blog Bangladesh. Panel reviews, inverter comparison, battery guides. Monocrystalline vs polycrystalline. MPPT controllers. Installation tips. Expert insights."
        keywords="solar panel price Bangladesh 2025, monocrystalline solar panel Bangladesh, solar inverter Bangladesh, battery storage Bangladesh, MPPT charge controller, solar mounting system, solar equipment reviews"
        type="website"
        canonicalUrl="https://bdsolarpower.com/blog"
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Solar Panel Price Bangladesh 2025 | Equipment Reviews & Expert Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete solar equipment reviews, panel comparison, inverter guides, battery solutions. Monocrystalline vs polycrystalline analysis. MPPT controllers. Installation tips from Bangladesh solar experts.
          </p>
        </header>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8 gap-2">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="government">Government</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="case">Case Studies</TabsTrigger>
            <TabsTrigger value="location">Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>

          {['pricing', 'government', 'financial', 'technical', 'case', 'location'].map(category => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterByCategory(category).map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Blog;