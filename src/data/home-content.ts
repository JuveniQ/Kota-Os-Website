import type {
  BenefitItem,
  FaqItem,
  FeatureItem,
  HeroMetric,
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
      "Order history and tracking",
      "Print receipts for completed sales"
    ]
  },
  {
    id: "inventory",
    icon: "package",
    iconColor: "success",
    title: "Real-Time Inventory Management",
    description:
      "Map recipe ingredients to sales, record wastage and spot low stock before the next rush.",
    points: [
      "Recipe-level deductions on each sale",
      "Waste and low-stock visibility",
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
    visualPoints: ["Fast checkout", "Ingredient usage", "Report exports"]
  }
];

export const SCREENSHOT_SLIDES: ScreenshotSlide[] = [
  {
    id: "onboarding-welcome",
    headline: "Built for Busy Food Businesses",
    cta: "Download Kota-OS",
    points: [
      "Guided onboarding gets a new shop started without complex setup",
      "Sales, stock and profit tools are introduced before configuration",
      "Core shop operations remain available locally when connectivity drops after setup"
    ],
    imageSrc: "/20261004-201410.926-5.jpg",
    imageAlt:
      "Kota-OS onboarding welcome screen introducing sales, stock control and profit insight for food businesses"
  },
  {
    id: "shop-setup",
    headline: "Set Up Your Shop Your Way",
    points: [
      "Choose the business type that best matches the shop",
      "Start quickly with the recommended Kota Starter Setup",
      "Experienced operators can start blank and build their own menu and stock structure"
    ],
    imageSrc: "/20261004-201410.926-4.jpg",
    imageAlt:
      "Kota-OS shop setup screen with business type choices and starter or blank setup options"
  },
  {
    id: "account-verification",
    headline: "Secure Account Verification",
    points: [
      "Verify ownership before the account is used on a shop device",
      "Email verification is available directly during onboarding",
      "Clear verification steps keep account setup understandable"
    ],
    imageSrc: "/20261004-201410.926-7.jpg",
    imageAlt:
      "Kota-OS account verification screen showing email verification during onboarding"
  },
  {
    id: "orders-dashboard",
    headline: "Run Today’s Orders from One Screen",
    cta: "Try Kota-OS",
    points: [
      "See sales, active orders and low-stock status at a glance",
      "Start a new order or jump to inventory with one tap",
      "Complete or cancel active orders directly from the order list"
    ],
    imageSrc: "/20261004-201410.926-8.jpg",
    imageAlt:
      "Kota-OS home screen showing daily sales, active orders, low-stock status and order actions"
  },
  {
    id: "dark-dashboard",
    headline: "Comfortable in Light or Dark",
    points: [
      "Dark mode keeps the same operational dashboard and shortcuts",
      "Sales, order and low-stock information stays visible during service",
      "Responsive layouts remain focused on fast daily shop work"
    ],
    imageSrc: "/20261004-201410.926-3.jpg",
    imageAlt:
      "Kota-OS home dashboard in dark mode with sales, orders, low-stock status and order cards"
  },
  {
    id: "inventory",
    headline: "Inventory You Can Act On",
    points: [
      "See total items, low-stock and out-of-stock counts immediately",
      "Search ingredients and filter by stock health",
      "Review current stock, reorder levels and recent restock dates per ingredient"
    ],
    imageSrc: "/20261004-201410.926-6.jpg",
    imageAlt:
      "Kota-OS inventory screen showing stock summary cards, ingredient search, filters and reorder information"
  },
  {
    id: "manage",
    headline: "Keep Menu and Stock Setup Organised",
    points: [
      "Manage menu items and ingredients from one clear workspace",
      "See item and ingredient counts before opening a management area",
      "Keep catalogue maintenance separate from the service workflow"
    ],
    imageSrc: "/20261004-201410.926-1.jpg",
    imageAlt:
      "Kota-OS Manage screen with menu and ingredient management cards"
  },
  {
    id: "reports",
    headline: "Reports Built for Daily Decisions",
    points: [
      "Switch between daily, weekly and monthly reporting periods",
      "Review total sales, order count and average order value",
      "Export reports to PDF directly from the reporting screen"
    ],
    imageSrc: "/20261004-201410.926-2.jpg",
    imageAlt:
      "Kota-OS reports screen showing daily summary metrics and PDF export"
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
    title: "Account Protection",
    description:
      "Verified sign-in and device limits protect access to your shop."
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
    title: "One Shop Device",
    description: "Keep one operating device for your shop and export a backup after each service."
  },
  {
    id: "sync",
    icon: "sync",
    iconColor: "warning",
    title: "Work Through Outages",
    description: "Keep recording sales locally and export a backup regularly."
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "offline",
    question: "Do I need internet to use Kota-OS?",
    answer:
      "Core sales and stock workflows keep working offline after setup. Registration, billing and any cloud transfer need a connection."
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
      "Use the owner's signed-in session on one shop device. Separate staff permissions are not available yet; keep settings and reset actions under the owner's supervision."
  },
  {
    id: "lost-device",
    question: "What if I lose my device?",
    answer:
      "Export a backup regularly. Replacing a lost device cannot recover unsynced local records without a saved backup."
  },
  {
    id: "pricing",
    question: "Is Kota-OS free to use?",
    answer:
      "The app has a 14-day trial. The first 10 eligible customers can access Early Adopter pricing of R25 weekly, R89 monthly or R890 yearly. Standard pricing is R45 weekly, R165 monthly or R1,650 yearly."
  },
  {
    id: "devices",
    question: "How many devices can I use?",
    answer: "One verified account can link up to three active devices, but shop data does not sync between them. Use one operating device per shop and keep a business backup. If you need another account slot, request it from support in the app."
  },
  {
    id: "receipt",
    question: "Can Kota-OS print receipts?",
    answer:
      "Yes. Kota-OS v1.0.5 can print receipts for completed sales, including shop details, purchased items, customizations, payment information and totals."
  },
  {
    id: "cloud",
    question: "Is cloud backup available?",
    answer:
      "No. Export a business backup from Settings after each service and save it outside the device. A backup replaces records on restore; it does not merge sales across devices."
  },
  {
    id: "support-community",
    question: "What support is available?",
    answer:
      "Contact support@juveniq.co.za or use the WhatsApp link on this site for installation, backup and account help."
  }
];

export const QUICK_START_STEPS: string[] = [
  "Visit the download page for the latest verified Android installer and its SHA-256.",
  "Install the app, allowing your browser as an installation source only when Android asks.",
  "Create your shop profile and configure your store details.",
  "Add menu items, ingredients, and pricing.",
  "Run your first sale and verify inventory deduction.",
  "Use the 14-day trial and review the plans available in your app."
];
