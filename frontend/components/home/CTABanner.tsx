import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import styles from "./CTABanner.module.css";

interface CTABannerProps {
  titulo?: string;
  texto?: string;
  botonTexto?: string;
}

export default function CTABanner({
  titulo = "¿Tenés un terreno y un sueño?",
  texto = "Cada proyecto empieza con una conversación.",
  botonTexto = "Agendar Consulta Gratuita",
}: CTABannerProps) {
  const [first, ...rest] = titulo.split(/(?=\s)/);
  const restText = rest.join("");

  return (
    <FadeIn>
      <section className={styles.banner}>
        <h2 className={styles.title}>
          {first}
          {restText && <em>{restText}</em>}
        </h2>
        <p className={styles.text}>{texto}</p>
        <Button href="/contacto">{botonTexto} →</Button>
      </section>
    </FadeIn>
  );
}
