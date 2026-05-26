import ComparadorApp from "@/components/comparador/ComparadorApp";
import { getComparadorParams } from "@/app/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Comparador — Convencional vs. Sustentable",
  description:
    "Calculá costos a 30 años, energía, huella de carbono y punto de equilibrio para una vivienda sustentable.",
};

export default async function ComparadorPage() {
  const params = await getComparadorParams();
  return <ComparadorApp params={params} />;
}
