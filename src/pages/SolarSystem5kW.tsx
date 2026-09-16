import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const productSchema = {
  "@type": "Product",
  "name": "5kW Solar System Bangladesh",
  "description":
    "Complete 5kW rooftop solar system, fully installed in Bangladesh. Includes panels, inverter, mounting, installation and net metering support, with a 25-year panel warranty.",
  "brand": { "@type": "Brand", "name": "BD Solar Power" },
  "image": "https://bdsolarpower.com/og/5kw.jpg",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "BDT",
    "lowPrice": "275000",
    "highPrice": "350000",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31",
    "url": "https://bdsolarpower.com/solar-system-prices/5kw",
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
    q: "How much does a 5kW solar system cost in Bangladesh in 2026?",
    a: "Most installed on-grid systems cost between BDT 275,000 and 350,000. Hybrid systems with battery backup cost more. The exact figure depends on components and your roof — a free survey gives you a fixed, itemised quote.",
  },
  {
    q: "How many units does a 5kW system generate per month?",
    a: "Roughly 450–600 units per month averaged across the year, with the highest output in the dry season (November–April) and lower production during monsoon.",
  },
  {
    q: "Is 5kW enough to run an air conditioner?",
    a: "Yes — a 5kW system covers typical household loads including one or two 1.5-ton inverter ACs running mainly during daylight hours. If you run multiple ACs through the evening, consider hybrid with battery or a larger system.",
  },
  {
    q: "What's the payback period for a 5kW system?",
    a: "Most homes reach payback in 3–4 years, based on current prices, tariffs and net metering credits. After that, production is effectively free electricity for the life of the system.",
  },
  {
    q: "Should I choose on-grid or hybrid?",
    a: "Choose on-grid if you want the fastest payback and stable grid supply. Choose hybrid if outages are a concern or you want backup for evening loads — it costs more upfront but adds resilience.",
  },
  {
    q: "How much roof space does a 5kW system need?",
    a: "About 300–350 square feet of shade-free area. Tin, concrete and sloping roofs all work; the survey confirms usable space and the best panel layout.",
  },
  {
    q: "Does a 5kW system qualify for net metering?",
    a: "Yes. BPDB net metering covers systems up to 100kW. Your total 5kW output can be consumed on-site, with surplus credited against your bill.",
  },
];

const SolarSystem5kW = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
    <SEO
      title="5kW Solar System Price in Bangladesh (2026)"
      description="5kW solar system price in Bangladesh: 2026 costs from BDT 275,000 installed, what's included, monthly savings and payback. Get a free quote."
      canonicalUrl="https://bdsolarpower.com/solar-system-prices/5kw"
      ogImage="/og/5kw.jpg"
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "5kW Solar System Price", path: "/solar-system-prices/5kw" },
      ]}
      extraSchemas={[productSchema]}
    />

    <Header />

    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <p className="text-sm text-muted-foreground mb-3">
        Updated September 2026 · By the BD Solar Power team
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        5kW Solar System Price in Bangladesh (2026)
      </h1>

      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        A 5kW rooftop solar system is the most popular size for Bangladeshi homes — big enough to
        cut most of a typical family's electricity bill, small enough to fit a standard roof. In
        2026, a complete on-grid 5kW system from BD Solar Power costs{" "}
        <strong>BDT 275,000–350,000 installed</strong>, with most homes recovering the investment
        in <strong>3–4 years</strong>.
      </p>
      <p className={p}>
        This guide covers exactly what you pay for, what changes the price, how much you can save
        each month, and how to check if 5kW is the right size for your home.
      </p>

      <h2 className={h2}>How much does a 5kW solar system cost in Bangladesh in 2026?</h2>
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
              <td className={td}><strong>BDT 275,000–350,000</strong></td>
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
        Prices are for fully installed systems — not kit-only. The final figure depends on your
        roof, components and how quickly you want to pay it back. A free site survey gives you an
        exact, itemised quote.
      </p>

      <h3 className={h3}>What's included in the price</h3>
      <ul className={ul}>
        <li>10–11 solar panels with mounting structure (≈ 5,000 watts total)</li>
        <li>Grid-tied or hybrid inverter with monitoring</li>
        <li>DC cabling, breakers and surge protection</li>
        <li>Installation, wiring and testing by our own team</li>
        <li>Net metering application support with BPDB</li>
        <li>25-year panel performance warranty</li>
      </ul>

      <h3 className={h3}>What changes the price</h3>
      <ul className={ul}>
        <li><strong>Component tier</strong> — economy panels and inverter versus premium brands</li>
        <li><strong>Panel technology</strong> — monocrystalline panels cost a little more and perform better in heat</li>
        <li><strong>Battery storage</strong> — the single biggest price factor if you want backup</li>
        <li><strong>Roof type and height</strong> — tin, concrete and multi-storey roofs need different mounting</li>
        <li><strong>Cable runs and meter position</strong> — longer runs to your meter add cost</li>
        <li><strong>Net metering work</strong> — bi-directional meter changes required by BPDB</li>
      </ul>

      <h2 className={h2}>How much can a 5kW system save per month?</h2>
      <p className={p}>
        A well-installed 5kW system in Bangladesh generates roughly <strong>450–600 units
        (kWh) per month</strong> on average across the year. If most of that replaces grid
        electricity you would otherwise buy at retail rates, most homes save — estimate, depends
        on your usage and tariff — roughly <strong>BDT 5,000–8,000 per month</strong>.
      </p>
      <p className={p}>Three things decide your actual number:</p>
      <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
        <li>How much you consume when the sun is shining — daytime-heavy homes save the most.</li>
        <li>Your tariff — higher slabs make every solar unit more valuable.</li>
        <li>
          Surplus exports — under net metering, extra units are credited, and the new
          Tk 10.50/unit incentive pays you for surplus power for three years.{" "}
          <Link to="/blog/16" className={linkCls}>See the Tk 10.50 incentive details</Link>.
        </li>
      </ol>

      <h3 className={h3}>Payback period and long-term returns</h3>
      <p className={p}>
        At current prices, most 5kW systems pay for themselves in <strong>3–4 years</strong>.
        Panels keep producing for 25+ years, so you are looking at two decades of near-free
        electricity after payback — before counting electricity tariff rises, which make solar
        savings grow over time.
      </p>
      <p className={p}>
        Want your own numbers? Use our{" "}
        <Link to="/ai-tools" className={linkCls}>solar savings calculator</Link> with your last
        electricity bill.
      </p>

      <h2 className={h2}>Is 5kW the right size for your home?</h2>
      <p className={p}>
        As a rule of thumb, 5kW fits homes using roughly <strong>500–700 units (kWh) per
        month</strong>. Check these before deciding:
      </p>
      <ul className={ul}>
        <li><strong>Roof space:</strong> around 300–350 sq ft (28–33 sq m) of shadow-free space</li>
        <li><strong>Daytime usage:</strong> air conditioners, water pumps, fridges and appliances that run during the day</li>
        <li><strong>Connection:</strong> single- or three-phase — both can support 5kW; your survey confirms</li>
        <li><strong>Shading:</strong> trees, water tanks and taller buildings matter more than roof size</li>
        <li>
          <strong>Future plans:</strong> want an EV or a new AC later? Consider going bigger now —{" "}
          <Link to="/blog/solar-system-cost-bangladesh-2026" className={linkCls}>
            see the full 2026 cost breakdown
          </Link>.
        </li>
      </ul>
      <p className={p}>
        We survey every roof for free before quoting, so you'll know your exact usable capacity
        before you commit.
      </p>

      <h2 className={h2}>What you get at each budget tier</h2>
      <p className={p}>
        <strong>Economy</strong> — proven panels and a reliable grid-tied inverter. Fastest
        payback, lowest upfront cost. Best if budget is the priority and your roof gets good sun.
      </p>
      <p className={p}>
        <strong>Standard (most popular)</strong> — higher-efficiency monocrystalline panels and a
        premium inverter with monitoring. Better performance in high heat, stronger warranties,
        still a 3–4 year payback.
      </p>
      <p className={p}>
        <strong>Premium</strong> — top-tier panels and inverter, optimised string design, extended
        warranties and monitoring. Best for large homes, commercial roofs and maximum production
        per square foot.
      </p>
      <p className={p}>
        Every tier is installed by our own team with the same workmanship and the same net
        metering support — the difference is component quality and production.
      </p>

      <h2 className={h2}>Financing a 5kW system</h2>
      <p className={p}>
        You don't have to pay the full amount upfront. Bank solar loans and EMI plans in
        Bangladesh currently start around <strong>8–9% interest</strong>, and the monthly
        instalment often costs less than the electricity bill the system replaces. Read the full
        rundown of{" "}
        <Link to="/blog/10" className={linkCls}>solar financing and EMI options</Link>, or ask us
        during the survey — we'll connect you with the lenders we work with daily.
      </p>

      <h2 className={h2}>Net metering: get paid for surplus power</h2>
      <p className={p}>
        Net metering lets your system export surplus electricity to the grid instead of wasting
        it. Under BPDB rules, systems <strong>up to 100kW</strong> can apply — 5kW comfortably
        qualifies. You keep consuming solar first; anything extra is exported and credited to
        your bill, with the additional <strong>Tk 10.50/unit incentive</strong> for surplus
        rooftop power (install by 28 February 2027 to lock in the rate).
      </p>
      <p className={p}>
        We handle the application, the bi-directional meter coordination and the paperwork. Full
        process: <Link to="/blog/5" className={linkCls}>net metering policy guide</Link>.
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get an exact 5kW quote for your roof</h2>
        <p className="text-gray-700 mb-6">
          Tell us your location and your average monthly bill — we'll survey, size the system and
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

export default SolarSystem5kW;
