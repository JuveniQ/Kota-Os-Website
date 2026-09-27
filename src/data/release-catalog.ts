import { readFileSync } from "node:fs";

export type Installer = {
  abi: "arm64-v8a" | "armeabi-v7a";
  fileName: string;
  sizeBytes: number;
  sizeLabel: string;
  sha256: string;
  signingCertSha256: string;
  url: string;
};

export type Version = {
  version: string;
  date: string;
  summary: string;
  features: string[];
  fixes: string[];
  artifacts: Installer[];
};

export type ReleaseCatalog = { latest: Version | null; versions: Version[] };

const ROOT = new URL("../../public/downloads/", import.meta.url);
const DOWNLOAD_BASE_URL = "https://kotaos.juveniq.co.za/downloads/";
const SHA256 = /^[a-f\d]{64}$/i;
const VERSION = /^\d+\.\d+\.\d+$/;
const FILE_NAME = /^kota-os-website-(?:arm64-v8a|armeabi-v7a)\.apk$/;
const ABIS = ["arm64-v8a", "armeabi-v7a"] as const;

function record(value: unknown, name: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${name} must be an object`);
  }
}

function string(value: unknown, name: string): asserts value is string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Invalid ${name}`);
}

function strings(value: unknown, name: string): asserts value is string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string" && item.trim())) {
    throw new Error(`Invalid ${name}`);
  }
}

function readJson(path: URL): unknown {
  return JSON.parse(readFileSync(path, "utf8"));
}

function parseVersion(value: unknown, version: string, baseUrl: URL): Version {
  record(value, `v${version}/changelog.json`);
  if (value.version !== version) throw new Error(`Changelog version mismatch for ${version}`);
  string(value.date, `${version} date`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value.date) ||
    Number.isNaN(Date.parse(value.date)) ||
    new Date(`${value.date}T00:00:00Z`).toISOString().slice(0, 10) !== value.date) {
    throw new Error(`Invalid ${version} date`);
  }
  string(value.summary, `${version} summary`);
  strings(value.features, `${version} features`);
  strings(value.fixes, `${version} fixes`);
  if (!Array.isArray(value.artifacts)) throw new Error(`Invalid ${version} artifacts`);
  const seen = new Set<string>();
  const artifacts: Installer[] = value.artifacts.map((raw: unknown) => {
    record(raw, `${version} installer`);
    if (!ABIS.includes(raw.abi as Installer["abi"]) || seen.has(raw.abi as string)) {
      throw new Error(`Invalid or duplicate ${version} ABI`);
    }
    seen.add(raw.abi as string);
    if (typeof raw.fileName !== "string" || !FILE_NAME.test(raw.fileName) ||
      raw.fileName !== `kota-os-website-${raw.abi}.apk` ||
      !Number.isSafeInteger(raw.sizeBytes) || (raw.sizeBytes as number) <= 0 ||
      typeof raw.sha256 !== "string" || !SHA256.test(raw.sha256) ||
      typeof raw.signingCertSha256 !== "string" || !SHA256.test(raw.signingCertSha256)) {
      throw new Error(`Invalid ${version} installer metadata`);
    }
    return {
      abi: raw.abi as Installer["abi"],
      fileName: raw.fileName,
      sizeBytes: raw.sizeBytes as number,
      sizeLabel: ((raw.sizeBytes as number) / 1048576).toFixed(1) + " MB",
      sha256: raw.sha256.toUpperCase(),
      signingCertSha256: raw.signingCertSha256.toUpperCase(),
      url: new URL(`v${version}/${raw.fileName}`, baseUrl).href
    };
  });
  if (new Set(artifacts.map((artifact) => artifact.signingCertSha256)).size > 1) {
    throw new Error(`Mixed signing certificates for ${version}`);
  }
  return {
    version,
    date: value.date,
    summary: value.summary,
    features: value.features,
    fixes: value.fixes,
    artifacts
  };
}

export function loadReleaseCatalog(root: URL = ROOT): ReleaseCatalog {
  const index = readJson(new URL("index.json", root));
  record(index, "download index");
  if (index.schemaVersion !== 1 || index.downloadBaseUrl !== DOWNLOAD_BASE_URL ||
    !Array.isArray(index.versions) || !index.versions.every((version) =>
      typeof version === "string" && VERSION.test(version)) ||
    new Set(index.versions).size !== index.versions.length ||
    (index.latest !== null && (typeof index.latest !== "string" || !VERSION.test(index.latest)))) {
    throw new Error("Invalid download index");
  }
  const baseUrl = new URL(index.downloadBaseUrl);
  const versions = (index.versions as string[]).map((version) =>
    parseVersion(readJson(new URL(`v${version}/changelog.json`, root)), version, baseUrl));
  const compare = (a: string, b: string) => {
    const aa = a.split(".").map(Number);
    const bb = b.split(".").map(Number);
    for (let i = 0; i < 3; i++) if (aa[i] !== bb[i]) return aa[i] - bb[i];
    return 0;
  };
  if (versions.some((current, i) => i > 0 && compare(current.version, versions[i - 1].version) >= 0)) {
    throw new Error("Download versions must be newest first");
  }
  const latest = versions.find((release) => release.version === index.latest) ?? null;
  if (index.latest !== null && (!latest || latest !== versions[0] ||
    latest.artifacts.length !== ABIS.length ||
    ABIS.some((abi) => !latest.artifacts.some((artifact) => artifact.abi === abi)))) {
    throw new Error("Latest release requires both verified ARM APK listings");
  }
  return { latest, versions };
}
