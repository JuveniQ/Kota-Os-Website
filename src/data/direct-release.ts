/**
 * Static metadata for an externally hosted, immutable website APK.
 * All fields must come from the SAME verified and signed build. Until every
 * field is set, the public download page stays in pilot-request mode.
 */
export type DirectRelease = {
  version: string;
  url: string;
  fileName: string;
  sizeBytes: number;
  sizeLabel: string;
  sha256: string;
  signingCertSha256: string;
  releaseDate: string;
};

export function getDirectRelease(): DirectRelease | null {
  const values = [
    import.meta.env.PUBLIC_KOTA_APK_URL,
    import.meta.env.PUBLIC_KOTA_APK_VERSION,
    import.meta.env.PUBLIC_KOTA_APK_SIZE_BYTES,
    import.meta.env.PUBLIC_KOTA_APK_SHA256,
    import.meta.env.PUBLIC_KOTA_APK_SIGNING_CERT_SHA256,
    import.meta.env.PUBLIC_KOTA_APK_RELEASE_DATE
  ];
  if (values.every((value) => !value)) return null;
  if (values.some((value) => !value)) throw new Error("Incomplete direct APK release metadata");
  const [rawUrl, version, rawSize, sha256, signingCertSha256, releaseDate] = values as string[];
  const url = new URL(rawUrl);
  const sizeBytes = Number(rawSize);
  const fileName = decodeURIComponent(url.pathname.split("/").pop() ?? "");
  if (url.protocol !== "https:" || url.hostname !== "downloads.kotaos.juveniq.co.za" ||
      url.username || url.password || url.search || url.hash ||
      !/^[0-9]+\.[0-9]+\.[0-9]+$/.test(version) ||
      !fileName.toLowerCase().endsWith(".apk") ||
      !Number.isSafeInteger(sizeBytes) || sizeBytes <= 0 ||
      !/^[a-f0-9]{64}$/i.test(sha256) || !/^[a-f0-9]{64}$/i.test(signingCertSha256) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate) ||
      Number.isNaN(Date.parse(releaseDate))) {
    throw new Error("Invalid direct APK release metadata");
  }
  return {
    version, url: url.href, fileName, sizeBytes,
    sizeLabel: (sizeBytes / 1048576).toFixed(2) + " MB",
    sha256: sha256.toUpperCase(),
    signingCertSha256: signingCertSha256.toUpperCase(),
    releaseDate
  };
}
