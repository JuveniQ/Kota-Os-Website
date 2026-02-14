type JsonRecord = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    mixpanel?: { track: (name: string, props?: JsonRecord) => void };
  }
}

const GA_ID = import.meta.env.PUBLIC_GA_ID;
const MIXPANEL_TOKEN = import.meta.env.PUBLIC_MIXPANEL_TOKEN;

function isBrowser() {
  return typeof window !== "undefined";
}

function sendEvent(name: string, props?: JsonRecord) {
  if (!isBrowser()) return;

  if (GA_ID && typeof window.gtag === "function") {
    window.gtag("event", name, props ?? {});
  } else if (GA_ID) {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: name, ...(props ?? {}) });
  }

  if (MIXPANEL_TOKEN && window.mixpanel?.track) {
    window.mixpanel.track(name, props);
  }
}

export function trackPageView(path: string, title: string) {
  sendEvent("page_view", { page_path: path, page_title: title });
}

export function trackHeroCTA(label: string) {
  sendEvent("hero_cta_click", { label });
}

export function trackFaqToggle(faqId: string, isOpen: boolean) {
  sendEvent("faq_toggle", { faq_id: faqId, state: isOpen ? "open" : "closed" });
}

export function trackExternalLink(url: string, source: string) {
  sendEvent("external_link_click", { url, source });
}
