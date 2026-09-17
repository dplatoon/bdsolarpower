import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const productSchema = {
  "@type": "Product",
  "name": "3kW Solar System Bangladesh",
  "description":
    "Complete 3kW rooftop solar system, fully installed in Bangladesh. Ideal for small and medium homes, with net metering support and a 25-year panel warranty.",
  "brand": { "@type": "Brand", "name": "BD Solar Power" },
  "image": "https://bdsolarpower.com/og/3kw.jpg",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "BDT",
    "lowPrice": "210000",
    "highPrice": "255000",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31",
    "url": "https://bdsolarpower.com/solar-system-prices/3kw",
    "seller": { "@id": "https://bdsolarpower.com/#organization" },
  },
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
    q: "How much does a 3kW solar system cost in Bangladesh in 2026?",
    a: "Most installed systems cost between BDT 210,000 and 255,000. Hybrid configurations with battery storage run higher. A free survey gives you a fixed, itemised quote for your roof.",
  },
  {
    q: "How many units does a 3kW system generate per month?",
    a: "Roughly 270–360 units per month averaged across the year, with the highest output in the dry season and lower production during monsoon.",
  },
  {
    q: "Is a 3kW system enough for air conditioning?",
    a: "A 3kW system comfortably covers fridges, fans, lights and electronics in a medium home, and can run one energy-efficient AC mainly during daylight hours. For regular evening AC use, consider 5kW or a hybrid system.",
  },
  {
    q: "How much roof space does a 3kW system need?",
    a: "About 180–210 square feet of shade-free area. Tin, concrete and sloping roofs all work; the survey confirms the best layout.",
  },
  {
    q: "Does a 3kW system qualify for net metering?",
    a: "Yes. BPDB net metering covers systems up to 100kW, so 3kW qualifies. Surplus units are credited against your bill, and the Tk 10.50/unit incentive applies to surplus rooftop power.",
  },
];

const SolarSystem3kW = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
    <SEO
      title="3kW Solar System Price in Bangladesh (2026)"
      description="3kW solar system price in Bangladesh: 2026 costs from BDT 210,000 installed, monthly savings and payback for small and medium homes. Free survey."
      canonicalUrl="https://bdsolarpower.com/solar-system-prices/3kw"
      ogImage="/og/3kw.jpg"
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "3kW Solar System Price", path: "/solar-system-prices/3kw" },
      ]}
      extraSchemas={[productSchema]}
    />

    <Header />

    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <p className="text-sm text-muted-foreground mb-3">
        Updated September 2026 · By the BD Solar Power team
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        3kW Solar System Price in Bangladesh (2026)
      </h1>

      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        A 3kW solar system is the sweet spot for small and medium Bangladeshi homes — enough to
        cut a typical family's bill substantially without paying for capacity you won't use. In
        2026, a complete installed 3kW system costs{" "}
        <strong>BDT 210,000–255,000</strong>, paying back in <strong>4–5 years</strong>.
      </p>
      <p className={p}>
        This guide covers what you pay for, what changes the price, realistic monthly savings,
        and how to check whether 3kW — or the larger{" "}
        <Link to="/solar-system-prices/5kw" className={linkCls}>5kW system</Link> — fits your
        home best.
      </p>

      <h2 className={h2}>How much does a 3kW solar system cost in Bangladesh in 2026?</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className={th}>System type</th>
              <th className={th}>Typical installed price (2026)</th>
              <th className={th}>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={td}><strong>On-grid (net metering)</strong></td>
              <td className={td}><strong>BDT 210,000–255,000</strong></td>
              <td className={td}>Homes that want the fastest payback and can export surplus power to BPDB</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={td}>Hybrid (battery-ready)</td>
              <td className={td}>On-grid price plus battery cost</td>
              <td className={td}>Homes that want backup during load-shedding and outages</td>
            </tr>
            <tr className="bg-white">
              <td className={td}>Off-grid (with battery bank)</td>
              <td className={td}>Higher than hybrid; sized around your nightly load</td>
              <td className={td}>Remote sites with no reliable grid connection</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={p}>
        Prices cover fully installed systems — panels, inverter, mounting, wiring and net
        metering support — not kit-only. Premium component tiers and battery storage add cost; a
        free survey gives you an exact, itemised quote.
      </p>

      <h3 className={h3}>What's included in the price</h3>
      <ul className={ul}>
        <li>6–7 solar panels with mounting structure (≈ 3,000 watts total)</li>
        <li>Grid-tied or hybrid inverter with monitoring</li>
        <li>DC cabling, breakers and surge protection</li>
        <li>Installation, wiring and testing by our own team</li>
        <li>Net metering application support with BPDB</li>
        <li>25-year panel performance warranty</li>
      </ul>

      <h2 className={h2}>How much can a 3kW system save per month?</h2>
      <p className={p}>
        A well-installed 3kW system in Bangladesh generates roughly <strong>270–360 units
        (kWh) per month</strong> across the year. Replacing grid electricity at retail rates,
        most homes save — estimate, depends on your usage and tariff — roughly{" "}
        <strong>BDT 3,000–5,000 per month</strong>.
      </p>
      <p className={p}>
        Payback typically lands at <strong>4–5 years</strong>, and panels keep producing for
        25+ years — so after payback you're looking at two decades of near-free electricity.
        Want your own numbers? Run your last bill through our{" "}
        <Link to="/ai-tools" className={linkCls}>solar savings calculator</Link>.
      </p>
      <p className={p}>
        Surplus units are credited under net metering, and the new{" "}
        <strong>Tk 10.50/unit incentive</strong> pays you for surplus rooftop power for three
        years — <Link to="/blog/16" className={linkCls}>see the incentive details</Link>.
      </p>

      <h2 className={h2}>Is 3kW the right size for your home?</h2>
      <p className={p}>
        As a rule of thumb, 3kW fits homes with monthly bills around <strong>BDT 2,000–4,000</strong>{" "}
        (roughly 270–360 units). Check these before deciding:
      </p>
      <ul className={ul}>
        <li><strong>Roof space:</strong> around 180–210 sq ft of shadow-free area</li>
        <li><strong>Appliance mix:</strong> fridges, fans, lights, TV and daytime appliances — with one AC as a stretch</li>
        <li><strong>Growth plans:</strong> planning regular AC use or an EV later? Compare the{" "}
          <Link to="/solar-system-prices/5kw" className={linkCls}>5kW system</Link> or{" "}
          <Link to="/solar-system-prices/10kw" className={linkCls}>10kW system</Link> first —
          per-kW costs usually fall as you go up
        </li>
        <li><strong>Shading:</strong> trees, tanks and neighbouring buildings matter more than raw roof size</li>
      </ul>
      <p className={p}>
        We survey every roof free before quoting. See the full{" "}
        <Link to="/blog/solar-system-cost-bangladesh-2026" className={linkCls}>
          2026 cost breakdown by system size
        </Link>{" "}
        for how the numbers compare across sizes.
      </p>

      <h2 className={h2}>Financing and net metering</h2>
      <p className={p}>
        Bank solar loans and EMI plans currently start around <strong>8–9% interest</strong> —
        the instalment is often smaller than the bill the system replaces. See{" "}
        <Link to="/blog/10" className={linkCls}>solar financing options</Link>.
      </p>
      <p className={p}>
        Under BPDB rules, systems up to 100kW qualify for net metering, so 3kW comfortably
        does — we handle the application and meter coordination. Full process:{" "}
        <Link to="/blog/5" className={linkCls}>net metering policy guide</Link>.
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get an exact 3kW quote for your roof</h2>
        <p className="text-gray-700 mb-6">
          Tell us your location and average monthly bill — we'll survey, size the system and
          send an itemised quote with expected savings and payback. No obligation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto">
            {/* Full navigation so the browser scrolls to the contact section. */}
            <a href="/#contact">Get a free site survey</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <a href="https://wa.me/8801711927755" target="_blank" rel="noopener noreferrer">
              WhatsApp Quote
            </a>
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        Prices and savings are estimates for 2026, based on installed projects and current BPDB
        rules; actual figures depend on site conditions, usage and tariffs.
      </p>
    </main>

    <Footer />
  </div>
);

export default SolarSystem3kW;
