import type {
  BenefitItem,
  FaqItem,
  FeatureItem,
  HeroMetric,
  ReleaseNote,
  ScreenshotSlide,
  StepItem,
} from "@/types/site";

export const HERO_METRICS: HeroMetric[] = [
  { label: "Sales", value: "Offline" },
  { label: "Stock", value: "Recipe-level" },
  { label: "Alerts", value: "Low stock" }
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
      "Enter your shop name and complete onboarding in minutes.",
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
      "Secure local-first controls with rollback detection prevent tampering."
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
    description: "Multiple operators can run sales on the same device."
  },
  {
    id: "sync",
    icon: "sync",
    iconColor: "warning",
    title: "Cloud Backup",
    description: "Optional sync supports backup and multi-branch operations."
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
    id: "trial",
    question: "How does the 14-day trial work?",
    answer:
      "Your 14-day trial starts at account registration. Plans are shown in the app before purchase; the available payment method depends on your installation channel."
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
      "If cloud sync is enabled, data recovery is possible. We recommend enabling backup early to keep your operational data safe."
  },
  {
    id: "pricing",
    question: "Is Kota-OS free to use?",
    answer:
      "The app has a 14-day trial. After that, continued premium access requires a plan; see the options shown in your app before making a purchase."
  },
  {
    id: "devices",
    question: "How many devices can I use?",
    answer: "One verified account can link up to three active devices. If you need more, request another device from support in the app."
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
      "Contact our support team by email or WhatsApp for installation and account help."
  }
];

export const QUICK_START_STEPS: string[] = [
  "Request access through the Kota-OS Gauteng pilot page.",
  "Install the app and grant required permissions.",
  "Create your shop profile and configure your store details.",
  "Add menu items, ingredients, and pricing.",
  "Run your first sale and verify inventory deduction.",
  "Use the 14-day trial and review the plans available in your app."
];

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "1.0.3",
    date: "February 09, 2026",
    summary:
      "Reliability and reporting upgrade focused on offline licensing, search speed, and export consistency.",
    features: [
      "Offline-safe access checks",
      "Clearer order status labels",
      "Faster order search",
      "Inventory adjustment notes",
      "Improved report exports"
    ],
    fixes: [
      "CSV export line wrapping",
      "Currency symbol display in exports",
      "Corrected low-stock badge counts"
    ]
  },
  {
    version: "1.0.2",
    date: "February 01, 2026",
    summary:
      "Workflow refinement release for checkout speed and order list usability.",
    features: [
      "Compact order list view",
      "Customizable default payment method",
      "Daily summary widgets"
    ],
    fixes: [
      "Checkout sheet gesture edge cases"
    ]
  },
  {
    version: "1.0.1",
    date: "January 01, 2026",
    summary: "Initial public release of Kota-OS for township fast-food vendors.",
    features: [
      "Initial public release",
      "New Sale, Inventory, Reports, Settings"
    ],
    fixes: []
  }
];

