import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  includeLocalBusiness?: boolean;
}

// LocalBusiness structured data for Bangladesh solar company
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://bdsolarpower.com/#localbusiness",
  "name": "BD Solar Power",
  "alternateName": "Bangladesh Solar Power Solutions",
  "description": "Leading solar panel installation company in Bangladesh offering rooftop solar systems, commercial solar solutions, and net metering services across Dhaka, Chittagong, and nationwide.",
  "url": "https://bdsolarpower.com",
  "telephone": "+880-1234-567890",
  "email": "info@bdsolarpower.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "House 45, Road 12, Gulshan-2",
    "addressLocality": "Dhaka",
    "addressRegion": "Dhaka Division",
    "postalCode": "1212",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.7934",
    "longitude": "90.4146"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Bangladesh"
    },
    {
      "@type": "City",
      "name": "Dhaka"
    },
    {
      "@type": "City",
      "name": "Chittagong"
    },
    {
      "@type": "City",
      "name": "Sylhet"
    },
    {
      "@type": "City",
      "name": "Rajshahi"
    },
    {
      "@type": "City",
      "name": "Khulna"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "৳৳৳",
  "currenciesAccepted": "BDT",
  "paymentAccepted": "Cash, Bank Transfer, EMI, Mobile Banking",
  "image": [
    "https://bdsolarpower.com/images/solar-installation-dhaka.jpg",
    "https://bdsolarpower.com/images/rooftop-solar-bangladesh.jpg"
  ],
  "logo": "https://bdsolarpower.com/logo.png",
  "sameAs": [
    "https://facebook.com/bdsolarpower",
    "https://twitter.com/bdsolarpower",
    "https://linkedin.com/company/bdsolarpower",
    "https://youtube.com/@bdsolarpower"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Solar Energy Solutions",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Rooftop Solar Installation",
          "description": "Complete rooftop solar panel installation for homes and businesses in Bangladesh"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Net Metering Setup",
          "description": "BPDB approved net metering installation and configuration"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Commercial Solar Solutions",
          "description": "Large-scale solar installations for factories and commercial buildings"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Solar System Maintenance",
          "description": "Regular maintenance and monitoring services for solar installations"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Mohammad Rahman"
      },
      "reviewBody": "Excellent solar installation service in Dhaka. Professional team and great after-sales support."
    }
  ]
};

// Organization schema for brand recognition
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BD Solar Power",
  "url": "https://bdsolarpower.com",
  "logo": "https://bdsolarpower.com/logo.png",
  "description": "Bangladesh's trusted solar energy solutions provider",
  "foundingDate": "2020",
  "foundingLocation": "Dhaka, Bangladesh",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+880-1234-567890",
    "contactType": "customer service",
    "availableLanguage": ["Bengali", "English"],
    "areaServed": "BD"
  }
};

export const SEO = ({ 
  title, 
  description, 
  keywords = "solar panel Bangladesh, solar panel price Bangladesh 2025, rooftop solar installation Bangladesh, solar energy Bangladesh, net metering Bangladesh, solar system price, 5kW solar system Bangladesh, solar panel Dhaka, solar panel Chittagong, commercial solar Bangladesh, 3000 MW solar program Bangladesh, solar loan Bangladesh EMI, monocrystalline solar panel Bangladesh, off grid solar system Bangladesh, solar panel installation cost Bangladesh",
  canonicalUrl,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  type = 'website',
  publishedTime,
  author = "BD Solar Power",
  includeLocalBusiness = true
}: SEOProps) => {
  const fullTitle = `${title} | BD Solar Power`;
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />

      {/* Geo Tags for Bangladesh */}
      <meta name="geo.region" content="BD" />
      <meta name="geo.placename" content="Dhaka, Bangladesh" />
      <meta name="geo.position" content="23.7934;90.4146" />
      <meta name="ICBM" content="23.7934, 90.4146" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="BD Solar Power" />
      <meta property="og:locale" content="en_BD" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@bdsolarpower" />

      {/* Article specific tags */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Solar Energy" />
        </>
      )}

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* JSON-LD Structured Data */}
      {includeLocalBusiness && (
        <>
          <script type="application/ld+json">
            {JSON.stringify(localBusinessSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
        </>
      )}
    </Helmet>
  );
};
