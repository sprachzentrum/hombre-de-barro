import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import type { ComparadorParametros } from "@/app/lib/types";
import styles from "./ComparadorTeaser.module.css";

interface ComparadorTeaserProps {
  params: ComparadorParametros;
  exampleM2?: number;
}

function fmtARS(n: number) {
  return "$ " + Math.round(n).toLocaleString("es-AR");
}
function fmtUSD(n: number, tc: number) {
  return "≈ US$ " + Math.round(n / tc).toLocaleString("es-AR");
}

export default function ComparadorTeaser({
  params,
  exampleM2 = 100,
}: ComparadorTeaserProps) {
  const tc = params.tipo_cambio_default;
  const trad = exampleM2 * params.costo_m2_convencional;
  const sust =
    exampleM2 * params.costo_m2_sustentable +
    params.inversion_solar_fija +
    params.inversion_agua_fija;
  const ahorroMo =
    exampleM2 *
    ((params.energia_conv_por_m2_mes - params.energia_sust_por_m2_mes) +
      ((params.agua_conv_por_m2_mes ?? 0) -
        (params.agua_sust_por_m2_mes ?? 0)));
  const co2Reduction = Math.round(
    (1 - params.co2_sust_por_m2 / params.co2_conv_por_m2) * 100
  );

  const metrics = [
    {
      l: "Costo convencional",
      ars: trad,
      sub: `${fmtARS(params.costo_m2_convencional)}/m²`,
      col: "#e8826a",
    },
    {
      l: "Costo sustentable",
      ars: sust,
      sub: "incluye solar + agua",
      col: "var(--verde-claro)",
    },
    {
      l: "Ahorro mensual",
      ars: ahorroMo,
      sub: "energía + gas + agua",
      col: "#d4b578",
    },
    {
      l: "Menos CO₂",
      ars: null,
      special: `${co2Reduction} %`,
      sub: "huella de carbono",
      col: "#8bc4e8",
    },
  ];

  return (
    <section className={styles.section} id="comparador">
      <div className="grain" aria-hidden style={{ opacity: 0.25 }} />
      <div className={styles.inner}>
        <FadeIn>
          <span className="eyebrow" style={{ color: "var(--verde-claro)" }}>
            Comparador Interactivo
          </span>
          <h2 className={`section-title ${styles.title}`}>
            Convencional vs. Sustentable:{" "}
            <em style={{ color: "#d4b578" }}>los números</em>
          </h2>
          <div
            className="divider"
            style={{
              background: "linear-gradient(90deg, #d4b578, var(--verde-claro))",
            }}
          />
          <p className={styles.sub}>
            Datos reales de Córdoba 2026: tarifas EPEC, valores CAPC,
            experiencia de Hombre de Barro. Probá con tu superficie real.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className={styles.preview}>
            {metrics.map((m) => (
              <div key={m.l} className={styles.metricCard}>
                <div className={styles.metricLabel}>{m.l}</div>
                <div className={styles.metricValue} style={{ color: m.col }}>
                  {m.special ?? fmtARS(m.ars!)}
                </div>
                {m.ars != null && (
                  <div style={{ fontSize: 11, color: "rgba(244,240,232,.4)", marginTop: 2 }}>
                    {fmtUSD(m.ars, tc)}
                  </div>
                )}
                <div className={styles.metricSub}>{m.sub}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Button href="/comparador" variant="outline">
            Abrir el comparador completo →
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
