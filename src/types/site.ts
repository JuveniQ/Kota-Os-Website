export type NavItem = {
  label: string;
  href: string;
};

export type HeroMetric = {
  label: string;
  value: string;
};

export type FeatureItem = {
  id: string;
  icon: "shopping-cart" | "package" | "bar-chart";
  iconColor: "primary" | "success" | "warning";
  title: string;
  description: string;
  points: string[];
};

export type StepItem = {
  id: string;
  step: string;
  title: string;
  description: string;
  visualTitle: string;
  visualPoints: string[];
};

export type ScreenshotSlide = {
  id: string;
  headline: string;
  cta?: string;
  points: string[];
  visualKpis: { label: string; value: string }[];
};

export type BenefitItem = {
  id: string;
  icon:
    | "wifi-off"
    | "lock"
    | "zap"
    | "download"
    | "users"
    | "sync";
  iconColor: "primary" | "success" | "warning";
  title: string;
  description: string;
};

export type TrustStat = {
  id: string;
  value: string;
  label: string;
  tone: "primary" | "success";
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  stars: 5;
};

export type PricingTier = {
  title: string;
  badge: string;
  price: string;
  period: string;
  description: string;
  includes: string[];
  legalNote: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ReleaseNote = {
  version: string;
  date: string;
  summary: string;
  features: string[];
  fixes: string[];
};

export type DonationTier = {
  id: string;
  title: string;
  amount: string;
  description: string;
};

export type DownloadMeta = {
  version: string;
  size: string;
  releaseDate: string;
  apkUrl: string;
  checksumSha256: string;
  androidCompatibility: string;
  playProtectNote: string;
};

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
};
