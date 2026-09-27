import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { Installer, Version } from "@/data/release-catalog";
import { detectAndroidAbi } from "@/lib/device-abi";

type Props = {
  versions: Version[];
  latestVersion: string;
};

export default function DownloadSelector({ versions, latestVersion }: Props) {
  const [selectedVersion, setSelectedVersion] = useState(latestVersion);
  const [status, setStatus] = useState<"idle" | "checking" | "downloading">("idle");
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);

  const release = useMemo(
    () => versions.find((item) => item.version === selectedVersion) ?? versions[0],
    [selectedVersion, versions]
  );

  const defaultInstaller =
    release?.artifacts.find((item) => item.abi === "arm64-v8a") ??
    release?.artifacts[0] ??
    null;

  async function downloadForDevice() {
    if (!release || status === "checking") return;

    setStatus("checking");

    const detectedAbi = await detectAndroidAbi(navigator);
    const detectedInstaller = detectedAbi
      ? release.artifacts.find((item) => item.abi === detectedAbi)
      : null;
    const installer = detectedInstaller ?? defaultInstaller;

    if (!installer) {
      setStatus("idle");
      return;
    }

    setSelectedInstaller(installer);
    setStatus("downloading");

    const anchor = document.createElement("a");
    anchor.href = installer.url;
    anchor.download = installer.fileName;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => setStatus("idle"), 1200);
  }

  if (!release) return null;

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
            onChange={(event) => {
              setSelectedVersion(event.target.value);
              setSelectedInstaller(null);
            }}
            className="focus-ring min-h-14 w-full appearance-none rounded-2xl border-2 border-brand-primary bg-white px-5 py-3 text-lg font-extrabold text-brand-foreground shadow-sm"
            aria-label="Choose Kota-OS version"
          >
            {versions.map((item) => (
              <option key={item.version} value={item.version}>
                Kota-OS v{item.version}{item.version === latestVersion ? " · Latest" : ""}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => void downloadForDevice()}
            disabled={status === "checking"}
            className="btn-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-6 text-base font-extrabold shadow-lg disabled:cursor-wait disabled:opacity-70"
          >
            <Download className="h-5 w-5" aria-hidden="true" />
            {status === "checking"
              ? "Checking your phone…"
              : status === "downloading"
                ? "Download started"
                : "Download v" + release.version + " for Android"}
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          We automatically choose the installer that matches your Android phone. If your browser does not report the device type, Kota-OS uses the standard 64-bit Android installer.
        </p>
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

        {selectedInstaller ? (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold text-brand-primary">
              Download details
            </summary>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-brand-foreground">File</dt>
                <dd className="mt-1 break-all text-brand-muted">{selectedInstaller.fileName}</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-foreground">File size</dt>
                <dd className="mt-1 text-brand-muted">
                  {selectedInstaller.sizeLabel} ({selectedInstaller.sizeBytes.toLocaleString("en-ZA")} bytes)
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-brand-foreground">SHA-256</dt>
                <dd className="mt-1 break-all font-mono text-xs text-brand-muted">{selectedInstaller.sha256}</dd>
              </div>
              {selectedInstaller.signingCertSha256 ? (
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-brand-foreground">Signing certificate SHA-256</dt>
                  <dd className="mt-1 break-all font-mono text-xs text-brand-muted">{selectedInstaller.signingCertSha256}</dd>
                </div>
              ) : null}
            </dl>
          </details>
        ) : (
          <p className="mt-4 text-xs text-brand-muted">
            File size and verification details will appear here after Kota-OS selects your installer.
          </p>
        )}
      </div>

      <noscript>
        <p className="mt-4 text-sm text-brand-muted">
          JavaScript is required to select the correct Android installer automatically.
        </p>
      </noscript>
    </div>
  );
}
