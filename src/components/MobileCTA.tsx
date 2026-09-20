import { Button } from "@/components/ui/button";
import { business } from "@/data/siteContent";
import { MessageCircle, Phone } from "lucide-react";
import QuoteDialog from "./QuoteDialog";

export default function MobileCTA() { return <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t bg-background p-2 shadow-lg md:hidden">
  <Button asChild variant="ghost" size="sm"><a href={`tel:${business.whatsappDisplay.replace(/\s/g, "")}`}><Phone className="mr-1 h-4 w-4" />Call</a></Button>
  <Button asChild variant="ghost" size="sm"><a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle className="mr-1 h-4 w-4" />WhatsApp</a></Button>
  <QuoteDialog label="Get Quote" className="h-9" />
</div>; }
