import { useEffect, useMemo, useRef } from "react";

type CookiePreferencesDialogProps = {
  open: boolean;
  analyticsEnabled: boolean;
  onAnalyticsChange: (value: boolean) => void;
  onClose: () => void;
  onRejectNonEssential: () => void;
  onSavePreferences: () => void;
};

export default function CookiePreferencesDialog({
  open,
  analyticsEnabled,
  onAnalyticsChange,
  onClose,
  onRejectNonEssential,
  onSavePreferences
}: CookiePreferencesDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingId = useMemo(() => "cookie-preferences-title", []);

  useEffect(() => {
    if (!open || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusables[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key !== "Tab") return;
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="w-full max-w-xl rounded-2xl border border-brand-border bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={headingId} className="text-xl font-bold text-brand-foreground">
              Cookie Preferences
            </h2>
            <p className="mt-2 text-sm text-brand-muted">
              Choose which cookies we can use. Necessary cookies are always on.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-lg border border-brand-border px-3 py-1 text-sm text-brand-muted hover:text-brand-foreground"
            aria-label="Close cookie preferences"
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="rounded-xl border border-brand-border bg-brand-background/50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-brand-foreground">Necessary Cookies</h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Required for core website functions and your consent selection.
                </p>
              </div>
              <span className="rounded-full bg-brand-success/15 px-3 py-1 text-xs font-semibold text-brand-success">
                Always On
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-brand-border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-brand-foreground">Analytics Cookies</h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Helps us understand usage trends and improve product content.
                </p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <span className="sr-only">Enable analytics cookies</span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(event) => onAnalyticsChange(event.target.checked)}
                  className="h-5 w-5 rounded border-brand-border text-brand-primary focus:ring-brand-primary"
                />
                <span className="text-sm font-semibold text-brand-foreground">
                  {analyticsEnabled ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="focus-ring rounded-xl border border-brand-border px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand-background"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={onSavePreferences}
            className="btn-primary px-4 py-2 text-sm"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
