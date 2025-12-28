import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How much does a solar panel system cost in Bangladesh?",
    answer: "Solar panel system prices in Bangladesh vary by capacity. A 1kW system costs BDT 85,000-100,000, 3kW costs BDT 200,000-255,000, and the most popular 5kW system costs BDT 275,000-350,000. Prices have dropped 36% since 2023 due to reduced import duties (now just 1%). Commercial systems (10kW+) start from BDT 500,000. All prices include installation, net metering setup, and 25-year warranty."
  },
  {
    question: "What is net metering and how does it work in Bangladesh?",
    answer: "Net metering is a BPDB-approved billing system that allows you to export excess solar electricity to the grid and receive credits on your bill. When your solar panels produce more power than you use, the extra goes to the grid and your meter runs backward. You're billed only for the 'net' electricity used. In Bangladesh, net metering is available for systems up to 100kW and can reduce your electricity bills by 70% or more."
  },
  {
    question: "How long does solar panel installation take in Bangladesh?",
    answer: "Most residential solar installations (1-10kW) are completed within 1-2 days. This includes mounting the panels, installing the inverter, wiring, and testing. Net metering application and BPDB approval typically takes 2-4 weeks. Commercial installations (50kW+) may take 1-2 weeks. BD Solar Power offers fast-track installation with complete documentation support."
  },
  {
    question: "What is the ROI (payback period) for solar panels in Bangladesh?",
    answer: "The typical payback period for solar panels in Bangladesh is 3-4 years. A 5kW system saves approximately BDT 4,500-6,000 per month, meaning you recover your BDT 275,000 investment in about 4 years. After payback, you enjoy free electricity for the remaining 21+ years of the system's 25-year lifespan. Commercial systems with higher electricity rates often achieve ROI in just 3 years."
  },
  {
    question: "Do solar panels work during load shedding in Bangladesh?",
    answer: "Yes, but it depends on your system type. Grid-tied systems with net metering automatically shut off during power outages for safety (anti-islanding). However, hybrid systems with battery backup continue providing power during load shedding. BD Solar Power offers hybrid solutions with lithium batteries that can power essential loads for 4-8 hours during outages."
  },
  {
    question: "What warranties are available for solar panels in Bangladesh?",
    answer: "Tier-1 solar panels from brands like Trina, JA Solar, and REC come with 25-year performance warranty (guaranteeing 80%+ output) and 10-12 year product warranty. Inverters typically have 5-10 year warranty. BD Solar Power provides additional installation warranty and free maintenance for the first year. All components are genuine with verifiable warranty cards."
  },
  {
    question: "Can I get financing or EMI for solar panels in Bangladesh?",
    answer: "Yes! Several banks and financing options are available for solar installations in Bangladesh. IDCOL provides subsidized loans for rooftop solar with interest rates as low as 6%. Many banks offer EMI options with 3-5 year repayment periods. BD Solar Power partners with multiple financial institutions to provide easy EMI plans with minimal down payment."
  },
  {
    question: "How much roof space do I need for solar panels?",
    answer: "You need approximately 100 sq ft (10 sq meters) of roof space per 1kW of solar panels. A 5kW system requires about 500 sq ft (45 sq meters). Panels should ideally face south with minimal shading. BD Solar Power conducts free site surveys to assess your roof's solar potential and recommend the optimal system size for your space and electricity needs."
  }
];

// Generate FAQ structured data for SEO
export const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

const FAQSection = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white" id="faq">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about solar panels in Bangladesh
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 data-[state=open]:bg-emerald-50"
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-emerald-700 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;