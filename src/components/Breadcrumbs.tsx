import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ current, parent }: { current: string; parent?: { label: string; path: string } }) {
  return <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
    <Link to="/" aria-label="Home" className="transition-colors hover:text-primary"><Home className="h-4 w-4" /></Link>
    {parent && <><ChevronRight className="h-4 w-4" /><Link to={parent.path} className="hover:text-primary">{parent.label}</Link></>}
    <ChevronRight className="h-4 w-4" /><span className="text-foreground">{current}</span>
  </nav>;
}
