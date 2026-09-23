import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { Loader2, Upload, X, Sun, AlertTriangle, CheckCircle2, ListChecks } from "lucide-react";

const MAX_PHOTOS = 4;

type Assessment = {
  suitability_score: number;
  verdict: string;
  recommended_system_kw: number;
  estimated_annual_kwh: number;
  estimated_cost_bdt_min: number;
  estimated_cost_bdt_max: number;
  payback_years: number;
  usable_area_note: string;
  observations: string[];
  risks: string[];
  next_steps: string[];
  summary: string;
};

/** Shrinks a photo in the browser so uploads stay small and fast. */
const compressImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the photo"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not open the photo"));
      img.onload = () => {
        const maxSide = 1280;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Could not process the photo"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

const bdt = (value: number) =>
  new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(Math.round(value));

const SiteSuitabilityAssessor = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<string[]>([]);
  const [siteType, setSiteType] = useState("rooftop");
  const [district, setDistrict] = useState("");
  const [areaSqft, setAreaSqft] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [gridConnected, setGridConnected] = useState("yes");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Assessment | null>(null);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) {
      toast({ title: `Maximum ${MAX_PHOTOS} photos`, variant: "destructive" });
      return;
    }

    try {
      const next = await Promise.all(files.slice(0, room).map(compressImage));
      setPhotos((prev) => [...prev, ...next]);
    } catch (error) {
      console.error("Photo processing failed:", error);
      toast({
        title: "Could not add that photo",
        description: "Please try a different JPG or PNG image.",
        variant: "destructive",
      });
    }
  };

  const removePhoto = (index: number) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));

  const canSubmit = photos.length > 0 && district.trim().length > 0 && Number(areaSqft) > 0;

  const handleAssess = async () => {
    if (!canSubmit) {
      toast({
        title: "Missing details",
        description: "Add at least one photo, the district and the site area.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("assess-site-suitability", {
        body: {
          photos,
          siteType,
          district: district.trim(),
          areaSqft: Number(areaSqft),
          monthlyBillBdt: Number(monthlyBill) || 0,
          gridConnected: gridConnected === "yes",
          contactName: contactName.trim() || null,
          contactPhone: contactPhone.trim() || null,
          notes: notes.trim() || null,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResult(data.assessment as Assessment);
      trackEvent("generate_lead", { method: "site_suitability_assessment" });
      toast({ title: "Assessment ready", description: "Your site report is below." });
    } catch (error) {
      console.error("Site assessment failed:", error);
      toast({
        title: "Assessment failed",
        description:
          error instanceof Error && error.message
            ? error.message
            : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-primary" />
            Site photos &amp; details
          </CardTitle>
          <CardDescription>
            Upload photos of your roof or land and tell us about the site. The AI returns a
            suitability assessment with an indicative system size and cost range.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-photos">Site photos (up to {MAX_PHOTOS})</Label>
            <div className="rounded-lg border-2 border-dashed p-4 text-center transition-colors hover:border-primary">
              <Input
                id="site-photos"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFiles}
              />
              <label htmlFor="site-photos" className="block cursor-pointer py-6">
                <Upload className="mx-auto mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Tap to add roof or land photos (wide shots work best)
                </p>
              </label>
            </div>
            {photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {photos.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Site photo ${index + 1}`}
                      className="h-24 w-full rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      aria-label={`Remove photo ${index + 1}`}
                      className="absolute right-1 top-1 rounded-full bg-background/90 p-1 shadow"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sa-type">Site type</Label>
              <Select value={siteType} onValueChange={setSiteType}>
                <SelectTrigger id="sa-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rooftop">Rooftop (home)</SelectItem>
                  <SelectItem value="commercial rooftop">Rooftop (commercial)</SelectItem>
                  <SelectItem value="factory rooftop">Factory shed roof</SelectItem>
                  <SelectItem value="open land">Open land</SelectItem>
                  <SelectItem value="agricultural land">Agricultural land</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sa-district">District / upazila *</Label>
              <Input
                id="sa-district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Mymensingh"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sa-area">Usable area (sq ft) *</Label>
              <Input
                id="sa-area"
                type="number"
                min={1}
                value={areaSqft}
                onChange={(e) => setAreaSqft(e.target.value)}
                placeholder="e.g. 1500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sa-bill">Monthly electricity bill (BDT)</Label>
              <Input
                id="sa-bill"
                type="number"
                min={0}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
                placeholder="e.g. 6000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sa-grid">Grid connection</Label>
              <Select value={gridConnected} onValueChange={setGridConnected}>
                <SelectTrigger id="sa-grid">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Connected to the grid</SelectItem>
                  <SelectItem value="no">Off-grid / no connection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sa-name">Your name</Label>
              <Input
                id="sa-name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="sa-phone">Phone (so we can follow up)</Label>
              <Input
                id="sa-phone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="01XXXXXXXXX (optional)"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="sa-notes">Anything else about the site?</Label>
              <Textarea
                id="sa-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Roof age, nearby trees or buildings, load shedding hours, budget..."
              />
            </div>
          </div>

          <Button onClick={handleAssess} disabled={loading || !canSubmit} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assessing your site...
              </>
            ) : (
              "Get AI suitability assessment"
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Indicative only. A physical survey is required before any final design or quotation.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suitability assessment</CardTitle>
          <CardDescription>
            Score, indicative system size, output, cost range and the risks to check on site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm">Reading your photos and site details...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-end justify-between">
                  <span className="text-sm text-muted-foreground">Suitability score</span>
                  <span className="text-3xl font-bold text-primary">
                    {result.suitability_score}
                    <span className="text-base text-muted-foreground">/100</span>
                  </span>
                </div>
                <Progress value={result.suitability_score} className="mt-2" />
                <p className="mt-3 font-medium">{result.verdict}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Recommended system</p>
                  <p className="text-lg font-semibold">{result.recommended_system_kw} kW</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Estimated yearly output</p>
                  <p className="text-lg font-semibold">{bdt(result.estimated_annual_kwh)} kWh</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Indicative cost</p>
                  <p className="text-lg font-semibold">
                    ৳{bdt(result.estimated_cost_bdt_min)} – ৳{bdt(result.estimated_cost_bdt_max)}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Payback</p>
                  <p className="text-lg font-semibold">{result.payback_years} years</p>
                </div>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">{result.summary}</p>

              {result.usable_area_note && (
                <Badge variant="secondary" className="whitespace-normal text-left">
                  {result.usable_area_note}
                </Badge>
              )}

              {result.observations?.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> What the photos show
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {result.observations.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.risks?.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <AlertTriangle className="h-4 w-4 text-amber-600" /> Risks to check
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {result.risks.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.next_steps?.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <ListChecks className="h-4 w-4 text-primary" /> Next steps
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {result.next_steps.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button asChild className="w-full" size="lg">
                <a
                  href="https://wa.me/8801711927755"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a free site survey on WhatsApp
                </a>
              </Button>
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              <Sun className="mx-auto mb-4 h-12 w-12 opacity-20" />
              <p>Add your site photos and details to see the assessment here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSuitabilityAssessor;
