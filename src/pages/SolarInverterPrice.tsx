import FAQList from "@/components/FAQList";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Zap, ShieldCheck, RefreshCw, HelpCircle, CheckCircle2 } from "lucide-react";

const faqs = [
  {
    q: "How much does a solar inverter cost in Bangladesh?",
    a: "In a new system, the inverter is included in the package. For standalone replacements, like-for-like units typically cost BDT 40,000–60,000 depending on capacity and brand tier.",
  },
  {
    q: "How long does a solar inverter last?",
    a: "A quality inverter typically lasts 12–15 years. Budgeting for a replacement around year 12 is a standard part of solar system maintenance.",
  },
  {
    q: "What's the difference between grid-tied, hybrid and off-grid inverters?",
    a: "Grid-tied inverters are the most affordable and ideal for bill reduction. Hybrid inverters manage both grid and batteries for backup. Off-grid inverters are for sites with no grid access.",
  },
  {
    q: "How do I size an inverter for my system?",
    a: "The inverter should broadly match your panel array (e.g., a 5kW array needs a 5–6kW inverter). A professional survey confirms the exact size based on load and future expansion plans.",
  },
  {
    q: "String or micro-inverter — which is better?",
    a: "String inverters are cost-effective and common. Micro-inverters are more expensive but offer per-panel optimization, which is better for roofs with shading issues.",
  },
];

export default function SolarInverterPrice() {
  return (
    <SiteShell>
      <SEO
        title="Solar Inverter Price in Bangladesh (2026)"
        description="Solar inverter price in Bangladesh: 2026 guide to inverter types, sizing, replacement costs from BDT 40,000, and what your system quote includes."
        canonicalUrl="https://bdsolarpower.com/solar-inverter-price-bangladesh"
        ogImage="/og/inverter.jpg"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Solar Inverter Price", path: "/solar-inverter-price-bangladesh" },
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <header className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Solar Inverter Price in Bangladesh (2026)
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl">
            The inverter is the brain of your solar system. It converts panel output into usable electricity and manages battery storage. 
            In a new installation, it is part of the package; as a replacement, it is a critical maintenance item.
          </p>
        </header>

        {/* GEO Direct Answer */}
        <section className="mb-16 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            How much does a solar inverter cost in Bangladesh?
          </h2>
          <p className="text-lg font-medium text-primary leading-relaxed italic">
            For standalone replacements, a like-for-like inverter typically costs <strong className="text-foreground">BDT 40,000–60,000</strong> based on 2026 market data. In new installations, the inverter is included in the overall system package (e.g., 5kW hybrid systems from BDT 275,000).
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Inverter Pricing & Options</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "New System", price: "Included", note: "Integrated into the full installation package." },
              { label: "Replacement", price: "BDT 40k–60k", note: "Typical cost for a like-for-like swap at year 12." },
              { label: "Upgrade", price: "Variable", note: "Cost of new unit minus trade-in of old equipment." },
            ].map((item, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">{item.price}</p>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border p-6 bg-background shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              What drives the price?
            </h2>
            <ul className="space-y-3">
              {[
                "Capacity: Higher kW ratings cost more",
                "Type: Grid-tied (Cheapest) < Hybrid < Off-grid",
                "Topology: String inverters < Micro-inverters",
                "Brand: Premium brands with longer warranties cost more",
                "Phase: Three-phase units add complexity and cost"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border p-6 bg-background shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              Sizing & Lifespan
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Match your inverter to your array (e.g., 5kW array = 5–6kW inverter). 
              Plan for one replacement every <strong className="text-foreground">12–15 years</strong>.
            </p>
            <p className="text-sm italic text-muted-foreground">
              Tip: Choose an installer who stocks spares to avoid long downtimes during replacement.
            </p>
          </div>
        </section>

        <section className="mb-16 bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a replacement or upgrade?</h2>
          <p className="text-emerald-50/80 mb-8 max-w-2xl mx-auto">
            Tell us your current system size and issue. We provide fixed quotes for supply-and-install with full warranty terms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-amber-400 text-amber-950 hover:bg-amber-300">
              <a href="/#contact">Get a Free Quote</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white hover:text-emerald-950">
              <a href="https://wa.me/8801711927755" target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
            </Button>
          </div>
        </section>

        <div className="mt-16">
          <FAQList items={faqs.map(f => [f.q, f.a])} title="Inverter FAQs" />
        </div>
      </div>
    </SiteShell>
  );
}
