/**
 * basePath helper for raw asset URLs.
 *
 * `next/image` and `next/link` automatically prepend `basePath`, but
 * plain `<img>` tags, `<a href>`, `<iframe src>`, and any URLs embedded
 * into CSS/SVG via attribute strings do NOT.
 *
 * Use `assetPath("/logo.svg")` for those cases so the same code works
 * both at the site root (local dev) and under `/hombredebarro` (prod).
 *
 * The constant is computed once at build time from `NEXT_PUBLIC_BASE_PATH`
 * (set by next.config.ts when running in production).
 */
export const BASE_PATH: string =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/hombredebarro" : "");

export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!BASE_PATH) return path;
  // Avoid double-prefixing if a caller already includes the basePath.
  if (path.startsWith(BASE_PATH + "/") || path === BASE_PATH) return path;
  return BASE_PATH + (path.startsWith("/") ? path : "/" + path);
}
