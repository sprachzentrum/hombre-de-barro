/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * Seed Strapi with the studio's real content (projects, articles,
 * techniques, team, blog, singles) and upload all local photos into the
 * Media Library.
 *
 * Usage (from the cms/ directory):
 *     node scripts/seed.js            # seeds only if empty
 *     FORCE=1 node scripts/seed.js    # wipes seeded collections first
 *
 * Photos are read from ../frontend/public (override with FRONTEND_PUBLIC).
 */
const path = require("path");
const fs = require("fs");
const { createStrapi } = require("@strapi/strapi");

const DATA = require("./seed-data.json");
const PUBLIC_DIR =
  process.env.FRONTEND_PUBLIC ||
  path.resolve(__dirname, "../../frontend/public");
const FORCE = process.env.FORCE === "1";

/* The frontend fallback stores block text leaves as { text: "..." }.
   Strapi's blocks validator requires { type: "text", text: "..." }.
   Walk the tree and tag every leaf text node. */
function normalizeBlocks(nodes) {
  if (!Array.isArray(nodes)) return nodes;
  return nodes.map((n) => {
    if (n == null || typeof n !== "object") return n;
    if (typeof n.text === "string" && !n.type) {
      return { type: "text", ...n };
    }
    const out = { ...n };
    if (Array.isArray(n.children)) out.children = normalizeBlocks(n.children);
    return out;
  });
}

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

async function main() {
  // TS projects run from the compiled dist/ — point Strapi at it so the
  // config (database, server, …) is loaded from dist/config/*.js.
  const app = await createStrapi({
    appDir: path.resolve(__dirname, ".."),
    distDir: path.resolve(__dirname, "../dist"),
  }).load();
  app.log.level = "error";

  const log = (...a) => console.log(...a);

  // ── Guard against accidental double-seed ───────────────────────
  const existing = await app.documents("api::proyecto.proyecto").count();
  if (existing > 0 && !FORCE) {
    console.log(
      `\n⚠  Already ${existing} proyectos in Strapi. Skipping.\n` +
        `   Run with FORCE=1 to wipe seeded collections and re-seed.\n`
    );
    await app.destroy();
    return;
  }

  const COLLECTIONS = [
    "api::proyecto.proyecto",
    "api::articulo.articulo",
    "api::entrada-blog.entrada-blog",
    "api::miembro-equipo.miembro-equipo",
    "api::tecnica.tecnica",
    "api::categoria-biblioteca.categoria-biblioteca",
    "api::categoria-blog.categoria-blog",
  ];
  if (FORCE) {
    for (const uid of COLLECTIONS) {
      const all = await app.documents(uid).findMany({ limit: -1 });
      for (const d of all) {
        await app.documents(uid).delete({ documentId: d.documentId });
      }
    }
    log("Wiped seeded collections.");
  }

  // ── Media upload with per-path cache ───────────────────────────
  const mediaCache = new Map();
  const uploadService = app.plugin("upload").service("upload");

  async function uploadPhoto(url, alt) {
    if (!url) return null;
    if (mediaCache.has(url)) return mediaCache.get(url);
    const rel = url.replace(/^\//, "");
    const abs = path.join(PUBLIC_DIR, rel);
    if (!fs.existsSync(abs)) {
      console.warn(`  ! missing photo, skipped: ${abs}`);
      mediaCache.set(url, null);
      return null;
    }
    const ext = path.extname(abs).toLowerCase();
    const stat = fs.statSync(abs);
    const [file] = await uploadService.upload({
      data: { fileInfo: { alternativeText: alt || "", name: path.basename(abs) } },
      files: {
        filepath: abs,
        originalFileName: path.basename(abs),
        mimetype: MIME[ext] || "application/octet-stream",
        size: stat.size,
      },
    });
    mediaCache.set(url, file.id);
    return file.id;
  }

  // ── Taxonomies ─────────────────────────────────────────────────
  const tecnicaBySlug = {};
  for (const t of DATA.tecnicas) {
    const doc = await app.documents("api::tecnica.tecnica").create({
      data: { nombre: t.nombre, slug: t.slug, icono: t.icono },
    });
    tecnicaBySlug[t.slug] = doc.documentId;
  }
  log(`Técnicas: ${Object.keys(tecnicaBySlug).length}`);

  const catBibBySlug = {};
  for (const c of DATA.categorias) {
    const doc = await app
      .documents("api::categoria-biblioteca.categoria-biblioteca")
      .create({
        data: { nombre: c.nombre, slug: c.slug, icono: c.icono, orden: c.orden },
      });
    catBibBySlug[c.slug] = doc.documentId;
  }
  log(`Categorías biblioteca: ${Object.keys(catBibBySlug).length}`);

  const catBlogBySlug = {};
  for (const c of DATA.categoriasBlog) {
    const doc = await app
      .documents("api::categoria-blog.categoria-blog")
      .create({ data: { nombre: c.nombre, slug: c.slug } });
    catBlogBySlug[c.slug] = doc.documentId;
  }
  log(`Categorías blog: ${Object.keys(catBlogBySlug).length}`);

  // ── Proyectos ──────────────────────────────────────────────────
  let nP = 0;
  for (const p of DATA.proyectos) {
    const imagen = p.imagen_principal
      ? await uploadPhoto(p.imagen_principal.url, p.imagen_principal.alternativeText)
      : null;
    const galeria = [];
    for (const g of p.galeria || []) {
      const id = await uploadPhoto(g.url, g.alternativeText);
      if (id) galeria.push(id);
    }
    try {
      await app.documents("api::proyecto.proyecto").create({
        status: "published",
        data: {
          titulo: p.titulo,
          slug: p.slug,
          ubicacion: p.ubicacion,
          superficie_m2: p.superficie_m2,
          año: p.año,
          estado: p.estado,
          descripcion_corta: p.descripcion_corta,
          descripcion: normalizeBlocks(p.descripcion),
          imagen_principal: imagen,
          galeria,
          ficha_tecnica: (p.ficha_tecnica || []).map((f) => ({
            etiqueta: f.etiqueta,
            valor: f.valor,
          })),
          testimonial_texto: p.testimonial_texto,
          testimonial_autor: p.testimonial_autor,
          destacado: !!p.destacado,
          color_acento: p.color_acento,
        },
      });
      nP++;
    } catch (err) {
      const errs = err?.details?.errors || [];
      console.error(`  ✗ proyecto ${p.slug}:`);
      for (const e of errs) {
        console.error(`     [${(e.path || []).join(".")}] ${e.message}`);
      }
      if (!errs.length) console.error(`     ${err.message}`);
    }
  }
  log(`Proyectos: ${nP} (fotos subidas: ${mediaCache.size})`);

  // ── Artículos ──────────────────────────────────────────────────
  let nA = 0;
  for (const a of DATA.articulos) {
    await app.documents("api::articulo.articulo").create({
      status: "published",
      data: {
        titulo: a.titulo,
        slug: a.slug,
        tipo: a.tipo,
        dificultad: a.dificultad,
        tiempo_lectura: a.tiempo_lectura,
        extracto: a.extracto,
        contenido: normalizeBlocks(a.contenido),
        tiene_planos: !!a.tiene_planos,
        destacado: !!a.destacado,
        categoria: a.categoria ? catBibBySlug[a.categoria.slug] : null,
      },
    });
    nA++;
  }
  log(`Artículos: ${nA}`);

  // ── Equipo ─────────────────────────────────────────────────────
  let nE = 0;
  for (const m of DATA.equipo) {
    await app.documents("api::miembro-equipo.miembro-equipo").create({
      data: {
        nombre: m.nombre,
        slug: m.slug,
        rol: m.rol,
        bio: normalizeBlocks(m.bio),
        instagram: m.instagram || "",
        linkedin: m.linkedin || "",
        email: m.email || undefined,
        orden: m.orden || 0,
      },
    });
    nE++;
  }
  log(`Equipo: ${nE}`);

  // ── Blog ───────────────────────────────────────────────────────
  let nB = 0;
  for (const e of DATA.entradas) {
    await app.documents("api::entrada-blog.entrada-blog").create({
      status: "published",
      data: {
        titulo: e.titulo,
        slug: e.slug,
        extracto: e.extracto,
        contenido: normalizeBlocks(e.contenido),
        destacado: !!e.destacado,
        categoria_blog: e.categoria_blog
          ? catBlogBySlug[e.categoria_blog.slug]
          : null,
      },
    });
    nB++;
  }
  log(`Entradas blog: ${nB}`);

  // ── Single types ───────────────────────────────────────────────
  const cfg = DATA.config;
  await app.documents("api::configuracion-global.configuracion-global").create({
    status: "published",
    data: {
      nombre_estudio: cfg.nombre_estudio,
      tagline: cfg.tagline,
      descripcion_corta: cfg.descripcion_corta,
      telefono: cfg.telefono,
      email: cfg.email,
      direccion: cfg.direccion,
      whatsapp: cfg.whatsapp,
      instagram_url: cfg.instagram_url,
      facebook_url: cfg.facebook_url,
      youtube_url: cfg.youtube_url,
      pinterest_url: cfg.pinterest_url,
      linkedin_url: cfg.linkedin_url,
    },
  });

  const ini = DATA.inicio;
  const heroId = ini.hero_imagen
    ? await uploadPhoto(ini.hero_imagen.url, ini.hero_imagen.alternativeText)
    : null;
  await app.documents("api::pagina-inicio.pagina-inicio").create({
    status: "published",
    data: {
      hero_eyebrow: ini.hero_eyebrow,
      hero_titulo: ini.hero_titulo,
      hero_titulo_italica: ini.hero_titulo_italica,
      hero_subtitulo: ini.hero_subtitulo,
      hero_imagen: heroId,
      estadisticas: (ini.estadisticas || []).map((s) => ({
        numero: s.numero,
        etiqueta: s.etiqueta,
      })),
      nosotros_eyebrow: ini.nosotros_eyebrow,
      nosotros_titulo: ini.nosotros_titulo,
      nosotros_texto: normalizeBlocks(ini.nosotros_texto),
      servicios: (ini.servicios || []).map((s) => ({
        icono: s.icono,
        titulo: s.titulo,
        descripcion: s.descripcion,
      })),
      cta_titulo: ini.cta_titulo,
      cta_texto: ini.cta_texto,
      cta_boton_texto: ini.cta_boton_texto,
    },
  });

  const nos = DATA.nosotros;
  const nosImgId = nos.imagen_principal
    ? await uploadPhoto(nos.imagen_principal.url, nos.imagen_principal.alternativeText)
    : null;
  await app.documents("api::pagina-nosotros.pagina-nosotros").create({
    status: "published",
    data: {
      titulo: nos.titulo,
      subtitulo: nos.subtitulo,
      historia: normalizeBlocks(nos.historia),
      principios: (nos.principios || []).map((p) => ({
        numero: p.numero,
        titulo: p.titulo,
        descripcion: normalizeBlocks(p.descripcion),
      })),
      hitos: (nos.hitos || []).map((h) => ({
        año: h.año,
        titulo: h.titulo,
        descripcion: h.descripcion,
      })),
      imagen_principal: nosImgId,
    },
  });

  const comp = DATA.comparador;
  await app
    .documents("api::comparador-parametros.comparador-parametros")
    .create({ status: "published", data: comp });

  log("Single types: configuración, inicio, nosotros, comparador ✓");
  log(`\n✅ Seed completo. Fotos en la Media Library: ${mediaCache.size}\n`);

  await app.destroy();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
