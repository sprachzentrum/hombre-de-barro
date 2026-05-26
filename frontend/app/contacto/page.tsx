import FadeIn from "@/components/ui/FadeIn";
import ContactoForm from "@/components/contacto/ContactoForm";
import { getConfig } from "@/app/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Contacto",
  description:
    "Escribinos sobre tu proyecto. Estudio Hombre de Barro — Villa General Belgrano, Córdoba, Argentina.",
};

export default async function ContactoPage() {
  const config = await getConfig();
  const wa = config.whatsapp?.replace(/\D/g, "");
  const waHref = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent("Hola, me gustaría consultar sobre un proyecto.")}`
    : null;

  const contactItems = [
    config.email && {
      icon: "📧",
      label: config.email,
      href: `mailto:${config.email}`,
    },
    config.telefono && {
      icon: "📱",
      label: config.telefono,
      href: `tel:${config.telefono.replace(/\s/g, "")}`,
    },
    config.direccion && { icon: "📍", label: config.direccion, href: null },
    config.instagram_url && {
      icon: "📸",
      label: "@hombredebarro",
      href: config.instagram_url,
    },
  ].filter(Boolean) as Array<{ icon: string; label: string; href: string | null }>;

  return (
    <section
      style={{
        padding: "140px 28px 80px",
        maxWidth: 1100,
        marginInline: "auto",
      }}
    >
      <FadeIn>
        <header style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="eyebrow">Contacto</span>
          <h1 className="section-title">
            Empecemos a <em style={{ color: "var(--verde-bosque)" }}>construir juntos</em>
          </h1>
          <div className="divider" />
        </header>
      </FadeIn>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 48,
          alignItems: "start",
        }}
      >
        <FadeIn>
          <div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: "var(--carbon-soft)",
                marginBottom: 24,
              }}
            >
              {config.direccion ?? "Córdoba, Argentina"}. Trabajamos en todo el
              país. Respondemos en 48 hs hábiles.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {contactItems.map((c) => {
                const inner = (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: 14,
                      color: "var(--carbon)",
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: "var(--crema-warm)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </div>
                    <span>{c.label}</span>
                  </div>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.label}>{inner}</div>
                );
              })}
            </div>

            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 22px",
                  background: "#25d366",
                  color: "#fff",
                  borderRadius: 50,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 28,
                }}
              >
                💬 Escribinos por WhatsApp
              </a>
            )}

            {/* OpenStreetMap embed — Villa General Belgrano */}
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid var(--linea)",
                aspectRatio: "4 / 3",
              }}
            >
              <iframe
                title="Mapa — Río Paraná 786, Villa Gral. Belgrano"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-64.5430%2C-31.9710%2C-64.5316%2C-31.9645&layer=mapnik&marker=-31.9677927%2C-64.5373374"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ContactoForm />
        </FadeIn>
      </div>
    </section>
  );
}
