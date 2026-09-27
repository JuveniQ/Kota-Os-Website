# Kota-OS product website

Astro product site for Kota-OS. The Android download page uses a versioned release catalog and presents one selected APK with file information derived from the actual release file.

## Local checks

Run:

```bash
npm ci
npm run check
npm run build
```

Inspect `dist/download/index.html` and `dist/downloads/` before deployment.

## Versioned Android downloads

For the website pilot, signed APKs are hosted by the Kota-OS website itself under `/downloads/`. There is no separate download server.

The release tree is:

```text
public/downloads/
  index.json
  v1.0.4/
    changelog.json
    kota-os-website-arm64-v8a.apk
    kota-os-website-armeabi-v7a.apk
```

After deployment:

```text
https://kotaos.juveniq.co.za/downloads/v1.0.4/changelog.json
https://kotaos.juveniq.co.za/downloads/v1.0.4/kota-os-website-arm64-v8a.apk
https://kotaos.juveniq.co.za/downloads/v1.0.4/kota-os-website-armeabi-v7a.apk
```

## Release metadata

`index.json` contains `schemaVersion: 1`, the fixed site-hosted `downloadBaseUrl`, a `latest` version or `null`, and `versions` in newest-first order.

Each version has a matching changelog containing descriptive release information and the two installer identities:

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
      "fileName": "kota-os-website-arm64-v8a.apk"
    },
    {
      "abi": "armeabi-v7a",
      "fileName": "kota-os-website-armeabi-v7a.apk"
    }
  ]
}
```

Do not manually maintain APK size or SHA-256 in the changelog. During the Astro build, `src/data/release-catalog.ts` opens the actual APK files under `public/downloads/vX.Y.Z/` and derives:

- exact file size in bytes;
- human-readable MB size;
- SHA-256 of the actual APK bytes.

The download page therefore always renders metadata for the file that will actually be deployed.

A `signingCertSha256` field may optionally be added to an artifact after verifying the APK with Android signing tooling. When present it must be a 64-character SHA-256 fingerprint and will be displayed on the download page. It is not derived by the website build because APK signing-certificate inspection requires Android signing tooling rather than ordinary file hashing.

## Build and publish

1. In the app repository run the `web` EAS profile. It enables native Gradle ABI splits for ARM64 and ARMv7 and disables the universal APK.
2. Extract the Gradle outputs and run:
   ```bash
   node scripts/prepare-web-apks.mjs <Gradle-release-output-dir> <staging-vX.Y.Z-dir> <expected-signing-cert-sha256>
   ```
   This verifies the APK signatures, package `za.co.juveniq.kotaos`, ABI and version identity.
3. Test both staged APKs on representative Android devices. Verify installation, update behaviour, local-record retention, Paystack checkout, offline operation, and backup/restore.
4. Add the two verified APKs and the matching `changelog.json` to `public/downloads/vX.Y.Z/`.
5. Run `npm run check` and `npm run build`. The build fails if an APK listed by the release catalog is missing or unreadable.
6. Deploy and directly test the resulting `https://kotaos.juveniq.co.za/downloads/vX.Y.Z/...` URLs.
7. Download the deployed APKs again and compare their SHA-256 values with the release build verification output.

For v1.0.4 the active index is:

```json
{
  "schemaVersion": 1,
  "downloadBaseUrl": "https://kotaos.juveniq.co.za/downloads/",
  "latest": "1.0.4",
  "versions": ["1.0.4"]
}
```

The Android browser installation-source prompt remains under Android's control. Keep Play Protect enabled. The download selector uses browser architecture hints when available and otherwise asks the visitor to choose ARM64 or ARMv7 rather than guessing.

## Future storage migration

Hosting the pilot installers with the website keeps the first release simple. If APK size, repository size, bandwidth or deployment limits become inconvenient later, move the binaries to object storage or another download host and update `DOWNLOAD_BASE_URL` in `src/data/release-catalog.ts` together with `public/downloads/index.json`.

## Legal

Company policies: https://juveniq.co.za/legal
