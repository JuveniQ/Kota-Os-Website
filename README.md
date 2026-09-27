# Kota-OS product website

Astro product site for Kota-OS. The Android download page uses a versioned release catalog and presents **one selected APK** with its own file size and verification details.

## Local checks

Run:

```bash
npm ci
npm run check
npm run build
```

Inspect `dist/download/index.html` and `dist/downloads/` before deployment.

The release catalog remains disabled while `public/downloads/index.json` has `latest: null`. This lets release files be staged and tested without exposing them from the public download page.

## Versioned Android downloads

For the website pilot, the signed APKs are hosted by the Kota-OS website itself under `/downloads/`. There is no separate download server.

The expected source tree for v1.0.4 is:

```text
public/downloads/
  index.json
  v1.0.4/
    changelog.json
    kota-os-website-arm64-v8a.apk
    kota-os-website-armeabi-v7a.apk
```

After deployment these files are available at:

```text
https://kotaos.juveniq.co.za/downloads/v1.0.4/changelog.json
https://kotaos.juveniq.co.za/downloads/v1.0.4/kota-os-website-arm64-v8a.apk
https://kotaos.juveniq.co.za/downloads/v1.0.4/kota-os-website-armeabi-v7a.apk
```

`index.json` contains `schemaVersion: 1`, the fixed site-hosted `downloadBaseUrl`, a `latest` version or `null`, and `versions` in newest-first order.

Each version has a matching changelog with `version`, `date` (`YYYY-MM-DD`), `summary`, `features`, `fixes`, and exactly two `artifacts` entries:

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

The example above is intentionally invalid until the actual sizes and hashes replace the placeholders. The website rejects a latest release without **both** complete ARM installer entries. There is no universal website APK.

## Build and publish

1. In the app repository run the `web` EAS profile. It enables native Gradle ABI splits for ARM64 and ARMv7 and disables the universal APK.
2. Extract the Gradle outputs and run:
   ```bash
   node scripts/prepare-web-apks.mjs <Gradle-release-output-dir> <staging-vX.Y.Z-dir> <expected-signing-cert-sha256>
   ```
   The script verifies both signatures, package `za.co.juveniq.kotaos`, ABI and version identity, rejects missing/extra APKs, and writes `verified-artifacts.json`.
3. Test both staged APKs on representative Android devices. Verify installation, the prior-version update path, local-record retention, Paystack checkout, offline operation, and backup/restore before activating the release.
4. Add the verified APKs and matching `changelog.json` to `public/downloads/vX.Y.Z/`.
5. Keep `latest: null` while deploying and directly test the resulting `https://kotaos.juveniq.co.za/downloads/vX.Y.Z/...` URLs. Download the deployed APKs again and compare their file sizes and SHA-256 hashes with `verified-artifacts.json`.
6. Add the version to the `versions` array in `public/downloads/index.json`. Keep releases newest-first.
7. Only after the deployed files have been verified, set `latest` to the new version, run `npm run check` and `npm run build`, and deploy again.

For v1.0.4 the final index will be:

```json
{
  "schemaVersion": 1,
  "downloadBaseUrl": "https://kotaos.juveniq.co.za/downloads/",
  "latest": "1.0.4",
  "versions": ["1.0.4"]
}
```

Treat changing `latest` as the release switch. Do not activate it until both APK files and the changelog are present and independently verified.

The Android browser installation-source prompt remains under Android's control. Keep Play Protect enabled. The download selector uses explicit browser architecture hints when available and otherwise asks the visitor to choose ARM64 or ARMv7 manually rather than guessing.

## Future storage migration

Hosting the pilot installers with the website keeps the first release simple. If APK size, repository size, bandwidth or deployment limits become inconvenient later, move the binaries to object storage or another download host and update the single `DOWNLOAD_BASE_URL` constant in `src/data/release-catalog.ts` together with `public/downloads/index.json`.

## Legal

Company policies: https://juveniq.co.za/legal
