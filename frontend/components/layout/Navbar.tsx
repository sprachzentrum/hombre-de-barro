"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/comparador", label: "Comparador" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

interface NavbarProps {
  brandName?: string;
  brandTag?: string;
}

export default function Navbar({
  brandName = "Hombre de Barro",
  brandTag = "Arquitectura Sustentable",
}: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label={brandName}>
            <Image
              src="/logo-mark.svg"
              alt=""
              width={26}
              height={52}
              priority
              className={styles.brandMark}
            />
            <span className={styles.brandText}>
              <span className={styles.brandName}>{brandName}</span>
              {brandTag && <span className={styles.brandTag}>{brandTag}</span>}
            </span>
          </Link>

          <div className={styles.links}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.link} ${isActive(l.href) ? styles.active : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`${styles.link} ${isActive(l.href) ? styles.active : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
