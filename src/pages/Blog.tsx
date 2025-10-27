import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import { BlogPostCard, BlogPost } from "@/components/BlogPostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "High-Efficiency Monocrystalline Solar Panels: The Future of Bangladesh's Solar Energy",
      excerpt: "Discover why monocrystalline solar panels are revolutionizing Bangladesh's renewable energy sector with 20-22% efficiency rates.",
      author: "Dr. Rahman Ahmed",
      date: "March 15, 2024",
      category: "Solar Panels",
      readTime: "5 min read",
      equipment: "solar-panel"
    },
    {
      id: "2",
      title: "Choosing the Right Solar Inverter for Bangladesh's Grid System",
      excerpt: "A comprehensive guide to selecting inverters that work seamlessly with Bangladesh's power grid and net metering regulations.",
      author: "Eng. Fatima Khan",
      date: "March 12, 2024",
      category: "Inverters",
      readTime: "7 min read",
      equipment: "inverter"
    },
    {
      id: "3",
      title: "Lithium-Ion vs Lead-Acid: Best Battery Storage Solutions for Solar Projects",
      excerpt: "Compare battery technologies for optimal energy storage in Bangladesh's tropical climate conditions.",
      author: "Tech Team BD Solar",
      date: "March 10, 2024",
      category: "Energy Storage",
      readTime: "6 min read",
      equipment: "battery"
    },
    {
      id: "4",
      title: "MPPT Charge Controllers: Maximizing Solar Efficiency in Monsoon Season",
      excerpt: "Learn how Maximum Power Point Tracking technology ensures optimal performance even during cloudy weather.",
      author: "Solar Expert Team",
      date: "March 8, 2024",
      category: "Controllers",
      readTime: "4 min read",
      equipment: "charge-controller"
    },
    {
      id: "5",
      title: "Cyclone-Resistant Mounting Systems: Essential for Bangladesh's Climate",
      excerpt: "Engineering solutions for solar mounting that withstand 180+ km/h winds and heavy monsoon conditions.",
      author: "Structural Eng. Team",
      date: "March 5, 2024",
      category: "Mounting Systems",
      readTime: "8 min read",
      equipment: "mounting"
    },
    {
      id: "6",
      title: "UV-Resistant Solar Cables: Preventing Power Loss in Tropical Conditions",
      excerpt: "Why choosing the right solar cables is critical for long-term system performance and safety in Bangladesh.",
      author: "Installation Experts",
      date: "March 3, 2024",
      category: "Components",
      readTime: "5 min read",
      equipment: "cable"
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
            Solar Equipment & Industry Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional guides and expert reviews on solar equipment, technology, and best practices for Bangladesh's renewable energy sector
          </p>
        </header>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="panels">Panels</TabsTrigger>
            <TabsTrigger value="inverters">Inverters</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="controllers">Controllers</TabsTrigger>
            <TabsTrigger value="mounting">Mounting</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>

          {['panels', 'inverters', 'storage', 'controllers', 'mounting', 'components'].map(category => (
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