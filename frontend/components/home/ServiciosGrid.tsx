import FadeIn from "@/components/ui/FadeIn";
import type { ServicioItem } from "@/app/lib/types";
import styles from "./ServiciosGrid.module.css";

interface ServiciosGridProps {
  items?: ServicioItem[];
}

export default function ServiciosGrid({ items }: ServiciosGridProps) {
  if (!items?.length) return null;
  return (
    <section className={styles.section} id="servicios">
      <div className={styles.inner}>
        <FadeIn>
          <span className="eyebrow">Servicios</span>
          <h2 className="section-title">Lo que hacemos</h2>
          <div className="divider" />
        </FadeIn>
        <div className={styles.grid}>
          {items.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.07}>
              <div className={styles.card}>
                <div className={styles.icon} aria-hidden>
                  {s.icono}
                </div>
                <h3 className={styles.title}>{s.titulo}</h3>
                <p className={styles.desc}>{s.descripcion}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
