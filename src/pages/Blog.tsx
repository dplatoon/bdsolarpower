import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogPostCard } from "@/components/BlogPostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogPostsData } from "@/data/blogPosts";

const Blog = () => {
  const filterByCategory = (category: string) => {
    if (category === 'all') return blogPostsData;
    return blogPostsData.filter(post => 
      post.category.toLowerCase().includes(category.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      <SEO 
        title="Solar Panel Price Bangladesh 2025 | Equipment Reviews & Guides"
        description="Updated solar panel price in Bangladesh 2025. See 1kW–10kW system price ranges, equipment recommendations, and real monthly bill savings for homes and businesses."
        keywords="solar panel price Bangladesh 2025, monocrystalline solar panel Bangladesh, solar inverter Bangladesh, battery storage Bangladesh, MPPT charge controller, solar mounting system, solar equipment reviews"
        type="website"
        canonicalUrl="https://bdsolarpower.com/blog"
        articleHeadline="Solar Panel Price Bangladesh 2025 – Equipment Reviews & Guides"
        publishedTime="2025-01-01T00:00:00Z"
        modifiedTime="2026-03-08T00:00:00Z"
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
              {blogPostsData.map(post => (
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
      <Footer />
    </div>
  );
};

export default Blog;