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
    name: "Kota-OS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android",
    offers: {
      "@type": "Offer",
      price: "399",
      priceCurrency: "ZAR",
      description: "One-time professional device license after 14-day trial"
    },
    description: SITE_META.description,
    url: canonicalUrl(path),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "257"
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
    telephone: CONTACT_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT_INFO.location,
      addressCountry: "ZA"
    }
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
