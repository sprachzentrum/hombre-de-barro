import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import RichText from "@/components/shared/RichText";
import ProyectoCard from "@/components/proyectos/ProyectoCard";
import { getProyectoBySlug, getProyectos } from "@/app/lib/content";
import { imageFor, mediaUrl, safeHref } from "@/app/lib/strapi";

export const revalidate = 60;

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const p = await getProyectoBySlug(slug);
  if (!p) return { title: "Proyecto no encontrado" };
  return {
    title: p.titulo,
    description: p.descripcion_corta,
  };
}

export default async function ProyectoDetail({ params }: PageParams) {
  const { slug } = await params;
  const proyecto = await getProyectoBySlug(slug);
  if (!proyecto) notFound();

  const hero = imageFor(proyecto.imagen_principal, "large");
  const planoPdfUrl = proyecto.plano_pdf?.url ? mediaUrl(proyecto.plano_pdf.url) : null;
  const galeria = proyecto.galeria ?? [];
  const videoUrl = safeHref(proyecto.video_url);

  // Related — same first tecnica, excluding self
  const all = await getProyectos();
  const firstTecnica = proyecto.tecnicas?.[0]?.slug;
  const relacionados = all
    .filter((p) => p.slug !== proyecto.slug)
    .filter(
      (p) =>
        !firstTecnica || (p.tecnicas ?? []).some((t) => t.slug === firstTecnica)
    )
    .slice(0, 3);

  return (
    <article>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "140px 28px 60px",
          color: "#fff",
          isolation: "isolate",
          overflow: "hidden",
        }}
      >
        {hero ? (
          <>
            <Image
              src={hero.src}
              alt={hero.alt || proyecto.titulo}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", zIndex: -2 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(26,46,26,.3), rgba(26,46,26,.85))",
                zIndex: -1,
              }}
            />
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, ${proyecto.color_acento ?? "#4a6741"}55, ${proyecto.color_acento ?? "#4a6741"})`,
              zIndex: -2,
            }}
          />
        )}
        <div className="grain" style={{ opacity: 0.3 }} />
        <div style={{ maxWidth: 1100, marginInline: "auto", position: "relative", zIndex: 1, width: "100%" }}>
          <Link
            href="/proyectos"
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              opacity: 0.8,
              marginBottom: 14,
              display: "inline-block",
            }}
          >
            ← Proyectos
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            {proyecto.titulo}
          </h1>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 14, opacity: 0.85 }}>
            {proyecto.ubicacion && <span>📍 {proyecto.ubicacion}</span>}
            {proyecto.año && <span>📅 {proyecto.año}</span>}
            {proyecto.superficie_m2 && <span>📐 {proyecto.superficie_m2} m²</span>}
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1100,
          marginInline: "auto",
          padding: "60px 28px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 320px",
          gap: 56,
        }}
        className="proyecto-layout"
      >
        <div>
          <FadeIn>
            {proyecto.descripcion_corta && (
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontStyle: "italic",
                  color: "var(--carbon)",
                  lineHeight: 1.5,
                  marginBottom: 28,
                  paddingLeft: 18,
                  borderLeft: "3px solid var(--verde-bosque)",
                }}
              >
                {proyecto.descripcion_corta}
              </p>
            )}
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "var(--carbon-soft)",
              }}
            >
              <RichText content={proyecto.descripcion} />
            </div>
            {videoUrl && (
              <p style={{ marginTop: 24 }}>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶ Ver video del proyecto
                </a>
              </p>
            )}
          </FadeIn>

          {galeria.length > 0 && (
            <FadeIn delay={0.15}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  marginTop: 56,
                  marginBottom: 20,
                  color: "var(--verde-oscuro)",
                }}
              >
                Galería
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 12,
                }}
              >
                {galeria.map((m, i) => {
                  const img = imageFor(m, "medium");
                  if (!img) return null;
                  return (
                    <div
                      key={m.id ?? i}
                      style={{
                        position: "relative",
                        aspectRatio: "4 / 3",
                        borderRadius: 12,
                        overflow: "hidden",
                        background: "var(--crema-warm)",
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          )}

          {proyecto.testimonial_texto && (
            <FadeIn delay={0.2}>
              <figure
                style={{
                  marginTop: 56,
                  padding: 32,
                  background: "var(--crema-warm)",
                  borderRadius: 18,
                  textAlign: "center",
                }}
              >
                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 20,
                    lineHeight: 1.5,
                    color: "var(--carbon)",
                    marginBottom: 14,
                  }}
                >
                  &ldquo;{proyecto.testimonial_texto}&rdquo;
                </blockquote>
                {proyecto.testimonial_autor && (
                  <figcaption
                    style={{
                      fontSize: 12,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "var(--verde-bosque)",
                    }}
                  >
                    — {proyecto.testimonial_autor}
                  </figcaption>
                )}
              </figure>
            </FadeIn>
          )}
        </div>

        {/* ── Sidebar ──────────────────────────────────── */}
        <aside>
          <FadeIn delay={0.1}>
            <div
              style={{
                position: "sticky",
                top: 100,
                background: "#fff",
                border: "1px solid var(--linea)",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "var(--verde-bosque)",
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                Ficha técnica
              </div>
              {proyecto.ficha_tecnica?.length ? (
                <dl style={{ margin: 0 }}>
                  {proyecto.ficha_tecnica.map((f) => (
                    <div
                      key={f.id}
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid var(--linea)",
                      }}
                    >
                      <dt
                        style={{
                          fontSize: 11,
                          color: "var(--carbon-soft)",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginBottom: 3,
                        }}
                      >
                        {f.etiqueta}
                      </dt>
                      <dd
                        style={{
                          fontSize: 13,
                          color: "var(--carbon)",
                          margin: 0,
                        }}
                      >
                        {f.valor}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p style={{ fontSize: 13, color: "var(--carbon-soft)" }}>
                  Ficha técnica próximamente.
                </p>
              )}

              {proyecto.tecnicas && proyecto.tecnicas.length > 0 && (
                <div style={{ marginTop: 18 }}>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: "var(--carbon-soft)",
                      marginBottom: 8,
                    }}
                  >
                    Técnicas
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {proyecto.tecnicas.map((t) => (
                      <span
                        key={t.id}
                        style={{
                          fontSize: 11,
                          padding: "4px 10px",
                          borderRadius: 14,
                          background: "var(--crema-warm)",
                          color: "var(--verde-oscuro)",
                        }}
                      >
                        {t.icono ? `${t.icono} ` : ""}
                        {t.nombre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {planoPdfUrl && (
                <a
                  href={planoPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginTop: 20,
                    padding: "12px 16px",
                    background: "var(--verde-bosque)",
                    color: "#fff",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  📐 Descargar plano (PDF)
                </a>
              )}
            </div>
          </FadeIn>
        </aside>
      </section>

      {/* ── Related ──────────────────────────────────────── */}
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
                fontSize: 28,
                marginBottom: 24,
                color: "var(--verde-oscuro)",
                textAlign: "center",
              }}
            >
              Otros proyectos
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 18,
              }}
            >
              {relacionados.map((p) => (
                <ProyectoCard key={p.id} proyecto={p} />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <Button href="/proyectos" variant="ghost">
                Ver todos los proyectos →
              </Button>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
