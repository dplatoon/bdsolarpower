import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits").regex(/^[0-9+\-\s]+$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters").optional().or(z.literal("")),
  location: z.string().min(1, "Please select a location"),
  systemSize: z.string().min(1, "Please select a system size"),
  message: z.string().trim().max(500, "Message must be less than 500 characters").optional()
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    location: "",
    systemSize: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const WHATSAPP_NUMBER = "8801711927755"; // BD Solar Power business WhatsApp

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleWhatsAppSubmit = () => {
    const validation = contactSchema.safeParse(formData);
    
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validation.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Please fix the errors",
        description: "Some fields need your attention",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Construct WhatsApp message
    const message = `🌞 *Solar Quote Request*

*Name:* ${encodeURIComponent(formData.name)}
*Phone:* ${encodeURIComponent(formData.phone)}
*Email:* ${formData.email ? encodeURIComponent(formData.email) : "Not provided"}
*Location:* ${encodeURIComponent(formData.location)}
*System Size:* ${encodeURIComponent(formData.systemSize)}
*Additional Info:* ${formData.message ? encodeURIComponent(formData.message) : "None"}

Sent from bdsolarpower.com`;

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Opening WhatsApp",
      description: "You'll be redirected to WhatsApp to complete your quote request"
    });

    setIsSubmitting(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleWhatsAppSubmit();
  };

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Get Your Free Solar Quote</h2>
          <p className="mt-4 text-lg text-gray-600">
            Fill out the form below and get instant response via WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-emerald-600" />
                Instant Quote Request
              </CardTitle>
              <CardDescription>
                Get a personalized solar system quote within minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleInputChange("location", value)}
                  >
                    <SelectTrigger className={errors.location ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dhaka">Dhaka</SelectItem>
                      <SelectItem value="Chittagong">Chittagong</SelectItem>
                      <SelectItem value="Sylhet">Sylhet</SelectItem>
                      <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                      <SelectItem value="Khulna">Khulna</SelectItem>
                      <SelectItem value="Barisal">Barisal</SelectItem>
                      <SelectItem value="Rangpur">Rangpur</SelectItem>
                      <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="systemSize">System Size *</Label>
                  <Select
                    value={formData.systemSize}
                    onValueChange={(value) => handleInputChange("systemSize", value)}
                  >
                    <SelectTrigger className={errors.systemSize ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select system size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1kW - Small Apartment">1kW - Small Apartment (BDT 85,000)</SelectItem>
                      <SelectItem value="3kW - Medium Home">3kW - Medium Home (BDT 195,000)</SelectItem>
                      <SelectItem value="5kW - Large Home">5kW - Large Home (BDT 275,000)</SelectItem>
                      <SelectItem value="10kW - Villa/Office">10kW - Villa/Office (BDT 500,000)</SelectItem>
                      <SelectItem value="20kW+ - Commercial">20kW+ - Commercial (Custom Quote)</SelectItem>
                      <SelectItem value="Not Sure">Not Sure - Need Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.systemSize && <p className="text-sm text-red-500">{errors.systemSize}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your rooftop area, current electricity bill, or any specific requirements..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className={errors.message ? "border-red-500" : ""}
                    rows={3}
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Opening WhatsApp..." : "Get Quote via WhatsApp"}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-2">
                  By clicking this button, you'll be redirected to WhatsApp with your details pre-filled
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle>Why Contact Us via WhatsApp?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Instant Response</h4>
                    <p className="text-sm text-gray-600">Get replies within minutes, not hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-emerald-100 p-2">
                    <Send className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Share Photos</h4>
                    <p className="text-sm text-gray-600">Send rooftop photos for accurate quotes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-amber-100 p-2">
                    <Phone className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Direct Communication</h4>
                    <p className="text-sm text-gray-600">Talk directly with our solar experts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-semibold">hello@bdsolarpower.com</p>
                    <p className="text-sm text-gray-600">Email for detailed inquiries</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Mymensingh, Bangladesh</p>
                    <p className="text-sm text-gray-600">Service available nationwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">🌞 Special Offer!</h3>
                <p className="text-emerald-50">
                  Get <span className="font-bold">FREE site survey</span> worth BDT 5,000 when you request a quote this week!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
