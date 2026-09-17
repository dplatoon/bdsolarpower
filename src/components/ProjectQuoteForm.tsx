import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send } from "lucide-react";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15)
    .regex(/^[0-9+\-\s]+$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(255).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional(),
  projectId: z.string().min(1, "Please choose a project"),
  message: z.string().trim().max(600).optional(),
});

type FormData = z.infer<typeof schema>;

interface ProjectOption {
  id: string;
  name: string;
  location: string;
}

const emptyForm: FormData = {
  name: "",
  phone: "",
  email: "",
  company: "",
  projectId: "",
  message: "",
};

const ProjectQuoteForm = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("solar_projects")
        .select("id, name, location")
        .order("name");
      if (error) {
        console.error("Failed to load projects for quote form:", error);
        return;
      }
      setProjects(data ?? []);
    };
    load();
  }, []);

  const setField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = schema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      validation.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as keyof FormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const selected = projects.find((p) => p.id === formData.projectId);
      const { data, error } = await supabase
        .from("project_quote_requests")
        .insert({
          project_id: formData.projectId,
          project_name: selected ? `${selected.name} (${selected.location})` : null,
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          company: formData.company || null,
          message: formData.message || null,
        })
        .select("id")
        .single();

      if (error) throw error;

      // Best-effort notification: the request is already saved either way.
      supabase.functions
        .invoke("notify-project-quote", { body: { requestId: data.id } })
        .catch((err) => console.error("Notification failed:", err));

      trackEvent("generate_lead", { method: "project_quote_form" });

      toast({
        title: "Request sent",
        description: "We received your enquiry and will contact you shortly.",
      });
      setFormData(emptyForm);
    } catch (err) {
      console.error("Project quote request failed:", err);
      toast({
        title: "Could not send your request",
        description: "Please try again, or reach us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-6 border-emerald-200">
      <CardHeader>
        <CardTitle>Request project details</CardTitle>
        <CardDescription>
          Ask for capacity, investment and timeline details on any project shown on the map.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="pq-name">Full name *</Label>
            <Input
              id="pq-name"
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Your name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pq-phone">Phone *</Label>
            <Input
              id="pq-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="01XXXXXXXXX"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pq-email">Email</Label>
            <Input
              id="pq-email"
              type="email"
              value={formData.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="you@company.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pq-company">Company (optional)</Label>
            <Input
              id="pq-company"
              value={formData.company}
              onChange={(e) => setField("company", e.target.value)}
              placeholder="Organisation name"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="pq-project">Project *</Label>
            <Select value={formData.projectId} onValueChange={(v) => setField("projectId", v)}>
              <SelectTrigger id="pq-project" className={errors.projectId ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a solar project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} — {p.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.projectId && <p className="text-sm text-destructive">{errors.projectId}</p>}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="pq-message">What would you like to know?</Label>
            <Textarea
              id="pq-message"
              rows={3}
              value={formData.message}
              onChange={(e) => setField("message", e.target.value)}
              placeholder="Investment size, tariff, land status, timeline..."
            />
          </div>

          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Sending..." : "Request project details"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectQuoteForm;
