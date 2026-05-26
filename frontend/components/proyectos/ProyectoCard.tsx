import Image from "next/image";
import Link from "next/link";
import { imageFor } from "@/app/lib/strapi";
import type { Proyecto } from "@/app/lib/types";
import styles from "./ProyectoCard.module.css";

const ESTADO_LABEL: Record<Proyecto["estado"], string> = {
  diseño: "En diseño",
  en_obra: "En obra",
  terminado: "Terminado",
};

interface ProyectoCardProps {
  proyecto: Proyecto;
}

export default function ProyectoCard({ proyecto: p }: ProyectoCardProps) {
  const img = imageFor(p.imagen_principal, "medium");
  const color = p.color_acento ?? "#4a6741";
  const tecnica = p.tecnicas?.[0]?.nombre;
  const estadoClass =
    p.estado === "en_obra"
      ? styles.estadoEnObra
      : p.estado === "diseño"
        ? styles.estadoDiseno
        : "";

  return (
    <Link href={`/proyectos/${p.slug}`} className={styles.card}>
      {img ? (
        <div className={styles.bgImage}>
          <Image
            src={img.src}
            alt={img.alt || p.titulo}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
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
      <div className={styles.overlay} aria-hidden />
      <div className="grain" style={{ borderRadius: 18, opacity: 0.3 }} />
      <div className={styles.meta}>
        {p.año && <span className={styles.year}>{p.año}</span>}
        {tecnica && <span className={styles.pill}>{tecnica}</span>}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{p.titulo}</h3>
        {p.ubicacion && <div className={styles.loc}>📍 {p.ubicacion}</div>}
        {p.descripcion_corta && <p className={styles.desc}>{p.descripcion_corta}</p>}
        {p.estado !== "terminado" && (
          <span className={`${styles.estado} ${estadoClass}`}>
            {ESTADO_LABEL[p.estado]}
          </span>
        )}
      </div>
    </Link>
  );
}
