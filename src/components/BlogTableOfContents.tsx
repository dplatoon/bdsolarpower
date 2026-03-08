import { useState, useEffect } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogTableOfContentsProps {
  sections: { heading: string }[];
}

const BlogTableOfContents = ({ sections }: BlogTableOfContentsProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(true);

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
  };

  if (!sections || sections.length < 2) return null;

  return (
    <nav className="hidden xl:block sticky top-24 w-64 shrink-0 self-start">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3 hover:text-primary transition-colors"
      >
        <List className="h-4 w-4" />
        Table of Contents
      </button>
      {isOpen && (
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
      )}
    </nav>
  );
};

export default BlogTableOfContents;
