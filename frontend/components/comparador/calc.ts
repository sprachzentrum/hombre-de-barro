import type { ComparadorParametros } from "@/app/lib/types";

export interface CalcInput {
  m2: number;
  /** Pesos por USD — solo afecta la conversión visual, no los cálculos en ARS */
  tipoCambio: number;
  autoconstruccion: boolean;
}

export interface CalcResult {
  // All cumulative + monthly numbers are in ARS.
  costoM2Trad: number;
  costoM2Sust: number;
  /** Sólo construcción */
  tradConstruccion: number;
  sustConstruccion: number;
  /** Inversiones fijas sustentables */
  inversionSolar: number;
  inversionAgua: number;
  /** Total inversión inicial (construcción + extras) */
  tradTotal: number;
  sustTotal: number;
  /** Mensual energético + agua (operativos) */
  tradMensual: number;
  sustMensual: number;
  /** Mantenimiento anual */
  tradMantAnual: number;
  sustMantAnual: number;
  /** Ahorros */
  ahorroMensual: number;
  ahorroAnual: number;
  /** Año en que sustentable acumula menos que convencional (>= 0) */
  breakEvenYear: number | null;
  /** CO₂ en toneladas */
  co2Trad: number;
  co2Sust: number;
  co2ReduccionPct: number;
  arbolesEquivalentes: number;
  /** Serie de costo acumulado 30 años (en ARS) */
  amortSeries: Array<{ año: number; Convencional: number; Sustentable: number }>;
  /** Serie de costo anual de energía 25 años (en ARS) */
  energySeries: Array<{ año: number; Convencional: number; Sustentable: number }>;
  /** Comparación integral en 8 dimensiones */
  radarSeries: Array<{ m: string; Convencional: number; Sustentable: number }>;
}

export function calcCosts(
  { m2, autoconstruccion }: CalcInput,
  p: ComparadorParametros
): CalcResult {
  // ── Construcción ───────────────────────────────────────────────
  const costoM2Trad = p.costo_m2_convencional;
  const costoM2Sust =
    p.costo_m2_sustentable *
    (autoconstruccion ? 1 - p.autoconstruccion_descuento : 1);

  const tradConstruccion = m2 * costoM2Trad;
  const sustConstruccion = m2 * costoM2Sust;

  const tradTotal = tradConstruccion;
  const sustTotal =
    sustConstruccion + p.inversion_solar_fija + p.inversion_agua_fija;

  // ── Operativos mensuales (ARS) ────────────────────────────────
  const tradMensual =
    m2 * (p.energia_conv_por_m2_mes + (p.agua_conv_por_m2_mes ?? 0));
  const sustMensual =
    m2 * (p.energia_sust_por_m2_mes + (p.agua_sust_por_m2_mes ?? 0));

  const tradMantAnual = m2 * p.mant_conv_por_m2_año;
  const sustMantAnual = m2 * p.mant_sust_por_m2_año;

  const ahorroMensual = tradMensual - sustMensual;
  const ahorroAnual = ahorroMensual * 12 + (tradMantAnual - sustMantAnual);

  // ── Amortización 30 años (en ARS) ─────────────────────────────
  const amortSeries: CalcResult["amortSeries"] = [];
  let cumTrad = tradTotal;
  let cumSust = sustTotal;
  amortSeries.push({
    año: 0,
    Convencional: Math.round(cumTrad),
    Sustentable: Math.round(cumSust),
  });
  for (let y = 1; y <= 30; y++) {
    const tradAdd =
      (tradMensual * 12 + tradMantAnual) *
      Math.pow(1 + p.inflacion_total_conv, y - 1);
    const sustAdd =
      (sustMensual * 12 + sustMantAnual) *
      Math.pow(1 + p.inflacion_total_sust, y - 1);
    cumTrad += tradAdd;
    cumSust += sustAdd;
    amortSeries.push({
      año: y,
      Convencional: Math.round(cumTrad),
      Sustentable: Math.round(cumSust),
    });
  }

  // ── Energía anual proyectada (25 años) ────────────────────────
  const energySeries: CalcResult["energySeries"] = [];
  for (let y = 0; y <= 25; y++) {
    energySeries.push({
      año: y,
      Convencional: Math.round(
        tradMensual * 12 * Math.pow(1 + p.inflacion_energia_conv, y)
      ),
      Sustentable: Math.round(
        sustMensual * 12 * Math.pow(1 + p.inflacion_energia_sust, y)
      ),
    });
  }

  // Break-even — first year sustentable ≤ convencional
  let breakEvenYear: number | null = sustTotal <= tradTotal ? 0 : null;
  for (let i = 1; breakEvenYear === null && i < amortSeries.length; i++) {
    if (amortSeries[i].Sustentable <= amortSeries[i].Convencional) {
      breakEvenYear = i;
    }
  }

  // ── CO₂ ───────────────────────────────────────────────────────
  const co2Trad = Math.round(m2 * p.co2_conv_por_m2);
  const co2Sust = Math.round(m2 * p.co2_sust_por_m2);
  const co2ReduccionPct =
    co2Trad > 0 ? Math.round((1 - co2Sust / co2Trad) * 100) : 0;
  const arbolesEquivalentes = Math.max(
    0,
    (co2Trad - co2Sust) * (p.arboles_por_tonelada_co2 ?? 45)
  );

  // ── Radar — 8 dimensiones (incluye Resistencia sísmica) ──────
  const radarSeries = [
    { m: "Costo inicial", Convencional: 35, Sustentable: 65 },
    { m: "Efic. energética", Convencional: 30, Sustentable: 90 },
    { m: "Confort térmico", Convencional: 45, Sustentable: 88 },
    { m: "Huella carbono", Convencional: 20, Sustentable: 90 },
    { m: "Resistencia sísmica", Convencional: 60, Sustentable: 82 },
    { m: "Durabilidad", Convencional: 70, Sustentable: 78 },
    { m: "Autonomía", Convencional: 10, Sustentable: 85 },
    { m: "Salud interior", Convencional: 40, Sustentable: 92 },
  ];

  return {
    costoM2Trad,
    costoM2Sust,
    tradConstruccion,
    sustConstruccion,
    inversionSolar: p.inversion_solar_fija,
    inversionAgua: p.inversion_agua_fija,
    tradTotal,
    sustTotal,
    tradMensual,
    sustMensual,
    tradMantAnual,
    sustMantAnual,
    ahorroMensual,
    ahorroAnual,
    breakEvenYear,
    co2Trad,
    co2Sust,
    co2ReduccionPct,
    arbolesEquivalentes,
    amortSeries,
    energySeries,
    radarSeries,
  };
}

/* ── Formatters ──────────────────────────────────────────────── */
export function fmtARS(n: number): string {
  return "$ " + Math.round(n).toLocaleString("es-AR");
}

export function fmtARSshort(n: number): string {
  if (Math.abs(n) >= 1_000_000_000)
    return "$ " + (n / 1_000_000_000).toFixed(1) + " MM";
  if (Math.abs(n) >= 1_000_000) return "$ " + (n / 1_000_000).toFixed(1) + " M";
  if (Math.abs(n) >= 1_000) return "$ " + Math.round(n / 1_000) + "k";
  return "$ " + Math.round(n);
}

export function fmtUSD(n: number, tipoCambio: number): string {
  if (!tipoCambio || tipoCambio <= 0) return "";
  return "≈ US$ " + Math.round(n / tipoCambio).toLocaleString("es-AR");
}
