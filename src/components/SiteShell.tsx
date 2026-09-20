import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function SiteShell({ children }: { children: ReactNode }) { return <div className="min-h-screen bg-background pb-16 text-foreground md:pb-0"><Header /><main>{children}</main><Footer /><MobileCTA /></div>; }
