import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

function cloudflareSecurityHeaders() {
  const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; form-action 'self' mailto:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api-js.mixpanel.com; manifest-src 'self'; upgrade-insecure-requests
`;

  return {
    name: "cloudflare-security-headers",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const fs = await import("node:fs/promises");
        await fs.writeFile(new URL("_headers", dir), headers, "utf8");
      }
    }
  };
}

export default defineConfig({
  site: "https://kotaos.juveniq.co.za",
  integrations: [react(), tailwind(), sitemap(), cloudflareSecurityHeaders()],
  output: "static",
  prefetch: true
});
