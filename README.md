# Kota-OS Marketing Website

[![Astro](https://img.shields.io/badge/Astro-5-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Site](https://img.shields.io/badge/Website-kotaos.juveniq.co.za-1F1814)](https://kotaos.juveniq.co.za)

Professional multi-page marketing site for Kota-OS, a Point-of-Sale platform built for township fast-food vendors.

## Overview

This repository contains a static-first website built with Astro, React, and Tailwind CSS. The site is focused on conversion, product education, trust building, and trial acquisition.

Key messaging implemented in the product copy:

- Offline-first POS workflow
- Built for township food businesses
- 30-day free trial
- Commercial pricing plans coming soon
- APK distribution notice: not verified by Google Play Protect

## Tech Stack

- Framework: Astro 5 (static output)
- UI Islands: React 18
- Styling: Tailwind CSS with custom brand tokens
- Animation: CSS transitions with lightweight interactive islands
- Icons: Lucide React and SVG
- Language: TypeScript
- Image Processing: Sharp

## Routes

- / (Home)
- /features
- /how-it-works
- /pricing (plans coming soon)
- /faq
- /download
- /updates
- /donate
- /contact

## Design System

Primary design tokens are configured in:

- tailwind.config.mjs
- src/styles/global.css

Highlights:

- Primary: hsl(38 92% 50%)
- Background: hsl(30 25% 97%)
- Typography: Sora for headings, DM Sans for body
- Breakpoints: 375px, 768px, 1024px+

## Project Structure

- src/components: Reusable UI blocks (Navbar, Hero, Footer, cards, carousel, forms)
- src/data: Central content and configuration
- src/layouts: Base page layout with metadata and JSON-LD injection
- src/lib: SEO builders and analytics helpers
- src/pages: Route files
- src/styles: Global styles and utility classes
- src/types: Shared TypeScript types
- public: Static assets (logo, hero backgrounds, app screenshots)

## Getting Started

Prerequisites:

- Node.js 20+ recommended
- npm 10+

Install dependencies:

- npm install

Run local development:

- npm run dev

Build production output:

- npm run build

Preview production build:

- npm run preview

Run Astro + type checks:

- npm run check

## Environment Variables

Optional public variables:

- PUBLIC_GA_ID
- PUBLIC_MIXPANEL_TOKEN

If unset, tracking safely no-ops.

## Content Management

Main editable content files:

- src/data/site-config.ts
  - Navigation links
  - Contact details
  - Download metadata
  - Donation tiers
  - Footer links
- src/data/home-content.ts
  - Hero metrics
  - Features
  - How-it-works steps
  - Screenshots copy
  - Benefits
  - Testimonials
  - FAQ content
  - Release notes

## SEO and Structured Data

SEO behavior is centralized in:

- src/layouts/BaseLayout.astro
- src/lib/seo.ts

Implemented:

- Canonical URLs
- Open Graph and Twitter meta tags
- SoftwareApplication JSON-LD
- Organization JSON-LD
- FAQPage JSON-LD (where applicable)

## Accessibility and UX Notes

Current implementation includes:

- Skip-to-content link
- Focus-visible ring styles
- Keyboard-accessible mobile nav, accordion, and carousel controls
- Reduced-motion support
- Responsive layout tuned for mobile, tablet, and desktop

## Known Placeholders

These are intentionally placeholders until final production values are provided:

- APK URL in DOWNLOAD_META.apkUrl
- SHA-256 value in DOWNLOAD_META.checksumSha256
- QR placeholder on /download

## Deployment

The project is static and deploys cleanly to:

- Vercel
- Netlify
- Cloudflare Pages

Build output directory: dist

## Contributing

Contributions are welcome through pull requests.

1. Create a feature branch from main.
2. Make focused changes and keep content updates in src/data where possible.
3. Run local quality checks:
   - npm run check
   - npm run build
4. For UI changes, include before/after screenshots in your PR.
5. Open a pull request with a clear summary, testing notes, and impact scope.

## Contact

- Email: contact@juveniq.co.za
- Phone: +27 607431268
- Location: Gauteng, Johannesburg

## License

All rights reserved unless otherwise specified by the project owner.
