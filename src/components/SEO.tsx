import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { authors } from '@/data/authors';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  breadcrumbs?: BreadcrumbItem[];
  articleHeadline?: string;
  faqSchema?: object;
  extraSchemas?: object[];
  noIndex?: boolean;
}

// Social crawlers require absolute image URLs; blog hero images are imported
// assets that resolve to relative "/assets/..." paths, so normalize them here.
const DEFAULT_OG_IMAGE = '/og/default.jpg';

const toAbsoluteUrl = (url: string) =>
  url.startsWith('http') ? url : `https://bdsolarpower.com${url.startsWith('/') ? '' : '/'}${url}`;

// Page name mapping for automatic breadcrumb generation
const pageNameMap: Record<string, string> = {
  '': 'Home',
  'dashboard': 'Solar Dashboard',
  'ai-tools': 'AI Tools',
  'investors': 'Investors',
  'learn': 'Learn',
  'blog': 'Blog',
  'auth': 'Login',
  'my-dashboard': 'My Dashboard',
};

// Generate breadcrumb schema from path or custom breadcrumbs
const generateBreadcrumbSchema = (pathname: string, customBreadcrumbs?: BreadcrumbItem[]) => {
  const baseUrl = 'https://bdsolarpower.com';
  
  if (customBreadcrumbs && customBreadcrumbs.length > 0) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": customBreadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${baseUrl}${item.path}`
      }))
    };
  }

  // Auto-generate from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ];

  let currentPath = '';
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    const pageName = pageNameMap[part] || part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": pageName,
      "item": `${baseUrl}${currentPath}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };
};

// Single canonical business entity for the whole domain.
// NOTE: aggregateRating and Review markup are deliberately absent — self-serving
// review markup is against Google's guidelines and we have no review system yet.
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://bdsolarpower.com/#organization",
  "name": "BD Solar Power",
  "alternateName": "Bangladesh Solar Power Solutions",
  "description": "Solar panel installation company in Bangladesh offering rooftop solar systems, commercial solar solutions, and net metering services from Mymensingh, nationwide.",
  "url": "https://bdsolarpower.com",
  "telephone": "+880-1711-927755",
  "email": "hello@bdsolarpower.com",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Mymensingh",
    "addressLocality": "Mymensingh",
    "addressRegion": "Mymensingh Division",
    "postalCode": "2200",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "24.7535",
    "longitude": "90.4065"
  },
  "areaServed": { "@type": "Country", "name": "Bangladesh" },
  "serviceArea": [
    { "@type": "AdministrativeArea", "name": "Mymensingh Division" },
    { "@type": "AdministrativeArea", "name": "Dhaka Division" },
    { "@type": "AdministrativeArea", "name": "Chattogram Division", "alternateName": "Chittagong Division" },
    { "@type": "AdministrativeArea", "name": "Sylhet Division" },
    { "@type": "AdministrativeArea", "name": "Rajshahi Division" },
    { "@type": "AdministrativeArea", "name": "Khulna Division" }
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
  "paymentAccepted": "Cash, Bank Transfer, EMI, bKash, Nagad",
  "logo": { "@id": "https://bdsolarpower.com/#logo" },
  "image": { "@id": "https://bdsolarpower.com/#logo" },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+880-1711-927755",
    "email": "hello@bdsolarpower.com",
    "contactType": "customer service",
    "availableLanguage": ["Bengali", "English"],
    "areaServed": "BD"
  },
  "sameAs": [
    "https://facebook.com/bdsolarpower",
    "https://twitter.com/bdsolarpower",
    "https://linkedin.com/company/bdsolarpower",
    "https://youtube.com/@bdsolarpower"
  ],
  "knowsAbout": ["Solar Energy", "Renewable Energy", "Net Metering Policy Bangladesh", "3000 MW Solar Program"]
};

// Logo node referenced by @id from every other node
export const logoSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "https://bdsolarpower.com/#logo",
  "url": "https://bdsolarpower.com/logo.png",
  "contentUrl": "https://bdsolarpower.com/logo.png",
  "width": 512,
  "height": 512,
  "caption": "BD Solar Power"
};

// Site-level entity (enables sitelinks searchbox + inLanguage anchoring)
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://bdsolarpower.com/#website",
  "url": "https://bdsolarpower.com",
  "name": "BD Solar Power",
  "inLanguage": "en-BD",
  "publisher": { "@id": "https://bdsolarpower.com/#organization" }
};

export const SEO = ({ 
  title, 
  description, 
  keywords = "solar panel Bangladesh, solar panel price Bangladesh 2026, rooftop solar installation Bangladesh, solar energy Bangladesh, net metering Bangladesh, solar system price, 5kW solar system Bangladesh, solar panel Dhaka, solar panel Chittagong, commercial solar Bangladesh, 3000 MW solar program Bangladesh, solar loan Bangladesh EMI, monocrystalline solar panel Bangladesh, off grid solar system Bangladesh, solar panel installation cost Bangladesh",
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageWidth,
  ogImageHeight,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = "BD Solar Power",
  breadcrumbs,
  articleHeadline,
  faqSchema,
  extraSchemas,
  noIndex = false
}: SEOProps) => {
  const location = useLocation();
  const suffixedTitle = `${title} | BD Solar Power`;
  // Stay inside Google's ~60-character display limit: drop the suffix for long
  // titles rather than truncating the page's own words.
  const fullTitle = suffixedTitle.length <= 60 ? suffixedTitle : title;
  const baseUrl = 'https://bdsolarpower.com';
  const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  const absoluteOgImage = toAbsoluteUrl(ogImage);
  const ogWidth = ogImageWidth ?? 1200;
  const ogHeight = ogImageHeight ?? 630;
  
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(location.pathname, breadcrumbs);

  // Generate Article schema for blog/article pages
  const articleSchema = type === 'article' ? {
    "@type": "Article",
    "headline": articleHeadline || title,
    "description": description,
    "author": {
      "@type": "Person",
      "@id": `${baseUrl}/#author-${author.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      "name": author,
      "jobTitle": authors[author]?.title ?? "Solar Energy Analyst",
      ...(authors[author]?.bio ? { "description": authors[author].bio } : {}),
      "knowsAbout": [
        "Solar panel pricing in Bangladesh",
        "Net metering policy (BPDB)",
        "Rooftop solar installation",
        "Solar financing and ROI"
      ],
      "worksFor": { "@id": `${baseUrl}/#organization` },
      "sameAs": [
        "https://linkedin.com/company/bdsolarpower",
        "https://facebook.com/bdsolarpower"
      ]
    },
    "publisher": { "@id": `${baseUrl}/#organization` },
    "mainEntityOfPage": { "@id": `${currentUrl}#webpage` },
    "image": absoluteOgImage,
    ...(publishedTime && { "datePublished": publishedTime }),
    ...(modifiedTime && { "dateModified": modifiedTime })
  } : null;


  const webPageSchema = {
    "@type": type === 'article' ? "ItemPage" : "WebPage",
    "@id": `${currentUrl}#webpage`,
    "url": currentUrl,
    "name": fullTitle,
    "description": description,
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "about": { "@id": `${baseUrl}/#organization` },
    "inLanguage": "en-BD",
    "breadcrumb": { "@id": `${currentUrl}#breadcrumb` }
  };

  // Single @graph — one entity per @id, everything cross-referenced
  const stripContext = (node: object) => {
    const { ["@context"]: _ignored, ...rest } = node as Record<string, unknown>;
    return rest;
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      // organization / website / logo nodes are emitted once in index.html
      // (same @id values, so consumers merge them with the nodes below)
      webPageSchema,
      { ...stripContext(breadcrumbSchema), "@id": `${currentUrl}#breadcrumb` },
      ...(articleSchema ? [articleSchema] : []),
      ...(faqSchema ? [stripContext(faqSchema)] : []),
      ...(extraSchemas ?? []).map(stripContext),
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content={String(ogWidth)} />
      <meta property="og:image:height" content={String(ogHeight)} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="BD Solar Power" />
      <meta property="og:locale" content="en_BD" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:site" content="@bdsolarpower" />
      <meta name="twitter:creator" content="@bdsolarpower" />

      {/* Article specific tags */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Solar Energy" />
        </>
      )}

      {/* Additional SEO tags */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* JSON-LD Structured Data (single graph) */}
      <script type="application/ld+json">
        {JSON.stringify(graph).replace(/</g, '\\u003c')}
      </script>
    </Helmet>
  );
};
