"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import type { Articulo, CategoriaBiblioteca } from "@/app/lib/types";
import styles from "./BibliotecaFilter.module.css";

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

const TIPO_OPTS: Array<{ id: "todos" | Articulo["tipo"]; label: string }> = [
  { id: "todos", label: "Todo" },
  { id: "guía", label: "Guías" },
  { id: "plano", label: "Planos" },
  { id: "artículo", label: "Artículos" },
];

const DIF_OPTS: Array<{
  id: "todas" | Articulo["dificultad"];
  label: string;
}> = [
  { id: "todas", label: "Todas" },
  { id: "Básico", label: "Básico" },
  { id: "Intermedio", label: "Intermedio" },
  { id: "Avanzado", label: "Avanzado" },
];

interface BibliotecaFilterProps {
  articulos: Articulo[];
  categorias: CategoriaBiblioteca[];
  initialCategoria?: string;
}

export default function BibliotecaFilter({
  articulos,
  categorias,
  initialCategoria = "todas",
}: BibliotecaFilterProps) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<string>(initialCategoria);
  const [tipo, setTipo] = useState<(typeof TIPO_OPTS)[number]["id"]>("todos");
  const [dif, setDif] = useState<(typeof DIF_OPTS)[number]["id"]>("todas");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articulos.filter((a) => {
      if (cat !== "todas" && a.categoria?.slug !== cat) return false;
      if (tipo !== "todos" && a.tipo !== tipo) return false;
      if (dif !== "todas" && a.dificultad !== dif) return false;
      if (q && !(a.titulo + " " + a.extracto).toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [articulos, search, cat, tipo, dif]);

  return (
    <>
      <input
        className={styles.search}
        placeholder="🔍  Buscar artículos, planos, guías..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="search"
      />

      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Categoría:</span>
        <button
          className={`${styles.pill} ${cat === "todas" ? styles.pillActive : ""}`}
          onClick={() => setCat("todas")}
        >
          📚 Todas
        </button>
        {categorias.map((c) => (
          <button
            key={c.slug}
            className={`${styles.pill} ${cat === c.slug ? styles.pillActive : ""}`}
            onClick={() => setCat(c.slug)}
          >
            {c.icono ? `${c.icono} ` : ""}
            {c.nombre}
          </button>
        ))}
      </div>

      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Tipo:</span>
        {TIPO_OPTS.map((o) => (
          <button
            key={o.id}
            className={`${styles.pill} ${tipo === o.id ? styles.pillActive : ""}`}
            onClick={() => setTipo(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Dificultad:</span>
        {DIF_OPTS.map((o) => (
          <button
            key={o.id}
            className={`${styles.pill} ${dif === o.id ? styles.pillActive : ""}`}
            onClick={() => setDif(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className={styles.count}>
        {filtered.length} recurso{filtered.length !== 1 ? "s" : ""}
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((a, i) => {
            const tipoColor = TYPE_COLOR[a.tipo];
            const difColor = DIFFICULTY_COLOR[a.dificultad];
            return (
              <FadeIn key={a.id} delay={Math.min(i * 0.03, 0.3)}>
                <Link href={`/biblioteca/${a.slug}`} className={styles.card}>
                  <div className={styles.bar} style={{ background: tipoColor }} />
                  <div className={styles.body}>
                    <div className={styles.badges}>
                      <span
                        className={styles.badgeType}
                        style={{ color: tipoColor, background: `${tipoColor}12` }}
                      >
                        {a.tipo}
                      </span>
                      {a.tiempo_lectura && (
                        <span className={styles.badgeReading}>⏱ {a.tiempo_lectura}</span>
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
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          No se encontraron recursos con esos filtros.
        </div>
      )}
    </>
  );
}
