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
  const [showDialog, setShowDialog] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (existing?.analytics) {
      setAnalyticsEnabled(true);
      loadAnalyticsFromEnv();
    } else {
      setAnalyticsEnabled(false);
      disableAnalyticsFromEnv();
    }

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
    setShowDialog(false);

    if (analytics) {
      loadAnalyticsFromEnv();
    } else {
      disableAnalyticsFromEnv();
    }
  }

  return (
    <CookiePreferencesDialog
      open={showDialog}
      analyticsEnabled={analyticsEnabled}
      onAnalyticsChange={setAnalyticsEnabled}
      onClose={() => setShowDialog(false)}
      onRejectNonEssential={() => applyConsent(false, "reject_non_essential")}
      onSavePreferences={() => applyConsent(analyticsEnabled, "customize")}
    />
  );
}
