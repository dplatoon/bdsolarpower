import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const productSchema = {
  "@type": "Product",
  "name": "Solar Battery Storage (Lithium-ion) Bangladesh",
  "description":
    "Lithium-ion solar battery storage supplied and installed in Bangladesh. Backup through load-shedding, charged by your rooftop system and managed by a hybrid inverter.",
  "brand": { "@type": "Brand", "name": "BD Solar Power" },
  "image": "https://bdsolarpower.com/og/battery.jpg",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "BDT",
    "lowPrice": "80000",
    "highPrice": "200000",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31",
    "url": "https://bdsolarpower.com/solar-battery-price-bangladesh",
    "seller": { "@id": "https://bdsolarpower.com/#organization" },
  },
};

const td = "border border-gray-200 px-4 py-3 text-sm text-gray-700";
const th = "border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900";
const h2 = "text-2xl font-bold text-gray-900 mt-10 mb-4";
const p = "text-gray-700 mb-4 leading-relaxed";
const ul = "list-disc pl-6 mb-6 text-gray-700 space-y-2";
const linkCls = "text-emerald-700 underline hover:text-emerald-800";

const faqs = [
  {
    q: "How much does solar battery storage cost in Bangladesh?",
    a: "Adding lithium-ion battery storage increases a system's cost by roughly BDT 80,000–200,000 depending on capacity — enough for a few hours of essential backup at the lower end, and longer whole-home backup at the upper end.",
  },
  {
    q: "Do I need a battery to use net metering?",
    a: "No. On-grid net metering works without any battery — surplus power is exported and credited to your bill. A battery is for backup during outages, which is a different benefit. Many homes start without one and add storage later.",
  },
  {
    q: "Lithium-ion or lead-acid (tubular) batteries?",
    a: "Lithium-ion (LiFePO4) costs more upfront but lasts several times longer, needs no watering, and handles daily cycling far better. Older lead-acid solar home systems in Bangladesh failed mainly through battery degradation. In 2026, lithium is standard for quality installations.",
  },
  {
    q: "How long do lithium solar batteries last?",
    a: "Quality lithium batteries are typically rated for thousands of charge cycles — around 10 years of daily use — and often longer when sized correctly. How hard they work (depth of discharge) and how hot they run are the two biggest factors.",
  },
  {
    q: "Is a battery better than a generator for backup?",
    a: "For backup power in homes and small businesses, a battery-powered hybrid system typically outperforms a generator on running cost and maintenance. Generators still make sense for very large backup loads or sites without roof space — see the full comparison.",
  },
];

const SolarBatteryPrice = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
    <SEO
      title="Solar Battery Price in Bangladesh (2026)"
      description="Solar battery prices in Bangladesh: adding lithium-ion storage adds BDT 80,000–200,000 depending on capacity. Types, sizing, lifespan and backup value."
      canonicalUrl="https://bdsolarpower.com/solar-battery-price-bangladesh"
      ogImage="/og/battery.jpg"
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solar Battery Price", path: "/solar-battery-price-bangladesh" },
      ]}
      extraSchemas={[productSchema]}
    />

    <Header />

    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <p className="text-sm text-muted-foreground mb-3">
        Updated September 2026 · By the BD Solar Power team
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Solar Battery Price in Bangladesh (2026)
      </h1>

      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        A solar battery stores your panels' output for the evening and keeps essential loads
        running through load-shedding. In 2026, adding lithium-ion storage to a rooftop system
        increases its cost by roughly <strong>BDT 80,000–200,000</strong>, depending on the
        capacity you need.
      </p>
      <p className={p}>
        This guide covers what drives battery pricing, how to size storage around your backup
        needs, what lifetime to expect — and when you should skip the battery entirely and let{" "}
        <Link to="/blog/5" className={linkCls}>net metering</Link> do the work instead.
      </p>

      <h2 className={h2}>How much does battery storage add to a solar system?</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className={th}>Configuration</th>
              <th className={th}>Typical added cost</th>
              <th className={th}>What it gives you</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={td}><strong>Small backup (essentials)</strong></td>
              <td className={td}>From around BDT 80,000</td>
              <td className={td}>Lights, fans, router, fridge — through short outages</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={td}><strong>Whole-home backup</strong></td>
              <td className={td}>Up to around BDT 200,000</td>
              <td className={td}>Longer evening coverage, larger loads, more autonomy</td>
            </tr>
            <tr className="bg-white">
              <td className={td}>No battery (on-grid only)</td>
              <td className={td}>BDT 0 — fastest payback</td>
              <td className={td}>Maximum savings; surplus exported under net metering</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={p}>
        Figures are planning estimates based on current market pricing for lithium-ion storage —
        your exact figure depends on capacity, brand and how much load you want backed up.
        Battery pricing is easiest to lock down during a{" "}
        <a href="/#contact" className={linkCls}>free site survey</a>.
      </p>

      <h2 className={h2}>What drives the price</h2>
      <ul className={ul}>
        <li><strong>Capacity (kWh)</strong> — the main lever; better to size around real backup needs than to "fill the roof"</li>
        <li><strong>Chemistry</strong> — lithium-ion (LiFePO4) costs more upfront than lead-acid but lasts far longer and needs no maintenance</li>
        <li><strong>Brand tier</strong> — warranty length and rated cycles separate the price points</li>
        <li><strong>Inverter compatibility</strong> — batteries need a hybrid inverter; if your system is grid-tied, factor in the inverter{" "}
          <Link to="/solar-inverter-price-bangladesh" className={linkCls}>upgrade cost</Link>
        </li>
        <li><strong>Installation</strong> — mounting, ventilation, cabling and commissioning</li>
      </ul>

      <h2 className={h2}>How long do solar batteries last?</h2>
      <p className={p}>
        Quality lithium batteries are typically rated for thousands of charge cycles — about a
        decade of daily use — and often outlast that when correctly sized. The caution comes
        from history: in Bangladesh's older solar home systems, battery degradation was the
        single biggest failure point, accounting for roughly{" "}
        <strong>77% of reported problems</strong> in a widely cited survey. The lesson isn't
        "avoid batteries" — it's{" "}
        <Link to="/blog/why-solar-systems-fail-bangladesh-how-to-avoid" className={linkCls}>
          buy quality, size correctly, and keep support access
        </Link>
        .
      </p>

      <h2 className={h2}>Do you actually need a battery?</h2>
      <p className={p}>
        If your goal is purely financial, an on-grid system without a battery has the fastest
        payback — you still export surplus under net metering, and you still get the{" "}
        <Link to="/blog/16" className={linkCls}>Tk 10.50/unit incentive</Link>. A battery makes
        sense when you value backup: load-shedding protection for your home, clinic or office.
        For larger backup requirements, compare hybrid storage against a generator in our{" "}
        <Link to="/blog/15" className={linkCls}>solar vs generator cost comparison</Link>.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-700 leading-relaxed m-0">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get a battery quote sized to your backup needs</h2>
        <p className="text-gray-700 mb-6">
          Tell us what you want to keep running during an outage — we'll size the storage, check
          inverter compatibility and send an itemised quote. No obligation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto">
            {/* Full navigation so the browser scrolls to the contact section. */}
            <a href="/#contact">Get a free survey</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <a href="https://wa.me/8801711927755" target="_blank" rel="noopener noreferrer">
              WhatsApp Quote
            </a>
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        Prices are 2026 estimates and depend on capacity, brand and site conditions; confirm the
        final figure in a written quote. See system-level pricing on the{" "}
        <Link to="/solar-system-prices/5kw" className={linkCls}>5kW system page</Link>.
      </p>
    </main>

    <Footer />
  </div>
);

export default SolarBatteryPrice;
