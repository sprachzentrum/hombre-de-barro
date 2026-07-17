"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calcCosts, fmtARS, fmtARSshort, fmtUSD } from "./calc";
import type { ComparadorParametros } from "@/app/lib/types";
import styles from "./ComparadorApp.module.css";

type TabId = "amort" | "energia" | "radar" | "co2";

const TABS: { id: TabId; label: string }[] = [
  { id: "amort", label: "📈 Costo 30 años" },
  { id: "energia", label: "⚡ Energía anual" },
  { id: "radar", label: "🎯 Comparación integral" },
  { id: "co2", label: "🌍 Huella de carbono" },
];

interface ComparadorAppProps {
  params: ComparadorParametros;
  title?: string;
  intro?: string;
}

function DualMoney({ ars, tc, sub }: { ars: number; tc: number; sub?: string }) {
  return (
    <>
      <div className={styles.metricArs}>{fmtARS(ars)}</div>
      <div className={styles.metricUsd}>{fmtUSD(ars, tc)}</div>
      {sub && <div className={styles.metricSub}>{sub}</div>}
    </>
  );
}

export default function ComparadorApp({ params, title, intro }: ComparadorAppProps) {
  const [m2, setM2] = useState(100);
  const [tipoCambio, setTipoCambio] = useState(params.tipo_cambio_default);
  const [autoconstruccion, setAutoconstruccion] = useState(false);
  const [tab, setTab] = useState<TabId>("amort");

  const c = useMemo(
    () => calcCosts({ m2, tipoCambio, autoconstruccion }, params),
    [m2, tipoCambio, autoconstruccion, params]
  );

  const tooltipFmt = (v: unknown) => [fmtARS(Number(v)), ""] as [string, ""];

  const breakdownItems = [
    { l: "Construcción convencional", v: c.tradConstruccion, bar: 100, col: "#e8826a" },
    {
      l: "Construcción sustentable",
      v: c.sustConstruccion,
      bar: Math.round((c.sustConstruccion / Math.max(c.tradConstruccion, 1)) * 100),
      col: "#a8c49a",
    },
    {
      l: "Instalación solar (fija)",
      v: c.inversionSolar,
      bar: Math.round((c.inversionSolar / Math.max(c.tradConstruccion, 1)) * 100),
      col: "#e8c86a",
    },
    {
      l: "Sistema de agua (fija)",
      v: c.inversionAgua,
      bar: Math.round((c.inversionAgua / Math.max(c.tradConstruccion, 1)) * 100),
      col: "#8bc4e8",
    },
  ];

  const savingsRows = [
    {
      l: "Energía + agua convencional",
      v: c.tradMensual,
      col: "#e8826a",
    },
    {
      l: "Energía + agua sustentable",
      v: c.sustMensual,
      col: "#a8c49a",
    },
    {
      l: "Mantenimiento conv. (anual)",
      v: c.tradMantAnual,
      col: "#e8826a",
    },
    {
      l: "Mantenimiento sust. (anual)",
      v: c.sustMantAnual,
      col: "#a8c49a",
    },
  ];

  return (
    <section className={styles.section}>
      <div className="grain" aria-hidden style={{ opacity: 0.25 }} />
      <div className={styles.inner}>
        {/* ── Head ───────────────────────────────────────────── */}
        <header className={styles.head}>
          <span className="eyebrow" style={{ color: "var(--verde-claro)" }}>
            Comparador Interactivo
          </span>
          <h1 className={styles.title}>
            {title ?? "Convencional vs. Sustentable: los números"}
          </h1>
          <div className={styles.divider} />
          <p className={styles.lead}>
            {intro ??
              "Movés la superficie y el tipo de cambio. El cálculo se actualiza con los parámetros cargados por el estudio."}
          </p>
        </header>

        {/* ── Sliders ────────────────────────────────────────── */}
        <div className={styles.controls}>
          <div className={styles.controlCard}>
            <div className={styles.controlLabel}>Superficie de la vivienda</div>
            <div className={styles.controlValue}>{m2} m²</div>
            <input
              type="range"
              min={40}
              max={300}
              step={10}
              value={m2}
              onChange={(e) => setM2(Number(e.target.value))}
              className={`${styles.range} ${styles.rangeGreen}`}
              aria-label="Superficie en metros cuadrados"
            />
            <div className={styles.rangeBounds}>
              <span>40 m²</span>
              <span>300 m²</span>
            </div>
          </div>

          <div className={styles.controlCard}>
            <div className={styles.controlLabel}>Tipo de cambio</div>
            <div className={`${styles.controlValue} ${styles.controlValueGold}`}>
              {fmtARS(tipoCambio)}
              <span style={{ fontSize: 16, opacity: 0.55, marginLeft: 8 }}>
                / US$
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={3000}
              step={25}
              value={tipoCambio}
              onChange={(e) => setTipoCambio(Number(e.target.value))}
              className={`${styles.range} ${styles.rangeGold}`}
              aria-label="Pesos argentinos por dólar"
            />
            <div className={styles.rangeBounds}>
              <span>$ 1.000</span>
              <span>$ 3.000</span>
            </div>
            <p className={styles.subHint}>
              Dólar oficial 26.5.2026 — ajustá según la cotización actual.
            </p>
          </div>
        </div>

        {/* ── Autoconstrucción toggle ────────────────────────── */}
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setAutoconstruccion((v) => !v)}
          aria-pressed={autoconstruccion}
        >
          <span
            className={`${styles.toggleSwitch} ${autoconstruccion ? styles.toggleSwitchOn : ""}`}
            aria-hidden
          />
          <span className={styles.toggleText}>
            <span className={styles.toggleTitle}>
              ¿Vas a construir vos mismo/a?
            </span>
            <span className={styles.toggleHint}>
              La autoconstrucción (mingas, mano de obra propia) reduce la inversión
              sustentable un{" "}
              <strong style={{ color: "#d4b578" }}>
                {Math.round(params.autoconstruccion_descuento * 100)} %
              </strong>
              .
            </span>
          </span>
        </button>

        {/* ── Metric cards ───────────────────────────────────── */}
        <div className={styles.metricGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Costo convencional</div>
            <DualMoney
              ars={c.tradTotal}
              tc={tipoCambio}
              sub={`/m²: ${fmtARS(c.costoM2Trad)}`}
            />
          </div>
          <div
            className={styles.metricCard}
            style={{ borderColor: "rgba(168,196,154,.35)" }}
          >
            <div className={styles.metricLabel}>Costo sustentable</div>
            <DualMoney
              ars={c.sustTotal}
              tc={tipoCambio}
              sub={
                autoconstruccion
                  ? "incluye solar + agua · autoconstrucción"
                  : "incluye solar + agua"
              }
            />
          </div>
          <div
            className={styles.metricCard}
            style={{ borderColor: "rgba(212,181,120,.35)" }}
          >
            <div className={styles.metricLabel}>Ahorro mensual</div>
            <DualMoney
              ars={c.ahorroMensual}
              tc={tipoCambio}
              sub="energía + gas + agua"
            />
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Punto de equilibrio</div>
            <div className={styles.metricArs} style={{ color: "#8bc4e8" }}>
              {c.tradTotal >= c.sustTotal
                ? "Inmediato"
                : c.breakEvenYear !== null
                  ? `Año ${c.breakEvenYear}`
                  : "—"}
            </div>
            <div className={styles.metricSub}>recupero de la inversión</div>
          </div>
        </div>

        {/* ── Chart tabs ─────────────────────────────────────── */}
        <div className={styles.tabs} role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabActive : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Chart frame ────────────────────────────────────── */}
        <div className={styles.chartFrame}>
          {tab === "amort" && (
            <>
              <div className={styles.chartHint}>
                Costo acumulado (construcción + operación) — eje Y en pesos
                argentinos.
              </div>
              <ResponsiveContainer width="100%" height={340}>
                <AreaChart
                  data={c.amortSeries}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e8826a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#e8826a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a8c49a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a8c49a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
                  <XAxis
                    dataKey="año"
                    stroke="rgba(244,240,232,.3)"
                    tick={{ fontSize: 10, fill: "rgba(244,240,232,.4)" }}
                  />
                  <YAxis
                    stroke="rgba(244,240,232,.3)"
                    tick={{ fontSize: 10, fill: "rgba(244,240,232,.4)" }}
                    tickFormatter={(v) => fmtARSshort(Number(v))}
                    width={70}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#2d2a24",
                      border: "none",
                      borderRadius: 10,
                      color: "#f4f0e8",
                      fontSize: 12,
                    }}
                    formatter={tooltipFmt}
                  />
                  <Area
                    type="monotone"
                    dataKey="Convencional"
                    stroke="#e8826a"
                    strokeWidth={2}
                    fill="url(#gc)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Sustentable"
                    stroke="#a8c49a"
                    strokeWidth={2}
                    fill="url(#gs)"
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: "rgba(244,240,232,.5)" }} />
                </AreaChart>
              </ResponsiveContainer>
              {c.tradTotal >= c.sustTotal ? (
                <div className={styles.breakEven}>
                  ✦ La sustentable cuesta menos <strong>desde el día 1</strong>.
                </div>
              ) : c.breakEvenYear !== null ? (
                <div className={styles.breakEven}>
                  ✦ La sustentable se vuelve más económica desde el{" "}
                  <strong>año {c.breakEvenYear}</strong>.
                </div>
              ) : null}
            </>
          )}

          {tab === "energia" && (
            <>
              <div className={styles.chartHint}>
                Gasto operativo anual — inflación{" "}
                {Math.round(params.inflacion_energia_conv * 100)} % conv. /{" "}
                {Math.round(params.inflacion_energia_sust * 100)} % sust.
                (tarifas EPEC + ECOGAS post Decreto 943/2025).
              </div>
              <ResponsiveContainer width="100%" height={340}>
                <LineChart
                  data={c.energySeries}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
                  <XAxis
                    dataKey="año"
                    stroke="rgba(244,240,232,.3)"
                    tick={{ fontSize: 10, fill: "rgba(244,240,232,.4)" }}
                  />
                  <YAxis
                    stroke="rgba(244,240,232,.3)"
                    tick={{ fontSize: 10, fill: "rgba(244,240,232,.4)" }}
                    tickFormatter={(v) => fmtARSshort(Number(v))}
                    width={70}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#2d2a24",
                      border: "none",
                      borderRadius: 10,
                      color: "#f4f0e8",
                      fontSize: 12,
                    }}
                    formatter={tooltipFmt}
                  />
                  <Line
                    type="monotone"
                    dataKey="Convencional"
                    stroke="#e8826a"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Sustentable"
                    stroke="#a8c49a"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: "rgba(244,240,232,.5)" }} />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}

          {tab === "radar" && (
            <>
              <div className={styles.chartHint}>
                Puntaje comparativo 0–100 en 8 dimensiones.
              </div>
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart data={c.radarSeries} cx="50%" cy="50%" outerRadius="68%">
                  <PolarGrid stroke="rgba(255,255,255,.1)" />
                  <PolarAngleAxis
                    dataKey="m"
                    tick={{ fontSize: 10, fill: "rgba(244,240,232,.6)" }}
                  />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar
                    name="Convencional"
                    dataKey="Convencional"
                    stroke="#e8826a"
                    fill="#e8826a"
                    fillOpacity={0.12}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Sustentable"
                    dataKey="Sustentable"
                    stroke="#a8c49a"
                    fill="#a8c49a"
                    fillOpacity={0.18}
                    strokeWidth={2}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: "rgba(244,240,232,.5)" }} />
                </RadarChart>
              </ResponsiveContainer>
              <div
                style={{
                  marginTop: 14,
                  padding: "12px 16px",
                  background: "rgba(212, 181, 120, .08)",
                  border: "1px solid rgba(212, 181, 120, .25)",
                  borderRadius: 12,
                  fontSize: 12,
                  color: "rgba(244,240,232,.75)",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                ✓{" "}
                <strong style={{ color: "#d4b578" }}>
                  Resistencia sísmica verificada:
                </strong>{" "}
                nuestros proyectos en quincha cumplen con{" "}
                <strong>CIRSOC 601</strong> (Reglamento Argentino de
                Construcciones Sismorresistentes), verificado en{" "}
                <strong>zona sísmica 4</strong> — Vivienda Tunduqueral, Uspallata
                (Mendoza). <strong>1.º Premio Red ProTierra 2019</strong>.
              </div>
            </>
          )}

          {tab === "co2" && (
            <>
              <div className={styles.chartHint}>
                Emisiones totales estimadas para {m2} m² en construcción.
              </div>
              <div className={styles.co2Row}>
                <div className={styles.co2Item}>
                  <div className={styles.co2Icon}>🏭</div>
                  <div className={styles.co2Value} style={{ color: "#e8826a" }}>
                    {c.co2Trad}
                  </div>
                  <div className={styles.co2Unit}>toneladas CO₂</div>
                  <div className={styles.co2Label} style={{ color: "#e8826a" }}>
                    Convencional
                  </div>
                </div>
                <div className={styles.co2Item}>
                  <div className={styles.co2Icon}>🌱</div>
                  <div className={styles.co2Value} style={{ color: "#a8c49a" }}>
                    {c.co2Sust}
                  </div>
                  <div className={styles.co2Unit}>toneladas CO₂</div>
                  <div className={styles.co2Label} style={{ color: "#a8c49a" }}>
                    Sustentable
                  </div>
                </div>
              </div>
              <div className={styles.co2Note}>
                🌿 Reducción del <strong>{c.co2ReduccionPct} %</strong> en
                emisiones
                <div className={styles.co2NoteSub}>
                  Equivale a plantar{" "}
                  {c.arbolesEquivalentes.toLocaleString("es-AR")} árboles
                  nativos.
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Breakdown ──────────────────────────────────────── */}
        <div className={styles.breakdown}>
          <div className={styles.breakdownCard}>
            <div className={styles.breakdownTitle}>Desglose de costos</div>
            {breakdownItems.map((r) => (
              <div key={r.l} className={styles.bar}>
                <div className={styles.barRow}>
                  <span className={styles.barLabel}>{r.l}</span>
                  <span className={styles.barValueCol}>
                    <span
                      className={styles.barArs}
                      style={{ color: r.col }}
                    >
                      {fmtARS(r.v)}
                    </span>
                    <div className={styles.barUsd}>
                      {fmtUSD(r.v, tipoCambio)}
                    </div>
                  </span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${Math.min(100, r.bar)}%`,
                      background: r.col,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.breakdownCard}>
            <div className={styles.breakdownTitle}>Costos operativos</div>
            {savingsRows.map((r) => (
              <div key={r.l} className={styles.savRow}>
                <span className={styles.barLabel}>{r.l}</span>
                <span className={styles.savValueCol}>
                  <span
                    className={styles.savValueArs}
                    style={{ color: r.col }}
                  >
                    {fmtARS(r.v)}
                  </span>
                  <div className={styles.savValueUsd}>
                    {fmtUSD(r.v, tipoCambio)}
                  </div>
                </span>
              </div>
            ))}
            <div className={styles.savingsBox}>
              <div className={styles.savingsLabel}>Ahorro mensual</div>
              <div className={styles.savingsValueArs}>
                {fmtARS(c.ahorroMensual)}
              </div>
              <div className={styles.savingsValueUsd}>
                {fmtUSD(c.ahorroMensual, tipoCambio)}
              </div>
              <div className={styles.savingsYear}>
                {fmtARS(c.ahorroAnual)} / año ·{" "}
                {fmtUSD(c.ahorroAnual, tipoCambio)}
              </div>
            </div>
          </div>
        </div>

        {params.disclaimer && (
          <p className={styles.disclaimer}>* {params.disclaimer}</p>
        )}
      </div>
    </section>
  );
}
