import FadeIn from "@/components/ui/FadeIn";
import BibliotecaFilter from "@/components/biblioteca/BibliotecaFilter";
import { getArticulos, getCategoriasBiblioteca, getConfig } from "@/app/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Biblioteca Técnica",
  description:
    "Guías, planos y artículos de construcción natural: adobe, quincha, techos verdes, agua, energía solar y diseño bioclimático.",
};

interface PageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function BibliotecaPage({ searchParams }: PageProps) {
  const { categoria } = await searchParams;
  const [articulos, categorias, config] = await Promise.all([
    getArticulos(),
    getCategoriasBiblioteca(),
    getConfig(),
  ]);

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
          <span className="eyebrow">Biblioteca Técnica</span>
          <h1 className="section-title">
            {config.biblioteca_titulo ??
              "Guías, planos y artículos de construcción natural"}
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
            {config.biblioteca_intro ??
              "Conocimiento abierto para quien quiera construir con la tierra."}
          </p>
        </header>
      </FadeIn>

      <BibliotecaFilter
        articulos={articulos}
        categorias={categorias}
        initialCategoria={categoria ?? "todas"}
      />
    </section>
  );
}
