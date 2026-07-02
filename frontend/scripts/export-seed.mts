/* Exports the frontend fallback content as a plain JSON file that the
   Strapi seed script consumes. Run with:  npx tsx scripts/export-seed.mts  */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  fallbackConfig,
  fallbackInicio,
  fallbackComparador,
  fallbackProyectos,
  fallbackCategorias,
  fallbackArticulos,
  fallbackTecnicas,
  fallbackEquipo,
  fallbackNosotros,
  fallbackCategoriasBlog,
  fallbackEntradas,
} from "../app/lib/fallbacks.ts";

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, "../../cms/scripts/seed-data.json");

const data = {
  config: fallbackConfig,
  inicio: fallbackInicio,
  comparador: fallbackComparador,
  proyectos: fallbackProyectos,
  categorias: fallbackCategorias,
  articulos: fallbackArticulos,
  tecnicas: fallbackTecnicas,
  equipo: fallbackEquipo,
  nosotros: fallbackNosotros,
  categoriasBlog: fallbackCategoriasBlog,
  entradas: fallbackEntradas,
};

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(data, null, 2));
console.log(
  `Wrote ${out}\n` +
    `  proyectos: ${data.proyectos.length}\n` +
    `  articulos: ${data.articulos.length}\n` +
    `  categorias: ${data.categorias.length}\n` +
    `  tecnicas: ${data.tecnicas.length}\n` +
    `  equipo: ${data.equipo.length}\n` +
    `  entradas: ${data.entradas.length}`
);
