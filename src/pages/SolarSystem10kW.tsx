import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const productSchema = {
  "@type": "Product",
  "name": "10kW Solar System Bangladesh",
  "description":
    "Complete 10kW rooftop solar system, fully installed in Bangladesh for large homes, offices and commercial roofs. Includes net metering support and a 25-year panel warranty.",
  "brand": { "@type": "Brand", "name": "BD Solar Power" },
  "image": "https://bdsolarpower.com/og/10kw.jpg",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "BDT",
    "lowPrice": "500000",
    "highPrice": "650000",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31",
    "url": "https://bdsolarpower.com/solar-system-prices/10kw",
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
    q: "How much does a 10kW solar system cost in Bangladesh in 2026?",
    a: "Most installed systems cost between BDT 500,000 and 650,000. Hybrid configurations with battery storage and premium components run higher — up to around BDT 850,000 for fully loaded commercial-grade builds. A survey gives you an exact figure.",
  },
  {
    q: "How many units does a 10kW system generate per month?",
    a: "Roughly 900–1,200 units per month averaged across the year — enough to cover most large homes, small offices and commercial rooftops.",
  },
  {
    q: "Is a 10kW system suitable for a business?",
    a: "Yes. 10kW suits small offices, shops, schools and light commercial roofs. Larger facilities typically look at 20kW and above, which we price per watt — talk to us for a commercial survey.",
  },
  {
    q: "How much roof space does a 10kW system need?",
    a: "About 600–700 square feet of shade-free area. Three-phase connection is common at this size but not always required; the survey confirms.",
  },
  {
    q: "What savings and payback should I expect?",
    a: "Typically BDT 8,000–14,000 per month in offset electricity, with payback in 3–4 years — faster if you export surplus under net metering and the Tk 10.50/unit incentive.",
  },
];

const SolarSystem10kW = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
    <SEO
      title="10kW Solar System Price in Bangladesh (2026)"
      description="10kW solar system price in Bangladesh: 2026 costs from BDT 500,000 installed, savings, payback and net metering for large homes and offices."
      canonicalUrl="https://bdsolarpower.com/solar-system-prices/10kw"
      ogImage="/og/10kw.jpg"
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "10kW Solar System Price", path: "/solar-system-prices/10kw" },
      ]}
      extraSchemas={[productSchema]}
    />

    <Header />

    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <p className="text-sm text-muted-foreground mb-3">
        Updated September 2026 · By the BD Solar Power team
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        10kW Solar System Price in Bangladesh (2026)
      </h1>

      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        A 10kW solar system is built for large homes, small offices and commercial rooftops —
        it wipes out most of a big electricity bill and produces serious export income under net
        metering. In 2026, a complete installed 10kW system costs{" "}
        <strong>BDT 500,000–650,000</strong>, with a <strong>3–4 year payback</strong>.
      </p>
      <p className={p}>
        This guide covers pricing, realistic savings, roof and connection requirements, and how
        10kW compares with the smaller{" "}
        <Link to="/solar-system-prices/5kw" className={linkCls}>5kW system</Link> and{" "}
        <Link to="/solar-system-prices/3kw" className={linkCls}>3kW system</Link>.
      </p>

      <h2 className={h2}>How much does a 10kW solar system cost in Bangladesh in 2026?</h2>
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
              <td className={td}><strong>BDT 500,000–650,000</strong></td>
              <td className={td}>Large homes, offices and commercial roofs with daytime load</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={td}>Hybrid (battery-ready)</td>
              <td className={td}>On-grid price plus battery cost</td>
              <td className={td}>Businesses that need backup through outages</td>
            </tr>
            <tr className="bg-white">
              <td className={td}>Off-grid (with battery bank)</td>
              <td className={td}>Higher than hybrid; sized around your nightly load</td>
              <td className={td}>Industrial sites and remote facilities</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={p}>
        Fully installed pricing — not kit-only. Premium components (Tier-1 panels, commercial
        inverters) and battery storage raise the figure: fully loaded hybrid builds can reach
        around BDT 850,000. Larger commercial systems are priced per watt. A survey gives you an
        exact, itemised quote.
      </p>

      <h3 className={h3}>What's included in the price</h3>
      <ul className={ul}>
        <li>20–22 solar panels with mounting structure (≈ 10,000 watts total)</li>
        <li>Three-phase capable inverter with monitoring</li>
        <li>DC/AC cabling, breakers, surge protection and earthing</li>
        <li>Installation, wiring and commissioning by our own team</li>
        <li>Net metering application support with BPDB</li>
        <li>25-year panel performance warranty</li>
      </ul>

      <h2 className={h2}>How much can a 10kW system save per month?</h2>
      <p className={p}>
        A well-installed 10kW system generates roughly <strong>900–1,200 units (kWh) per
        month</strong> across the year. On offset electricity alone that's typically{" "}
        <strong>BDT 8,000–14,000 per month</strong> — estimate, depends on your usage and
        tariff — with payback in <strong>3–4 years</strong>.
      </p>
      <p className={p}>
        At this size, surplus export matters: under net metering your extra units are credited,
        and the <strong>Tk 10.50/unit incentive</strong> pays for surplus rooftop power for
        three years — <Link to="/blog/16" className={linkCls}>see the incentive details</Link>.
        Model your own numbers with the{" "}
        <Link to="/ai-tools" className={linkCls}>solar savings calculator</Link>, and compare
        against the full <Link to="/blog/solar-system-cost-bangladesh-2026" className={linkCls}>
          2026 cost breakdown</Link>.
      </p>

      <h2 className={h2}>Is 10kW the right size for your property?</h2>
      <p className={p}>10kW fits when the load — and the roof — are genuinely larger:</p>
      <ul className={ul}>
        <li><strong>Roof space:</strong> around 600–700 sq ft of shadow-free area</li>
        <li><strong>Daytime load:</strong> multiple ACs, cold storage, office equipment, pumps</li>
        <li><strong>Connection:</strong> three-phase commonly used; the survey confirms what your supply supports</li>
        <li><strong>Export appetite:</strong> net metering pays for surplus — bigger systems benefit most</li>
        <li><strong>Commercial use:</strong> factories and larger facilities should look at 20kW+; we price those per watt — <a href="/#contact" className={linkCls}>ask for a commercial survey</a></li>
      </ul>

      <h2 className={h2}>Financing and net metering</h2>
      <p className={p}>
        Bank solar loans and EMI plans start around <strong>8–9% interest</strong>, and for
        commercial installations we can structure repayment around your savings. See{" "}
        <Link to="/blog/10" className={linkCls}>solar financing options</Link>.
      </p>
      <p className={p}>
        BPDB net metering covers systems up to 100kW, so 10kW qualifies with plenty of headroom.
        We handle the application, bi-directional meter coordination and paperwork — full
        process in the <Link to="/blog/5" className={linkCls}>net metering policy guide</Link>.
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get an exact 10kW quote for your property</h2>
        <p className="text-gray-700 mb-6">
          Tell us your location, connection type and average monthly bill — we'll survey, size
          the system and send an itemised quote with expected savings and payback. No
          obligation.
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

export default SolarSystem10kW;
