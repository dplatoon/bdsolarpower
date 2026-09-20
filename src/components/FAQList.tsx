import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQList({ items, title = "Frequently asked questions" }: { items: readonly (readonly [string, string])[]; title?: string }) {
  return <section className="py-16" aria-labelledby="faq-heading">
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <h2 id="faq-heading" className="text-3xl font-bold text-foreground">{title}</h2>
      <p className="mt-3 text-muted-foreground">Clear answers for planning a rooftop solar project in Bangladesh.</p>
      <Accordion type="single" collapsible className="mt-8">
        {items.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}>
          <AccordionTrigger className="text-left">{question}</AccordionTrigger>
          <AccordionContent className="leading-7 text-muted-foreground">{answer}</AccordionContent>
        </AccordionItem>)}
      </Accordion>
    </div>
  </section>;
}
