import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const quoteSchema = z.object({ name: z.string().trim().min(2).max(100), phone: z.string().trim().min(10).max(15).regex(/^[0-9+\-\s]+$/), email: z.string().trim().email().optional().or(z.literal("")), city: z.string().min(1), property: z.string().min(1), bill: z.string().min(1), size: z.string().min(1), message: z.string().trim().max(1000), consent: z.literal(true) });
type Quote = z.infer<typeof quoteSchema>;
const initial: Quote = { name: "", phone: "", email: "", city: "", property: "", bill: "", size: "", message: "", consent: false as true };

export default function QuoteDialog({ label = "Get Free Quote", variant = "default", size = "default", className }: { label?: string; variant?: "default" | "secondary" | "outline"; size?: "default" | "lg"; className?: string }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Quote>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const set = (key: keyof Quote, value: string | boolean) => setForm((current) => ({ ...current, [key]: value } as Quote));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const checked = quoteSchema.safeParse(form);
    if (!checked.success) { toast({ title: "Please complete the required fields", description: "Add your contact details and consent before sending.", variant: "destructive" }); return; }
    setSubmitting(true);
    const requestId = crypto.randomUUID();
    const { error } = await supabase.from("project_quote_requests").insert({ id: requestId, name: form.name, phone: form.phone, email: form.email || null, company: form.property, project_name: form.size, message: `City: ${form.city}\nMonthly bill: ${form.bill}\n${form.message}` });
    if (error) { console.error("Quote request failed:", error); toast({ title: "Could not send your request", description: "Please use WhatsApp or try again.", variant: "destructive" }); setSubmitting(false); return; }
    supabase.functions.invoke("notify-project-quote", { body: { requestId } }).catch((notificationError) => console.error("Notification failed:", notificationError));
    trackEvent("generate_lead", { method: "solar_quote" });
    setComplete(true); setSubmitting(false);
  };
  return <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) { setComplete(false); setForm(initial); } }}>
    <DialogTrigger asChild><Button variant={variant} size={size} className={className}>{label}<ArrowRight className="ml-2 h-4 w-4" /></Button></DialogTrigger>
    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
      {complete ? <div className="py-12 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-primary" /><DialogTitle className="mt-4">Thank you—our solar team will contact you shortly.</DialogTitle><DialogDescription className="mt-2">Your request has been recorded.</DialogDescription></div> : <>
        <DialogHeader><DialogTitle>Get a free solar quote</DialogTitle><DialogDescription>Share your bill and property details for a tailored recommendation.</DialogDescription></DialogHeader>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="quote-name">Name *</Label><Input id="quote-name" value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="quote-phone">Phone / WhatsApp *</Label><Input id="quote-phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="quote-email">Email</Label><Input id="quote-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="quote-city">City *</Label><Input id="quote-city" value={form.city} onChange={(e) => set("city", e.target.value)} /></div>
          <div className="space-y-2"><Label>Property type *</Label><Select value={form.property} onValueChange={(v) => set("property", v)}><SelectTrigger><SelectValue placeholder="Choose type" /></SelectTrigger><SelectContent>{["Home", "Apartment", "Office", "Factory", "School", "Hospital", "Shop", "Other"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Monthly electricity bill *</Label><Select value={form.bill} onValueChange={(v) => set("bill", v)}><SelectTrigger><SelectValue placeholder="Choose range" /></SelectTrigger><SelectContent>{["Below BDT 5,000", "BDT 5,000–15,000", "BDT 15,000–50,000", "Above BDT 50,000"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2 sm:col-span-2"><Label>Desired system size *</Label><Select value={form.size} onValueChange={(v) => set("size", v)}><SelectTrigger><SelectValue placeholder="Select a size" /></SelectTrigger><SelectContent>{["Not sure", "1kW", "3kW", "5kW", "10kW", "20kW+ commercial"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="quote-message">Message and rooftop photo note</Label><Textarea id="quote-message" value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Describe your roof, backup needs, or photos you can share on WhatsApp." /></div>
          <p className="text-xs text-muted-foreground sm:col-span-2">Photo upload will be added after secure file storage is configured. You can send photos through WhatsApp now.</p>
          <div className="flex items-start gap-3 sm:col-span-2"><Checkbox id="quote-consent" checked={form.consent} onCheckedChange={(v) => set("consent", v === true)} /><Label htmlFor="quote-consent" className="font-normal leading-5">I agree to be contacted about this solar request. *</Label></div>
          <Button type="submit" size="lg" disabled={submitting} className="sm:col-span-2">{submitting ? "Sending…" : "Request my free survey"}</Button>
        </form>
      </>}
    </DialogContent>
  </Dialog>;
}
