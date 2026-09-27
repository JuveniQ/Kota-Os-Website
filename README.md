# Kota-OS product website

Astro product site for Kota-OS. The Android download page, navigation and release history read from one versioned catalog.

## Local checks

Run `npm ci`, `npm run check` and `npm run build`. Check `dist/download/index.html` and the generated `dist/downloads/` JSON before deploying.

## Versioned download layout

The site publishes **metadata only** under `public/downloads/`. Actual signed APKs belong on the dedicated HTTPS download host; placing them in `public/` would include the full installer in every site deployment.

```text
website/public/downloads/
  index.json                    latest version and ordered version list
  v1.0.4/changelog.json         date, features, fixes, verified artifact metadata

downloads.kotaos.juveniq.co.za/
  index.json                    optional mirror with short cache lifetime
  v1.0.4/changelog.json         same published changelog JSON
  v1.0.4/kota-os-website-universal.apk
  v1.0.4/kota-os-website-arm64-v8a.apk       optional, only if built and tested
  v1.0.4/kota-os-website-armeabi-v7a.apk    optional, only if built and tested
```

The index has `schemaVersion: 1`, `downloadBaseUrl: "https://downloads.kotaos.juveniq.co.za/"`, `versions: ["1.0.4", ...]` (newest first), and `latest: "1.0.4"` only when an installer is live. Every listed version has a matching `public/downloads/vX.Y.Z/changelog.json` with these fields:

```json
{
  "version": "1.0.4",
  "date": "2026-09-27",
  "summary": "Describe verified release changes here.",
  "features": ["Describe a shipped feature"],
  "fixes": ["Describe a verified fix"],
  "artifacts": [
    {
      "abi": "universal",
      "fileName": "kota-os-website-universal.apk",
      "sizeBytes": 12345678,
      "sha256": "64 actual hexadecimal characters from the uploaded APK",
      "signingCertSha256": "64 actual hexadecimal characters from apksigner"
    }
  ]
}
```

That is a **format example**, not publishable metadata. The build rejects invalid metadata and will only show a download button when `latest` has a universal installer. The existing v1.0.1–v1.0.3 changelogs were migrated from the website's existing release timeline, with no APK URLs; they are history, not current download offers. The old v1.0.3 installer was removed because it is not the verified website edition.

## Publish a website APK

1. In the app repo, build the **website** edition (Paystack channel), not a Play or Galaxy binary. Increase Android versionCode, confirm app package `za.co.juveniq.kotaos` and compatible signing identity, and test registration, direct checkout, updates and backup/restore on physical devices.
2. Run the app repo's `node scripts/verify-direct-release.mjs path/to/release.apk <expected-signing-cert-sha256>` with Android SDK `apksigner` available. Record size, SHA-256 and certificate from this exact file. Check installation over the previous version with its data retained.
3. Upload the immutable signed file to `https://downloads.kotaos.juveniq.co.za/vX.Y.Z/kota-os-website-universal.apk`. Keep the matching `changelog.json` alongside it, identical to the website copy. Serve HTTPS, `application/vnd.android.package-archive`, `Content-Disposition: attachment`, correct `Content-Length` and byte-range/resume support. Use long immutable caching for the versioned folder; never replace an object at the same path.
4. Download the CDN object independently and compare its bytes, size, SHA-256 and certificate to the tested build. Test the website link and installation on a phone. Publish per-ABI **standalone** APKs only after confirming each is individually installable, signed with the same identity and compatible with updates. App Bundle split APK components are not standalone installers.
5. Add the version folder and changelog metadata to this site, set `latest` in `index.json` last, run `npm run check && npm run build`, deploy, and test the live links. Mirror `index.json` to the download host with a short cache lifetime if clients also need a CDN catalog. Update the website channel's app update record only after the installer is verified. Keep a fallback universal APK available.

An install from a browser can still trigger Android's installer-source permission. The website explains the prompt and recommends leaving Play Protect enabled. A store listing provides a different installation path; it does not change the website APK's requirements.

Remove any old `PUBLIC_KOTA_OPEN_DOWNLOADS` and `PUBLIC_KOTA_APK_*` build variables: this catalog replaces them. Optional `PUBLIC_GA_ID` and `PUBLIC_MIXPANEL_TOKEN` are unrelated to releases.

## Legal

Company policies: https://juveniq.co.za/legal
