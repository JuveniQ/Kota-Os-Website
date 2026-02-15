import { useEffect, useState } from "react";
import CookiePreferencesDialog from "@/components/CookiePreferencesDialog";
import {
  createConsent,
  getConsent,
  OPEN_COOKIE_PREFERENCES_EVENT,
  setConsent
} from "@/lib/consent";
import {
  disableAnalyticsFromEnv,
  loadAnalyticsFromEnv
} from "@/lib/analytics-loader";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setShowBanner(true);
    } else {
      setAnalyticsEnabled(existing.analytics);
      if (existing.analytics) {
        loadAnalyticsFromEnv();
      } else {
        disableAnalyticsFromEnv();
      }
    }
    setReady(true);

    const handleOpenPreferences = () => setShowDialog(true);
    window.addEventListener(
      OPEN_COOKIE_PREFERENCES_EVENT,
      handleOpenPreferences as EventListener
    );
    return () =>
      window.removeEventListener(
        OPEN_COOKIE_PREFERENCES_EVENT,
        handleOpenPreferences as EventListener
      );
  }, []);

  function applyConsent(analytics: boolean, source: "accept_all" | "reject_non_essential" | "customize") {
    const consent = createConsent(analytics, source);
    setConsent(consent);
    setAnalyticsEnabled(analytics);
    setShowBanner(false);
    setShowDialog(false);

    if (analytics) {
      loadAnalyticsFromEnv();
    } else {
      disableAnalyticsFromEnv();
    }
  }

  if (!ready) return null;

  return (
    <>
      {showBanner ? (
        <aside
          className="fixed inset-x-4 bottom-4 z-[1050] mx-auto max-w-4xl rounded-2xl border border-brand-border bg-white/95 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur-sm md:inset-x-6 md:p-5"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-foreground">
                Your privacy matters.
              </p>
              <p className="mt-1 text-sm text-brand-muted">
                We use necessary cookies to run this site and optional analytics cookies to improve
                content quality. You can accept, reject, or customize your preferences.
                <a href="/cookie-policy" className="ml-1 text-brand-primary underline">
                  Learn more
                </a>
                .
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="focus-ring rounded-xl border border-brand-border px-3 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand-background"
                onClick={() => setShowDialog(true)}
              >
                Manage Preferences
              </button>
              <button
                type="button"
                className="focus-ring rounded-xl border border-brand-border px-3 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand-background"
                onClick={() => applyConsent(false, "reject_non_essential")}
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                className="btn-primary px-4 py-2 text-sm"
                onClick={() => applyConsent(true, "accept_all")}
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      ) : null}

      <CookiePreferencesDialog
        open={showDialog}
        analyticsEnabled={analyticsEnabled}
        onAnalyticsChange={setAnalyticsEnabled}
        onClose={() => setShowDialog(false)}
        onRejectNonEssential={() => applyConsent(false, "reject_non_essential")}
        onSavePreferences={() => applyConsent(analyticsEnabled, "customize")}
      />
    </>
  );
}
