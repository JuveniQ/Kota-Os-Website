# Kota-OS product website

Astro product site for Kota-OS. The Android page uses a versioned release catalog and presents **one selected APK** with its own file size and verification details.

## Local checks

Run `npm ci`, `npm run check` and `npm run build`. Inspect `dist/download/index.html` and `dist/downloads/` before deployment. The existing changelogs were removed; `public/downloads/index.json` has `latest: null` and an empty `versions` list until a signed release exists.

## Versioned Android downloads

The website bundles metadata only. Signed APKs live on a dedicated HTTPS download host so site deploys do not include large binaries:

```text
website/public/downloads/
  index.json
  v1.0.4/changelog.json

downloads.kotaos.juveniq.co.za/
  v1.0.4/changelog.json
  v1.0.4/kota-os-website-arm64-v8a.apk
  v1.0.4/kota-os-website-armeabi-v7a.apk
```

`index.json` contains `schemaVersion: 1`, the fixed `downloadBaseUrl`, a `latest` version or `null`, and `versions` in newest-first order. Each version has a matching changelog with `version`, `date` (`YYYY-MM-DD`), `summary`, `features`, `fixes`, and two `artifacts` entries:

```json
{
  "version": "1.0.4",
  "date": "2026-09-27",
  "summary": "Describe the shipped release.",
  "features": ["Describe a shipped feature"],
  "fixes": ["Describe a verified fix"],
  "artifacts": [
    {
      "abi": "arm64-v8a",
      "fileName": "kota-os-website-arm64-v8a.apk",
      "sizeBytes": 12345678,
      "sha256": "replace-with-actual-64-character-file-hash",
      "signingCertSha256": "replace-with-actual-64-character-cert-hash"
    },
    {
      "abi": "armeabi-v7a",
      "fileName": "kota-os-website-armeabi-v7a.apk",
      "sizeBytes": 12345678,
      "sha256": "replace-with-actual-64-character-file-hash",
      "signingCertSha256": "replace-with-the-same-64-character-cert-hash"
    }
  ]
}
```

This is a format example, intentionally invalid until actual file sizes and hashes replace the placeholders. The build rejects a latest release without **both** complete ARM installer entries. There is no universal website APK. Do not list a file based solely on its expected EAS output name.

## Build and publish

1. In the app repo run the `web` EAS profile. It extends the website/Paystack edition and enables native Gradle ABI splits for ARM64 and ARMv7, with the universal APK disabled. The result can be an artifact archive containing both APKs. Extract it and confirm the actual file names. The Play and other store profiles are independent.
2. Run `node scripts/prepare-web-apks.mjs <Gradle-release-output-dir> <staging-vX.Y.Z-dir> <expected-signing-cert-sha256>` from the app repo with Android SDK `apksigner` and `aapt` installed. It verifies both signatures, package `za.co.juveniq.kotaos`, ABI and version identity, checks there is no universal APK, then stages the renamed files and writes `verified-artifacts.json`.
3. Check the staged APKs install on representative 64-bit and 32-bit Android devices and update the prior website edition while retaining local records. Compare real file sizes with the prior release; ABI splits may reduce native-library size, but cannot guarantee a specific total size. Test Paystack checkout and backup/restore before release.
4. Upload the exact staged files to immutable `vX.Y.Z/` paths on the download host with HTTPS, APK content type, `Content-Disposition: attachment`, correct length and byte-range support. Independently download each file and compare hashes, sizes and certificate fingerprints to the staged files. Put the matching changelog JSON in the version folder on both the host and site.
5. Add the version to `index.json` and set `latest` last, build, deploy and test links and install flows on phones. The download selector uses an explicit ARM architecture/bitness browser hint when available. Browsers cannot reliably expose Android's complete supported ABI list; when hints are unavailable, the page asks visitors to choose based on their device specifications or contact support. It never guesses based on model or generic Android user agent.

The Android browser installation-source prompt remains under Android's control; keep Play Protect enabled. Existing `PUBLIC_KOTA_APK_*` and `PUBLIC_KOTA_OPEN_DOWNLOADS` variables are obsolete. Optional analytics tokens remain separate from release publishing.

## Legal

Company policies: https://juveniq.co.za/legal
