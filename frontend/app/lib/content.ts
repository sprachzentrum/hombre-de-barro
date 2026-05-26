/* Content accessors with graceful fallbacks.
   Each getter tries Strapi first; on failure (network error, 404, not
   yet populated), returns prototype defaults so the site renders
   end-to-end before any content has been authored. */

import { fetchCollection, fetchSingle } from "./strapi";
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

async function safeSingle<T>(
  path: string,
  fallback: T,
  query?: Record<string, unknown>
): Promise<T> {
  try {
    const res = await fetchSingle<T>(path, { query });
    if (!res.data) return fallback;
    return { ...fallback, ...(res.data as object) } as T;
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[strapi] using fallback for ${path}: ${(e as Error).message}`
      );
    }
    return fallback;
  }
}

async function safeCollection<T>(
  path: string,
  fallback: T[],
  query?: Record<string, unknown>
): Promise<T[]> {
  try {
    const res = await fetchCollection<T>(path, { query });
    return res.data?.length ? res.data : fallback;
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[strapi] using fallback for ${path}: ${(e as Error).message}`
      );
    }
    return fallback;
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
  return safeCollection<Proyecto>("/proyectos", fallbackProyectos, {
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
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[strapi] proyecto by slug fallback: ${(e as Error).message}`);
    }
  }
  return fallbackProyectos.find((p) => p.slug === slug) ?? null;
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
  return safeCollection<Articulo>("/articulos", fallbackArticulos, {
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
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[strapi] articulo by slug fallback: ${(e as Error).message}`);
    }
  }
  return fallbackArticulos.find((a) => a.slug === slug) ?? null;
}

export function getCategoriasBiblioteca() {
  return safeCollection<CategoriaBiblioteca>(
    "/categorias-biblioteca",
    fallbackCategorias,
    { sort: ["orden:asc"] }
  );
}

export function getTecnicas() {
  return safeCollection<Tecnica>("/tecnicas", fallbackTecnicas);
}

export function getEntradas() {
  return safeCollection<EntradaBlog>("/entradas-blog", fallbackEntradas, {
    populate: { imagen_portada: true, categoria_blog: true },
    sort: ["createdAt:desc"],
  });
}

export function getCategoriasBlog() {
  return safeCollection<CategoriaBlog>(
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
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[strapi] entrada by slug fallback: ${(e as Error).message}`);
    }
  }
  return fallbackEntradas.find((e) => e.slug === slug) ?? null;
}

export function getEquipo() {
  return safeCollection<MiembroEquipo>("/miembros-equipo", fallbackEquipo, {
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
