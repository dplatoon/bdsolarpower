import { SEO } from "@/components/SEO";
import SiteShell from "@/components/SiteShell";
import { Badge } from "@/components/ui/badge";
import { Info, AlertCircle, Calendar, CheckCircle2, Banknote, FileText, Zap } from "lucide-react";

export default function SolarUpdate() {
  const projects = [
    { name: "Government solar expansion target", capacity: "3,000-4,000 MW", status: "Announced target", note: "A government ambition for additions before the next summer; not commissioned capacity." },
    { name: "BPDB solar project initiatives", capacity: "689 MW", status: "Development/planning portfolio", note: "BPDB has reported development proposals and feasibility work across projects." },
    { name: "Rampal solar power project", capacity: "442 MW", status: "Project approval/development", note: "BPDB has reported plans for a large grid-connected project; check latest tender updates." },
    { name: "Matarbari solar project", capacity: "70 MW", status: "Proposal submitted", note: "Development proposal sent to Planning Commission; completion expected by 2028, subject to approvals." },
    { name: "National rooftop solar programme", capacity: "3,000 MW target", status: "Programme target", note: "Announced in 2025 aiming to add rooftop solar on government buildings, schools, and hospitals." },
  ];

  return (
    <SiteShell>
      <SEO 
        title="Bangladesh Solar Power Update 2026: Targets, Projects & Progress" 
        description="Get the latest Bangladesh solar power update: government targets, major solar projects, rooftop policy, financing options, and capacity figures."
        canonicalUrl="https://bdsolarpower.com/bangladesh-solar-power-update"
      />
      
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <header className="mb-12 text-center sm:text-left">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Evergreen Update Page</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Last reviewed: November 7, 2026
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Bangladesh Solar Power Update: Targets, Projects and Progress
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl">
            Bangladesh is pursuing a major expansion of solar power, including a government ambition to add 3,000-4,000 megawatts (MW) to the national grid. 
            <strong className="text-foreground"> This figure is a target, not confirmed operating capacity.</strong> Proposed projects must still move through approvals and construction.
          </p>
        </header>

        <div className="mb-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 shrink-0 text-amber-600" />
            <div>
              <h3 className="font-bold mb-1">Status Note</h3>
              <p className="text-sm leading-relaxed opacity-90">
                Project plans and government targets can change. Figures below reflect cited reporting and should not be treated as independently verified live-generation data.
              </p>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-7 w-7 text-primary" />
            What is the current state of solar power in Bangladesh?
          </h2>
          <p className="text-lg font-medium text-primary leading-relaxed mb-6 italic">
            As of November 2026, Bangladesh aims to add 3,000-4,000 MW of solar power by next summer. Current estimated capacity is approximately 1,450 MW (including off-grid), while the BPDB manages a separate development portfolio of 689 MW.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border p-6 bg-background shadow-sm">
              <h3 className="font-semibold mb-3 text-primary">Government Targets</h3>
              <p className="text-muted-foreground leading-relaxed">
                The most prominent goal is the addition of <strong className="text-foreground">3,000-4,000 MW</strong> to the national grid before the next summer season.
              </p>
            </div>
            <div className="rounded-xl border p-6 bg-background shadow-sm">
              <h3 className="font-semibold mb-3 text-primary">BPDB Portfolio</h3>
              <p className="text-muted-foreground leading-relaxed">
                The Bangladesh Power Development Board (BPDB) has reported a pipeline of solar initiatives totaling <strong className="text-foreground">689 MW</strong>, currently in development.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-emerald-950 text-white rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Banknote className="h-7 w-7 text-amber-400" />
            Are there government grants or loans for solar in Bangladesh?
          </h2>
          <p className="text-lg font-medium text-amber-400 leading-relaxed mb-8 italic">
            While there are no direct "free cash" grants for private residential solar, the government provides a Tk 10/unit buyback for surplus power, concessional low-interest loans (around 6%), and zero-cost OpEx models for public institutions.
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
             <div className="rounded-2xl bg-white/10 p-6 border border-white/10">
               <div className="flex items-center gap-3 mb-3">
                 <Zap className="h-5 w-5 text-amber-400" />
                 <h3 className="font-bold">Surplus Buyback</h3>
               </div>
               <p className="text-sm leading-relaxed text-emerald-50/80">
                 Household rooftop solar owners can potentially receive <strong className="text-white">Tk 10 per unit</strong> for surplus electricity fed back into the grid.
               </p>
             </div>
             <div className="rounded-2xl bg-white/10 p-6 border border-white/10">
               <div className="flex items-center gap-3 mb-3">
                 <Banknote className="h-5 w-5 text-amber-400" />
                 <h3 className="font-bold">Concessional Loans</h3>
               </div>
               <p className="text-sm leading-relaxed text-emerald-50/80">
                 SREDA-approved banks provide low-interest loans: up to <strong className="text-white">BDT 175,000</strong> for rural homes and specific green finance programs around <strong className="text-white">6% interest</strong>.
               </p>
             </div>
             <div className="rounded-2xl bg-white/10 p-6 border border-white/10">
               <div className="flex items-center gap-3 mb-3">
                 <FileText className="h-5 w-5 text-amber-400" />
                 <h3 className="font-bold">Tax Exemptions</h3>
               </div>
               <p className="text-sm leading-relaxed text-emerald-50/80">
                 Import taxes on panels and inverters are reduced to <strong className="text-white">1%</strong>, with a <strong className="text-white">10-year income tax exemption</strong> for qualifying solar generators.
               </p>
             </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-bold mb-3 text-amber-400">Institutional Models (Zero-Cost)</h4>
            <p className="text-sm leading-relaxed text-emerald-50/80">
              Under the National Rooftop Solar Programme, government offices use a <strong className="text-white">CapEx</strong> (investment) model, while schools, colleges, and hospitals can utilize an <strong className="text-white">OpEx</strong> model, where installations are provided at zero cost to the institution.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            How does rooftop solar work for homes and businesses?
          </h2>
          <p className="text-lg font-medium text-primary leading-relaxed mb-6 italic">
            Rooftop solar allows electricity generation at the point of use. The National Rooftop Solar Programme targets 3,000 MW for public buildings, while private users leverage Net Metering to offset bills by feeding surplus power back to the utility.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border p-6 bg-background">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Net Metering Framework
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Eligible customers can connect to the distribution utility (BPDB, BREB, DPDC, etc.). You should confirm approved equipment and application steps via the official Net Energy Metering Portal before investing.
              </p>
            </div>
            <div className="rounded-xl border p-6 bg-background">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Policy Thresholds
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Some new electricity connections or building loads may have specific solar requirements. Verify the latest Power Division circulars to see if your property category requires solar installation.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">What do the solar power targets actually mean?</h2>
          <p className="text-lg font-medium text-primary leading-relaxed mb-6 italic">
            Announcements of 3,000-4,000 MW targets are strategic ambitions, not commissioned capacity. Real progress depends on approvals, financing, and construction, meaning these figures should not be treated as live power generation.
          </p>
          
          <div className="mb-10">
             <h3 className="text-xl font-bold mb-6">Bangladesh solar projects</h3>
             <div className="hidden overflow-hidden rounded-xl border md:block">
               <table className="w-full text-left text-sm">
                 <thead className="bg-muted/50 font-semibold text-muted-foreground">
                   <tr className="border-b">
                     <th className="px-4 py-3">Project or initiative</th>
                     <th className="px-4 py-3 text-right">Reported capacity</th>
                     <th className="px-4 py-3">Reported status</th>
                     <th className="px-4 py-3">What to know</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {projects.map((p, i) => (
                     <tr key={i} className="hover:bg-muted/30 transition-colors">
                       <td className="px-4 py-4 font-medium">{p.name}</td>
                       <td className="px-4 py-4 text-right font-mono">{p.capacity}</td>
                       <td className="px-4 py-4">
                         <Badge variant="outline" className="font-normal">{p.status}</Badge>
                       </td>
                       <td className="px-4 py-4 text-muted-foreground leading-snug">{p.note}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             <div className="grid gap-4 sm:hidden">
               {projects.map((p, i) => (
                 <div key={i} className="rounded-xl border p-4 bg-background">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-sm">{p.name}</h4>
                     <span className="text-xs font-mono font-bold text-primary">{p.capacity}</span>
                   </div>
                   <div className="mb-3">
                     <Badge variant="outline" className="text-[10px] font-normal">{p.status}</Badge>
                   </div>
                   <p className="text-xs text-muted-foreground leading-relaxed">{p.note}</p>
                 </div>
               ))}
             </div>
          </div>

          <div className="rounded-2xl border p-6 bg-muted/30">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              How to verify project progress
            </h3>
            <ul className="grid gap-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <strong className="text-foreground shrink-0">Status:</strong> Check if it is proposed, approved, tendered, under construction, or commissioned.
              </li>
              <li className="flex gap-2">
                <strong className="text-foreground shrink-0">Capacity:</strong> Distinguish between planned project capacity and actual generation.
              </li>
              <li className="flex gap-2">
                <strong className="text-foreground shrink-0">Evidence:</strong> Look for official notices, utility updates, or commissioned reports.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Frequently asked questions</h2>
          <div className="grid gap-6">
            {[
              { q: "What is Bangladesh's solar power target?", a: "The government aims to add 3,000-4,000 MW of solar power to the national grid before the next summer. This is an announced target and does not confirm that the capacity is currently operating." },
              { q: "How much solar power does Bangladesh currently have?", a: "Reports from May 2026 cite approximately 1,450 MW of existing solar capacity, including grid-connected and off-grid generation. This is a snapshot and should be verified against the latest official BPDB releases." },
              { q: "What is the BPDB's 689 MW solar initiative?", a: "This is a development portfolio of solar projects currently in the planning and feasibility stage. It represents a pipeline of future capacity, not current operational power." },
              { q: "Is the Rampal solar project operating?", a: "Reports describe a 442 MW Rampal project in the approval and tender phase. It is not yet confirmed as operational or generating electricity." },
              { q: "What is net metering?", a: "Net metering allows eligible customers to connect their solar systems to the grid and offset their electricity bills by feeding surplus power back to the distribution network." }
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border p-6 bg-background">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t pt-8 text-center sm:text-left">
          <h4 className="font-bold mb-2">Sources and Update Policy</h4>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            This page uses reported information from Bangladesh government announcements, official news services, and established media reporting. 
            We update this page when significant new targets, project approvals, or commissioning announcements are reported. 
            If a figure cannot be verified from a credible source, it is identified as unconfirmed.
          </p>
        </footer>
      </div>
    </SiteShell>
  );
}
