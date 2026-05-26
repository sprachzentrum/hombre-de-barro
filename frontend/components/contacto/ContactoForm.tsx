"use client";

import { useState, type FormEvent } from "react";
import styles from "./ContactoForm.module.css";

const WHATSAPP_NUMBER = "543546464383";

const INTERES_LABEL: Record<string, string> = {
  vivienda: "Vivienda en tierra cruda",
  techo_verde: "Techo verde",
  reforma: "Reforma sustentable",
  asesoria: "Asesoría bioclimática",
  otro: "Otro",
};

type Status =
  | { kind: "idle" }
  | { kind: "ok" }
  | { kind: "error"; fieldErrors: Record<string, string> };

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}

function buildWhatsAppUrl(data: {
  nombre: string;
  email: string;
  telefono: string;
  interes: string;
  mensaje: string;
}) {
  const interesLabel = INTERES_LABEL[data.interes] ?? "Consulta general";
  const lines = [
    `Hola, soy ${data.nombre}.`,
    "",
    `*Interés:* ${interesLabel}`,
    "",
    data.mensaje,
    "",
    `📧 ${data.email}`,
  ];
  if (data.telefono) lines.push(`📱 ${data.telefono}`);
  lines.push("");
  lines.push("— Enviado desde hombredebarro.com");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

export default function ContactoForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      nombre: String(fd.get("nombre") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      telefono: String(fd.get("telefono") ?? "").trim(),
      interes: String(fd.get("interes") ?? "otro"),
      mensaje: String(fd.get("mensaje") ?? "").trim(),
      hp: String(fd.get("hp") ?? ""),
    };

    if (data.hp) {
      // Honeypot: silently treat as success
      setStatus({ kind: "ok" });
      return;
    }

    const errors: Record<string, string> = {};
    if (data.nombre.length < 2) errors.nombre = "Ingresá tu nombre";
    if (!isValidEmail(data.email)) errors.email = "Email inválido";
    if (data.mensaje.length < 10)
      errors.mensaje = "Contanos un poco más (mín. 10 caracteres)";
    if (Object.keys(errors).length) {
      setStatus({ kind: "error", fieldErrors: errors });
      return;
    }

    const url = buildWhatsAppUrl(data);
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus({ kind: "ok" });
    (e.target as HTMLFormElement).reset();
  }

  const fieldErr = (name: string) =>
    status.kind === "error" ? status.fieldErrors[name] : undefined;

  if (status.kind === "ok") {
    return (
      <div className={styles.form}>
        <h3 className={styles.formTitle}>¡Mensaje enviado! 🌱</h3>
        <div className={styles.success}>
          Te respondemos dentro de 48 hs hábiles. Si no se abrió WhatsApp
          automáticamente, escribinos directamente al{" "}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--verde-bosque)", fontWeight: 600 }}
          >
            +54 9 3546 46-4383
          </a>
          .
        </div>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className={styles.submit}
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.formTitle}>Escribinos por WhatsApp</h3>
      <p
        style={{
          fontSize: 13,
          color: "var(--carbon-soft)",
          marginTop: -4,
          marginBottom: 4,
          lineHeight: 1.5,
        }}
      >
        Completá los datos y te abrimos WhatsApp con tu mensaje listo para
        enviar.
      </p>

      <div className={styles.row}>
        <div>
          <input
            className={styles.input}
            type="text"
            name="nombre"
            placeholder="Nombre"
            autoComplete="name"
            required
            minLength={2}
            aria-invalid={!!fieldErr("nombre")}
          />
          {fieldErr("nombre") && (
            <div className={styles.error}>{fieldErr("nombre")}</div>
          )}
        </div>
        <div>
          <input
            className={styles.input}
            type="tel"
            name="telefono"
            placeholder="Teléfono (opcional)"
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          aria-invalid={!!fieldErr("email")}
        />
        {fieldErr("email") && (
          <div className={styles.error}>{fieldErr("email")}</div>
        )}
      </div>

      <select
        className={styles.select}
        name="interes"
        defaultValue="otro"
        aria-label="¿Qué te interesa?"
      >
        <option value="vivienda">Vivienda en tierra cruda</option>
        <option value="techo_verde">Techo verde</option>
        <option value="reforma">Reforma sustentable</option>
        <option value="asesoria">Asesoría bioclimática</option>
        <option value="otro">Otro</option>
      </select>

      <div>
        <textarea
          className={styles.textarea}
          name="mensaje"
          placeholder="Contanos tu proyecto, terreno o pregunta..."
          rows={4}
          required
          minLength={10}
          aria-invalid={!!fieldErr("mensaje")}
        />
        {fieldErr("mensaje") && (
          <div className={styles.error}>{fieldErr("mensaje")}</div>
        )}
      </div>

      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        className={styles.honeypot}
        aria-hidden="true"
      />

      <button type="submit" className={styles.submit}>
        💬 Enviar por WhatsApp →
      </button>
    </form>
  );
}
