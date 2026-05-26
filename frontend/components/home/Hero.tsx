import Image from "next/image";
import Button from "@/components/ui/Button";
import { imageFor } from "@/app/lib/strapi";
import type { PaginaInicio } from "@/app/lib/types";
import styles from "./Hero.module.css";

interface HeroProps {
  inicio: PaginaInicio;
}

export default function Hero({ inicio }: HeroProps) {
  const bg = imageFor(inicio.hero_imagen, "large");

  return (
    <section className={styles.hero}>
      {bg && (
        <div className={styles.heroImageBg}>
          <Image
            src={bg.src}
            alt={bg.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className={styles.overlay} aria-hidden />
      <div className={styles.blob1} aria-hidden />
      <div className={styles.blob2} aria-hidden />
      <div className="grain" aria-hidden style={{ opacity: 0.35 }} />

      <div className={styles.content}>
        {inicio.hero_eyebrow && (
          <div className={styles.eyebrow}>{inicio.hero_eyebrow}</div>
        )}
        <h1 className={styles.title}>
          {inicio.hero_titulo}
          {inicio.hero_titulo_italica && (
            <span className={styles.titleItalic}>
              {inicio.hero_titulo_italica}
            </span>
          )}
        </h1>
        {inicio.hero_subtitulo && (
          <p className={styles.subtitle}>{inicio.hero_subtitulo}</p>
        )}
        <div className={styles.actions}>
          <Button href="/comparador">Comparador Interactivo →</Button>
          <Button href="/biblioteca" variant="outline">
            Biblioteca Técnica
          </Button>
        </div>

        <div className={styles.cirsocBadge}>
          <span className={styles.cirsocCheck} aria-hidden>
            ✓
          </span>
          <span>
            <strong>CIRSOC 601</strong> · Construcción sismorresistente verificada
          </span>
        </div>
      </div>
    </section>
  );
}
