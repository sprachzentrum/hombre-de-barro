import Button from "./Button";
import styles from "./PlaceholderPage.module.css";

interface PlaceholderPageProps {
  icon?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}

export default function PlaceholderPage({
  icon = "🌱",
  title,
  highlight,
  subtitle = "Esta sección está en construcción. Volvé pronto.",
}: PlaceholderPageProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.icon} aria-hidden>
          {icon}
        </div>
        <div className={styles.tag}>Próximamente</div>
        <h1 className={styles.title}>
          {title}
          {highlight && (
            <>
              {" "}
              <em>{highlight}</em>
            </>
          )}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <Button href="/">← Volver al inicio</Button>
      </div>
    </div>
  );
}
