import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { imageFor } from "@/app/lib/strapi";
import type { Proyecto } from "@/app/lib/types";
import styles from "./ProyectosDestacados.module.css";

interface ProyectosDestacadosProps {
  proyectos: Proyecto[];
}

export default function ProyectosDestacados({
  proyectos,
}: ProyectosDestacadosProps) {
  if (!proyectos.length) return null;

  return (
    <section className={styles.section} id="proyectos">
      <FadeIn>
        <div className={styles.head}>
          <span className="eyebrow">Proyectos</span>
          <h2 className="section-title">Obras que respiran</h2>
          <div className="divider" />
        </div>
      </FadeIn>
      <div className={styles.grid}>
        {proyectos.map((p, i) => {
          const img = imageFor(p.imagen_principal, "medium");
          const color = p.color_acento ?? "#4a6741";
          const tecnica = p.tecnicas?.[0]?.nombre;
          return (
            <FadeIn key={p.id} delay={i * 0.08}>
              <Link href={`/proyectos/${p.slug}`} className={styles.card}>
                {img ? (
                  <div className={styles.bgImage}>
                    <Image
                      src={img.src}
                      alt={img.alt || p.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  </div>
                ) : (
                  <div
                    className={styles.bgGradient}
                    style={{
                      background: `linear-gradient(180deg, ${color}55, ${color})`,
                    }}
                  />
                )}
                <div className={styles.cardOverlay} aria-hidden />
                <div className="grain" style={{ borderRadius: 18, opacity: 0.3 }} />
                {tecnica && <div className={styles.type}>{tecnica}</div>}
                <div className={styles.content}>
                  <h3 className={styles.title}>{p.titulo}</h3>
                  {p.ubicacion && (
                    <div className={styles.loc}>📍 {p.ubicacion}</div>
                  )}
                  {p.descripcion_corta && (
                    <p className={styles.desc}>{p.descripcion_corta}</p>
                  )}
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>
      <FadeIn>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Button href="/proyectos" variant="ghost">
            Ver todos los proyectos →
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
