import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://kota-os.co.za",
  integrations: [react(), tailwind()],
  output: "static",
  prefetch: true
});
