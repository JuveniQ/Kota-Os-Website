import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { NavItem } from "@/types/site";

type NavbarProps = {
  items: NavItem[];
  currentPath: string;
  cta: { label: string; href: string };
};

function normalize(path: string) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export default function Navbar({ items, currentPath, cta }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const activePath = useMemo(() => normalize(currentPath), [currentPath]);

  function isActive(href: string) {
    const target = normalize(href);
    if (target === "/") return activePath === "/";
    return activePath === target;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] border-b border-brand-border/60 bg-white/85 backdrop-blur-md">
      <div className="container-wide flex min-h-[72px] items-center justify-between py-3">
        <a href="/" className="focus-ring flex items-center gap-3 rounded-lg">
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img src="/logo.jpeg" alt="Kota-OS logo" className="h-10 w-10 rounded-xl object-cover" />
          </picture>
          <span className="font-heading text-xl font-bold text-brand-primary">Kota-OS</span>
        </a>

        <nav
          className="mx-8 hidden flex-1 items-center justify-center lg:flex"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center gap-5 text-sm font-medium">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`focus-ring rounded-lg px-2 py-1 ${
                    isActive(item.href)
                      ? "text-brand-primary"
                      : "text-brand-foreground hover:text-brand-primary"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={cta.href} className="btn-primary">
            {cta.label}
          </a>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-border bg-white text-brand-foreground lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`border-t border-brand-border bg-white px-4 py-4 lg:hidden ${
          open ? "block" : "hidden"
        }`}
        aria-label="Mobile navigation"
      >
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={`${item.href}-mobile`}>
              <a
                href={item.href}
                className={`focus-ring block rounded-lg px-3 py-2 text-sm font-semibold ${
                  isActive(item.href)
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-brand-foreground hover:bg-brand-background"
                }`}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={cta.href} className="btn-primary mt-3 w-full" onClick={() => setOpen(false)}>
          {cta.label}
        </a>
      </nav>
    </header>
  );
}
