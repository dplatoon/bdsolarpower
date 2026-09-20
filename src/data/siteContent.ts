export const business = {
  name: "BD Solar Power",
  email: "hello@bdsolarpower.com",
  whatsapp: "8801711927755",
  whatsappDisplay: "+880 1711-927755",
  baseUrl: "https://bdsolarpower.com",
  serviceArea: "Bangladesh",
  verifiedLocation: "Mymensingh, Bangladesh",
};

export const policyNotice = {
  text: "Install rooftop solar before 28 February 2027 and potentially receive Tk 10.50 per unit for surplus electricity for three years.",
  disclaimer: "Policy terms, eligibility, tariffs and deadlines must be verified with the relevant authority before purchase.",
  lastReviewed: "20 September 2026",
};

export type SystemKey = "1kw" | "3kw" | "5kw" | "10kw";
export type SolarSystem = {
  key: SystemKey;
  size: string;
  bestFor: string;
  useCases: string;
  roof: string;
  price: string;
  path: string;
  adjacent: { label: string; path: string }[];
};

export const solarSystems: SolarSystem[] = [
  { key: "1kw", size: "1kW", bestFor: "Small loads and apartments", useCases: "Lighting, fans, router and selected efficient appliances, subject to load review.", roof: "Confirm after roof survey", price: "Request quote", path: "/1kw-solar-system-price-bangladesh", adjacent: [{ label: "Compare 3kW", path: "/3kw-solar-system-price-bangladesh" }] },
  { key: "3kw", size: "3kW", bestFor: "Smaller homes", useCases: "Daytime household loads where a site and electricity-bill review supports the design.", roof: "Confirm after roof survey", price: "Request quote", path: "/3kw-solar-system-price-bangladesh", adjacent: [{ label: "Compare 1kW", path: "/1kw-solar-system-price-bangladesh" }, { label: "Compare 5kW", path: "/5kw-solar-system-price-bangladesh" }] },
  { key: "5kw", size: "5kW", bestFor: "Family homes", useCases: "Larger household loads and suitable small commercial properties after engineering review.", roof: "Confirm after roof survey", price: "From BDT 275,000", path: "/5kw-solar-system-price-bangladesh", adjacent: [{ label: "Compare 3kW", path: "/3kw-solar-system-price-bangladesh" }, { label: "Compare 10kW", path: "/10kw-solar-system-price-bangladesh" }] },
  { key: "10kw", size: "10kW", bestFor: "Villas and larger properties", useCases: "Higher daytime demand in homes, offices and other suitable buildings.", roof: "Confirm after roof survey", price: "Request custom quote", path: "/10kw-solar-system-price-bangladesh", adjacent: [{ label: "Compare 5kW", path: "/5kw-solar-system-price-bangladesh" }, { label: "Commercial solar", path: "/commercial-solar-bangladesh" }] },
];

export const locations = [
  { slug: "dhaka", name: "Dhaka", path: "/solar-company-dhaka" },
  { slug: "chittagong", name: "Chittagong", path: "/solar-company-chittagong" },
  { slug: "sylhet", name: "Sylhet", path: "/solar-company-sylhet" },
  { slug: "rajshahi", name: "Rajshahi", path: "/solar-company-rajshahi" },
  { slug: "mymensingh", name: "Mymensingh", path: "/solar-company-mymensingh" },
];

export const homeFaqs = [
  ["How much does a solar system cost in Bangladesh?", "Cost varies with system size, equipment, battery choice, roof structure, wiring and site conditions. Our currently stated offer is a 5kW system from BDT 275,000, subject to survey."],
  ["What is included in a solar installation quote?", "A proposal can cover panels, inverter, mounting, wiring, protection equipment, installation, commissioning and applicable monitoring or net-metering support. Final scope follows the site survey."],
  ["How do I choose between a 3kW and 5kW solar system?", "The right size depends on your bill, daytime usage, roof area, equipment and backup goals. Share your bill and roof details for a tailored recommendation."],
  ["Can solar reduce my electricity bill?", "A suitable system can offset part of your grid use, but results vary with sunlight, shading, system design, tariff and how you use electricity."],
  ["What is net metering?", "Net metering can measure electricity imported from and eligible surplus power exported to the grid. Approval, treatment and eligibility depend on current utility rules."],
  ["Can I use solar power during load shedding?", "Grid-tied systems usually shut down during an outage for safety. A correctly designed hybrid system with batteries can support selected loads."],
  ["How long does solar installation take?", "Timing depends on system size, roof work, equipment availability, approvals and weather. A schedule is provided after the survey and design review."],
  ["How long do solar panels last?", "The stated offer includes a 25-year panel warranty. Warranty terms and expected output depend on the selected product and manufacturer documentation."],
  ["Do solar panels require maintenance?", "Panels benefit from periodic cleaning and checks, particularly where dust, leaves or shading affect the array. Electrical and mounting checks should follow the installer’s guidance."],
  ["Does BD Solar Power provide a site survey?", "Yes. A free site survey is available so roof condition, shading, wiring, loads and installation access can be assessed before the final proposal."],
  ["Which areas does BD Solar Power serve?", "BD Solar Power states nationwide service in Bangladesh. Availability and scheduling are confirmed after an initial assessment."],
  ["How can I get a solar quote?", "Use the quote form or WhatsApp and share your latest electricity bill, city, property type and rooftop photos."],
] as const;

export const commercialSectors = [
  { slug: "factory", label: "Factories", title: "Factory Solar Installation in Bangladesh", pain: "High daytime electricity demand and large roof areas require careful load, structure and safety planning." },
  { slug: "office", label: "Offices and retail", title: "Office Solar Installation in Bangladesh", pain: "Business-hour demand can align with solar generation, but the design must reflect tenancy, roof access and electrical loads." },
  { slug: "school", label: "Schools and universities", title: "School Solar Installation in Bangladesh", pain: "Education facilities need safe layouts, predictable maintenance and designs matched to daytime use." },
  { slug: "hospital", label: "Hospitals and clinics", title: "Hospital Solar Installation in Bangladesh", pain: "Critical loads require engineering review, protection coordination and clearly separated backup expectations." },
];

export const blogTemplates = [
  { slug: "solar-panel-price-bangladesh", title: "Solar Panel and Solar System Prices in Bangladesh: What Affects Your Quote?", category: "Solar Prices" },
  { slug: "5kw-solar-system-bangladesh", title: "Is a 5kW Solar System Right for Your Home in Bangladesh?", category: "Solar Basics" },
  { slug: "net-metering-bangladesh-guide", title: "Net Metering in Bangladesh: Eligibility, Process and What to Check", category: "Net Metering" },
  { slug: "grid-tied-vs-hybrid-solar-bangladesh", title: "Grid-Tied vs Hybrid Solar in Bangladesh: Which System Fits Your Needs?", category: "Solar Basics" },
  { slug: "solar-panel-maintenance-bangladesh", title: "Solar Panel Maintenance in Bangladesh: Cleaning, Monitoring and Care", category: "Maintenance" },
  { slug: "how-to-reduce-electricity-bill-bangladesh", title: "How to Reduce Your Electricity Bill in Bangladesh With Rooftop Solar", category: "Solar Basics" },
];
