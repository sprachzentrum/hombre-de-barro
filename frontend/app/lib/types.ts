import type { StrapiMedia } from "./strapi";

/* ── Strapi 5 — Blocks (rich text) ────────────────────────────────
   Loosely typed; full type is too noisy for application code. */
export type BlocksContent = Array<Record<string, unknown>>;

/* ── Components ───────────────────────────────────────────────── */
export interface StatItem {
  id: number;
  numero: string;
  etiqueta: string;
}

export interface ServicioItem {
  id: number;
  icono: string;
  titulo: string;
  descripcion: string;
}

export interface FichaItem {
  id: number;
  etiqueta: string;
  valor: string;
}

export interface PrincipioItem {
  id: number;
  numero?: string;
  titulo: string;
  descripcion: string;
}

export interface HitoItem {
  id: number;
  año: string;
  titulo: string;
  descripcion?: string;
}

/* ── Taxonomies ───────────────────────────────────────────────── */
export interface Tecnica {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  icono?: string;
}

export interface CategoriaBiblioteca {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
  icono?: string;
  orden?: number;
}

export interface CategoriaBlog {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
}

/* ── Collections ──────────────────────────────────────────────── */
export interface Proyecto {
  id: number;
  documentId: string;
  titulo: string;
  slug: string;
  ubicacion?: string;
  superficie_m2?: number;
  año?: number;
  estado: "diseño" | "en_obra" | "terminado";
  descripcion_corta?: string;
  descripcion?: BlocksContent;
  imagen_principal?: StrapiMedia | null;
  galeria?: StrapiMedia[];
  plano_pdf?: StrapiMedia | null;
  video_url?: string;
  ficha_tecnica?: FichaItem[];
  testimonial_texto?: string;
  testimonial_autor?: string;
  destacado: boolean;
  color_acento?: string;
  tecnicas?: Tecnica[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Articulo {
  id: number;
  documentId: string;
  titulo: string;
  slug: string;
  tipo: "guía" | "plano" | "artículo";
  dificultad: "Básico" | "Intermedio" | "Avanzado";
  tiempo_lectura?: string;
  extracto: string;
  contenido?: BlocksContent;
  imagen_portada?: StrapiMedia | null;
  tiene_planos: boolean;
  archivos_descarga?: StrapiMedia[];
  galeria_proceso?: StrapiMedia[];
  video_url?: string;
  materiales?: string;
  herramientas?: string;
  destacado: boolean;
  categoria?: CategoriaBiblioteca | null;
  articulos_relacionados?: Articulo[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface EntradaBlog {
  id: number;
  documentId: string;
  titulo: string;
  slug: string;
  extracto: string;
  contenido?: BlocksContent;
  imagen_portada?: StrapiMedia | null;
  destacado: boolean;
  categoria_blog?: CategoriaBlog | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface MiembroEquipo {
  id: number;
  documentId: string;
  nombre: string;
  slug: string;
  rol: string;
  bio?: BlocksContent;
  foto?: StrapiMedia | null;
  instagram?: string;
  linkedin?: string;
  email?: string;
  orden: number;
}

/* ── Single Types ─────────────────────────────────────────────── */
export interface PaginaInicio {
  hero_eyebrow?: string;
  hero_titulo: string;
  hero_titulo_italica?: string;
  hero_subtitulo?: string;
  hero_imagen?: StrapiMedia | null;
  estadisticas?: StatItem[];
  nosotros_eyebrow?: string;
  nosotros_titulo?: string;
  nosotros_texto?: BlocksContent;
  nosotros_imagen?: StrapiMedia | null;
  servicios?: ServicioItem[];
  cta_titulo?: string;
  cta_texto?: string;
  cta_boton_texto?: string;
}

export interface PaginaNosotros {
  titulo?: string;
  subtitulo?: string;
  historia?: BlocksContent;
  principios?: PrincipioItem[];
  hitos?: HitoItem[];
  imagen_principal?: StrapiMedia | null;
}

export interface ConfiguracionGlobal {
  nombre_estudio: string;
  tagline?: string;
  descripcion_corta?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  whatsapp?: string;
  instagram_url?: string;
  facebook_url?: string;
  youtube_url?: string;
  pinterest_url?: string;
  linkedin_url?: string;
  logo?: StrapiMedia | null;
  logo_blanco?: StrapiMedia | null;
  og_image?: StrapiMedia | null;
}

/* All monetary values are in argentine pesos (ARS).
   USD is derived dynamically using `tipo_cambio_default`, which is
   adjustable from the UI by the visitor. */
export interface ComparadorParametros {
  /** Exchange rate ARS per 1 USD (initial slider value) */
  tipo_cambio_default: number;
  /** Discount factor applied to sustainable construction cost when the
      visitor opts in to autoconstrucción (0.25 = 25% off). */
  autoconstruccion_descuento: number;

  /** ARS/m² — convencional, completo (CAPC/IEC) */
  costo_m2_convencional: number;
  /** ARS/m² — sustentable, completo */
  costo_m2_sustentable: number;

  /** ARS/m²/mes — operativos */
  energia_conv_por_m2_mes: number;
  energia_sust_por_m2_mes: number;
  agua_conv_por_m2_mes: number;
  agua_sust_por_m2_mes: number;

  /** ARS/m²/año — mantenimiento */
  mant_conv_por_m2_año: number;
  mant_sust_por_m2_año: number;

  /** Tasas anuales (0.40 = 40%) */
  inflacion_energia_conv: number;
  inflacion_energia_sust: number;
  inflacion_total_conv: number;
  inflacion_total_sust: number;

  /** Inversión fija sustentable (ARS) — solar off-grid completo */
  inversion_solar_fija: number;
  /** Inversión fija sustentable (ARS) — captación, fito-depuración, filtros */
  inversion_agua_fija: number;

  /** CO₂ — toneladas/m² */
  co2_conv_por_m2: number;
  co2_sust_por_m2: number;
  arboles_por_tonelada_co2: number;
  disclaimer?: string;
}
