import qs from "qs";
import { assetPath } from "./basePath";

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

/** Fetches every page of a Strapi collection without relying on the API's
 * default 25-item page size. The server-side maxLimit is currently 100. */
export async function fetchAllCollection<T>(
  path: string,
  options: FetchOptions = {}
): Promise<StrapiCollectionResponse<T>> {
  const pageSize = 100;
  const data: T[] = [];
  let page = 1;
  let pageCount = 1;
  let lastMeta: StrapiCollectionResponse<T>["meta"];

  do {
    const response = await fetchCollection<T>(path, {
      ...options,
      query: {
        ...options.query,
        pagination: { page, pageSize },
      },
    });
    data.push(...(response.data ?? []));
    lastMeta = response.meta;
    pageCount = response.meta?.pagination?.pageCount ?? 1;
    page += 1;
  } while (page <= pageCount);

  return { data, meta: lastMeta };
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
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Strapi uploads live under /uploads/* and must be prefixed with the
  // Strapi host.
  if (url.startsWith("/uploads/")) return `${PUBLIC_STRAPI_URL}${url}`;
  // Local public/* asset — prepend basePath so Next's image optimizer
  // can resolve it under `/hombredebarro/...` in production.
  return assetPath(url);
}

/** Allows only web, email, telephone and same-site relative links from CMS data. */
export function safeHref(url: string | null | undefined): string | null {
  const value = url?.trim();
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (value.startsWith("#")) return value;

  try {
    const parsed = new URL(value);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol)
      ? value
      : null;
  } catch {
    return null;
  }
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
