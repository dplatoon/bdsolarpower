import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, BatteryMedium, Zap, ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";

const faqs = [
  {
    q: "How much does solar battery storage cost in Bangladesh?",
    a: "Adding lithium-ion storage typically increases a system's cost by BDT 80,000–200,000 depending on capacity. This covers the battery units, installation, and hybrid inverter compatibility.",
  },
  {
    q: "Do I need a battery to use net metering?",
    a: "No. On-grid net metering works without batteries. A battery is specifically for backup during outages. Many users start with net metering and add storage later.",
  },
  {
    q: "Lithium-ion or lead-acid batteries?",
    a: "Lithium-ion (LiFePO4) is now the standard. It costs more upfront but lasts 3-5x longer, requires zero maintenance, and handles daily cycling far better than lead-acid.",
  },
  {
    q: "How long do solar batteries last?",
    a: "Quality lithium batteries are rated for thousands of cycles—roughly 10 years of daily use. Depth of discharge and temperature are the primary factors affecting lifespan.",
  },
  {
    q: "Is a battery better than a generator?",
    a: "For residential backup, batteries are cleaner, silent, and have lower running costs. Generators are only preferred for extremely large industrial loads or remote sites without roof space.",
  },
];

export default function SolarBatteryPrice() {
  return (
    <SiteShell>
      <SEO 
        title="Solar Battery Price in Bangladesh (2026)" 
        description="Solar battery prices in Bangladesh: adding lithium-ion storage adds BDT 80,000–200,000 depending on capacity. Types, sizing, and backup value."
        canonicalUrl="https://bdsolarpower.com/solar-battery-price-bangladesh"
        ogImage="/og/battery.jpg"
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <header className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Solar Battery Price in Bangladesh (2026)
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl">
            A solar battery stores your panels' output for the evening and keeps essential loads running during load-shedding. 
            In 2026, lithium-ion storage is the professional standard for reliability and lifespan.
          </p>
        </header>

        {/* GEO Direct Answer */}
        <section className="mb-16 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            How much does solar battery storage cost in Bangladesh?
          </h2>
          <p className="text-lg font-medium text-primary leading-relaxed italic">
            Adding lithium-ion battery storage to a rooftop system typically increases the total cost by <strong className="text-foreground">BDT 80,000–200,000</strong>, depending on the capacity. This provides a range from basic essential backup to full-home autonomy.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Storage Options & Costs</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "Small Backup", price: "From BDT 80k", note: "Lights, fans, router, fridge — short outages." },
              { label: "Whole-Home", price: "Up to BDT 200k", note: "Longer coverage, larger loads, higher autonomy." },
              { label: "On-Grid Only", price: "BDT 0", note: "Fastest payback; surplus exported via net metering." },
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
                "Capacity (kWh): The primary cost driver",
                "Chemistry: LiFePO4 (Lithium) vs Lead-Acid",
                "Brand: Warranty length and cycle ratings",
                "Inverter Compatibility: Requires a hybrid inverter",
                "Installation: Ventilation and safety cabling"
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
              <ShieldCheck className="h-6 w-6 text-primary" />
              Lifespan & Reliability
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Quality lithium batteries last roughly <strong className="text-foreground">10 years</strong> of daily use. 
              Historically, battery degradation caused 77% of failures in older BD solar systems.
            </p>
            <p className="text-sm italic text-muted-foreground">
              Tip: Always check the "Depth of Discharge" (DoD) rating; higher DoD means more usable energy per charge.
            </p>
          </div>
        </section>

        <section className="mb-16 bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a battery sized for your backup?</h2>
          <p className="text-emerald-50/80 mb-8 max-w-2xl mx-auto">
            Tell us what essential loads you want to keep running. We'll calculate the exact kWh needed and provide a fixed quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-amber-400 text-amber-950 hover:bg-amber-300">
              <a href="/#contact">Get a Free Survey</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white hover:text-emerald-950">
              <a href="https://wa.me/8801711927755" target="_blank" rel="noopener noreferrer">WhatsApp Quote</a>
            </Button>
          </div>
        </section>

        <div className="mt-16">
          <FAQList items={faqs.map(f => [f.q, f.a])} title="Battery FAQs" />
        </div>
      </div>
    </SiteShell>
  );
}
