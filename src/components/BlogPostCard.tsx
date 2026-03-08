import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { blogHeroImages } from "@/data/blogHeroImages";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
  equipment: 'solar-panel' | 'inverter' | 'battery' | 'charge-controller' | 'mounting' | 'cable';
}

interface BlogPostCardProps {
  post: BlogPost;
}

const equipmentFrames = {
  'solar-panel': {
    border: 'border-4 border-blue-500',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    pattern: 'bg-gradient-to-br',
    corners: 'rounded-xl',
    shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    badge: 'bg-blue-600',
    icon: '☀️'
  },
  'inverter': {
    border: 'border-4 border-purple-500',
    gradient: 'from-purple-500/20 to-pink-500/20',
    pattern: 'bg-gradient-to-tr',
    corners: 'rounded-2xl',
    shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    badge: 'bg-purple-600',
    icon: '⚡'
  },
  'battery': {
    border: 'border-4 border-emerald-500',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    pattern: 'bg-gradient-to-bl',
    corners: 'rounded-3xl',
    shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]',
    badge: 'bg-emerald-600',
    icon: '🔋'
  },
  'charge-controller': {
    border: 'border-4 border-amber-500',
    gradient: 'from-amber-500/20 to-orange-500/20',
    pattern: 'bg-gradient-to-tl',
    corners: 'rounded-[2rem]',
    shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    badge: 'bg-amber-600',
    icon: '🎛️'
  },
  'mounting': {
    border: 'border-4 border-slate-500',
    gradient: 'from-slate-500/20 to-gray-500/20',
    pattern: 'bg-gradient-to-r',
    corners: 'rounded-lg',
    shadow: 'shadow-[0_0_20px_rgba(100,116,139,0.5)]',
    badge: 'bg-slate-600',
    icon: '🏗️'
  },
  'cable': {
    border: 'border-4 border-rose-500',
    gradient: 'from-rose-500/20 to-red-500/20',
    pattern: 'bg-gradient-to-br',
    corners: 'rounded-xl',
    shadow: 'shadow-[0_0_20px_rgba(244,63,94,0.5)]',
    badge: 'bg-rose-600',
    icon: '🔌'
  }
};

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const frame = equipmentFrames[post.equipment];
  const navigate = useNavigate();

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1",
        frame.border,
        frame.corners,
        frame.shadow
      )}
    >
      <div className={cn("h-2", frame.pattern, frame.gradient)} />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={cn(frame.badge, "text-white")}>
            {frame.icon} {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        
        <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        
        <CardDescription className="line-clamp-2">
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className={cn(
            "w-full font-semibold",
            `hover:${frame.badge}`,
            "hover:text-white transition-all"
          )}
          onClick={() => navigate(`/blog/${post.id}`)}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};