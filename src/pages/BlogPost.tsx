import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { blogPostsData } from "@/data/blogPosts";

const equipmentFrames = {
  'solar-panel': { border: 'border-l-8 border-blue-500', badge: 'bg-blue-600', icon: '☀️' },
  'inverter': { border: 'border-l-8 border-purple-500', badge: 'bg-purple-600', icon: '⚡' },
  'battery': { border: 'border-l-8 border-emerald-500', badge: 'bg-emerald-600', icon: '🔋' },
  'charge-controller': { border: 'border-l-8 border-amber-500', badge: 'bg-amber-600', icon: '🎛️' },
  'mounting': { border: 'border-l-8 border-slate-500', badge: 'bg-slate-600', icon: '🏗️' },
  'cable': { border: 'border-l-8 border-rose-500', badge: 'bg-rose-600', icon: '🔌' }
};

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPostsData.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const frame = equipmentFrames[post.equipment];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category}, solar equipment Bangladesh, ${post.equipment} Bangladesh`}
        type="article"
        publishedTime={new Date(post.date).toISOString()}
        modifiedTime="2026-03-08T00:00:00Z"
        author={post.author}
        canonicalUrl={`https://bdsolarpower.com/blog/${post.id}`}
        articleHeadline={post.title}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        <article className={`bg-white rounded-xl shadow-lg overflow-hidden ${frame.border}`}>
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className={`${frame.badge} text-white`}>
                {frame.icon} {post.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Bangladesh's renewable energy sector is experiencing unprecedented growth, with solar technology at the forefront of this transformation. Understanding the right equipment for your specific needs is crucial for maximizing efficiency and return on investment.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Features and Benefits</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                When selecting solar equipment for Bangladesh's unique climate conditions, several factors must be considered:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>High efficiency ratings suitable for tropical climates</li>
                <li>Durability against monsoon and cyclone conditions</li>
                <li>Compliance with Bangladesh's net metering regulations</li>
                <li>Cost-effectiveness and long-term ROI</li>
                <li>Warranty and local service availability</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Technical Specifications</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Modern solar equipment designed for Bangladesh's market must meet stringent quality standards while remaining cost-effective. This balance ensures both immediate performance and long-term reliability.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Investing in quality solar equipment is essential for the success of your renewable energy project in Bangladesh. By understanding the specific requirements of your installation and choosing equipment that meets both international standards and local climate demands, you can ensure optimal performance and maximum return on your investment.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-8">
                <p className="text-gray-800 font-semibold mb-2">Need Expert Guidance?</p>
                <p className="text-gray-700">
                  Contact our team of solar energy experts to discuss your specific project requirements and get personalized equipment recommendations for your solar installation in Bangladesh.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
