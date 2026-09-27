# Kota-OS product website

Astro site for the guided Gauteng food-business pilot.

## Local checks

Run `npm ci`, `npm run check` and `npm run build`.

## Direct Android release

The website never bundles an APK. The public page remains in pilot-request mode until a verified release is available. Upload a signed, immutable APK to `https://downloads.kotaos.juveniq.co.za/` backed by object storage/CDN, then configure the six build variables from the **same** file:

- `PUBLIC_KOTA_APK_URL` (HTTPS on the dedicated downloads host, URL path ending in .apk; no redirect or replacement at that path)
- `PUBLIC_KOTA_APK_VERSION` (semantic version, e.g. 1.0.4)
- `PUBLIC_KOTA_APK_SIZE_BYTES`
- `PUBLIC_KOTA_APK_SHA256`
- `PUBLIC_KOTA_APK_SIGNING_CERT_SHA256`
- `PUBLIC_KOTA_APK_RELEASE_DATE` (YYYY-MM-DD)

The build fails on incomplete or invalid metadata. Match the displayed hash, size and signing certificate to the uploaded file with an independent download check. Configure CDN immutable caching and resumable/range transfers. Keep the same app identity and compatible signing certificate across updates. Never embed a release APK in `public/`; store installation cannot avoid Android's unknown-source consent for website installs.

The app repository contains the channel build profiles and the signed release verification workflow. Galaxy, Huawei, Aptoide and APKPure are gated until publisher, billing and installation tests pass.

## Other environment

`PUBLIC_GA_ID` and `PUBLIC_MIXPANEL_TOKEN` are optional; tracking safely no-ops when unset.

## Legal

Current company policies: https://juveniq.co.za/legal
