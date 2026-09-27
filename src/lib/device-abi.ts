import type { Installer } from "@/data/release-catalog";

export type Abi = Installer["abi"];

type BrowserInfo = {
  userAgent?: string;
  userAgentData?: {
    getHighEntropyValues(hints: string[]): Promise<{
      platform?: string;
      architecture?: string;
      bitness?: string;
    }>;
  };
};

/** A web page cannot read Android's SUPPORTED_ABIS; only explicit hints are used. */
export async function detectAndroidAbi(browser: BrowserInfo): Promise<Abi | null> {
  try {
    const hints = await browser.userAgentData?.getHighEntropyValues(["platform", "architecture", "bitness"]);
    if (hints?.platform?.toLowerCase() === "android") {
      const arch = hints.architecture?.toLowerCase();
      if (arch === "aarch64" || arch === "arm64") return "arm64-v8a";
      if (arch === "arm" && hints.bitness === "64") return "arm64-v8a";
      if (arch === "arm" && hints.bitness === "32") return "armeabi-v7a";
    }
  } catch {
    // Browsers may deny high-entropy hints or omit the API entirely.
  }
  const ua = browser.userAgent ?? "";
  if (!/Android/i.test(ua)) return null;
  if (/\b(?:aarch64|arm64-v8a)\b/i.test(ua)) return "arm64-v8a";
  if (/\b(?:armeabi-v7a|armv7l)\b/i.test(ua)) return "armeabi-v7a";
  return null;
}
