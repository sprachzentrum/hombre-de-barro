import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import NosotrosTeaser from "@/components/home/NosotrosTeaser";
import ServiciosGrid from "@/components/home/ServiciosGrid";
import BibliotecaTeaser from "@/components/home/BibliotecaTeaser";
import ComparadorTeaser from "@/components/home/ComparadorTeaser";
import ProyectosDestacados from "@/components/home/ProyectosDestacados";
import CTABanner from "@/components/home/CTABanner";
import {
  getArticulosDestacados,
  getComparadorParams,
  getInicio,
  getProyectosDestacados,
} from "@/app/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const [inicio, articulos, proyectos, comparador] = await Promise.all([
    getInicio(),
    getArticulosDestacados(4),
    getProyectosDestacados(4),
    getComparadorParams(),
  ]);

  return (
    <>
      <Hero inicio={inicio} />
      <StatsBar items={inicio.estadisticas} />
      <NosotrosTeaser inicio={inicio} />
      <ServiciosGrid items={inicio.servicios} />
      <BibliotecaTeaser articulos={articulos} />
      <ComparadorTeaser params={comparador} />
      <ProyectosDestacados proyectos={proyectos} />
      <CTABanner
        titulo={inicio.cta_titulo}
        texto={inicio.cta_texto}
        botonTexto={inicio.cta_boton_texto}
      />
    </>
  );
}
