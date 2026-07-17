import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { getCategoriasBlog, getConfig, getEntradas } from "@/app/lib/content";
import { imageFor } from "@/app/lib/strapi";

export const revalidate = 60;

export const metadata = {
  title: "Blog",
  description:
    "Noticias, talleres, eventos y opinión del estudio Hombre de Barro.",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface PageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { categoria } = await searchParams;
  const [entradas, categorias, config] = await Promise.all([
    getEntradas(),
    getCategoriasBlog(),
    getConfig(),
  ]);

  const filtered = categoria
    ? entradas.filter((e) => e.categoria_blog?.slug === categoria)
    : entradas;

  return (
    <section
      style={{
        padding: "140px 28px 80px",
        maxWidth: 1100,
        marginInline: "auto",
      }}
    >
      <FadeIn>
        <header style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="eyebrow">Blog</span>
          <h1 className="section-title">
            {config.blog_titulo ?? "Noticias, talleres, ideas"}
          </h1>
          <div className="divider" />
        </header>
      </FadeIn>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 36,
        }}
      >
        <Link
          href="/blog"
          style={{
            padding: "8px 16px",
            borderRadius: 25,
            fontSize: 12,
            fontWeight: 500,
            border: "1.5px solid var(--linea-soft)",
            background: !categoria ? "var(--verde-bosque)" : "#fff",
            color: !categoria ? "#fff" : "var(--carbon-soft)",
            textDecoration: "none",
          }}
        >
          Todo
        </Link>
        {categorias.map((c) => (
          <Link
            key={c.slug}
            href={`/blog?categoria=${c.slug}`}
            style={{
              padding: "8px 16px",
              borderRadius: 25,
              fontSize: 12,
              fontWeight: 500,
              border: "1.5px solid var(--linea-soft)",
              background:
                categoria === c.slug ? "var(--verde-bosque)" : "#fff",
              color: categoria === c.slug ? "#fff" : "var(--carbon-soft)",
              textDecoration: "none",
            }}
          >
            {c.nombre}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "var(--carbon-soft)",
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 10 }}>🌱</div>
          Todavía no hay entradas en esta categoría.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 22,
          }}
        >
          {filtered.map((e, i) => {
            const img = imageFor(e.imagen_portada, "medium");
            return (
              <FadeIn key={e.id} delay={Math.min(i * 0.05, 0.3)}>
                <Link
                  href={`/blog/${e.slug}`}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid var(--linea)",
                    display: "block",
                    height: "100%",
                    transition: "transform .3s ease, box-shadow .3s ease",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16 / 10",
                      position: "relative",
                      background:
                        "linear-gradient(135deg, var(--verde-salvia), var(--verde-bosque))",
                    }}
                  >
                    {img ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 56,
                          color: "rgba(255,255,255,.6)",
                        }}
                      >
                        📝
                      </div>
                    )}
                  </div>
                  <div style={{ padding: 22 }}>
                    {e.categoria_blog && (
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          color: "var(--verde-bosque)",
                          fontWeight: 600,
                          marginBottom: 8,
                        }}
                      >
                        {e.categoria_blog.nombre}
                      </div>
                    )}
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 19,
                        color: "var(--carbon)",
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {e.titulo}
                    </h2>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: "var(--carbon-soft)",
                        marginBottom: 12,
                      }}
                    >
                      {e.extracto}
                    </p>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--carbon-soft)",
                        opacity: 0.7,
                      }}
                    >
                      {fmtDate(e.createdAt)}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      )}
    </section>
  );
}
