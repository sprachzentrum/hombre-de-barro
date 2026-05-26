"use client";

import { useMemo, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import ProyectoCard from "./ProyectoCard";
import type { Proyecto } from "@/app/lib/types";
import styles from "./ProyectoFilter.module.css";

type EstadoFilter = "todos" | Proyecto["estado"];

interface ProyectoFilterProps {
  proyectos: Proyecto[];
}

const ESTADO_OPTS: { id: EstadoFilter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "terminado", label: "Terminados" },
  { id: "en_obra", label: "En obra" },
  { id: "diseño", label: "En diseño" },
];

export default function ProyectoFilter({ proyectos }: ProyectoFilterProps) {
  const [estado, setEstado] = useState<EstadoFilter>("todos");
  const [tecnicaSlug, setTecnicaSlug] = useState<string>("todas");

  const tecnicaOpts = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of proyectos) {
      for (const t of p.tecnicas ?? []) {
        map.set(t.slug, t.nombre);
      }
    }
    return [
      { slug: "todas", nombre: "Todas las técnicas" },
      ...Array.from(map, ([slug, nombre]) => ({ slug, nombre })),
    ];
  }, [proyectos]);

  const filtered = useMemo(() => {
    return proyectos.filter((p) => {
      if (estado !== "todos" && p.estado !== estado) return false;
      if (
        tecnicaSlug !== "todas" &&
        !(p.tecnicas ?? []).some((t) => t.slug === tecnicaSlug)
      )
        return false;
      return true;
    });
  }, [proyectos, estado, tecnicaSlug]);

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.group}>
          <span className={styles.label}>Estado:</span>
          {ESTADO_OPTS.map((o) => (
            <button
              key={o.id}
              onClick={() => setEstado(o.id)}
              className={`${styles.pill} ${estado === o.id ? styles.pillActive : ""}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {tecnicaOpts.length > 1 && (
        <div className={styles.bar}>
          <div className={styles.group}>
            <span className={styles.label}>Técnica:</span>
            {tecnicaOpts.map((o) => (
              <button
                key={o.slug}
                onClick={() => setTecnicaSlug(o.slug)}
                className={`${styles.pill} ${tecnicaSlug === o.slug ? styles.pillActive : ""}`}
              >
                {o.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.count}>
        {filtered.length} proyecto{filtered.length !== 1 ? "s" : ""}
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((p, i) => (
            <FadeIn key={p.id} delay={Math.min(i * 0.05, 0.35)}>
              <ProyectoCard proyecto={p} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.icon}>🌱</div>
          No hay proyectos que coincidan con esos filtros.
        </div>
      )}
    </>
  );
}
