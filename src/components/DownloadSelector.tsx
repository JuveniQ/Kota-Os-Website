import { useState } from "react";
import type { Installer } from "@/data/release-catalog";
import { detectAndroidAbi, type Abi } from "@/lib/device-abi";

type Props = { version: string; date: string; installers: Installer[] };
const LABELS: Record<Abi, string> = {
  "arm64-v8a": "64-bit ARM",
  "armeabi-v7a": "32-bit ARM"
};

export default function DownloadSelector({ version, date, installers }: Props) {
  const [selected, setSelected] = useState<Abi | null>(null);
  const [status, setStatus] = useState<"idle" | "checking" | "detected" | "manual">("idle");
  const installer = installers.find((item) => item.abi === selected);

  async function findInstaller() {
    setStatus("checking");
    const abi = await detectAndroidAbi(navigator);
    if (abi && installers.some((item) => item.abi === abi)) {
      setSelected(abi);
      setStatus("detected");
    } else {
      setSelected(null);
      setStatus("manual");
    }
  }

  return (
    <div className="mt-6">
      <button type="button" onClick={findInstaller} disabled={status === "checking"} className="btn-primary min-h-12 disabled:opacity-60">
        {status === "checking" ? "Checking this phone…" : "Find my Android download"}
      </button>
      <p className="mt-3 text-sm text-brand-muted" aria-live="polite">
        {status === "detected"
          ? `This browser reports ${LABELS[selected!]}. Confirm your device details below before downloading.`
          : status === "manual"
            ? "This browser did not reveal your processor type. Choose the architecture listed in your phone's specifications, or contact support."
            : "We check Android browser processor hints when available. You can choose a file manually below."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3" aria-label="Choose Android processor">
        {installers.map((item) => (
          <button key={item.abi} type="button" onClick={() => { setSelected(item.abi); setStatus("manual"); }}
            aria-pressed={selected === item.abi}
            className={`focus-ring rounded-xl border px-4 py-3 text-sm font-semibold ${selected === item.abi ? "border-brand-primary bg-brand-primary/10 text-brand-primary" : "border-brand-border bg-white text-brand-foreground"}`}>
            {LABELS[item.abi]} · {item.sizeLabel}
          </button>
        ))}
      </div>
      {installer && (
        <div className="mt-6 rounded-2xl border border-brand-border bg-brand-background p-5" aria-live="polite">
          <h3 className="text-xl font-bold text-brand-foreground">Kota-OS v{version} for {LABELS[installer.abi]}</h3>
          <p className="mt-1 text-sm text-brand-muted">Released {date} · Website edition</p>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div><dt className="font-semibold text-brand-foreground">APK file</dt><dd className="mt-1 break-all text-brand-muted">{installer.fileName}</dd></div>
            <div><dt className="font-semibold text-brand-foreground">File size</dt><dd className="mt-1 text-brand-muted">{installer.sizeLabel} ({installer.sizeBytes.toLocaleString("en-ZA")} bytes)</dd></div>
            <div className="sm:col-span-2"><dt className="font-semibold text-brand-foreground">APK SHA-256</dt><dd className="mt-1 break-all font-mono text-xs text-brand-muted">{installer.sha256}</dd></div>
            {installer.signingCertSha256 && (
              <div className="sm:col-span-2"><dt className="font-semibold text-brand-foreground">Signing certificate SHA-256</dt><dd className="mt-1 break-all font-mono text-xs text-brand-muted">{installer.signingCertSha256}</dd></div>
            )}
          </dl>
          <a href={installer.url} className="btn-primary mt-6 inline-flex min-h-12 items-center"
            rel="noopener noreferrer" data-track-external="true" data-track-source={`website-apk-${installer.abi}`}>
            Download {LABELS[installer.abi]} APK · {installer.sizeLabel}
          </a>
        </div>
      )}
      <noscript><p className="mt-4 text-sm text-brand-muted">Enable JavaScript to choose an Android installer, or contact support for the correct APK.</p></noscript>
    </div>
  );
}
