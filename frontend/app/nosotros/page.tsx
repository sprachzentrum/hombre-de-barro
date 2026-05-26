import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import RichText from "@/components/shared/RichText";
import { getEquipo, getNosotros } from "@/app/lib/content";
import { imageFor } from "@/app/lib/strapi";

export const revalidate = 60;

export const metadata = {
  title: "Nosotros",
  description:
    "Hombre de Barro: arquitectos especializados en construcción con tierra, quincha, fardos de paja y diseño bioclimático. Villa General Belgrano, Córdoba.",
};

export default async function NosotrosPage() {
  const [nosotros, equipo] = await Promise.all([getNosotros(), getEquipo()]);
  const heroImg = imageFor(nosotros.imagen_principal, "large");

  return (
    <article>
      {/* ── Hero ────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "160px 28px 60px",
          background:
            "linear-gradient(165deg, #1a2e1a, #2d4a2e 50%, #4a6741)",
          color: "var(--crema)",
          textAlign: "center",
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        {heroImg && (
          <>
            <Image
              src={heroImg.src}
              alt={heroImg.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", opacity: 0.4, zIndex: -2 }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(26,46,26,.55)",
                zIndex: -1,
              }}
            />
          </>
        )}
        <div className="grain" style={{ opacity: 0.3 }} />
        <div style={{ maxWidth: 760, marginInline: "auto", position: "relative" }}>
          <span className="eyebrow" style={{ color: "var(--verde-claro)" }}>
            Nosotros
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--crema)",
              marginBottom: 18,
            }}
          >
            {nosotros.titulo ?? "Nosotros"}
          </h1>
          {nosotros.subtitulo && (
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "rgba(244,240,232,.75)",
                fontWeight: 300,
              }}
            >
              {nosotros.subtitulo}
            </p>
          )}
        </div>
      </section>

      {/* ── Historia ──────────────────────────────────── */}
      <section
        style={{
          maxWidth: 800,
          marginInline: "auto",
          padding: "80px 28px",
        }}
      >
        <FadeIn>
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.85,
              color: "var(--carbon-soft)",
            }}
            className="prose-narrow"
          >
            <RichText content={nosotros.historia} />
          </div>
        </FadeIn>
      </section>

      {/* ── Principios ────────────────────────────────── */}
      {nosotros.principios && nosotros.principios.length > 0 && (
        <section
          style={{
            background: "var(--crema-warm)",
            padding: "80px 28px",
          }}
        >
          <div style={{ maxWidth: 1100, marginInline: "auto", textAlign: "center" }}>
            <FadeIn>
              <span className="eyebrow">Filosofía</span>
              <h2 className="section-title">Cuatro principios</h2>
              <div className="divider" />
            </FadeIn>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 22,
                marginTop: 8,
              }}
            >
              {nosotros.principios.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      padding: 28,
                      border: "1px solid var(--linea)",
                      textAlign: "left",
                      height: "100%",
                    }}
                  >
                    {p.numero && (
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 36,
                          color: "var(--verde-claro)",
                          lineHeight: 1,
                          marginBottom: 12,
                          fontWeight: 700,
                        }}
                      >
                        {p.numero}
                      </div>
                    )}
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 19,
                        color: "var(--verde-oscuro)",
                        marginBottom: 10,
                      }}
                    >
                      {p.titulo}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "var(--carbon-soft)",
                      }}
                    >
                      {p.descripcion}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Equipo ────────────────────────────────────── */}
      {equipo.length > 0 && (
        <section
          style={{
            padding: "80px 28px",
            maxWidth: 1100,
            marginInline: "auto",
          }}
        >
          <FadeIn>
            <header style={{ textAlign: "center", marginBottom: 36 }}>
              <span className="eyebrow">Equipo</span>
              <h2 className="section-title">Quiénes somos</h2>
              <div className="divider" />
            </header>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 360px))",
              gap: 28,
              justifyContent: "center",
            }}
          >
            {equipo.map((m, i) => {
              const foto = imageFor(m.foto, "medium");
              return (
                <FadeIn key={m.id} delay={i * 0.1}>
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid var(--linea)",
                      borderRadius: 18,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "4 / 5",
                        position: "relative",
                        background:
                          "linear-gradient(135deg, var(--tierra-light), var(--tierra))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {foto ? (
                        <Image
                          src={foto.src}
                          alt={foto.alt || m.nombre}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{ fontSize: 80, opacity: 0.5 }}>👤</div>
                      )}
                    </div>
                    <div style={{ padding: 24 }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 22,
                          color: "var(--carbon)",
                          marginBottom: 4,
                        }}
                      >
                        {m.nombre}
                      </h3>
                      <div
                        style={{
                          fontSize: 12,
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          color: "var(--verde-bosque)",
                          marginBottom: 14,
                          fontWeight: 500,
                        }}
                      >
                        {m.rol}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          lineHeight: 1.7,
                          color: "var(--carbon-soft)",
                        }}
                      >
                        <RichText content={m.bio} />
                      </div>
                      {(m.instagram || m.linkedin || m.email) && (
                        <div
                          style={{
                            display: "flex",
                            gap: 12,
                            marginTop: 14,
                            fontSize: 13,
                          }}
                        >
                          {m.instagram && (
                            <a href={m.instagram} target="_blank" rel="noopener noreferrer">📸</a>
                          )}
                          {m.linkedin && (
                            <a href={m.linkedin} target="_blank" rel="noopener noreferrer">💼</a>
                          )}
                          {m.email && <a href={`mailto:${m.email}`}>📧</a>}
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Hitos / Timeline ──────────────────────────── */}
      {nosotros.hitos && nosotros.hitos.length > 0 && (
        <section
          style={{
            background: "var(--verde-oscuro)",
            color: "var(--crema)",
            padding: "80px 28px",
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
          }}
        >
          <div className="grain" style={{ opacity: 0.2 }} />
          <div style={{ maxWidth: 900, marginInline: "auto", position: "relative" }}>
            <FadeIn>
              <header style={{ textAlign: "center", marginBottom: 44 }}>
                <span className="eyebrow" style={{ color: "var(--verde-claro)" }}>
                  Línea de tiempo
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px, 4vw, 40px)",
                    color: "var(--crema)",
                    marginBottom: 8,
                  }}
                >
                  Algunos hitos
                </h2>
              </header>
            </FadeIn>
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                position: "relative",
              }}
            >
              {nosotros.hitos.map((h, i) => (
                <FadeIn key={h.id} delay={Math.min(i * 0.06, 0.4)}>
                  <li
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr",
                      gap: 22,
                      padding: "20px 0",
                      borderBottom: "1px solid rgba(244,240,232,.07)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 30,
                        color: "var(--tierra-light)",
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {h.año}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 19,
                          color: "var(--crema)",
                          marginBottom: 4,
                        }}
                      >
                        {h.titulo}
                      </h3>
                      {h.descripcion && (
                        <p
                          style={{
                            fontSize: 14,
                            lineHeight: 1.65,
                            color: "rgba(244,240,232,.65)",
                          }}
                        >
                          {h.descripcion}
                        </p>
                      )}
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--crema-warm)",
          padding: "60px 28px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 4vw, 34px)",
            color: "var(--carbon)",
            marginBottom: 12,
          }}
        >
          ¿Hablamos de tu proyecto?
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "var(--carbon-soft)",
            marginBottom: 24,
            maxWidth: 480,
            marginInline: "auto",
          }}
        >
          Cada terreno nos cuenta algo distinto. Escuchá el tuyo con nosotros.
        </p>
        <Button href="/contacto">Escribinos →</Button>
      </section>
    </article>
  );
}
