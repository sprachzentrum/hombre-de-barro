import qs from "qs";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const PUBLIC_STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T | null;
  meta?: Record<string, unknown>;
}

export interface FetchOptions {
  query?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
}

const DEFAULT_REVALIDATE = 60;

async function strapiFetch<T>(
  path: string,
  { query, revalidate = DEFAULT_REVALIDATE, tags }: FetchOptions = {}
): Promise<T> {
  const qstring = query
    ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
    : "";
  const url = `${STRAPI_URL}/api${path}${qstring}`;

  const headers: HeadersInit = { Accept: "application/json" };
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url, {
    headers,
    next: {
      revalidate: revalidate === false ? undefined : revalidate,
      tags,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Strapi fetch failed (${res.status}) for ${url}\n${body.slice(0, 400)}`
    );
  }

  return res.json();
}

export async function fetchCollection<T>(
  path: string,
  options?: FetchOptions
): Promise<StrapiCollectionResponse<T>> {
  return strapiFetch<StrapiCollectionResponse<T>>(path, options);
}

export async function fetchSingle<T>(
  path: string,
  options?: FetchOptions
): Promise<StrapiSingleResponse<T>> {
  return strapiFetch<StrapiSingleResponse<T>>(path, options);
}

/* ── Media URL helper ─────────────────────────────────────────────
   Strapi returns media URLs as relative paths (e.g. /uploads/foo.jpg).
   This helper prepends the public Strapi host. */
export function mediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${PUBLIC_STRAPI_URL}${url}`;
}

/* ── Best-format helper for responsive images ─────────────────────
   Picks an appropriately-sized variant when Strapi has generated them. */
export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  name: string;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, StrapiMediaFormat>;
  mime?: string;
  name?: string;
}

export function imageFor(
  media: StrapiMedia | null | undefined,
  preferred: "thumbnail" | "small" | "medium" | "large" = "large"
): { src: string; width: number; height: number; alt: string } | null {
  if (!media) return null;
  const fmt = media.formats?.[preferred];
  const f = fmt ?? {
    url: media.url,
    width: media.width ?? 1600,
    height: media.height ?? 1200,
  };
  const src = mediaUrl(f.url) ?? "";
  return {
    src,
    width: f.width,
    height: f.height,
    alt: media.alternativeText ?? "",
  };
}
