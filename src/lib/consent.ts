import type { CookieConsentSource, CookieConsentState } from "@/types/site";

export const CONSENT_STORAGE_KEY = "kota_cookie_consent_v1";
export const OPEN_COOKIE_PREFERENCES_EVENT = "kota:open-cookie-preferences";
export const COOKIE_CONSENT_UPDATED_EVENT = "kota:cookie-consent-updated";

const CONSENT_VERSION = 1;

function isBrowser() {
  return typeof window !== "undefined";
}

function isValidConsent(value: unknown): value is CookieConsentState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CookieConsentState>;
  return (
    typeof candidate.version === "number" &&
    candidate.version === CONSENT_VERSION &&
    candidate.necessary === true &&
    typeof candidate.analytics === "boolean" &&
    typeof candidate.updatedAt === "string" &&
    (candidate.source === "accept_all" ||
      candidate.source === "reject_non_essential" ||
      candidate.source === "customize")
  );
}

export function createConsent(
  analytics: boolean,
  source: CookieConsentSource
): CookieConsentState {
  return {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    necessary: true,
    analytics,
    source
  };
}

export function getConsent(): CookieConsentState | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    return isValidConsent(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setConsent(consent: CookieConsentState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: consent })
  );
}

export function hasAnalyticsConsent() {
  return Boolean(getConsent()?.analytics);
}

export function openCookiePreferences() {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
}
