import { SEO } from "@/components/SEO";
import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ship, Factory, ShieldCheck, PackageSearch, ArrowRight, Globe, CheckCircle2, Info } from "lucide-react";
import QuoteDialog from "@/components/QuoteDialog";

export default function DirectSourcing() {
  return (
    <SiteShell>
      <SEO 
        title="Direct Solar Sourcing & Import Services Bangladesh" 
        description="Professional solar equipment sourcing from China. We handle factory audits, quality control, and import logistics for panels, inverters, and batteries."
        canonicalUrl="https://bdsolarpower.com/direct-sourcing"
      />
      
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <header className="mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
            <Globe className="h-3 w-3" />
            Global Sourcing Network
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Direct Solar Sourcing <span className="text-primary">& Import Services</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl">
            Skip the middlemen. We connect Bangladesh businesses and homeowners directly with top-tier Chinese manufacturers. 
            From factory audits to customs clearance, we manage the entire supply chain to ensure you get genuine, high-efficiency equipment at factory-direct prices.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <QuoteDialog label="Request Sourcing Quote" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" />
            <Button variant="outline" size="lg" className="gap-2">
              <Info className="h-4 w-4" />
              How it Works
            </Button>
          </div>
        </header>

        <div className="mb-16 rounded-3xl bg-emerald-950 p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider text-amber-400">Upcoming Factory Visit</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Direct Sourcing Trip to China: Coming Soon</h2>
            <p className="text-emerald-50 leading-relaxed max-w-2xl mb-6">
              Our team is visiting leading solar manufacturing hubs in China to audit new production lines and secure 2027 stock. 
              If you have specific equipment requirements, submit your request now. We will perform a physical quality check and price negotiation at the factory on your behalf.
            </p>
            <Button asChild size="sm" className="bg-amber-400 text-amber-950 hover:bg-amber-300 font-bold">
              <a href="#request-form">Add to Sourcing List →</a>
            </Button>
          </div>
          <Ship className="absolute -right-10 -bottom-10 h-64 w-64 text-white/5 rotate-12" />
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Source Through BD Solar Power?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                icon: Factory, 
                title: "Factory Audits", 
                text: "We don't trust brochures. We visit factories, check production certifications, and verify real-world output." 
              },
              { 
                icon: ShieldCheck, 
                title: "Quality Control", 
                text: "Random sampling and pre-shipment inspections ensure you don't receive 'B-grade' panels or faulty inverters." 
              },
              { 
                icon: PackageSearch, 
                title: "Logistics Mastery", 
                text: "From sea freight and customs clearance to local delivery, we handle the bureaucracy of importing into Bangladesh." 
              },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-md bg-muted/30">
                <CardHeader>
                  <div className="mb-3 rounded-lg bg-primary/10 w-fit p-2">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Source</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Mono-PERC & TopCon Panels", desc: "High-efficiency modules from Tier 1 manufacturers." },
              { label: "Hybrid & Grid-Tied Inverters", desc: "Smart inverters with remote monitoring and high stability." },
              { label: "LiFePO4 Battery Storage", desc: "Long-cycle lithium batteries for industrial and home backup." },
              { label: "Mounting & Structures", desc: "Galvanized and aluminum mounting systems for all roof types." },
            ].map((cat, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border bg-background">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm">{cat.label}</h4>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 bg-muted/50 rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold mb-12 text-center">The Sourcing Process</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Requirement", text: "You share your equipment specs and quantity needs." },
              { step: "02", title: "Sourcing", text: "We identify and negotiate with top-tier Chinese factories." },
              { step: "03", title: "Audit", text: "Physical site visits and quality checks at the factory." },
              { step: "04", title: "Delivery", text: "Managed import, customs clearance, and local delivery." },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-primary/10 absolute -top-6 -left-2">{step.step}</div>
                <h3 className="text-lg font-bold mb-2 relative z-10">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-primary text-primary-foreground rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Start Your Direct Sourcing Request</h2>
          <p className="mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Whether you are a commercial developer or a residential owner, get the best equipment without the middleman markup.
          </p>
          <QuoteDialog label="Submit Sourcing Request" size="lg" className="mx-auto w-full sm:w-auto bg-amber-400 text-amber-950 hover:bg-amber-300" />
        </section>
      </div>
    </SiteShell>
  );
}
