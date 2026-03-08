import { useState, useEffect } from "react";
import { List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface BlogTableOfContentsProps {
  sections: { heading: string }[];
}

const BlogTableOfContents = ({ sections }: BlogTableOfContentsProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("article h2");
      let current = 0;
      headings.forEach((h, i) => {
        if (h.getBoundingClientRect().top <= 120) current = i;
      });
      setActiveIndex(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (index: number) => {
    const headings = document.querySelectorAll("article h2");
    headings[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (isMobile) setIsOpen(false);
  };

  if (!sections || sections.length < 2) return null;

  // Mobile: floating button + drawer
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:opacity-90 transition-opacity"
          aria-label="Table of Contents"
        >
          <List className="h-5 w-5" />
        </button>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <nav className="relative bg-background rounded-t-2xl w-full max-h-[70vh] overflow-y-auto p-6 pb-8 shadow-xl animate-in slide-in-from-bottom">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  <List className="h-4 w-4" /> Table of Contents
                </span>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ol className="space-y-1 border-l-2 border-border pl-0">
                {sections.map((section, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollTo(i)}
                      className={cn(
                        "block w-full text-left text-sm py-2 pl-4 pr-2 border-l-2 -ml-[2px] transition-colors hover:text-primary",
                        activeIndex === i
                          ? "border-primary text-primary font-medium"
                          : "border-transparent text-muted-foreground"
                      )}
                    >
                      {section.heading}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}
      </>
    );
  }

  // Desktop: sticky sidebar (auto-open)
  return (
    <nav className="hidden xl:block sticky top-24 w-64 shrink-0 self-start">
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
        <List className="h-4 w-4" />
        Table of Contents
      </span>
      <ol className="space-y-1 border-l-2 border-border pl-0">
        {sections.map((section, i) => (
          <li key={i}>
            <button
              onClick={() => scrollTo(i)}
              className={cn(
                "block w-full text-left text-sm py-1.5 pl-4 pr-2 border-l-2 -ml-[2px] transition-colors hover:text-primary",
                activeIndex === i
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground"
              )}
            >
              {section.heading}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BlogTableOfContents;
