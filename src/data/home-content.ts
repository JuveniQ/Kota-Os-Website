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
      "Restock, count stock or record waste with a before-and-after preview",
      "Waste and low-stock visibility"
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
    id: "dashboard",
    headline: "Dashboard at a Glance",
    cta: "Explore Dashboard",
    points: [
      "Today's sales, orders and low-stock cards at the top",
      "New Order and Inventory shortcuts one tap away",
      "Complete or cancel today's orders straight from the list"
    ],
    imageSrc: "/screenshots/home.jpg",
    imageAlt:
      "Kota-OS home dashboard showing today's sales, orders and low-stock cards, New Order and Inventory shortcuts, and today's orders with Complete and Cancel buttons"
  },
  {
    id: "orders",
    headline: "Track Every Order, Day or Night",
    cta: "See Order Tracking",
    points: [
      "Grid, card and list views for today's orders",
      "Search and filter orders by status",
      "Dark mode for evening trading"
    ],
    imageSrc: "/screenshots/home-dark.jpg",
    imageAlt:
      "Kota-OS home screen in dark mode showing sales and order totals and today's orders as cards with their status"
  },
  {
    id: "manage",
    headline: "Menu and Stock Setup in One Place",
    points: [
      "Menu items and categories at a glance",
      "Ingredient list with a stock health summary",
      "Manage tab keeps catalogue updates organised"
    ],
    imageSrc: "/screenshots/manage.jpg",
    imageAlt:
      "Kota-OS Manage screen with Menu showing 16 items in 2 categories and Ingredients showing 14 ingredients with healthy stock"
  },
  {
    id: "shop-setup",
    headline: "Set Up Your Shop in Minutes",
    points: [
      "Choose your business type: kota shop, takeaway, shisanyama, food trailer or other",
      "Start with a ready-made kota menu and common ingredients",
      "Or start blank and build your own menu and stock"
    ],
    imageSrc: "/screenshots/shop-setup.jpg",
    imageAlt:
      "Kota-OS shop setup screen with a shop name field, business type choices and the Kota Starter Setup option"
  },
  {
    id: "reports",
    headline: "Professional Reports",
    points: [
      "Daily, weekly, and monthly views are available",
      "Total sales, order count and average order value",
      "Export PDF action is accessible directly in reports"
    ],
    imageSrc: "/screenshots/reports.jpg",
    imageAlt:
      "Kota-OS reports screen with Summary and Orders tabs, daily, weekly and monthly views, total sales, orders and average order, and an Export PDF button"
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
      "Yes. Kota-OS can print receipts for completed sales, including shop details, purchased items, customizations, payment information and totals."
  },
  {
    id: "tablets",
    question: "Does Kota-OS work on tablets?",
    answer:
      "Yes. From version 1.1.0, Android tablets get a dedicated layout with side navigation, orders and stock shown side by side with their details, and multi-column reports and settings. Phones keep the familiar layout."
  },
  {
    id: "updates",
    question: "How do I update Kota-OS?",
    answer:
      "Kota-OS checks for new versions and shows a reminder on the first open of each day. Tap Update, or open Settings and use the update card, to reach the download page for the new installer. Your shop data stays on the device when you install over the existing app. Smaller improvements download automatically and apply the next time you open Kota-OS."
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
      "Contact support@juveniq.co.za or use the WhatsApp link on this site for installation, backup and account help. If the app shows an error screen, include the reference code it displays so we can find your report quickly."
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
