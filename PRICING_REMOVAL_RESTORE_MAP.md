# Pricing Removal Restore Map

## Purpose
This document records where pricing and paid-license wording was removed so it can be restored later once monetization is finalized.

Reference implementation commit:
- `8b3a142` (`Remove pricing content, hide pricing links, and update trial messaging to 30 days`)

## Global content decisions applied
- Removed paid pricing claims and price values (including `R 399` and one-time license messaging).
- Removed pricing from main navigation and footer navigation.
- Removed home-page pricing section.
- Kept `/pricing` route live, but converted it to a professional "plans being finalized" page.
- Standardized trial copy from `14-day` to `30-day`.
- Removed explicit license wording from marketing copy.

## File-by-file change map
| File | What was removed/changed | What to restore later |
|---|---|---|
| `src/data/site-config.ts` | Removed `Pricing` nav link, removed footer Pricing link, changed legal `/pricing` link, changed primary CTA label to trial CTA, removed `PRICING_TIER`, removed one-time license description from `SITE_META.description`. | Re-add `PRICING_TIER`, nav/footer pricing links, legal pricing link (if desired), monetization CTA copy, and finalized commercial description. |
| `src/pages/index.astro` | Removed home pricing section and pricing card wiring (`PricingCard` + `PRICING_TIER`). | Re-add pricing section block and pricing component usage. |
| `src/pages/pricing.astro` | Replaced full pricing card/page with "pricing plans are being finalized" content and 30-day trial message. | Replace with finalized pricing page, tiers, commercial terms, and finalized CTA flow. |
| `src/components/Hero.tsx` | `14-Day Free Trial` -> `30-Day Free Trial`; removed "upgrade to a secure license" body text. | Update trial duration and commercial conversion copy once finalized. |
| `src/components/FinalCta.astro` | Primary CTA text changed from license wording to trial wording. | Update CTA copy/target for final monetization funnel. |
| `src/pages/download.astro` | Removed license activation wording; changed trial references to 30 days and pricing-coming-soon context. | Restore monetization activation flow and final commercial instructions if needed. |
| `src/pages/faq.astro` | Removed licensing/pricing framing from meta and subtitle; support copy no longer mentions licensing assistance. | Re-introduce monetization FAQ framing and support language if required. |
| `src/data/home-content.ts` | Rewrote FAQ entries from one-time license model to 30-day trial + pricing coming soon; changed quick-start final step; removed license phrasing in setup/benefits; renamed release-note wording (`license checks` -> `access checks`). | Restore finalized licensing/pricing FAQ entries, quick-start monetization step, and release-note terminology as needed. |
| `src/pages/how-it-works.astro` | Removed "License-Gated Security" wording and pricing-decision phrasing in report copy. | Reintroduce final licensing/security commercialization copy if required. |
| `src/pages/donate.astro` | Removed "keep pricing fair" phrase from hero subtitle. | Reintroduce monetization-aware donor messaging only if desired. |
| `src/lib/seo.ts` | Removed `offers` block with hardcoded price and currency from `SoftwareApplication` schema. | Add finalized `Offer` schema fields (price, currency, plan structure, terms). |
| `src/lib/tracking.ts` | Removed `trackPricingCTA` event helper. | Re-add pricing-related analytics event helpers and event names. |
| `src/types/site.ts` | Removed `PricingTier` type. | Re-add pricing type(s) for finalized tier model. |
| `src/components/PricingCard.tsx` | File deleted. | Recreate/restore pricing component for final pricing UI. |
| `README.md` | Replaced paid one-time license positioning with 30-day trial + plans coming soon; `/pricing` documented as coming soon. | Update documentation with final pricing model, route behavior, and monetization details. |

## Routes intentionally kept
- `/pricing` is still active (now a "coming soon" page).
- `public/sitemap.xml` still includes `/pricing`.

## Quick restore checklist
1. Finalize monetization model (tier count, billing model, activation rules).
2. Reintroduce pricing data model in `src/data/site-config.ts` and type(s) in `src/types/site.ts`.
3. Restore pricing UI:
   - Recreate `src/components/PricingCard.tsx`.
   - Re-add pricing section in `src/pages/index.astro`.
   - Replace placeholder `/pricing` content with final pricing UI.
4. Reintroduce monetization copy in Hero, FAQ, Download, and CTA components.
5. Restore SEO `Offer` schema in `src/lib/seo.ts`.
6. Restore pricing analytics helper(s) in `src/lib/tracking.ts` and reconnect click events.
7. Update README and verify route/navigation visibility decisions.

## Useful Git references
- Show full removal commit:
  - `git show 8b3a142`
- Restore deleted pricing component from pre-removal commit:
  - `git show 6cb1566:src/components/PricingCard.tsx`
- Compare pre-removal vs post-removal for one file:
  - `git diff 6cb1566..8b3a142 -- src/data/site-config.ts`
