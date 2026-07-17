import { describe, expect, it } from "vitest";
import { fallbackComparador } from "@/app/lib/fallbacks";
import { calcCosts } from "./calc";

describe("calcCosts", () => {
  it("uses current prices for the first operating year", () => {
    const result = calcCosts(
      { m2: 100, tipoCambio: 1425, autoconstruccion: false },
      fallbackComparador
    );

    expect(result.amortSeries[1].Convencional).toBe(
      result.tradTotal + result.tradMensual * 12 + result.tradMantAnual
    );
    expect(result.amortSeries[1].Sustentable).toBe(
      result.sustTotal + result.sustMensual * 12 + result.sustMantAnual
    );
  });

  it("reports an immediate break-even when sustainable starts cheaper", () => {
    const result = calcCosts(
      { m2: 100, tipoCambio: 1425, autoconstruccion: false },
      fallbackComparador
    );

    expect(result.sustTotal).toBeLessThan(result.tradTotal);
    expect(result.breakEvenYear).toBe(0);
  });

  it("applies the self-build discount only to sustainable construction", () => {
    const normal = calcCosts(
      { m2: 100, tipoCambio: 1425, autoconstruccion: false },
      fallbackComparador
    );
    const selfBuilt = calcCosts(
      { m2: 100, tipoCambio: 1425, autoconstruccion: true },
      fallbackComparador
    );

    expect(selfBuilt.tradTotal).toBe(normal.tradTotal);
    expect(selfBuilt.sustConstruccion).toBe(
      normal.sustConstruccion *
        (1 - fallbackComparador.autoconstruccion_descuento)
    );
  });
});
