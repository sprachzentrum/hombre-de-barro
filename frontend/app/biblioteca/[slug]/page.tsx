import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import RichText from "@/components/shared/RichText";
import { getArticuloBySlug, getArticulos } from "@/app/lib/content";
import { imageFor, mediaUrl } from "@/app/lib/strapi";
import type { Articulo } from "@/app/lib/types";

export const revalidate = 60;

const TYPE_COLOR: Record<Articulo["tipo"], string> = {
  guía: "#3d6b3f",
  plano: "#8b6f47",
  artículo: "#5a7a8b",
};

const DIFFICULTY_COLOR: Record<Articulo["dificultad"], string> = {
  Básico: "#7a9b6d",
  Intermedio: "#c4a050",
  Avanzado: "#c47050",
};

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const a = await getArticuloBySlug(slug);
  if (!a) return { title: "Artículo no encontrado" };
  return { title: a.titulo, description: a.extracto };
}

export default async function ArticuloDetail({ params }: PageParams) {
  const { slug } = await params;
  const articulo = await getArticuloBySlug(slug);
  if (!articulo) notFound();

  const cover = imageFor(articulo.imagen_portada, "large");
  const tipoColor = TYPE_COLOR[articulo.tipo];
  const difColor = DIFFICULTY_COLOR[articulo.dificultad];

  // Related (same categoria, exclude self)
  const all = await getArticulos();
  const relacionados = all
    .filter(
      (x) =>
        x.slug !== articulo.slug &&
        x.categoria?.slug === articulo.categoria?.slug
    )
    .slice(0, 3);

  return (
    <article>
      {/* ── Header ─────────────────────────────────────── */}
      <header
        style={{
          background: "var(--crema-warm)",
          padding: "140px 28px 60px",
          borderBottom: "1px solid var(--linea)",
        }}
      >
        <div style={{ maxWidth: 900, marginInline: "auto" }}>
          <Link
            href="/biblioteca"
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "var(--verde-bosque)",
              marginBottom: 18,
              display: "inline-block",
            }}
          >
            ← Biblioteca
          </Link>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: tipoColor,
                background: `${tipoColor}14`,
                padding: "4px 12px",
                borderRadius: 20,
              }}
            >
              {articulo.tipo}
            </span>
            {articulo.categoria && (
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "var(--carbon-soft)",
                  background: "#fff",
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: "1px solid var(--linea)",
                }}
              >
                {articulo.categoria.icono ? `${articulo.categoria.icono} ` : ""}
                {articulo.categoria.nombre}
              </span>
            )}
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: difColor,
                background: `${difColor}20`,
                padding: "4px 12px",
                borderRadius: 20,
              }}
            >
              {articulo.dificultad}
            </span>
            {articulo.tiempo_lectura && (
              <span
                style={{
                  fontSize: 11,
                  color: "var(--carbon-soft)",
                  background: "#fff",
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: "1px solid var(--linea)",
                }}
              >
                ⏱ {articulo.tiempo_lectura}
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.8vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "var(--carbon)",
              marginBottom: 18,
            }}
          >
            {articulo.titulo}
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--carbon-soft)",
              maxWidth: 720,
            }}
          >
            {articulo.extracto}
          </p>
        </div>
      </header>

      {cover && (
        <div
          style={{
            maxWidth: 1100,
            marginInline: "auto",
            padding: "36px 28px 0",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <Image
              src={cover.src}
              alt={cover.alt || articulo.titulo}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      {/* ── Body ─────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1100,
          marginInline: "auto",
          padding: "48px 28px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 280px",
          gap: 48,
        }}
        className="proyecto-layout"
      >
        <div>
          <FadeIn>
            <div
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "var(--carbon)",
              }}
              className="articulo-body"
            >
              {articulo.contenido ? (
                <RichText content={articulo.contenido} />
              ) : (
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--carbon-soft)",
                    fontStyle: "italic",
                    padding: "20px 0",
                  }}
                >
                  El contenido detallado de este recurso aún no fue cargado. Los
                  arquitectos lo van a completar próximamente desde el panel de
                  administración.
                </p>
              )}
            </div>

            {articulo.materiales && (
              <section style={{ marginTop: 44 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    color: "var(--verde-oscuro)",
                    marginBottom: 12,
                  }}
                >
                  🧱 Materiales
                </h2>
                <div
                  style={{ fontSize: 15, lineHeight: 1.7, color: "var(--carbon-soft)" }}
                  dangerouslySetInnerHTML={{ __html: articulo.materiales }}
                />
              </section>
            )}

            {articulo.herramientas && (
              <section style={{ marginTop: 28 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    color: "var(--verde-oscuro)",
                    marginBottom: 12,
                  }}
                >
                  🔧 Herramientas
                </h2>
                <div
                  style={{ fontSize: 15, lineHeight: 1.7, color: "var(--carbon-soft)" }}
                  dangerouslySetInnerHTML={{ __html: articulo.herramientas }}
                />
              </section>
            )}

            {articulo.galeria_proceso && articulo.galeria_proceso.length > 0 && (
              <section style={{ marginTop: 44 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    color: "var(--verde-oscuro)",
                    marginBottom: 16,
                  }}
                >
                  Paso a paso
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 12,
                  }}
                >
                  {articulo.galeria_proceso.map((m) => {
                    const img = imageFor(m, "medium");
                    if (!img) return null;
                    return (
                      <div
                        key={m.id}
                        style={{
                          position: "relative",
                          aspectRatio: "4 / 3",
                          borderRadius: 10,
                          overflow: "hidden",
                          background: "var(--crema-warm)",
                        }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </FadeIn>
        </div>

        {/* ── Sidebar ─────────────────────────────────── */}
        <aside>
          <div
            style={{
              position: "sticky",
              top: 100,
              background: "#fff",
              border: "1px solid var(--linea)",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "var(--verde-bosque)",
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              Información
            </div>
            <dl style={{ margin: 0, fontSize: 13 }}>
              <div style={{ padding: "8px 0", borderBottom: "1px solid var(--linea)" }}>
                <dt style={{ color: "var(--carbon-soft)" }}>Tipo</dt>
                <dd style={{ margin: 0, color: tipoColor, fontWeight: 600, textTransform: "capitalize" }}>
                  {articulo.tipo}
                </dd>
              </div>
              <div style={{ padding: "8px 0", borderBottom: "1px solid var(--linea)" }}>
                <dt style={{ color: "var(--carbon-soft)" }}>Dificultad</dt>
                <dd style={{ margin: 0, color: difColor, fontWeight: 600 }}>
                  {articulo.dificultad}
                </dd>
              </div>
              {articulo.tiempo_lectura && (
                <div style={{ padding: "8px 0", borderBottom: "1px solid var(--linea)" }}>
                  <dt style={{ color: "var(--carbon-soft)" }}>Lectura</dt>
                  <dd style={{ margin: 0, color: "var(--carbon)" }}>
                    {articulo.tiempo_lectura}
                  </dd>
                </div>
              )}
              {articulo.categoria && (
                <div style={{ padding: "8px 0" }}>
                  <dt style={{ color: "var(--carbon-soft)" }}>Categoría</dt>
                  <dd style={{ margin: 0, color: "var(--carbon)" }}>
                    {articulo.categoria.nombre}
                  </dd>
                </div>
              )}
            </dl>

            {articulo.archivos_descarga && articulo.archivos_descarga.length > 0 && (
              <>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "var(--verde-bosque)",
                    fontWeight: 500,
                    margin: "20px 0 10px",
                  }}
                >
                  Descargas
                </div>
                {articulo.archivos_descarga.map((f) => {
                  const url = mediaUrl(f.url);
                  if (!url) return null;
                  return (
                    <a
                      key={f.id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        padding: "10px 14px",
                        background: "var(--verde-bosque)",
                        color: "#fff",
                        borderRadius: 8,
                        fontSize: 13,
                        marginBottom: 8,
                        textAlign: "center",
                      }}
                    >
                      📥 {f.name ?? "Descargar"}
                    </a>
                  );
                })}
              </>
            )}
          </div>
        </aside>
      </section>

      {/* ── Related ─────────────────────────────────────── */}
      {relacionados.length > 0 && (
        <section
          style={{
            background: "var(--crema-warm)",
            padding: "60px 28px",
          }}
        >
          <div style={{ maxWidth: 1100, marginInline: "auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                color: "var(--verde-oscuro)",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Más sobre {articulo.categoria?.nombre ?? "este tema"}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {relacionados.map((a) => {
                const c = TYPE_COLOR[a.tipo];
                return (
                  <Link
                    key={a.id}
                    href={`/biblioteca/${a.slug}`}
                    style={{
                      background: "#fff",
                      borderRadius: 14,
                      overflow: "hidden",
                      border: "1px solid var(--linea)",
                      display: "block",
                    }}
                  >
                    <div style={{ height: 4, background: c }} />
                    <div style={{ padding: 18 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: 0.5,
                          textTransform: "uppercase",
                          color: c,
                          background: `${c}14`,
                          padding: "2px 10px",
                          borderRadius: 16,
                        }}
                      >
                        {a.tipo}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 15,
                          marginTop: 10,
                          color: "var(--carbon)",
                          lineHeight: 1.3,
                        }}
                      >
                        {a.titulo}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
