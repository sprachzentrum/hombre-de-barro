import type { Metadata } from "next";
import { sans, display } from "./lib/fonts";
import { getConfig } from "./lib/content";
import { mediaUrl } from "./lib/strapi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import "./globals.css";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  const ogImage =
    mediaUrl(config.og_image?.url) ?? `${SITE_URL}/images/hero.jpg`;
  const description =
    config.descripcion_corta ??
    "Estudio de bioarquitectura en Villa General Belgrano, Córdoba. Adobe, quincha, techos verdes y diseño bioclimático.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${config.nombre_estudio} — ${config.tagline ?? "Arquitectura Sustentable"}`,
      template: `%s — ${config.nombre_estudio}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: config.nombre_estudio,
      title: `${config.nombre_estudio} — ${config.tagline ?? ""}`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.nombre_estudio,
      description,
      images: [ogImage],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getConfig();

  return (
    <html lang="es-AR" className={`${sans.variable} ${display.variable}`}>
      <body>
        <Navbar
          brandName={config.nombre_estudio}
          brandTag={config.tagline}
        />
        <main>{children}</main>
        <Footer config={config} />
        <WhatsAppButton phone={config.whatsapp} />
      </body>
    </html>
  );
}
