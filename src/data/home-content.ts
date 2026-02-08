import type {
  BenefitItem,
  FaqItem,
  FeatureItem,
  HeroMetric,
  ReleaseNote,
  ScreenshotSlide,
  StepItem,
  Testimonial,
  TrustStat
} from "@/types/site";

export const HERO_METRICS: HeroMetric[] = [
  { label: "Active Users", value: "1,000+" },
  { label: "Transactions Tracked", value: "50,000+" },
  { label: "Average Checkout Speed", value: "3 sec" }
];

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "sales",
    icon: "shopping-cart",
    iconColor: "primary",
    title: "Lightning-Fast Sales Entry",
    description:
      "Process orders in seconds with multi-item customization and ingredient adjustments.",
    points: [
      "Multiple payment methods (Cash, Card, EFT)",
      "Custom ingredient add, remove, or extra",
      "Order history and tracking"
    ]
  },
  {
    id: "inventory",
    icon: "package",
    iconColor: "success",
    title: "Real-Time Inventory Management",
    description:
      "Track stock levels, set reorder alerts, and avoid running out of critical items.",
    points: [
      "Automatic deductions on each sale",
      "Low-stock warnings",
      "Detailed transaction logging"
    ]
  },
  {
    id: "reports",
    icon: "bar-chart",
    iconColor: "warning",
    title: "Beautiful Sales Analytics",
    description:
      "Export professional PDF reports with daily, weekly, and monthly breakdowns.",
    points: [
      "Payment method breakdown",
      "Top-selling items analysis",
      "Hourly sales distribution"
    ]
  }
];

export const HOW_IT_WORKS: StepItem[] = [
  {
    id: "setup",
    step: "1",
    title: "Create Your Account",
    description:
      "Enter your shop name and activate your license with a simple voucher.",
    visualTitle: "Account Setup",
    visualPoints: ["Shop details", "Voucher redemption", "Device binding"]
  },
  {
    id: "configure",
    step: "2",
    title: "Build Your Menu",
    description:
      "Add menu items, ingredients, and set prices with templates or from scratch.",
    visualTitle: "Menu Configuration",
    visualPoints: ["Category setup", "Ingredient mapping", "Price controls"]
  },
  {
    id: "operate",
    step: "3",
    title: "Start Selling",
    description:
      "Process orders, manage inventory, and view live reports, even while offline.",
    visualTitle: "Daily Operation",
    visualPoints: ["Fast checkout", "Stock sync", "Report exports"]
  }
];

export const SCREENSHOT_SLIDES: ScreenshotSlide[] = [
  {
    id: "dashboard",
    headline: "Dashboard at a Glance",
    cta: "Explore Dashboard",
    points: [
      "Today's sales card with quick performance visibility",
      "Shortcut actions for New Sale and Inventory",
      "Today's orders list with clear status indicators"
    ],
    imageSrc: "/home.jpeg",
    imageAlt:
      "Kota-OS home dashboard showing today's sales, new sale and inventory shortcuts, and today's order cards"
  },
  {
    id: "new-sale",
    headline: "Fast Order Processing",
    cta: "Try Sale Entry",
    points: [
      "Search and category tabs speed up item selection",
      "Grid-based menu cards show item images and prices",
      "Optimized for high-speed tap-to-add checkout flow"
    ],
    imageSrc: "/new_sale.jpeg",
    imageAlt:
      "Kota-OS New Sale screen with searchable menu categories and item cards for quick order capture"
  },
  {
    id: "manage-items",
    headline: "Menu Management at Scale",
    points: [
      "Search menu items by name or category",
      "Edit and delete actions are available per item",
      "Manage tab keeps menu updates organized in one place"
    ],
    imageSrc: "/manage.jpeg",
    imageAlt:
      "Kota-OS Manage screen listing menu items with edit and delete controls"
  },
  {
    id: "create-item",
    headline: "Create Menu Items in Seconds",
    points: [
      "Structured form for name, price, category, and image",
      "Ingredient selection can be attached before saving",
      "Clear action buttons keep data entry straightforward"
    ],
    imageSrc: "/create-menu-item.jpeg",
    imageAlt:
      "Kota-OS create menu item form with fields for pricing, category, image, and ingredients"
  },
  {
    id: "reports",
    headline: "Professional Reports",
    points: [
      "Daily, weekly, and monthly views are available",
      "Top-selling items and category sales are summarized",
      "Export PDF action is accessible directly in reports"
    ],
    imageSrc: "/reports.jpeg",
    imageAlt:
      "Kota-OS reports screen showing summary tabs, top selling items, category sales, and export PDF button"
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: "offline",
    icon: "wifi-off",
    iconColor: "primary",
    title: "Works Without Internet",
    description: "Keep selling even when connectivity is unreliable."
  },
  {
    id: "secure",
    icon: "lock",
    iconColor: "success",
    title: "Enterprise Security",
    description:
      "Device-bound licensing with rollback detection prevents tampering."
  },
  {
    id: "quick",
    icon: "zap",
    iconColor: "warning",
    title: "Get Started in Minutes",
    description:
      "No server setup and no complex configuration. Install and start."
  },
  {
    id: "reports",
    icon: "download",
    iconColor: "primary",
    title: "Export Anytime",
    description:
      "Generate polished PDF reports with clear metrics and breakdowns."
  },
  {
    id: "multi-user",
    icon: "users",
    iconColor: "success",
    title: "Share Device",
    description: "Multiple operators can run sales on the same licensed device."
  },
  {
    id: "sync",
    icon: "sync",
    iconColor: "warning",
    title: "Cloud Backup",
    description: "Optional sync supports backup and multi-branch operations."
  }
];

export const TRUST_STATS: TrustStat[] = [
  { id: "users", value: "1,000+", label: "Active Users", tone: "primary" },
  {
    id: "transactions",
    value: "50,000+",
    label: "Transactions Tracked",
    tone: "primary"
  },
  { id: "uptime", value: "99.9%", label: "Uptime", tone: "success" },
  { id: "support", value: "24/7", label: "Support", tone: "primary" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "thembi",
    quote:
      "Kota-OS cut my order processing time in half. Simple and reliable.",
    author: "Thembi M.",
    role: "Food Vendor",
    stars: 5
  },
  {
    id: "sipho",
    quote: "Real-time inventory saved me thousands in wasted stock.",
    author: "Sipho K.",
    role: "Restaurant Owner",
    stars: 5
  },
  {
    id: "zama",
    quote: "The offline functionality is a game-changer in my area.",
    author: "Zama L.",
    role: "Fast Food Store",
    stars: 5
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "offline",
    question: "Do I need internet to use Kota-OS?",
    answer:
      "No. Kota-OS works completely offline. Data can sync automatically when a connection is available."
  },
  {
    id: "license",
    question: "How does licensing work?",
    answer:
      "Kota-OS uses a one-time, device-bound license model. You can start with a 14-day trial, then activate with a voucher."
  },
  {
    id: "users",
    question: "Can multiple users operate on one device?",
    answer:
      "Yes. Multiple users can operate one installation, while data remains shared at store level."
  },
  {
    id: "lost-device",
    question: "What if I lose my device?",
    answer:
      "If cloud sync is enabled, data recovery is possible. Because licenses are device-specific, a new device requires a new license."
  },
  {
    id: "fees",
    question: "Does Kota-OS charge per transaction or per user?",
    answer:
      "No. There are no per-transaction or per-user fees. Kota-OS is purchased as a one-time license after trial."
  },
  {
    id: "receipt",
    question: "Can Kota-OS print receipts?",
    answer:
      "Receipt printing is in active development and will be released in an upcoming update."
  },
  {
    id: "cloud",
    question: "Is cloud backup available?",
    answer:
      "Cloud backup and multi-device sync are rolling out soon. Current releases prioritize secure local-first operations."
  },
  {
    id: "support-community",
    question: "What support is available?",
    answer:
      "We provide 24/7 email support. We are also building an anonymous community article hub so vendors can help each other."
  }
];

export const QUICK_START_STEPS: string[] = [
  "Download the official APK from the Kota-OS Download page.",
  "Install the app and grant required permissions.",
  "Create your shop profile and configure your store details.",
  "Add menu items, ingredients, and pricing.",
  "Run your first sale and verify inventory deduction.",
  "Activate your license before the 14-day trial ends."
];

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "1.2.0",
    date: "January 18, 2026",
    summary:
      "Performance-focused release improving sale flow speed and inventory reliability.",
    features: [
      "Faster order entry interactions",
      "Expanded report export options",
      "Improved low-stock alert clarity"
    ],
    fixes: [
      "Resolved intermittent sync delays after reconnect",
      "Fixed cart customization edge cases",
      "Improved stability on lower-memory devices"
    ]
  },
  {
    version: "1.1.0",
    date: "November 03, 2025",
    summary:
      "Major quality update with reporting enhancements and usability improvements.",
    features: [
      "New weekly and monthly report layouts",
      "Improved ingredient adjustment workflow",
      "Refined onboarding and license prompts"
    ],
    fixes: [
      "Fixed inventory history sorting bug",
      "Corrected EFT payment summary totals",
      "Improved startup performance"
    ]
  },
  {
    version: "1.0.0",
    date: "August 22, 2025",
    summary:
      "Initial production release delivering full offline-first POS capability.",
    features: [
      "Sales, inventory, and reporting core modules",
      "Device-bound licensing and voucher activation",
      "Offline operation with local data integrity"
    ],
    fixes: [
      "Baseline stability and release hardening",
      "Input validation across key workflows",
      "Improved transaction persistence reliability"
    ]
  }
];

