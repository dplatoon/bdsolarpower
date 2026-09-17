import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const serviceSchema = {
  "@type": "Service",
  "name": "Solar inverter supply, upgrade and replacement in Bangladesh",
  "provider": { "@id": "https://bdsolarpower.com/#organization" },
  "areaServed": { "@type": "Country", "name": "Bangladesh" },
  "description":
    "Supply, installation and replacement of grid-tied, hybrid and off-grid solar inverters across Bangladesh, sized to your system and connection.",
};

const td = "border border-gray-200 px-4 py-3 text-sm text-gray-700";
const th = "border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900";
const h2 = "text-2xl font-bold text-gray-900 mt-10 mb-4";
const h3 = "text-xl font-bold text-gray-900 mt-6 mb-3";
const p = "text-gray-700 mb-4 leading-relaxed";
const ul = "list-disc pl-6 mb-6 text-gray-700 space-y-2";
const linkCls = "text-emerald-700 underline hover:text-emerald-800";

const faqs = [
  {
    q: "How much does a solar inverter cost in Bangladesh?",
    a: "In a new system, the inverter is included in the package — 5kW hybrid systems start around BDT 275,000 fully installed. For replacements, like-for-like units typically run BDT 40,000–60,000 based on our replacement data around year 12–15. Exact pricing depends on capacity, type and brand tier.",
  },
  {
    q: "How long does a solar inverter last?",
    a: "A quality inverter typically works for 12–15 years. After that, a replacement is a normal running cost — we budget around BDT 40,000–60,000 for a like-for-like swap at today's prices.",
  },
  {
    q: "What's the difference between grid-tied, hybrid and off-grid inverters?",
    a: "Grid-tied inverters only work with the grid and offer the fastest payback. Hybrid inverters also charge and manage batteries, so they keep working during outages. Off-grid inverters run entirely on solar and battery, with no grid connection at all.",
  },
  {
    q: "How do I size an inverter for my system?",
    a: "The inverter should broadly match your array — a 5kW array means a 5–6kW inverter. Your installer confirms the exact figure based on panel layout, load profile and whether you plan to add battery storage later.",
  },
  {
    q: "String or micro-inverter — which is better?",
    a: "String inverters are the cheapest and most common option. Micro-inverters add 15–20% to the cost but give per-panel optimisation, which helps on shaded or complex roofs. Most Bangladeshi homes are fine with a quality string or hybrid inverter.",
  },
];

const SolarInverterPrice = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
    <SEO
      title="Solar Inverter Price in Bangladesh (2026)"
      description="Solar inverter price in Bangladesh: 2026 guide to inverter types, sizing, replacement costs from BDT 40,000, and what your system quote includes."
      canonicalUrl="https://bdsolarpower.com/solar-inverter-price-bangladesh"
      ogImage="/og/inverter.jpg"
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solar Inverter Price", path: "/solar-inverter-price-bangladesh" },
      ]}
      extraSchemas={[serviceSchema]}
    />

    <Header />

    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <p className="text-sm text-muted-foreground mb-3">
        Updated September 2026 · By the BD Solar Power team
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Solar Inverter Price in Bangladesh (2026)
      </h1>

      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        The inverter is the brain of a solar system — it converts panel output into usable
        electricity and, in hybrid systems, manages your battery. In a new installation it's
        included in the package price; as a replacement, a like-for-like unit typically costs{" "}
        <strong>BDT 40,000–60,000</strong> around year 12–15 of system life.
      </p>
      <p className={p}>
        This guide covers how inverter pricing works in Bangladesh, the cost differences between
        types, how to size one correctly, and what to check before you pay for an upgrade or
        replacement.
      </p>

      <h2 className={h2}>What does a solar inverter cost in Bangladesh?</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className={th}>Buying situation</th>
              <th className={th}>Typical cost</th>
              <th className={th}>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={td}><strong>New system (included)</strong></td>
              <td className={td}>Part of the package — e.g. 5kW hybrid systems from BDT 275,000</td>
              <td className={td}>Grid-tied, hybrid or off-grid inverter sized to your array</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={td}><strong>Like-for-like replacement</strong></td>
              <td className={td}><strong>BDT 40,000–60,000</strong></td>
              <td className={td}>Typical around year 12–15; budget this as a running cost</td>
            </tr>
            <tr className="bg-white">
              <td className={td}>Upgrade (e.g. adding battery support)</td>
              <td className={td}>Cost of new inverter minus resale/trade of the old one</td>
              <td className={td}>Usually done together with a battery addition</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={p}>
        These are estimates for planning — your exact price depends on capacity, type, brand
        tier and installation details. A site survey gives you a fixed quote.
      </p>

      <h2 className={h2}>What drives the price</h2>
      <ul className={ul}>
        <li><strong>Capacity</strong> — a 10kW inverter costs substantially more than a 3kW unit</li>
        <li><strong>Type</strong> — grid-tied units are the cheapest; hybrid inverters cost more but manage batteries; off-grid units sit at the top</li>
        <li><strong>Topology</strong> — string inverters are cheapest; micro-inverters add 15–20% but give per-panel optimisation</li>
        <li><strong>Brand tier</strong> — premium brands with longer warranties and better monitoring cost more upfront and last longer</li>
        <li><strong>Features</strong> — dual MPPT inputs, remote monitoring, higher surge ratings and grid-support functions</li>
        <li><strong>Phase and protections</strong> — three-phase units and full DC/AC protection add cost</li>
      </ul>

      <h2 className={h2}>Grid-tied, hybrid or off-grid?</h2>
      <p className={p}>
        <strong>Grid-tied</strong> is the cheapest path and delivers the fastest payback —
        ideal if you simply want to cut your bill and export surplus under net metering.{" "}
        <strong>Hybrid</strong> adds battery management: it costs more but keeps essential loads
        running through load-shedding. Read more about adding storage on the{" "}
        <Link to="/solar-battery-price-bangladesh" className={linkCls}>
          solar battery price guide
        </Link>.
      </p>
      <p className={p}>
        <strong>Off-grid</strong> suits sites with no reliable grid connection and is sized
        around nightly load, not roof size. Compare typical packages on the{" "}
        <Link to="/solar-system-prices/5kw" className={linkCls}>5kW</Link> and{" "}
        <Link to="/solar-system-prices/10kw" className={linkCls}>10kW</Link> system pages.
      </p>

      <h2 className={h2}>Sizing and lifespan: what to budget</h2>
      <p className={p}>
        Match the inverter to your array — a 5kW array means a 5–6kW inverter. Slight oversizing
        is normal (it handles heat and future additions better); grossly oversized units cost
        more and run inefficiently. Plan for one replacement in the system's lifetime: a
        like-for-like swap around <strong>year 12–15</strong> for roughly{" "}
        <strong>BDT 40,000–60,000</strong> at today's prices.
      </p>
      <p className={p}>
        When it's time, choose an installer who stocks spares and services what they sell — the{" "}
        <Link to="/blog/why-solar-systems-fail-bangladesh-how-to-avoid" className={linkCls}>
          failure patterns we see in older systems
        </Link>{" "}
        are mostly quality and after-sales problems, not technology problems.
      </p>

      <h2 className={h2}>What to check before you pay</h2>
      <ul className={ul}>
        <li>Written warranty terms (years, and what's covered — board, fan, firmware)</li>
        <li>Monitoring included and working after commissioning</li>
        <li>Correct grid-protection settings for BPDB requirements</li>
        <li>Compatibility with your existing panels and any planned battery</li>
        <li>Earthing and surge protection inspected at the same visit</li>
      </ul>

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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Need an inverter or a replacement?</h2>
        <p className="text-gray-700 mb-6">
          Tell us your system size and what's happening — we'll quote a supply-and-install or
          like-for-like replacement, with warranty terms in writing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto">
            {/* Full navigation so the browser scrolls to the contact section. */}
            <a href="/#contact">Get a free quote</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <a href="https://wa.me/8801711927755" target="_blank" rel="noopener noreferrer">
              WhatsApp Quote
            </a>
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        Prices and estimates are for 2026 and depend on capacity, brand tier and site details;
        confirm the final figure in a written quote. Also see the{" "}
        <Link to="/blog/solar-system-cost-bangladesh-2026" className={linkCls}>
          full system cost breakdown
        </Link>
        .
      </p>
    </main>

    <Footer />
  </div>
);

export default SolarInverterPrice;
