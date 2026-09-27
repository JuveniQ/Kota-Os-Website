import type { DonationTier, NavItem } from "@/types/site";

export const SITE_URL = "https://kotaos.juveniq.co.za";

export const SITE_META = {
  name: "Kota-OS",
  title: "Kota-OS | Point of Sale System for Food Vendors",
  description:
    "Offline food-business operations for township vendors: ingredient tracking, low-stock alerts, sales reports and a 14-day trial.",
  keywords: [
    "Kota-OS",
    "POS system",
    "point of sale",
    "inventory management",
    "offline POS",
    "food business software"
  ]
};

export const CONTACT_INFO = {
  email: "contact@juveniq.co.za",
  primaryPhone: "+27 607431268",
  secondaryPhone: "+27 783322419",
  phone: "+27 607431268",
  location: "Gauteng, Johannesburg",
  businessHours: "Monday to Sunday, 06:00 - 21:00",
  supportSla: "Pilot onboarding by appointment; arrange a support window before your first service."
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
  label: "Join Gauteng Pilot",
  href: "/download"
};

export const SECONDARY_CTA = {
  label: "Join Gauteng Pilot",
  href: "/download"
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
    { label: "JuveniQ legal and policies", href: "https://juveniq.co.za/legal" },
    { label: "Contact Security", href: "/security" }
  ]
};
