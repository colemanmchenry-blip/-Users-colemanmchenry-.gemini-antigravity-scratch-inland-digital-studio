import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SERVICE_AREAS, STUDIO_INFO } from "@/data/agency";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(STUDIO_INFO.siteUrl),
  title: {
    default: "Inland Digital Studio | Web Design for Spokane Small Businesses",
    template: "%s",
  },
  description:
    "Modern, minimalist websites for Spokane, WA small businesses. Starter websites starting at $500, Professional builds starting at $850, and monthly care starting at $49/mo.",
  keywords: [
    "Spokane web design",
    "Spokane small business website",
    "Inland Northwest web developer",
    "affordable website design Spokane WA",
    "Spokane local SEO web design",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: STUDIO_INFO.siteUrl,
    siteName: STUDIO_INFO.name,
    title: "Inland Digital Studio | Spokane Small Business Web Design",
    description:
      "Conversion-focused websites for Spokane small businesses starting at $500. Explore interactive concept sites and transparent pricing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inland Digital Studio | Spokane Small Business Web Design",
    description:
      "Modern websites for Spokane small businesses starting at $500. Transparent pricing, local SEO, and interactive concept demos.",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('ids-theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})();`;

function buildLocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: STUDIO_INFO.name,
    description:
      "Small business web design and local SEO studio serving Spokane, Washington and the Inland Northwest.",
    url: STUDIO_INFO.siteUrl,
    email: STUDIO_INFO.email,
    priceRange: "$49 - $850+",
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website Design & Maintenance Packages",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Starter Website Package",
          price: "500",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Professional Website Package",
          price: "850",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Monthly Website Maintenance",
          price: "49",
          priceCurrency: "USD",
        },
      ],
    },
  };

  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildLocalBusinessSchema() }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
