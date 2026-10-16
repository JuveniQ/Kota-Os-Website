import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath ?? entry.path, entry.name));
}

/**
 * Hashes every inline executable script in the build (Astro's island hydration
 * runtime) so script-src can drop 'unsafe-inline'. JSON-LD data blocks are not
 * executed and need no hash.
 */
async function inlineScriptHashes(dir) {
  const hashes = new Set();
  const script = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const file of await htmlFiles(dir)) {
    const html = await readFile(file, "utf8");
    for (const [, attrs, body] of html.matchAll(script)) {
      if (/\bsrc\s*=/i.test(attrs) || /type\s*=\s*["']?application\/(ld\+)?json/i.test(attrs) || !body) continue;
      hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
    }
  }
  return [...hashes].sort();
}

function securityHeaders() {
  return {
    name: "security-headers",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const scriptHashes = (await inlineScriptHashes(fileURLToPath(dir))).join(" ");
        const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; form-action 'self' mailto:; script-src 'self' ${scriptHashes} https://www.googletagmanager.com https://cdn.mxpnl.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api-js.mixpanel.com https://api.mixpanel.com; manifest-src 'self'; upgrade-insecure-requests
`;
        await writeFile(new URL("_headers", dir), headers, "utf8");
      }
    }
  };
}

export default defineConfig({
  site: "https://kotaos.juveniq.co.za",
  integrations: [react(), tailwind(), sitemap(), securityHeaders()],
  output: "static",
  prefetch: true
});
