import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

export type ApkMeta = {
  fileName: string;
  version: string;
  sizeBytes: number;
  sizeLabel: string;
  sha256: string;
  downloadPath: string;
  releaseDate: string;
};

const APK_DIR = fileURLToPath(new URL("../../public/assets", import.meta.url));
const VERSION_PATTERN = /v(\d+)\.(\d+)\.(\d+)/i;

type ParsedVersion = [number, number, number];

function parseVersion(fileName: string): ParsedVersion | null {
  const match = fileName.match(VERSION_PATTERN);
  if (!match) {
    return null;
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function compareVersions(a: ParsedVersion, b: ParsedVersion): number {
  if (a[0] !== b[0]) {
    return a[0] - b[0];
  }
  if (a[1] !== b[1]) {
    return a[1] - b[1];
  }
  return a[2] - b[2];
}

function toSizeLabel(sizeBytes: number): string {
  return `${(sizeBytes / 1024 / 1024).toFixed(2)} MB`;
}

export function getLatestApkMeta(releaseDate: string): ApkMeta | null {
  let files: string[] = [];
  try {
    files = readdirSync(APK_DIR)
      .filter((entry) => entry.toLowerCase().endsWith(".apk"))
      .map((entry) => join(APK_DIR, entry));
  } catch {
    return null;
  }

  if (files.length === 0) {
    return null;
  }

  const withVersion = files
    .map((filePath) => ({
      filePath,
      parsed: parseVersion(basename(filePath))
    }))
    .filter((entry): entry is { filePath: string; parsed: ParsedVersion } => entry.parsed !== null)
    .sort((a, b) => compareVersions(b.parsed, a.parsed));

  const bestFilePath =
    withVersion.length > 0
      ? withVersion[0].filePath
      : files.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)[0];

  const fileName = basename(bestFilePath);
  const sizeBytes = statSync(bestFilePath).size;
  const versionMatch = parseVersion(fileName);
  const version = versionMatch
    ? `${versionMatch[0]}.${versionMatch[1]}.${versionMatch[2]}`
    : "Unknown";
  const sha256 = createHash("sha256").update(readFileSync(bestFilePath)).digest("hex").toUpperCase();
  const downloadPath = `/assets/${encodeURIComponent(fileName)}`;

  return {
    fileName,
    version,
    sizeBytes,
    sizeLabel: toSizeLabel(sizeBytes),
    sha256,
    downloadPath,
    releaseDate
  };
}
