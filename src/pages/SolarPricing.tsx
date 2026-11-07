import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";
import SiteShell from "@/components/SiteShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQList from "@/components/FAQList";
import QuoteDialog from "@/components/QuoteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { solarSystems } from "@/data/siteContent";

const faqs = [
  ["Is the displayed price final?", "No. Starting prices are planning references. Final cost depends on site survey, design, equipment selection and scope of work."], 
  ["Does the price include batteries?", "Battery inclusion depends on whether you choose grid-tied, hybrid or full backup. The final quote specifies all included equipment."], 
  ["How is the correct size selected?", "We analyze your electricity bills, daytime loads, available roof area, and backup priorities to determine the most efficient system size."], 
  ["Can I apply for net metering?", "Eligibility depends on current utility rules and your property details. We provide guidance on the application process during the survey phase."]
] as const;

export default function SolarPricing() {
  const { pathname } = useLocation(); 
  const system = solarSystems.find((item) => item.path === pathname); 
  const isHub = !system;

  const title = system ? `${system.size} Solar System Price in Bangladesh` : "Solar System Price in Bangladesh";
  const description = system ? `Plan a ${system.size} rooftop solar system in Bangladesh. Review use cases, cost drivers, and request a site-specific quote.` : "Compare 1kW, 3kW, 5kW and 10kW solar system pathways in Bangladesh and request a free site survey.";

  return (
    <SiteShell>
      <SEO 
        title={title} 
        description={description} 
        canonicalUrl={`https://bdsolarpower.com${pathname}`} 
        faqSchema={{ "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} 
      />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Breadcrumbs current={title} />
        
        <div className="mt-8 max-w-4xl">
          <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {system 
              ? `${system.size} systems are ideal for ${system.bestFor.toLowerCase()}. ${system.useCases}` 
              : "System cost depends on capacity, equipment selection, mounting, batteries, and installation conditions."}
          </p>
        </div>

        <section className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            {system ? `How much does a ${system.size} solar system cost in Bangladesh?` : "How much does a rooftop solar system cost in Bangladesh?"}
          </h2>
          <p className="text-lg font-medium text-primary leading-relaxed italic">
            {system 
              ? `A ${system.size} rooftop solar system typically starts from ${system.price}, depending on the choice of panels, inverter, and roof conditions. Most users find this size ideal for ${system.bestFor.toLowerCase()}.` 
              : "Rooftop solar costs vary by capacity. For example, a popular 5kW system typically starts from BDT 275,000. Final pricing depends on equipment quality, battery needs, and a professional site survey."}
          </p>
        </section>

        {system ? (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[["Current price guidance", system.price], ["Typical fit", system.bestFor], ["Roof guidance", system.roof]].map(([label, value]) => (
                <Card key={label}>
                  <CardHeader><CardTitle className="text-base">{label}</CardTitle></CardHeader>
                  <CardContent className="font-semibold text-primary">{value}</CardContent>
                </Card>
              ))}
            </div>

            <section className="mt-14 grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border p-6 bg-background shadow-sm">
                <h2 className="text-2xl font-bold mb-4">What drives the final {system.size} price?</h2>
                <ul className="space-y-3">
                  {[
                    "Panel, inverter and mounting specifications", 
                    "Grid-tied, hybrid or battery-backed design", 
                    "Roof strength, access, shading and required civil work", 
                    "Cable routes, electrical protection and distribution-board work", 
                    "Monitoring, documentation and after-sales scope"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border p-6 bg-background shadow-sm">
                <h2 className="text-2xl font-bold mb-4">What should the site survey confirm?</h2>
                <p className="leading-7 text-muted-foreground mb-6">
                  The survey checks roof dimensions, shading, electrical connection, and preferred backup circuits to ensure the system performs as expected.
                </p>
                <QuoteDialog label={`Get ${system.size} Quote`} size="lg" className="w-full" />
              </div>
            </section>
          </>
        ) : (
          <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {solarSystems.map((system) => (
              <Card key={system.key} className={system.key === "5kw" ? "border-2 border-primary shadow-lg" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Sun className="h-6 w-6 text-primary" />
                    {system.key === "5kw" && <Badge className="bg-primary text-primary-foreground">Popular</Badge>}
                  </div>
                  <CardTitle className="pt-3 text-2xl">{system.size} System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{system.price}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {system.bestFor}. {system.useCases}
                  </p>
                  <Button asChild variant="link" className="mt-4 px-0 p-0 text-primary hover:text-primary hover:underline">
                    <Link to={system.path}>
                      View {system.size} guide <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        <section className="mt-16 bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a site-specific proposal?</h2>
          <p className="text-emerald-50/80 mb-8 max-w-2xl mx-auto">
            Avoid generic estimates. We provide a professional survey and a detailed technical proposal based on your actual electricity bill and roof.
          </p>
          <QuoteDialog label="Request Free Site Survey" size="lg" className="mx-auto w-full sm:w-auto bg-amber-400 text-amber-950 hover:bg-amber-300" />
        </section>

        <div className="mt-16">
          <FAQList items={faqs} title="Pricing FAQs" />
        </div>
      </div>
    </SiteShell>
  );
}
