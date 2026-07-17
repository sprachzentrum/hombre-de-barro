import ComparadorApp from "@/components/comparador/ComparadorApp";
import { getComparadorParams, getConfig } from "@/app/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Comparador — Convencional vs. Sustentable",
  description:
    "Calculá costos a 30 años, energía, huella de carbono y punto de equilibrio para una vivienda sustentable.",
};

export default async function ComparadorPage() {
  const [params, config] = await Promise.all([getComparadorParams(), getConfig()]);
  return (
    <ComparadorApp
      params={params}
      title={config.comparador_titulo}
      intro={config.comparador_intro}
    />
  );
}
