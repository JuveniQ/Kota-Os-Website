import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { Version } from "@/data/release-catalog";

type Props = {
  versions: Version[];
  latestVersion: string;
};

export default function DownloadSelector({ versions, latestVersion }: Props) {
  const [selectedVersion, setSelectedVersion] = useState(latestVersion);

  const release = useMemo(
    () => versions.find((item) => item.version === selectedVersion) ?? versions[0],
    [selectedVersion, versions]
  );

  if (!release) return null;

  // Plain links, so downloads also work before hydration or without JavaScript.
  const main = release.artifacts.find((item) => item.abi === "arm64-v8a");
  const older = release.artifacts.find((item) => item.abi === "armeabi-v7a");
  const installers = [main, older].filter((item) => item !== undefined);

  return (
    <div className="mt-7">
      <div className="rounded-3xl border-2 border-brand-primary/30 bg-brand-primary/5 p-5 sm:p-6">
        <label htmlFor="kota-version" className="block text-xs font-extrabold uppercase tracking-[0.18em] text-brand-primary">
          Choose your version
        </label>

        <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr),auto] sm:items-stretch">
          <select
            id="kota-version"
            value={selectedVersion}
            onChange={(event) => setSelectedVersion(event.target.value)}
            className="focus-ring min-h-14 w-full appearance-none rounded-2xl border-2 border-brand-primary bg-white px-5 py-3 text-lg font-extrabold text-brand-foreground shadow-sm"
            aria-label="Choose Kota-OS version"
          >
            {versions.map((item) => (
              <option key={item.version} value={item.version}>
                Kota-OS v{item.version}{item.version === latestVersion ? " · Latest" : ""}
              </option>
            ))}
          </select>

          {main ? (
            <a
              href={main.url}
              download={main.fileName}
              className="btn-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-6 text-base font-extrabold shadow-lg"
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              Download v{release.version} for Android
            </a>
          ) : null}
        </div>

        {main ? <p className="mt-3 text-sm text-brand-muted">{main.sizeLabel} · Works on most Android phones</p> : null}

        {older ? (
          <p className="mt-4 text-sm text-brand-muted">
            Using an older phone?{" "}
            <a href={older.url} download={older.fileName} className="font-semibold text-brand-primary underline">
              Download the version for older phones
            </a>{" "}
            ({older.sizeLabel})
          </p>
        ) : null}
      </div>

      <div className="mt-5 rounded-2xl border border-brand-border bg-brand-background p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-bold text-brand-foreground">Kota-OS v{release.version}</p>
            <p className="mt-1 text-sm text-brand-muted">Released {release.date} · {release.summary}</p>
          </div>
          {release.version === latestVersion ? (
            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-primary">
              Latest
            </span>
          ) : null}
        </div>

        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-semibold text-brand-primary">
            File details and checksums
          </summary>
          <dl className="mt-4 grid gap-4 text-sm">
            {installers.map((installer) => (
              <div key={installer.abi}>
                <dt className="font-semibold text-brand-foreground">
                  {installer === main ? "Main download" : "Older phones"}
                </dt>
                <dd className="mt-1 break-all text-brand-muted">
                  {installer.fileName} · {installer.sizeBytes.toLocaleString("en-ZA")} bytes
                </dd>
                <dd className="mt-1 break-all font-mono text-xs text-brand-muted">SHA-256 {installer.sha256}</dd>
              </div>
            ))}
            {installers[0]?.signingCertSha256 ? (
              <div>
                <dt className="font-semibold text-brand-foreground">Signing certificate SHA-256</dt>
                <dd className="mt-1 break-all font-mono text-xs text-brand-muted">{installers[0].signingCertSha256}</dd>
              </div>
            ) : null}
          </dl>
        </details>
      </div>
    </div>
  );
}
