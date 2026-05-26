import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import type { ConfiguracionGlobal } from "@/app/lib/types";

const SECCIONES = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/comparador", label: "Comparador" },
  { href: "/contacto", label: "Contacto" },
];

const BIBLIO_LINKS = [
  { slug: "muros", label: "Muros y Estructura" },
  { slug: "techos", label: "Techos y Cubiertas" },
  { slug: "agua", label: "Agua y Saneamiento" },
  { slug: "energia", label: "Energía" },
  { slug: "planificacion", label: "Planificación" },
];

interface FooterProps {
  config: ConfiguracionGlobal;
}

export default function Footer({ config }: FooterProps) {
  const year = new Date().getFullYear();
  const social = [
    { url: config.instagram_url, label: "Instagram" },
    { url: config.facebook_url, label: "Facebook" },
    { url: config.youtube_url, label: "YouTube" },
    { url: config.linkedin_url, label: "LinkedIn" },
    { url: config.pinterest_url, label: "Pinterest" },
  ].filter((s) => s.url);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.brandCol}>
            <Image
              src="/logo.svg"
              alt={config.nombre_estudio}
              width={170}
              height={142}
              style={{ width: 170, height: "auto", marginBottom: 14 }}
            />
            <p className={styles.brandTagline}>
              {config.descripcion_corta ??
                "Arquitectura sustentable con tierra cruda, madera y materiales nobles."}
            </p>
            {config.direccion && (
              <p className={styles.brandTagline} style={{ marginTop: 10 }}>
                📍 {config.direccion}
              </p>
            )}
          </div>

          <div>
            <div className={styles.colTitle}>Secciones</div>
            {SECCIONES.map((s) => (
              <Link key={s.href} href={s.href} className={styles.link}>
                {s.label}
              </Link>
            ))}
          </div>

          <div>
            <div className={styles.colTitle}>Biblioteca</div>
            {BIBLIO_LINKS.map((s) => (
              <Link
                key={s.slug}
                href={`/biblioteca?categoria=${s.slug}`}
                className={styles.link}
              >
                {s.label}
              </Link>
            ))}
          </div>

          <div>
            <div className={styles.colTitle}>Contacto</div>
            {config.email && (
              <a href={`mailto:${config.email}`} className={styles.link}>
                {config.email}
              </a>
            )}
            {config.telefono && (
              <a href={`tel:${config.telefono.replace(/\s/g, "")}`} className={styles.link}>
                {config.telefono}
              </a>
            )}
            {social.length > 0 && (
              <>
                <div className={styles.colTitle} style={{ marginTop: 18 }}>
                  Redes
                </div>
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {s.label}
                  </a>
                ))}
              </>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <div>© {year} {config.nombre_estudio}</div>
          <div className={styles.trustBadge}>
            ✓ <strong>CIRSOC 601</strong> · Red ProTierra 1.º Premio 2019
          </div>
          <div>Hecho con 🌿 tierra y código</div>
        </div>
      </div>
    </footer>
  );
}
