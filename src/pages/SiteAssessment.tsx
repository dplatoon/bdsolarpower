import { SEO } from "@/components/SEO";
import SiteShell from "@/components/SiteShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteSuitabilityAssessor from "@/components/SiteSuitabilityAssessor";

export default function SiteAssessment() {
  return (
    <SiteShell>
      <SEO
        title="Free AI Solar Site Assessment Bangladesh"
        description="Upload roof or land photos and site details to get an AI solar suitability score, system size, output estimate and indicative cost range for your property in Bangladesh."
        canonicalUrl="https://bdsolarpower.com/solar-site-assessment"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Breadcrumbs current="Solar Site Assessment" />
        <div className="mt-8 max-w-4xl">
          <h1 className="text-4xl font-bold">AI Solar Site Assessment</h1>
          <h2 className="mt-4 text-xl font-semibold">
            How do you know if your roof or land suits solar?
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Upload photos of your roof or land with a few site details, and the assessment returns a
            suitability score, an indicative system size in kW, expected yearly output, a cost range
            in BDT and the risks worth checking before installation. It is an indicative screening
            step — a physical survey confirms the final design.
          </p>
        </div>

        <div className="mt-10">
          <SiteSuitabilityAssessor />
        </div>
      </div>
    </SiteShell>
  );
}
