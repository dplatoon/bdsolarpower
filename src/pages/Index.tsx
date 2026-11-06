import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, CheckCircle2, ClipboardCheck, FileCheck2, MessageCircle, Search, ShieldCheck, Sun, Wrench, Languages } from "lucide-react";
import { SEO } from "@/components/SEO";
import SiteShell from "@/components/SiteShell";
import FAQList from "@/components/FAQList";
import QuoteDialog from "@/components/QuoteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { business, homeFaqs, locations, policyNotice, solarSystems, homeContent } from "@/data/siteContent";
import heroImage from "@/assets/rooftop-solar-bangladesh-hero.jpg";

const faqSchema = { "@type": "FAQPage", mainEntity: homeFaqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
const serviceSchema = { "@type": "Service", name: "Rooftop Solar Installation in Bangladesh", serviceType: "Solar panel installation", provider: { "@id": "https://bdsolarpower.com/#organization" }, areaServed: { "@type": "Country", name: "Bangladesh" }, offers: { "@type": "Offer", price: "275000", priceCurrency: "BDT", description: "5kW rooftop solar system starting price, subject to site survey and final scope." } };
const process = [{ icon: MessageCircle, title: "1. Share your bill", text: "Send a recent electricity bill, location and property details." }, { icon: Search, title: "2. Free site survey", text: "Assess roof, shading, structure, wiring and installation access." }, { icon: ClipboardCheck, title: "3. Design and quote", text: "Review capacity, equipment, scope, assumptions and pricing." }, { icon: Wrench, title: "4. Install and test", text: "Complete installation, protection checks and commissioning." }, { icon: FileCheck2, title: "5. Handover and support", text: "Receive guidance on operation, warranty and applicable net metering." }];

export default function Index() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  return <SiteShell>
    <SEO title="Solar Panel Installation in Bangladesh" description="Rooftop solar installation for homes and businesses. 5kW systems from BDT 275,000, free survey and net-metering support." canonicalUrl="https://bdsolarpower.com/" faqSchema={faqSchema} extraSchemas={[serviceSchema]} ogImage={heroImage} />
    
    <section className="overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="relative">
          <div className="absolute -top-12 right-0 flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 h-8 gap-2" 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            >
              <Languages className="h-3 w-3" />
              {lang === 'en' ? 'বাংলা' : 'English'}
            </Button>
          </div>
          <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400">Nationwide service in Bangladesh</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            {lang === 'en' ? homeContent.hero.titleEn : homeContent.hero.titleBn}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/80">
            {lang === 'en' ? homeContent.hero.subtitleEn : homeContent.hero.subtitleBn}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteDialog label={lang === 'en' ? "Get Free Solar Quote" : "ফ্রি কোটেশন নিন"} size="lg" className="bg-amber-400 text-amber-950 hover:bg-amber-300" />
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white hover:text-emerald-950">
              <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {lang === 'en' ? 'WhatsApp' : 'হোয়াটসঅ্যাপ'}
              </a>
            </Button>
          </div>
          <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
            {["5kW from BDT 275,000", "Free site survey", "Net-metering support", "25-year panel warranty"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-amber-400" />{item}
              </li>
            ))}
          </ul>
        </div>
        <img src={heroImage} alt="Rooftop solar panels installed on a Bangladesh building" width="1600" height="1000" className="aspect-[8/5] w-full rounded-2xl object-cover shadow-2xl" />
      </div>
    </section>

    <section className="border-b bg-amber-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 lg:flex-row lg:items-center">
        <Badge className="w-fit bg-amber-500 text-amber-950">Policy notice</Badge>
        <p className="flex-1 text-sm leading-6 text-amber-950">
          <strong>{policyNotice.text}</strong> {policyNotice.disclaimer} Last reviewed {policyNotice.lastReviewed}.
        </p>
        <Link to="/net-metering-bangladesh" className="text-sm font-semibold text-primary">
          {lang === 'en' ? 'Read net-metering guide →' : 'নেট মিটারিং গাইড পড়ুন →'}
        </Link>
      </div>
    </section>

    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold">
            {lang === 'en' ? homeContent.sizing.titleEn : homeContent.sizing.titleBn}
          </h2>
          <p className="mt-4 text-lg font-medium text-primary leading-relaxed italic">
            {lang === 'en' ? homeContent.sizing.directAnswerEn : homeContent.sizing.directAnswerBn}
          </p>
          <p className="mt-2 text-muted-foreground">
            {lang === 'en' ? homeContent.sizing.subtitleEn : homeContent.sizing.subtitleBn}
          </p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {solarSystems.map((system) => (
            <Card key={system.key} className={system.key === "5kw" ? "border-2 border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Sun className="h-6 w-6 text-primary" />
                  {system.key === "5kw" && <Badge>{lang === 'en' ? 'Popular' : 'জনপ্রিয়'}</Badge>}
                </div>
                <CardTitle className="pt-3 text-2xl">{system.size} Solar System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{system.price}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {system.bestFor}. {system.useCases}
                </p>
                <Button asChild variant="link" className="mt-4 px-0">
                  <Link to={system.path}>
                    {lang === 'en' ? `View ${system.size} guide` : `${system.size} গাইড দেখুন`}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-muted/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">
            {lang === 'en' ? homeContent.process.titleEn : homeContent.process.titleBn}
          </h2>
          <p className="mt-4 text-lg font-medium text-primary leading-relaxed">
            {lang === 'en' ? homeContent.process.directAnswerEn : homeContent.process.directAnswerBn}
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {process.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border bg-background p-5">
              <Icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold">
            {lang === 'en' ? homeContent.netMetering.titleEn : homeContent.netMetering.titleBn}
          </h2>
          <p className="mt-4 text-lg font-medium text-primary leading-relaxed italic">
            {lang === 'en' ? homeContent.netMetering.directAnswerEn : homeContent.netMetering.directAnswerBn}
          </p>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Where eligible, net metering can record imported electricity and surplus solar exports. Capacity, documentation, approval and bill treatment depend on current utility requirements.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/net-metering-bangladesh">
              {lang === 'en' ? 'Read the practical guide' : 'প্র্যাকটিক্যাল গাইড পড়ুন'}
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <Calculator className="h-7 w-7 text-primary" />
            <CardTitle className="pt-3">
              {lang === 'en' ? 'What could solar look like for your bill?' : 'আপনার বিলে সোলার কেমন প্রভাব ফেলবে?'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">
              {lang === 'en' ? 'Use the calculator for an illustrative size, generation range, roof area and potential bill offset. Then request an engineer-reviewed proposal.' : 'একটি আনুমানিক হিসাব পেতে ক্যালকুলেটরটি ব্যবহার করুন। এরপর আমাদের ইঞ্জিনিয়ারের সাথে কথা বলে সঠিক প্রপোজাল বুঝে নিন।'}
            </p>
            <Button asChild className="mt-5">
              <Link to="/solar-calculator-bangladesh">
                {lang === 'en' ? 'Calculate your estimate' : 'হিসাব করুন'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>

    <section className="bg-emerald-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold">
            {lang === 'en' ? homeContent.surveyFirst.titleEn : homeContent.surveyFirst.titleBn}
          </h2>
          <p className="mt-4 text-lg font-medium text-amber-400 leading-relaxed italic">
            {lang === 'en' ? homeContent.surveyFirst.directAnswerEn : homeContent.surveyFirst.directAnswerBn}
          </p>
          <p className="mt-2 text-emerald-50/75">
            Clear recommendations require real property data. We avoid guaranteeing savings, output or approvals before the site and proposal are reviewed.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[["Site-specific design", "Sizing starts with your bill, roof and goals."], ["Transparent assumptions", "Proposals can show scope, exclusions and estimated performance."], ["Safety and support", "Installation planning includes protection, testing and handover guidance."]].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-white/10 p-6">
              <ShieldCheck className="h-6 w-6 text-amber-400" />
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold">
            {lang === 'en' ? homeContent.locations.titleEn : homeContent.locations.titleBn}
          </h2>
          <p className="mt-4 text-lg font-medium text-primary leading-relaxed italic">
            {lang === 'en' ? homeContent.locations.directAnswerEn : homeContent.locations.directAnswerBn}
          </p>
          <p className="mt-2 text-muted-foreground">
            Nationwide service is stated, with scheduling confirmed after assessment.
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          {locations.map((location) => (
            <Button key={location.path} asChild variant="outline">
              <Link to={location.path}>{location.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>

    <FAQList items={homeFaqs} title={lang === 'en' ? "What do Bangladesh solar buyers ask most often?" : "সোলার বায়াররা সাধারণত কী জানতে চান?"} />

    <section className="bg-primary py-16 text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold">
          {lang === 'en' ? homeContent.cta.titleEn : homeContent.cta.titleBn}
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80">
          {lang === 'en' ? homeContent.cta.subtitleEn : homeContent.cta.subtitleBn}
        </p>
        <QuoteDialog label={lang === 'en' ? "Get My Free Quote" : "ফ্রি কোটেশন নিন"} variant="secondary" size="lg" className="mt-7" />
      </div>
    </section>
  </SiteShell>;
}
