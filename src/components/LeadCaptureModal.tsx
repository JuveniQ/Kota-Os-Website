import { useMemo, useState } from "react";
import { Calculator, X } from "lucide-react";
import { CONTACT_INFO } from "@/data/site-config";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type LeadFormValues = {
  name: string;
  phone: string;
  dailyOrders: string;
  website: string;
};

const BOT_MIN_FILL_MS = 2500;
const initialValues: LeadFormValues = {
  name: "",
  phone: "",
  dailyOrders: "",
  website: ""
};

export default function LeadCaptureModal() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [startedAt] = useState(() => Date.now());

  const messageTemplate = useMemo(() => {
    return (
      "Hi Kota-OS, I want the Township Fast-Food Profit Calculator and help setting up my 30-day trial. " +
      `Name: ${values.name || "N/A"}, Phone: ${values.phone}, Daily orders: ${values.dailyOrders}.`
    );
  }, [values.dailyOrders, values.name, values.phone]);

  function onChange<K extends keyof LeadFormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function looksLikeBot() {
    if (values.website.trim().length > 0) return true;
    if (Date.now() - startedAt < BOT_MIN_FILL_MS) return true;
    return false;
  }

  function validate() {
    if (!values.phone.trim() || !values.dailyOrders.trim()) {
      return "Please add your phone number and estimated daily orders.";
    }
    if (!/^\+?[0-9\s-]{9,15}$/.test(values.phone.trim())) {
      return "Please enter a valid phone number.";
    }
    const orders = Number(values.dailyOrders);
    if (!Number.isFinite(orders) || orders <= 0) {
      return "Daily orders must be greater than zero.";
    }
    return "";
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (looksLikeBot()) {
      setNotice("Thanks. We have received your request.");
      return;
    }

    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }

    const whatsappUrl = createWhatsAppUrl(CONTACT_INFO.primaryPhone, messageTemplate);
    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = whatsappUrl;
    }

    setNotice("Redirecting to WhatsApp...");
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="focus-ring mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-brand-primary bg-white px-4 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10"
        onClick={() => setOpen(true)}
      >
        <Calculator className="h-4 w-4" aria-hidden="true" />
        Get Free Profit Calculator
      </button>

      {notice ? <p className="mt-2 text-xs text-brand-success">{notice}</p> : null}

      {open ? (
        <div
          className="fixed inset-0 z-[1110] flex items-center justify-center bg-black/55 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-magnet-title"
            className="w-full max-w-md rounded-2xl border border-brand-border bg-white p-5 shadow-[0_20px_45px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
                  Township Fast-Food Profit Calculator
                </p>
                <h3 id="lead-magnet-title" className="mt-2 text-xl font-bold text-brand-foreground">
                  Get your 2-minute estimate
                </h3>
                <p className="mt-2 text-sm text-brand-muted">
                  Share a few details and we will help you start your 30-day trial with a setup checklist.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="focus-ring rounded-lg border border-brand-border p-2 text-brand-muted hover:text-brand-foreground"
                aria-label="Close lead capture dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="relative mt-5 space-y-3">
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(event) => onChange("website", event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="lead-name" className="mb-1 block text-sm font-semibold text-brand-foreground">
                  Name (optional)
                </label>
                <input
                  id="lead-name"
                  type="text"
                  value={values.name}
                  onChange={(event) => onChange("name", event.target.value)}
                  className="focus-ring min-h-12 w-full rounded-xl border border-brand-border px-3 text-base"
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="mb-1 block text-sm font-semibold text-brand-foreground">
                  Phone number
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  inputMode="tel"
                  required
                  value={values.phone}
                  onChange={(event) => onChange("phone", event.target.value)}
                  className="focus-ring min-h-12 w-full rounded-xl border border-brand-border px-3 text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="lead-orders"
                  className="mb-1 block text-sm font-semibold text-brand-foreground"
                >
                  Estimated daily orders
                </label>
                <input
                  id="lead-orders"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  required
                  value={values.dailyOrders}
                  onChange={(event) => onChange("dailyOrders", event.target.value)}
                  className="focus-ring min-h-12 w-full rounded-xl border border-brand-border px-3 text-base"
                />
              </div>

              {error ? <p className="text-sm text-brand-destructive">{error}</p> : null}

              <button type="submit" className="btn-primary w-full">
                Send on WhatsApp
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
