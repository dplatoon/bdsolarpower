import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, LogOut, Menu, MessageCircle, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { business } from "@/data/siteContent";
import QuoteDialog from "./QuoteDialog";

const primary = [{ href: "/", label: "Home" }, { href: "/solar-system-price-bangladesh", label: "Prices" }, { href: "/net-metering-bangladesh", label: "Net Metering" }, { href: "/residential-solar-bangladesh", label: "Residential" }, { href: "/commercial-solar-bangladesh", label: "Commercial" }, { href: "/solar-calculator-bangladesh", label: "Calculator" }, { href: "/solar-projects-bangladesh", label: "Projects" }, { href: "/blog", label: "Blog" }];
const more = [{ href: "/solar-company-dhaka", label: "Locations" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

export default function Header() {
  const [open, setOpen] = useState(false); const { user, signOut } = useAuth(); const navigate = useNavigate();
  const logout = async () => { await signOut(); navigate("/"); };
  return <>
    <div className="bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm">Free Site Survey <span className="mx-2 opacity-60">|</span> 5kW Solar From BDT 275,000 <span className="mx-2 opacity-60">|</span> <Link to="/net-metering-bangladesh" className="underline underline-offset-2">Net-Metering Support</Link></div>
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur"><div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6">
      <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="BD Solar Power home"><span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground"><Sun className="h-5 w-5" /></span><span className="font-bold">BD Solar Power</span></Link>
      <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 xl:flex" aria-label="Main navigation">{primary.map((item) => <Link key={item.href} to={item.href} className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{item.label}</Link>)}
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="sm">More<ChevronDown className="ml-1 h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent>{more.map((item) => <DropdownMenuItem key={item.href} asChild><Link to={item.href}>{item.label}</Link></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
      </nav>
      <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex"><Button asChild variant="outline" size="icon" title="Chat on WhatsApp"><a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle className="h-4 w-4" /></a></Button><QuoteDialog />{user && <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><Avatar className="h-8 w-8"><AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback></Avatar></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem asChild><Link to="/my-dashboard">My dashboard</Link></DropdownMenuItem><DropdownMenuItem onClick={logout}><LogOut className="mr-2 h-4 w-4" />Log out</DropdownMenuItem></DropdownMenuContent></DropdownMenu>}</div>
      <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger><SheetContent className="overflow-y-auto"><nav className="mt-8 flex flex-col" aria-label="Mobile navigation">{[...primary, ...more].map((item) => <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className="border-b py-3 font-medium">{item.label}</Link>)}<a href={`https://wa.me/${business.whatsapp}`} className="py-3 font-medium text-primary">Chat on WhatsApp</a>{user && <button onClick={logout} className="py-3 text-left font-medium">Log out</button>}</nav></SheetContent></Sheet>
    </div></header>
  </>;
}
