import FadeIn from "@/components/ui/FadeIn";
import ProyectoFilter from "@/components/proyectos/ProyectoFilter";
import { getConfig, getProyectos } from "@/app/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Proyectos",
  description:
    "Obras de bioarquitectura en Argentina: adobe, quincha, tapial, techos verdes y diseño bioclimático.",
};

export default async function ProyectosPage() {
  const [proyectos, config] = await Promise.all([getProyectos(), getConfig()]);

  return (
    <section
      style={{
        padding: "140px 28px 80px",
        maxWidth: 1200,
        marginInline: "auto",
      }}
    >
      <FadeIn>
        <header style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="eyebrow">Proyectos</span>
          <h1 className="section-title">
            {config.proyectos_titulo ?? "Obras que respiran"}
          </h1>
          <div className="divider" />
          <p
            style={{
              maxWidth: 620,
              margin: "-16px auto 0",
              fontSize: 15,
              color: "var(--carbon-soft)",
              lineHeight: 1.7,
            }}
          >
            {config.proyectos_intro ??
              "Casas, refugios y espacios proyectados con tierra cruda y materiales nobles."}
          </p>
        </header>
      </FadeIn>

      <ProyectoFilter proyectos={proyectos} />
    </section>
  );
}
