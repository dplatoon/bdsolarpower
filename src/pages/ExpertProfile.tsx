import QuoteDialog from "@/components/QuoteDialog";
import { SEO } from "@/components/SEO";
import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Globe, Linkedin, Mail, Award, Zap, Factory, ShieldCheck } from "lucide-react";
import { authors } from "@/data/authors";
import { business } from "@/data/siteContent";

export default function ExpertProfile() {
  const expert = authors["Tawhid Hasan"];

  return (
    <SiteShell>
      <SEO 
        title={`About ${expert.title} | BD Solar Power`} 
        description={`Meet the expert behind BD Solar Power. Specialized in solar design, direct China sourcing, and net-metering in Bangladesh.`}
        canonicalUrl="https://bdsolarpower.com/about-expert"
      />
      
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3 mb-20">
          <div className="lg:col-span-1">
            <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-primary bg-muted shadow-2xl">
              <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
                <span className="text-lg font-medium">Expert Photo</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/90 p-3 backdrop-blur-sm border shadow-sm">
                <p className="text-center font-bold text-sm">Tawhid Hasan</p>
                <p className="text-center text-xs text-muted-foreground">{expert.title}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href={expert.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-5 w-5" /></a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href={`mailto:${business.email}`}><Mail className="h-5 w-5" /></a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 w-fit">
              Certified Solar Consultant
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">Tawhid Hasan</h1>
            <p className="text-xl leading-relaxed text-muted-foreground mb-8">
              {expert.bio}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-3 rounded-xl border bg-background shadow-sm">
                <Award className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Technical Design Expert</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border bg-background shadow-sm">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Direct China Sourcing</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border bg-background shadow-sm">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Net-Metering Specialist</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border bg-background shadow-sm">
                <Factory className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Factory Auditing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 mb-20">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              My Professional Approach
            </h2>
            <div className="space-y-6">
              {[
                { title: "Data-Driven Sizing", text: "I reject 'standard packages'. Every system is sized based on actual electricity bills and roof shading analysis to ensure the fastest ROI." },
                { title: "Direct Manufacturer Access", text: "By auditing factories in China, I ensure my clients receive Tier-1 equipment without the markup of multiple importers." },
                { title: "Compliance First", text: "Net metering is complex. I handle the technical documentation and utility coordination to ensure your system is approved and operational." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-muted/50 rounded-3xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">Why Trust My Guidance?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The solar market in Bangladesh is flooded with misleading promises. My goal is to bring transparency to the industry. I provide:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">1</div>
                <span><strong className="font-bold">Transparent Pricing:</strong> No hidden costs. All quotes include installation and commissioning.</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">2</div>
                <span><strong className="font-bold">Proven Quality:</strong> Direct access to factory testing reports and certification.</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">3</div>
                <span><strong className="font-bold">Long-Term Support:</strong> I design for 25 years, not just for the first year.</span>
              </li>
            </ul>
          </section>
        </div>

        <section className="text-center bg-primary text-primary-foreground rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Consult with Tawhid Hasan</h2>
          <p className="mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Whether you need a technical audit of your property or want to leverage direct sourcing from China, let's build a system that actually works.
          </p>
          <QuoteDialog label="Book a Professional Consultation" size="lg" className="mx-auto w-full sm:w-auto bg-amber-400 text-amber-950 hover:bg-amber-300" />
        </section>
      </div>
    </SiteShell>
  );
}
