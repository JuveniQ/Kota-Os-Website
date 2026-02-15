import type { DonationTier, DownloadMeta, NavItem } from "@/types/site";

export const SITE_URL = "https://kotaos.juveniq.co.za";

export const SITE_META = {
  name: "Kota-OS",
  title: "Kota-OS | Point of Sale System for Food Vendors",
  description:
    "Fast, offline-first POS system for township fast-food vendors. Real-time inventory, beautiful reports, and a full 30-day free trial.",
  keywords: [
    "Kota-OS",
    "POS system",
    "point of sale",
    "inventory management",
    "offline POS",
    "food business software"
  ],
  version: "1.0.3"
};

export const CONTACT_INFO = {
  email: "contact@juveniq.co.za",
  primaryPhone: "+27 607431268",
  secondaryPhone: "+27 783322419",
  phone: "+27 607431268",
  location: "Gauteng, Johannesburg",
  businessHours: "Monday to Sunday, 06:00 - 21:00",
  supportSla: "Urgent support responses typically within 4 hours."
};

export const LEGAL_INFO = {
  responsibleParty: "JuveniQ (trading as Kota-OS)",
  companyRegistrationNumber: "K2025/699085/07"
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Download", href: "/download" }
];

export const PRIMARY_CTA = {
  label: "Start 30-Day Trial",
  href: "/download"
};

export const SECONDARY_CTA = {
  label: "Start 30-Day Free Trial",
  href: "/download"
};

export const DOWNLOAD_META: DownloadMeta = {
  version: "1.0.3",
  size: "134.86 MB",
  releaseDate: "February 09, 2026",
  apkUrl: "/assets/Kota-OS%20v1.0.3.apk",
  checksumSha256: "B787FB6AF71AAC436AE373BA54BCE0D0DD6BA7833D076EE18F75E0FBD06EF0F2",
  androidCompatibility: "Android 8.0 and above",
  playProtectNote:
    "This APK is not verified by Google Play Protect yet. Download only from official Kota-OS channels."
};

export const DONATION_TIERS: DonationTier[] = [
  {
    id: "tip",
    title: "Tip",
    amount: "R5",
    description: "Buy the team a coffee and help keep support affordable."
  },
  {
    id: "supporter",
    title: "Supporter",
    amount: "R50",
    description: "Support weekly maintenance and small improvements."
  },
  {
    id: "champion",
    title: "Champion",
    amount: "R150",
    description: "Help fund new features for township businesses."
  },
  {
    id: "legend",
    title: "Legend",
    amount: "R500+",
    description: "Sponsor long-term roadmap work and expansion."
  }
];

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Screenshots", href: "/#screenshots" },
    { label: "Updates", href: "/updates" }
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog (Coming Soon)", href: "/updates" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" }
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "User Agreement", href: "/terms-of-service#user-agreement" },
    { label: "Contact Security", href: "/security" }
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
    { label: "Twitter", href: "https://x.com", external: true },
    { label: "Facebook", href: "https://www.facebook.com", external: true }
  ]
};
