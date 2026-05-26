import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import RichText from "@/components/shared/RichText";
import { getEntradaBySlug, getEntradas } from "@/app/lib/content";
import { imageFor } from "@/app/lib/strapi";

export const revalidate = 60;

interface PageParams {
  params: Promise<{ slug: string }>;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const e = await getEntradaBySlug(slug);
  if (!e) return { title: "Entrada no encontrada" };
  return { title: e.titulo, description: e.extracto };
}

export default async function BlogDetail({ params }: PageParams) {
  const { slug } = await params;
  const entrada = await getEntradaBySlug(slug);
  if (!entrada) notFound();

  const img = imageFor(entrada.imagen_portada, "large");

  const all = await getEntradas();
  const otras = all.filter((e) => e.slug !== entrada.slug).slice(0, 3);

  return (
    <article>
      <header
        style={{
          background: "var(--crema-warm)",
          padding: "140px 28px 50px",
          borderBottom: "1px solid var(--linea)",
        }}
      >
        <div style={{ maxWidth: 800, marginInline: "auto" }}>
          <Link
            href="/blog"
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "var(--verde-bosque)",
              marginBottom: 14,
              display: "inline-block",
            }}
          >
            ← Blog
          </Link>
          {entrada.categoria_blog && (
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "var(--verde-bosque)",
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              {entrada.categoria_blog.nombre}
            </div>
          )}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.8vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "var(--carbon)",
              marginBottom: 14,
            }}
          >
            {entrada.titulo}
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--carbon-soft)",
              marginBottom: 12,
            }}
          >
            {entrada.extracto}
          </p>
          <div
            style={{
              fontSize: 12,
              color: "var(--carbon-soft)",
              opacity: 0.75,
            }}
          >
            {fmtDate(entrada.createdAt)}
          </div>
        </div>
      </header>

      {img && (
        <div
          style={{
            maxWidth: 1000,
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
              src={img.src}
              alt={img.alt || entrada.titulo}
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 1000px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      <section
        style={{
          maxWidth: 720,
          marginInline: "auto",
          padding: "48px 28px",
          fontSize: 16,
          lineHeight: 1.85,
          color: "var(--carbon)",
        }}
      >
        <FadeIn>
          <RichText content={entrada.contenido} />
        </FadeIn>
      </section>

      {otras.length > 0 && (
        <section
          style={{
            background: "var(--crema-warm)",
            padding: "60px 28px",
          }}
        >
          <div style={{ maxWidth: 1000, marginInline: "auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                color: "var(--verde-oscuro)",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Más entradas
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              {otras.map((e) => (
                <Link
                  key={e.id}
                  href={`/blog/${e.slug}`}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: 18,
                    border: "1px solid var(--linea)",
                    display: "block",
                  }}
                >
                  {e.categoria_blog && (
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        color: "var(--verde-bosque)",
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      {e.categoria_blog.nombre}
                    </div>
                  )}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 16,
                      color: "var(--carbon)",
                      lineHeight: 1.3,
                      marginBottom: 6,
                    }}
                  >
                    {e.titulo}
                  </h3>
                  <div style={{ fontSize: 11, color: "var(--carbon-soft)", opacity: 0.7 }}>
                    {fmtDate(e.createdAt)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
