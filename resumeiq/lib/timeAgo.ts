export function timeAgo(timestamp: number, now = Date.now()): string {
  const diffSec = Math.trunc((timestamp - now) / 1000); // negative = past
  const abs = Math.abs(diffSec);
  if (abs < 45) return "just now";

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["week", 604_800],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
  ] as const;

  for (const [unit, secs] of units) {
    if (abs >= secs) return rtf.format(Math.trunc(diffSec / secs), unit);
  }
  return "just now";
}
