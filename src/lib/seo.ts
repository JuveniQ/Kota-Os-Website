import { CONTACT_INFO, SITE_META, SITE_URL } from "@/data/site-config";
import type { FaqItem } from "@/types/site";

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function canonicalUrl(path: string) {
  const normalized = normalizePath(path);
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}

export function softwareApplicationSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "Kota-OS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android",
    description: SITE_META.description,
    url: canonicalUrl(path),
    offers: {
      "@type": "Offer",
      name: "14-Day Trial",
      price: "0",
      priceCurrency: "ZAR",
      url: `${SITE_URL}/download`,
      description: "14-day trial begins at registration; pilot access is guided."
    }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kota-OS",
    url: SITE_URL,
    email: CONTACT_INFO.email,
    telephone: [CONTACT_INFO.primaryPhone, CONTACT_INFO.secondaryPhone],
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT_INFO.location,
      addressCountry: "ZA"
    }
  };
}

export function localBusinessSchema(path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Kota-OS (JuveniQ)",
    url: canonicalUrl(path),
    email: CONTACT_INFO.email,
    telephone: [CONTACT_INFO.primaryPhone, CONTACT_INFO.secondaryPhone],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Johannesburg",
      addressRegion: "Gauteng",
      addressCountry: "ZA"
    },
    areaServed: "Gauteng"
  };
}

export function faqPageSchema(path: string, items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: canonicalUrl(path),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function defaultMeta(path: string) {
  return {
    title: SITE_META.title,
    description: SITE_META.description,
    keywords: SITE_META.keywords,
    canonical: canonicalUrl(path)
  };
}
