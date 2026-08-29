import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
  name: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  systemSize?: string;
}

const reviews: Review[] = [
  {
    name: "Mohammad Rahman",
    location: "Gulshan, Dhaka",
    rating: 5,
    review: "Excellent solar installation service! My 5kW system was installed in just 2 days. Already saving BDT 4,500 per month on electricity bills. The team was professional and the net metering setup was hassle-free.",
    date: "2025-01-15",
    systemSize: "5kW"
  },
  {
    name: "Fatima Begum",
    location: "Chittagong",
    rating: 5,
    review: "Best investment I ever made for my home. BD Solar Power provided transparent pricing and excellent after-sales support. My electricity bill dropped by 70% after installing the 3kW rooftop system.",
    date: "2025-01-10",
    systemSize: "3kW"
  },
  {
    name: "Abdul Karim",
    location: "Dhanmondi, Dhaka",
    rating: 5,
    review: "Very satisfied with the commercial solar installation for my factory. The 50kW system is performing beyond expectations. ROI calculated at 3.5 years. Highly recommend BD Solar Power for industrial projects.",
    date: "2024-12-20",
    systemSize: "50kW"
  },
  {
    name: "Nasreen Ahmed",
    location: "Uttara, Dhaka",
    rating: 4,
    review: "Great experience overall. The team explained everything about net metering and government incentives. Installation was quick and clean. Only minor delay in documentation but resolved quickly.",
    date: "2024-12-15",
    systemSize: "5kW"
  },
  {
    name: "Rafiqul Islam",
    location: "Sylhet",
    rating: 5,
    review: "Outstanding service from consultation to installation. They helped me choose the right system size for my needs. The monitoring app is very useful to track daily generation. Saving BDT 6,000 monthly!",
    date: "2024-11-28",
    systemSize: "8kW"
  },
  {
    name: "Shirin Akhter",
    location: "Rajshahi",
    rating: 5,
    review: "Trustworthy company with genuine Tier-1 solar panels. 25-year warranty gives peace of mind. The installation team was punctual and respectful. Now enjoying uninterrupted power during load shedding!",
    date: "2024-11-15",
    systemSize: "3kW"
  }
];

// Generate Review structured data
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
      />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600">
            Join 500+ satisfied solar customers across Bangladesh
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <StarRating rating={5} />
            <span className="text-lg font-semibold text-gray-900">4.8/5</span>
            <span className="text-gray-600">(156 reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "{review.review}"
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  {review.systemSize && (
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                      {review.systemSize} System
                    </span>
                  )}
                  <span>{new Date(review.date).toLocaleDateString('en-BD', { 
                    year: 'numeric', 
                    month: 'short' 
                  })}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;