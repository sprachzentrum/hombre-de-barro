import FadeIn from "@/components/ui/FadeIn";
import BibliotecaFilter from "@/components/biblioteca/BibliotecaFilter";
import { getArticulos, getCategoriasBiblioteca } from "@/app/lib/content";

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
  const [articulos, categorias] = await Promise.all([
    getArticulos(),
    getCategoriasBiblioteca(),
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
            Guías, planos y artículos de{" "}
            <em style={{ color: "var(--verde-bosque)" }}>construcción natural</em>
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
            Conocimiento abierto para quien quiera construir con la tierra. Planos
            descargables, guías paso a paso y fundamentos del diseño sustentable.
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
