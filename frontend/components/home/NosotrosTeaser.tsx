import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import RichText from "@/components/shared/RichText";
import { imageFor } from "@/app/lib/strapi";
import type { PaginaInicio } from "@/app/lib/types";
import styles from "./NosotrosTeaser.module.css";

interface NosotrosTeaserProps {
  inicio: PaginaInicio;
}

export default function NosotrosTeaser({ inicio }: NosotrosTeaserProps) {
  const img = imageFor(inicio.nosotros_imagen, "medium");
  return (
    <section className={styles.section} id="nosotros">
      <div className={styles.grid}>
        <FadeIn>
          <div className={styles.text}>
            <span className="eyebrow">
              {inicio.nosotros_eyebrow ?? "Quiénes Somos"}
            </span>
            <h2 className="section-title">
              {inicio.nosotros_titulo ??
                "La tierra nos enseñó a construir distinto"}
            </h2>
            <RichText content={inicio.nosotros_texto} />
            <Button href="/nosotros">Conocer al equipo →</Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className={styles.imageWrap}>
            {img ? (
              <div className={styles.realImage}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            ) : (
              <>
                <div className="grain" style={{ borderRadius: 20, opacity: 0.25 }} />
                <div className={styles.imageInner}>
                  <div className={styles.imageEmoji}>🏺</div>
                  <div className={styles.imageQuote}>
                    &ldquo;La casa más bella es la que crece del suelo como un árbol&rdquo;
                  </div>
                </div>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
