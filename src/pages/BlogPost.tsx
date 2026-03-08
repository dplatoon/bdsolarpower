import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { blogPostsData } from "@/data/blogPosts";
import { blogPostContent } from "@/data/blogPostContent";
import { blogHeroImages } from "@/data/blogHeroImages";

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
  const content = blogPostContent[post.id];

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

              {content?.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{section.heading}</h2>
                  
                  {section.paragraphs.map((para, pIndex) => (
                    <p key={pIndex} className="text-gray-700 mb-4 leading-relaxed">{para}</p>
                  ))}

                  {section.table && (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full border-collapse border border-gray-200 rounded-lg">
                        <thead>
                          <tr className="bg-gray-50">
                            {section.table.headers.map((header, hIndex) => (
                              <th key={hIndex} className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rIndex) => (
                            <tr key={rIndex} className={rIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              {row.map((cell, cIndex) => (
                                <td key={cIndex} className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.list && (
                    <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                      {section.list.map((item, lIndex) => (
                        <li key={lIndex}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-6 mb-6">
                      <p className="text-gray-800 font-semibold mb-2">{section.callout.title}</p>
                      <p className="text-gray-700">{section.callout.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
