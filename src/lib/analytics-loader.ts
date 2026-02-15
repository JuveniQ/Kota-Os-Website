type MixpanelClient = {
  init?: (token: string, config?: Record<string, unknown>) => void;
  track?: (
    eventName: string,
    props?: Record<string, string | number | boolean | null | undefined>
  ) => void;
  opt_out_tracking?: () => void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    mixpanel?: MixpanelClient;
  }
}

const GA_SCRIPT_ID = "kota-ga4-script";
const MIXPANEL_SCRIPT_ID = "kota-mixpanel-script";

const GA_ID = import.meta.env.PUBLIC_GA_ID;
const MIXPANEL_TOKEN = import.meta.env.PUBLIC_MIXPANEL_TOKEN;

function isBrowser() {
  return typeof window !== "undefined";
}

function removeCookie(name: string) {
  if (!isBrowser()) return;
  const hostParts = window.location.hostname.split(".");
  const domains = [
    window.location.hostname,
    `.${window.location.hostname}`,
    `.${hostParts.slice(-2).join(".")}`
  ];

  domains.forEach((domain) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
  });
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function loadGa4(gaId: string) {
  if (!isBrowser() || !gaId) return;

  (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = false;
  window.dataLayer = window.dataLayer ?? [];

  if (typeof window.gtag !== "function") {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", gaId, { anonymize_ip: true });
}

export function loadMixpanel(token: string) {
  if (!isBrowser() || !token) return;

  if (window.mixpanel?.track && typeof window.mixpanel.init === "function") {
    window.mixpanel.init(token, { track_pageview: false, persistence: "localStorage" });
    return;
  }

  const existingScript = document.getElementById(MIXPANEL_SCRIPT_ID);
  if (existingScript) return;

  const script = document.createElement("script");
  script.id = MIXPANEL_SCRIPT_ID;
  script.async = true;
  script.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
  script.onload = () => {
    if (window.mixpanel && typeof window.mixpanel.init === "function") {
      window.mixpanel.init(token, {
        track_pageview: false,
        persistence: "localStorage"
      });
    }
  };
  document.head.appendChild(script);
}

export function loadAnalyticsFromEnv() {
  if (!isBrowser()) return;
  if (GA_ID) loadGa4(GA_ID);
  if (MIXPANEL_TOKEN) loadMixpanel(MIXPANEL_TOKEN);
}

export function disableAnalyticsFromEnv() {
  if (!isBrowser()) return;

  if (GA_ID) {
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
    ["_ga", "_gid", "_gat", `_ga_${GA_ID.replace(/-/g, "_")}`].forEach(removeCookie);
  }

  if (window.mixpanel?.opt_out_tracking) {
    window.mixpanel.opt_out_tracking();
  }
}
