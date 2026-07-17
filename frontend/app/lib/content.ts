/* Content accessors with optional demo fallbacks.
   Fallbacks are enabled in development or when USE_FALLBACK_CONTENT=true.
   Production should set it to false so empty, deleted and unpublished CMS
   content is never replaced by prototype data. */

import { fetchAllCollection, fetchCollection, fetchSingle } from "./strapi";
import {
  fallbackArticulos,
  fallbackCategorias,
  fallbackCategoriasBlog,
  fallbackComparador,
  fallbackConfig,
  fallbackEntradas,
  fallbackEquipo,
  fallbackInicio,
  fallbackNosotros,
  fallbackProyectos,
  fallbackTecnicas,
} from "./fallbacks";
import type {
  Articulo,
  CategoriaBiblioteca,
  CategoriaBlog,
  ComparadorParametros,
  ConfiguracionGlobal,
  EntradaBlog,
  MiembroEquipo,
  PaginaInicio,
  PaginaNosotros,
  Proyecto,
  Tecnica,
} from "./types";

const FALLBACKS_ENABLED =
  process.env.USE_FALLBACK_CONTENT === "true" ||
  (process.env.USE_FALLBACK_CONTENT !== "false" &&
    process.env.NODE_ENV !== "production");

async function safeSingle<T>(
  path: string,
  fallback: T,
  query?: Record<string, unknown>
): Promise<T> {
  try {
    const res = await fetchSingle<T>(path, { query });
    if (!res.data) {
      if (FALLBACKS_ENABLED) return fallback;
      throw new Error(`Strapi returned no content for ${path}`);
    }
    return FALLBACKS_ENABLED
      ? ({ ...fallback, ...(res.data as object) } as T)
      : res.data;
  } catch (e) {
    if (FALLBACKS_ENABLED) {
      console.warn(
        `[strapi] using fallback for ${path}: ${(e as Error).message}`
      );
      return fallback;
    }
    throw e;
  }
}

async function safeCollection<T>(
  path: string,
  fallback: T[],
  query?: Record<string, unknown>
): Promise<T[]> {
  try {
    const res = await fetchCollection<T>(path, { query });
    if (res.data?.length || !FALLBACKS_ENABLED) return res.data ?? [];
    return fallback;
  } catch (e) {
    if (FALLBACKS_ENABLED) {
      console.warn(
        `[strapi] using fallback for ${path}: ${(e as Error).message}`
      );
      return fallback;
    }
    throw e;
  }
}

async function safeAllCollection<T>(
  path: string,
  fallback: T[],
  query?: Record<string, unknown>
): Promise<T[]> {
  try {
    const res = await fetchAllCollection<T>(path, { query });
    if (res.data?.length || !FALLBACKS_ENABLED) return res.data ?? [];
    return fallback;
  } catch (e) {
    if (FALLBACKS_ENABLED) {
      console.warn(
        `[strapi] using fallback for ${path}: ${(e as Error).message}`
      );
      return fallback;
    }
    throw e;
  }
}

/* ── Globals ──────────────────────────────────────────────────── */
export function getConfig() {
  return safeSingle<ConfiguracionGlobal>(
    "/configuracion-global",
    fallbackConfig,
    { populate: "*" }
  );
}

export function getInicio() {
  return safeSingle<PaginaInicio>("/pagina-inicio", fallbackInicio, {
    populate: {
      hero_imagen: true,
      nosotros_imagen: true,
      estadisticas: true,
      servicios: true,
      nosotros_texto: true,
    },
  });
}

export function getComparadorParams() {
  return safeSingle<ComparadorParametros>(
    "/comparador-parametros",
    fallbackComparador
  );
}

/* ── Collections ──────────────────────────────────────────────── */
export function getProyectosDestacados(limit = 4) {
  return safeCollection<Proyecto>("/proyectos", fallbackProyectos.slice(0, limit), {
    filters: { destacado: { $eq: true } },
    populate: { imagen_principal: true, tecnicas: true },
    sort: ["año:desc"],
    pagination: { limit },
  });
}

export function getProyectos() {
  return safeAllCollection<Proyecto>("/proyectos", fallbackProyectos, {
    populate: { imagen_principal: true, tecnicas: true },
    sort: ["año:desc"],
  });
}

export async function getProyectoBySlug(slug: string): Promise<Proyecto | null> {
  try {
    const res = await fetchCollection<Proyecto>("/proyectos", {
      query: {
        filters: { slug: { $eq: slug } },
        populate: {
          imagen_principal: true,
          galeria: true,
          plano_pdf: true,
          tecnicas: true,
          ficha_tecnica: true,
        },
      },
    });
    if (res.data?.[0]) return res.data[0];
  } catch (e) {
    if (FALLBACKS_ENABLED) {
      console.warn(`[strapi] proyecto by slug fallback: ${(e as Error).message}`);
      return fallbackProyectos.find((p) => p.slug === slug) ?? null;
    }
    throw e;
  }
  return FALLBACKS_ENABLED
    ? fallbackProyectos.find((p) => p.slug === slug) ?? null
    : null;
}

export function getArticulosDestacados(limit = 4) {
  return safeCollection<Articulo>(
    "/articulos",
    fallbackArticulos.slice(0, limit),
    {
      filters: { destacado: { $eq: true } },
      populate: { imagen_portada: true, categoria: true },
      sort: ["createdAt:desc"],
      pagination: { limit },
    }
  );
}

export function getArticulos() {
  return safeAllCollection<Articulo>("/articulos", fallbackArticulos, {
    populate: { imagen_portada: true, categoria: true },
    sort: ["createdAt:desc"],
  });
}

export async function getArticuloBySlug(slug: string): Promise<Articulo | null> {
  try {
    const res = await fetchCollection<Articulo>("/articulos", {
      query: {
        filters: { slug: { $eq: slug } },
        populate: {
          imagen_portada: true,
          categoria: true,
          archivos_descarga: true,
          galeria_proceso: true,
          articulos_relacionados: { populate: ["categoria"] },
        },
      },
    });
    if (res.data?.[0]) return res.data[0];
  } catch (e) {
    if (FALLBACKS_ENABLED) {
      console.warn(`[strapi] articulo by slug fallback: ${(e as Error).message}`);
      return fallbackArticulos.find((a) => a.slug === slug) ?? null;
    }
    throw e;
  }
  return FALLBACKS_ENABLED
    ? fallbackArticulos.find((a) => a.slug === slug) ?? null
    : null;
}

export function getCategoriasBiblioteca() {
  return safeAllCollection<CategoriaBiblioteca>(
    "/categorias-biblioteca",
    fallbackCategorias,
    { sort: ["orden:asc"] }
  );
}

export function getTecnicas() {
  return safeAllCollection<Tecnica>("/tecnicas", fallbackTecnicas);
}

export function getEntradas() {
  return safeAllCollection<EntradaBlog>("/entradas-blog", fallbackEntradas, {
    populate: { imagen_portada: true, categoria_blog: true },
    sort: ["createdAt:desc"],
  });
}

export function getCategoriasBlog() {
  return safeAllCollection<CategoriaBlog>(
    "/categorias-blog",
    fallbackCategoriasBlog
  );
}

export async function getEntradaBySlug(
  slug: string
): Promise<EntradaBlog | null> {
  try {
    const res = await fetchCollection<EntradaBlog>("/entradas-blog", {
      query: {
        filters: { slug: { $eq: slug } },
        populate: { imagen_portada: true, categoria_blog: true },
      },
    });
    if (res.data?.[0]) return res.data[0];
  } catch (e) {
    if (FALLBACKS_ENABLED) {
      console.warn(`[strapi] entrada by slug fallback: ${(e as Error).message}`);
      return fallbackEntradas.find((entry) => entry.slug === slug) ?? null;
    }
    throw e;
  }
  return FALLBACKS_ENABLED
    ? fallbackEntradas.find((entry) => entry.slug === slug) ?? null
    : null;
}

export function getEquipo() {
  return safeAllCollection<MiembroEquipo>("/miembros-equipo", fallbackEquipo, {
    populate: { foto: true },
    sort: ["orden:asc"],
  });
}

export function getNosotros() {
  return safeSingle<PaginaNosotros>("/pagina-nosotros", fallbackNosotros, {
    populate: {
      imagen_principal: true,
      principios: true,
      hitos: true,
      historia: true,
    },
  });
}
