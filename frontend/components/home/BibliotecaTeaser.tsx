import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import type { Articulo } from "@/app/lib/types";
import styles from "./BibliotecaTeaser.module.css";

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

interface BibliotecaTeaserProps {
  articulos: Articulo[];
}

export default function BibliotecaTeaser({ articulos }: BibliotecaTeaserProps) {
  if (!articulos.length) return null;

  return (
    <section className={styles.section} id="biblioteca">
      <FadeIn>
        <div className={styles.head}>
          <span className="eyebrow">Biblioteca Técnica</span>
          <h2 className="section-title">
            Guías, planos y artículos de <em style={{ color: "var(--verde-bosque)" }}>construcción natural</em>
          </h2>
          <div className="divider" />
          <p>
            Conocimiento abierto para quien quiera construir con la tierra.
            Planos descargables, guías paso a paso y fundamentos del diseño
            sustentable.
          </p>
        </div>
      </FadeIn>

      <div className={styles.grid}>
        {articulos.map((a, i) => {
          const tipoColor = TYPE_COLOR[a.tipo];
          const difColor = DIFFICULTY_COLOR[a.dificultad];
          return (
            <FadeIn key={a.id} delay={Math.min(i * 0.05, 0.35)}>
              <Link href={`/biblioteca/${a.slug}`} className={styles.card}>
                <div
                  className={styles.bar}
                  style={{ background: tipoColor }}
                />
                <div className={styles.body}>
                  <div className={styles.badges}>
                    <span
                      className={styles.badgeType}
                      style={{
                        color: tipoColor,
                        background: `${tipoColor}12`,
                      }}
                    >
                      {a.tipo}
                    </span>
                    {a.tiempo_lectura && (
                      <span className={styles.badgeReading}>
                        ⏱ {a.tiempo_lectura}
                      </span>
                    )}
                    {a.tiene_planos && (
                      <span className={styles.badgePlans}>📐 Planos</span>
                    )}
                  </div>
                  <h3 className={styles.title}>{a.titulo}</h3>
                  <p className={styles.desc}>{a.extracto}</p>
                  <div className={styles.foot}>
                    <span
                      className={styles.difficulty}
                      style={{
                        color: difColor,
                        background: `${difColor}20`,
                      }}
                    >
                      {a.dificultad}
                    </span>
                    <span className={styles.more}>Leer más →</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn>
        <div className={styles.viewAll}>
          <Button href="/biblioteca" variant="ghost">
            Ver todos los recursos →
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
