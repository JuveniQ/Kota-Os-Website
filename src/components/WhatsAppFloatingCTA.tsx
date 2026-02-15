import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { CONTACT_INFO } from "@/data/site-config";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const QUICK_CONNECT_MESSAGE = "Hi Kota-OS, I need help setting up my 30-day trial.";

export default function WhatsAppFloatingCTA() {
  const [open, setOpen] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(16);
  const containerRef = useRef<HTMLDivElement>(null);

  const contacts = useMemo(
    () => [
      {
        id: "primary",
        label: "Trial Setup (Primary)",
        phone: CONTACT_INFO.primaryPhone,
        href: createWhatsAppUrl(CONTACT_INFO.primaryPhone, QUICK_CONNECT_MESSAGE)
      },
      {
        id: "backup",
        label: "Support Backup",
        phone: CONTACT_INFO.secondaryPhone,
        href: createWhatsAppUrl(CONTACT_INFO.secondaryPhone, QUICK_CONNECT_MESSAGE)
      }
    ],
    []
  );

  useEffect(() => {
    const updateBottomOffset = () => {
      const cookieBanner = document.querySelector("[aria-label='Cookie consent']") as HTMLElement | null;
      if (!cookieBanner) {
        setBottomOffset(16);
        return;
      }

      const rect = cookieBanner.getBoundingClientRect();
      const isVisible = rect.height > 0 && rect.bottom > 0;
      setBottomOffset(isVisible ? Math.ceil(rect.height + 24) : 16);
    };

    updateBottomOffset();
    const observer = new MutationObserver(updateBottomOffset);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", updateBottomOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateBottomOffset);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!open || !containerRef.current) return;
      if (containerRef.current.contains(event.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed right-4 z-[1040]"
      style={{ bottom: `${bottomOffset}px` }}
      aria-label="WhatsApp quick support"
    >
      {open ? (
        <div className="mb-3 w-[280px] rounded-2xl border border-brand-border bg-white p-3 shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-brand-foreground">Choose WhatsApp line</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="focus-ring rounded-lg border border-brand-border p-1.5 text-brand-muted hover:text-brand-foreground"
              aria-label="Close WhatsApp quick picker"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {contacts.map((contact) => (
              <a
                key={contact.id}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                data-track-external="true"
                data-track-source="whatsapp-floating-cta"
                className="focus-ring block rounded-xl border border-brand-border px-3 py-2 hover:bg-brand-background"
              >
                <p className="text-sm font-semibold text-brand-foreground">{contact.label}</p>
                <p className="text-xs text-brand-muted">{contact.phone}</p>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(31,24,20,0.28)] transition hover:brightness-110"
      >
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
          aria-hidden="true"
        >
          <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current">
            <path d="M19.11 17.86c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.94 1.14-.17.2-.35.22-.64.07-.29-.15-1.23-.45-2.35-1.44-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.29-1.03 1.01-1.03 2.45 0 1.45 1.05 2.85 1.2 3.05.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.11.56-.08 1.72-.7 1.96-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.35z"></path>
            <path d="M16 3C8.83 3 3 8.78 3 15.91c0 2.52.74 4.97 2.12 7.08L3.73 28l5.16-1.35A13.05 13.05 0 0 0 16 28.82c7.17 0 13-5.79 13-12.91S23.17 3 16 3zm0 23.5c-2.15 0-4.25-.57-6.08-1.66l-.44-.26-3.07.8.82-2.99-.28-.46A10.44 10.44 0 0 1 5.5 15.9c0-5.79 4.72-10.5 10.5-10.5s10.5 4.71 10.5 10.5S21.78 26.5 16 26.5z"></path>
          </svg>
        </span>
        Need Setup Help?
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
