/* Default content shown when Strapi has not been populated yet.
   The architects can override every value from the admin panel. */

import type {
  ComparadorParametros,
  ConfiguracionGlobal,
  PaginaInicio,
  PaginaNosotros,
  Proyecto,
  Articulo,
  CategoriaBiblioteca,
  Tecnica,
  MiembroEquipo,
} from "./types";
import { ARTICULO_CONTENT as EXTRA_ARTICULO_CONTENT } from "./articulos-content";

export const fallbackConfig: ConfiguracionGlobal = {
  nombre_estudio: "Hombre de Barro",
  tagline: "Arquitectura Sustentable",
  descripcion_corta:
    "Arquitectura sustentable con tierra cruda, madera y materiales nobles. Villa General Belgrano, Córdoba.",
  telefono: "(03546) 464383",
  email: "info@hombredebarro.com",
  direccion: "Río Paraná 786, X5194 Villa Gral. Belgrano, Córdoba",
  proyectos_titulo: "Obras que respiran",
  proyectos_intro:
    "Casas, refugios y espacios proyectados con tierra cruda y materiales nobles. Cada obra es un diálogo con su terreno, su clima y su gente.",
  biblioteca_titulo: "Guías, planos y artículos de construcción natural",
  biblioteca_intro:
    "Conocimiento abierto para quien quiera construir con la tierra. Planos descargables, guías paso a paso y fundamentos del diseño sustentable.",
  blog_titulo: "Noticias, talleres, ideas",
  comparador_titulo: "Convencional vs. Sustentable: los números",
  comparador_intro:
    "Movés la superficie y el tipo de cambio. El cálculo se actualiza con los parámetros cargados por el estudio.",
  contacto_titulo: "Empecemos a construir juntos",
  contacto_intro:
    "Trabajamos en todo el país. Respondemos en 48 hs hábiles.",
  contacto_form_titulo: "Escribinos por WhatsApp",
  contacto_form_texto:
    "Completá los datos y te abrimos WhatsApp con tu mensaje listo para enviar.",
  contacto_preparado_titulo: "¡Mensaje preparado! 🌱",
  contacto_preparado_texto:
    "Para enviarlo, confirmá el envío dentro de WhatsApp.",
  whatsapp: "5493546464383",
  instagram_url: "https://www.instagram.com/hombredebarro786",
  facebook_url: "https://www.facebook.com/hombredbarro/",
  youtube_url: "",
  pinterest_url: "https://ar.pinterest.com/HombredebarroVGB/",
  linkedin_url: "",
  logo: null,
  logo_blanco: null,
  og_image: null,
};

export const fallbackInicio: PaginaInicio = {
  hero_eyebrow: "Estudio de Arquitectura Sustentable",
  hero_titulo: "Hombre",
  hero_titulo_italica: "de Barro",
  hero_subtitulo:
    "Hogares que respiran con la tierra. Adobe, quincha y materiales nobles — tradición ancestral y diseño contemporáneo.",
  hero_imagen: {
    id: 1000,
    documentId: "local-hero",
    url: "/images/hero.jpg",
    alternativeText:
      "Casa Iguana en Uspallata, Mendoza — quincha sismo-resistente, 1.º Premio Red ProTierra 2019",
    width: 1280,
    height: 960,
  },
  estadisticas: [
    { id: 1, numero: "15+", etiqueta: "Años" },
    { id: 2, numero: "80", etiqueta: "Proyectos" },
    { id: 3, numero: "95%", etiqueta: "Mat. locales" },
    { id: 4, numero: "1.º", etiqueta: "Premio Red ProTierra 2019" },
  ],
  nosotros_eyebrow: "Quiénes Somos",
  nosotros_titulo: "La tierra nos enseñó a construir distinto",
  nosotros_texto: [
    {
      type: "paragraph",
      children: [
        {
          text: "Somos arquitectos y constructores que creen en una arquitectura nacida del suelo. Hace más de 15 años diseñamos con adobe, quincha, fardos de paja, piedra y madera.",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Cada proyecto es un diálogo entre tradición ancestral y diseño bioclimático contemporáneo. No imponemos formas; las descubrimos junto al terreno, el clima y las personas.",
        },
      ],
    },
  ],
  nosotros_imagen: null,
  servicios: [
    {
      id: 1,
      icono: "🏠",
      titulo: "Adobe, Quincha y Tapial",
      descripcion:
        "Viviendas con técnicas ancestrales en tierra cruda — sismo-resistentes según CIRSOC 601 y adaptadas al confort contemporáneo.",
    },
    {
      id: 2,
      icono: "🌿",
      titulo: "Techos Verdes",
      descripcion:
        "Cubiertas vegetales que regulan temperatura, absorben lluvia y devuelven vida al paisaje.",
    },
    {
      id: 3,
      icono: "♻️",
      titulo: "Diseño Bioclimático Pasivo",
      descripcion:
        "Orientación solar óptima, ventilación cruzada, inercia térmica y muros Trombe — confort sin equipos.",
    },
    {
      id: 4,
      icono: "🪵",
      titulo: "Estructuras en Madera y Bambú",
      descripcion:
        "Eucalipto local, ñire, bambú tratado — estructuras renovables como alternativa al hormigón armado.",
    },
    {
      id: 5,
      icono: "💧",
      titulo: "Gestión Integral del Agua",
      descripcion:
        "Captación pluvial, fitodepuración, biodigestores y humedales artificiales — autonomía hídrica completa.",
    },
    {
      id: 6,
      icono: "🔆",
      titulo: "Energías Renovables Integradas",
      descripcion:
        "Fotovoltaica off-grid con acumulador, calefones solares, cocinas rocket — el sol como motor del hogar.",
    },
  ],
  cta_titulo: "¿Tenés un terreno y un sueño?",
  cta_texto: "Cada proyecto empieza con una conversación.",
  cta_boton_texto: "Agendar Consulta Gratuita",
};

// Comparador — Córdoba, Mayo 2026
// Todos los valores monetarios en pesos argentinos (ARS).
// El visitante ajusta el tipo de cambio desde la interfaz.
export const fallbackComparador: ComparadorParametros = {
  tipo_cambio_default: 1425,        // ARS por USD (dólar oficial 26.5.2026)
  autoconstruccion_descuento: 0.25, // 25 % menos si construye autoconstrucción

  // Construcción — completo (CAPC/IEC Oct 2025, $/m²)
  costo_m2_convencional: 1_632_000,
  costo_m2_sustentable: 1_250_000,

  // Operativos mensuales (ARS/m²/mes)
  // Convencional: luz + gas + agua para vivienda mal aislada (post Dec. 943/2025)
  energia_conv_por_m2_mes: 2_800,
  // Sustentable: bioclimático + solar off-grid → mínimo
  energia_sust_por_m2_mes: 600,
  // Wasser ya está incluido en "energia" (suma global). Se conserva por compatibilidad:
  agua_conv_por_m2_mes: 0,
  agua_sust_por_m2_mes: 0,

  // Mantenimiento anual (ARS/m²/año)
  mant_conv_por_m2_año: 15_000,
  mant_sust_por_m2_año: 10_000,

  // Inflación anual nominal en pesos (tarifas EPEC + ECOGAS post-Dec 943/2025)
  inflacion_energia_conv: 0.40,
  inflacion_energia_sust: 0.05,
  inflacion_total_conv: 0.40,
  inflacion_total_sust: 0.05,

  // Inversiones fijas sustentables (ARS)
  // Solar 3-5 kW off-grid con acumulador litio
  inversion_solar_fija: 12_000_000,
  // Cisterna + filtros + fitodepuración (humedal artificial)
  inversion_agua_fija: 4_500_000,

  co2_conv_por_m2: 0.45,
  co2_sust_por_m2: 0.08,
  arboles_por_tonelada_co2: 45,

  disclaimer:
    "Valores estimativos basados en el Índice de Edificación de Córdoba (IEC/CAPC, octubre 2025) para vivienda unifamiliar de planta baja, y en referencias de bioconstrucción del Taller TABI (FAUD-UNC, Arq. Armando Gross). Los costos de bioconstrucción varían según técnica (adobe, quincha, tapial, superadobe), disponibilidad local de materiales, grado de autoconstrucción y ubicación del terreno. Tipo de cambio ajustable. Tarifas energéticas según cuadro tarifario EPEC (Res. ERSeP 14/2025) y ECOGAS (Res. SE 543/25) post Decreto 943/2025 (eliminación de subsidios). Cada proyecto es único — solicitá tu presupuesto personalizado.",
};

function isoDate(year: number, month = 1, day = 1) {
  return new Date(Date.UTC(year, month - 1, day)).toISOString();
}

/* Build a fake StrapiMedia pointing at a local /public asset. */
function localImage(
  id: number,
  path: string,
  alt: string,
  width = 1600,
  height = 900
): import("./strapi").StrapiMedia {
  return {
    id,
    documentId: `local-${id}`,
    url: path,
    alternativeText: alt,
    width,
    height,
  };
}

/* Shorthand for gallery arrays: [path, alt, width, height] */
type GalSeed = [string, string, number, number];
function gallery(baseId: number, seeds: GalSeed[]): import("./strapi").StrapiMedia[] {
  return seeds.map(([path, alt, w, h], i) =>
    localImage(baseId + i, path, alt, w, h)
  );
}

export const fallbackProyectos: Proyecto[] = [
  {
    id: 2,
    documentId: "demo-tunduqueral",
    titulo: "Casa Iguana — Tunduqueral",
    slug: "vivienda-tunduqueral",
    ubicacion: "Uspallata, Mendoza",
    superficie_m2: 140,
    año: 2019,
    estado: "terminado",
    descripcion_corta:
      "Casa de quincha sismo-resistente en la precordillera de los Andes — zona sísmica 4, la más exigente de Argentina. Sus aberturas orgánicas, la «piel de iguana», le dan nombre. 1.º Premio Red ProTierra 2019.",
    descripcion: [
      {
        type: "heading",
        level: 2,
        children: [{ text: "Una quincha que aprueba la zona sísmica más exigente" }],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Tunduqueral está en Uspallata, en la precordillera mendocina. Geológicamente es zona sísmica 4 — la categoría más severa del INPRES — donde la mayoría de los técnicos ni siquiera considera la construcción con tierra. Quisimos demostrar lo contrario.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ text: "El cálculo CIRSOC 601" }],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Trabajamos con un cálculo estructural completo según el Reglamento Argentino de Construcciones Sismorresistentes (CIRSOC 601). La quincha mejorada que diseñamos combina un esqueleto de eucalipto rollizo arriostrado en todos los planos, con un relleno de barro armado con caña tacuara y mallado interno. El resultado: un sistema liviano (≈220 kg/m³), elástico y disipativo — exactamente lo opuesto a la mampostería pesada que falla en sismos fuertes.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ text: "Reconocimiento" }],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "El proyecto recibió el 1.º Premio del Concurso de Construcción Sostenible con Tierra de la Red ProTierra Argentina en 2019. Para nosotros la mejor validación fue lo que sucede cada vez que tiembla en la zona: la casa responde como esperamos — flexiona, absorbe, y vuelve a su lugar.",
          },
        ],
      },
    ],
    destacado: true,
    color_acento: "#8b6f47",
    imagen_principal: localImage(
      1002,
      "/images/proyectos/vivienda-tunduqueral/main.jpg",
      "Casa Iguana — vivienda de quincha en Uspallata, Mendoza",
      1040,
      780
    ),
    galeria: gallery(10020, [
      ["/images/proyectos/vivienda-tunduqueral/g1.jpg", "Casa Iguana bajo el cielo mendocino", 1280, 960],
      ["/images/proyectos/vivienda-tunduqueral/g2.jpg", "Casa Iguana nevada — la quincha en invierno", 736, 552],
      ["/images/proyectos/vivienda-tunduqueral/g3.jpg", "La casa frente a la cordillera nevada", 736, 552],
      ["/images/proyectos/vivienda-tunduqueral/g4.jpg", "La «piel de iguana»: aberturas orgánicas en la envolvente", 1040, 780],
      ["/images/proyectos/vivienda-tunduqueral/g5.jpg", "Interior — estufa de masa y barra de piedra", 960, 1280],
      ["/images/proyectos/vivienda-tunduqueral/g6.jpg", "Estar con muros esculpidos en barro", 800, 336],
      ["/images/proyectos/vivienda-tunduqueral/g7.jpg", "El jardín en primavera", 1280, 960],
      ["/images/proyectos/vivienda-tunduqueral/g8.jpg", "Los ojos de la casa iluminados de noche", 1024, 768],
      ["/images/proyectos/vivienda-tunduqueral/g9.jpg", "Baño con aberturas orgánicas", 1080, 810],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Sistema constructivo", valor: "Quincha mejorada según CIRSOC 601" },
      { id: 2, etiqueta: "Zona sísmica", valor: "Zona 4 (la más severa de Argentina)" },
      { id: 3, etiqueta: "Estructura", valor: "Esqueleto de eucalipto rollizo arriostrado" },
      { id: 4, etiqueta: "Muros", valor: "Quincha con caña tacuara y barro armado" },
      { id: 5, etiqueta: "Cubierta", valor: "Invertida de doble curvatura, con piedra de río" },
      { id: 6, etiqueta: "Superficie", valor: "140 m²" },
      { id: 7, etiqueta: "Reconocimiento", valor: "1.º Premio Red ProTierra 2019" },
    ],
    testimonial_texto:
      "Cuando tiembla, la casa parece bailar y volver a su lugar. La sentís viva.",
    testimonial_autor: "Familia propietaria, Uspallata",
    createdAt: isoDate(2019, 11, 1),
    updatedAt: isoDate(2019, 11, 1),
  },
  {
    id: 3,
    documentId: "demo-el-condor",
    titulo: "El Cóndor",
    slug: "el-condor",
    ubicacion: "El Durazno, Valle de Calamuchita, Córdoba",
    estado: "terminado",
    descripcion_corta:
      "Vivienda de tierra y madera con cubierta verde, posada sobre un afloramiento rocoso en las sierras de El Durazno. Interiores luminosos de madera clara y estufa de masa.",
    descripcion: [
      {
        type: "paragraph",
        children: [
          {
            text: "El Cóndor se asienta sobre la roca viva de las sierras de El Durazno, en el Valle de Calamuchita. La casa acompaña la topografía: su cubierta verde continúa el pastizal serrano y desde lejos el volumen casi desaparece en la ladera.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Adentro domina la madera: pisos y cielorrasos de tono claro, columnas de rollizo a la vista y una estufa de masa que organiza el estar. Las ventanas altas siguen la curva del techo y bañan de luz los espacios durante todo el día.",
          },
        ],
      },
    ],
    destacado: true,
    color_acento: "#6b7d4f",
    imagen_principal: localImage(
      1003,
      "/images/proyectos/el-condor/main.jpg",
      "El Cóndor — vivienda con techo verde en El Durazno",
      1280,
      720
    ),
    galeria: gallery(10030, [
      ["/images/proyectos/el-condor/g1.jpg", "La cubierta verde se funde con el pastizal serrano", 1400, 789],
      ["/images/proyectos/el-condor/g2.jpg", "Galería y deck de madera con vista al valle", 1280, 720],
      ["/images/proyectos/el-condor/g3.jpg", "Interior — comedor con columnas de rollizo", 787, 1400],
      ["/images/proyectos/el-condor/g4.jpg", "El estar, madera clara y muros de tierra", 720, 1280],
      ["/images/proyectos/el-condor/g5.jpg", "Cocina integrada con carpintería de madera", 1280, 720],
      ["/images/proyectos/el-condor/g6.jpg", "El muro curvo y la cubierta ondulante", 1280, 720],
      ["/images/proyectos/el-condor/g7.jpg", "Dormitorio con vista a las sierras", 720, 1280],
      ["/images/proyectos/el-condor/g8.jpg", "El acceso bajo la gran cubierta en voladizo", 1280, 720],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Estructura", valor: "Madera rolliza de eucalipto" },
      { id: 2, etiqueta: "Técnica", valor: "Quincha con revoque a la cal y marmolina" },
      { id: 3, etiqueta: "Cubierta", valor: "Techo verde y de piedra — 1/3 cubierta invertida" },
      { id: 4, etiqueta: "Calefacción", valor: "Estufa de masa térmica" },
    ],
    createdAt: isoDate(2023, 3, 1),
    updatedAt: isoDate(2023, 3, 1),
  },
  {
    id: 4,
    documentId: "demo-suite-del-arroyo",
    titulo: "Suite del Arroyo",
    slug: "suite-del-arroyo",
    ubicacion: "Complejo La Anita, Intiyaco, Valle de Calamuchita",
    superficie_m2: 86,
    año: 2016,
    estado: "terminado",
    descripcion_corta:
      "Bio-suite sobre el arroyo del complejo La Anita, entre un bosque de pinos de las Sierras Grandes. Geometría curva, muros de adobe y quincha, y una galería que se abre al agua.",
    descripcion: [
      {
        type: "paragraph",
        children: [
          {
            text: "A 6 km de Intiyaco, en el valle de Calamuchita, el complejo La Anita entrelaza sus bio-suites entre un bosque de pinos y un arroyo. La suite del arroyo nace de esa cercanía al agua: el hidromasaje, el dormitorio y la galería se abren hacia el cauce para verlo y escucharlo correr.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "El partido geométrico se resolvió con la línea curva — en planta y en muros — buscando mayor riqueza perceptual y mejor respuesta estructural. El esqueleto es de madera de eucalipto de 15 cm de diámetro, bajo normas CIRSOC 601 y 103: un sistema sismo-resistente apto para la zona 1.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "La envolvente combina técnicas mixtas de construcción con tierra: muros de adobe de 37 cm y quinchas de 33 cm, un excelente amortiguador térmico frente a las grandes amplitudes del lugar. La terminación es de revoques gruesos de arcilla y arena, y finos en base a arcilla, cal, estiércol de vaca y arena fina (albuminato). Tierra, piedra y madera: lo que se observa en el entorno es lo que construye la arquitectura.",
          },
        ],
      },
    ],
    destacado: true,
    color_acento: "#5a7247",
    imagen_principal: localImage(
      1004,
      "/images/proyectos/suite-del-arroyo/main.jpg",
      "Suite del Arroyo — fachada norte con aberturas orgánicas",
      1920,
      1080
    ),
    galeria: gallery(10040, [
      ["/images/proyectos/suite-del-arroyo/g1.jpg", "La suite elevada sobre el arroyo", 1400, 788],
      ["/images/proyectos/suite-del-arroyo/g2.jpg", "La fachada entre los pinos", 1400, 788],
      ["/images/proyectos/suite-del-arroyo/g3.jpg", "El muro curvo y la cubierta hacia el norte", 1400, 788],
      ["/images/proyectos/suite-del-arroyo/g4.jpg", "Vitral circular en el muro de barro", 506, 640],
      ["/images/proyectos/suite-del-arroyo/g5.jpg", "El estar con asientos esculpidos", 640, 437],
      ["/images/proyectos/suite-del-arroyo/g6.jpg", "Botellas de vidrio integradas al muro", 1400, 788],
      ["/images/proyectos/suite-del-arroyo/g7.jpg", "Hidromasaje con vista al bosque", 1050, 1400],
      ["/images/proyectos/suite-del-arroyo/g8.jpg", "La galería sobre pilotes de madera", 1400, 788],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Sistema constructivo", valor: "Mixto: adobe (37 cm) y quincha (33 cm)" },
      { id: 2, etiqueta: "Estructura", valor: "Eucalipto ø 15 cm — CIRSOC 601 / 103" },
      { id: 3, etiqueta: "Superficie total", valor: "86 m²" },
      { id: 4, etiqueta: "Superficie cubierta", valor: "65 m²" },
      { id: 5, etiqueta: "Revoques", valor: "Arcilla y arena; finos con cal y albuminato" },
      { id: 6, etiqueta: "Obra", valor: "Septiembre 2015 – noviembre 2016" },
    ],
    createdAt: isoDate(2016, 11, 1),
    updatedAt: isoDate(2016, 11, 1),
  },
  {
    id: 5,
    documentId: "demo-aguas-del-sol",
    titulo: "Aguas del Sol",
    slug: "aguas-del-sol",
    ubicacion: "Complejo La Anita, Intiyaco, Valle de Calamuchita",
    superficie_m2: 180,
    año: 2018,
    estado: "terminado",
    descripcion_corta:
      "Vivienda emplazada en un bosque de pinos sobre ladera. Estructura de madera, muros de quincha y techo verde con pasto Tifway.",
    destacado: true,
    color_acento: "#4a6741",
    imagen_principal: localImage(
      1005,
      "/images/proyectos/aguas-del-sol/main.jpg",
      "Aguas del Sol — techo verde entre los pinos",
      1920,
      1080
    ),
    galeria: gallery(10050, [
      ["/images/proyectos/aguas-del-sol/g1.jpg", "El techo verde visto desde la ladera", 1400, 1050],
      ["/images/proyectos/aguas-del-sol/g2.jpg", "La cubierta ondulante entre los pinos", 1400, 788],
      ["/images/proyectos/aguas-del-sol/g3.jpg", "La casa se esconde en el bosque", 1400, 788],
      ["/images/proyectos/aguas-del-sol/g4.jpg", "Galería y muros de quincha", 1400, 788],
      ["/images/proyectos/aguas-del-sol/g5.jpg", "Techo vivo y botellas en el muro", 640, 359],
      ["/images/proyectos/aguas-del-sol/g6.jpg", "El acceso bajo el techo verde", 1400, 788],
      ["/images/proyectos/aguas-del-sol/g7.jpg", "La terraza de madera del complejo", 1400, 1050],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Muros", valor: "Quincha con barro estabilizado" },
      { id: 2, etiqueta: "Estructura", valor: "Madera local" },
      { id: 3, etiqueta: "Cubierta", valor: "Techo verde con Tifway-grama" },
      { id: 4, etiqueta: "Superficie", valor: "180 m²" },
    ],
    createdAt: isoDate(2018, 3, 1),
    updatedAt: isoDate(2018, 3, 1),
  },
  {
    id: 6,
    documentId: "demo-rana-suite",
    titulo: "Rana Suite",
    slug: "rana-suite",
    ubicacion: "Intiyaco, Valle de Calamuchita, Córdoba",
    estado: "terminado",
    descripcion_corta:
      "Bio-suite compacta con techo vivo y deck elevado entre las sierras de Intiyaco. Tierra, madera y vidrio conectados con el entorno.",
    destacado: false,
    color_acento: "#7a9b6d",
    imagen_principal: localImage(
      1006,
      "/images/proyectos/rana-suite/main.jpg",
      "Rana Suite — bio-suite con techo vivo en Intiyaco",
      1920,
      1080
    ),
    galeria: gallery(10060, [
      ["/images/proyectos/rana-suite/g1.jpg", "La cubierta viva vista desde arriba", 1200, 675],
      ["/images/proyectos/rana-suite/g2.jpg", "El volumen sobre la ladera", 788, 1400],
      ["/images/proyectos/rana-suite/g3.jpg", "Fachada norte con carpinterías de madera", 1400, 788],
      ["/images/proyectos/rana-suite/g4.jpg", "Pérgola y techo verde", 1400, 788],
      ["/images/proyectos/rana-suite/g5.jpg", "El acceso y la galería", 788, 1400],
      ["/images/proyectos/rana-suite/g6.jpg", "Dormitorio con luz de la tarde", 1050, 1400],
      ["/images/proyectos/rana-suite/g7.jpg", "Atardecer desde el deck", 1050, 1400],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Tipología", valor: "Bio-suite" },
      { id: 2, etiqueta: "Estructura", valor: "Madera rolliza" },
      { id: 3, etiqueta: "Cubierta", valor: "Techo vivo" },
    ],
    createdAt: isoDate(2022, 6, 1),
    updatedAt: isoDate(2022, 6, 1),
  },
  {
    id: 7,
    documentId: "demo-hipocampo",
    titulo: "Hipocampo",
    slug: "hipocampo",
    estado: "en_obra",
    descripcion_corta:
      "Vivienda de tierra y madera en etapa final de obra: aberturas orgánicas, entramados de madera a la vista y cubiertas livianas sobre el monte serrano.",
    destacado: false,
    color_acento: "#8b6f47",
    imagen_principal: localImage(
      1007,
      "/images/proyectos/hipocampo/main.jpg",
      "Hipocampo — la vivienda en el monte serrano",
      1920,
      1082
    ),
    galeria: gallery(10070, [
      ["/images/proyectos/hipocampo/g1.jpg", "El volumen se recorta contra el monte", 1400, 789],
      ["/images/proyectos/hipocampo/g2.jpg", "La casa bajo la tormenta de verano", 1400, 789],
      ["/images/proyectos/hipocampo/g3.jpg", "Vista desde el camino, con las sierras de fondo", 1400, 789],
      ["/images/proyectos/hipocampo/g4.jpg", "El paisaje del monte que rodea la obra", 1400, 789],
      ["/images/proyectos/hipocampo/g5.jpg", "Detalle de la escalera exterior", 789, 1400],
      ["/images/proyectos/hipocampo/g6.jpg", "Muros con aberturas orgánicas en obra", 789, 1400],
      ["/images/proyectos/hipocampo/g7.jpg", "Entramado de madera de la envolvente", 789, 1400],
      ["/images/proyectos/hipocampo/g8.jpg", "La vista hacia el valle", 789, 1400],
    ]),
    createdAt: isoDate(2025, 10, 1),
    updatedAt: isoDate(2025, 10, 1),
  },
  {
    id: 8,
    documentId: "demo-ojo-de-perdiz",
    titulo: "Ojo de Perdíz",
    slug: "ojo-de-perdiz",
    ubicacion: "B° Capilla Vieja, Los Reartes, Valle de Calamuchita",
    superficie_m2: 132,
    año: 2016,
    estado: "terminado",
    descripcion_corta:
      "Refugio familiar sobre las Sierras Grandes, con el cerro Champaquí como postal hacia el oeste. Quincha, cubiertas colectoras de agua de lluvia y autonomía hídrica. Colaboración con el Arq. Máximo Garrone.",
    descripcion: [
      {
        type: "paragraph",
        children: [
          {
            text: "Asentada sobre las sierras grandes de Córdoba, cercana al río Los Reartes, esta vivienda se concibió como un lugar de descanso familiar: el punto de conexión con las sierras, donde el cerro Champaquí protagoniza la postal panorámica hacia el oeste.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "El entorno impone condiciones bioclimáticas exigentes: amplitudes térmicas de hasta 25 °C en pocas horas, inviernos bajo cero y veranos calurosos. La respuesta: tierra en los muros para amortiguar la temperatura, separación de las cubiertas para meter sol al espacio principal, y una geometría que desarma los patrones ortogonales para amalgamarse con los perfiles montañosos.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "El barrio carece de red de agua, por lo cual las cubiertas de techo se plantearon como superficies colectoras de agua pluvial — las precipitaciones anuales rondan los 800 mm. El agua se almacena en una cisterna subterránea que provee al tanque de reserva, acompañado de un colector solar para el agua caliente sanitaria. Las aguas residuales, diferenciadas en grises y negras, se tratan con filtros de áridos y fitodepuración.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "El sistema estructural es un esqueleto de postes de eucalipto — columnas, vigas de encadenado y cabios — flexible y dúctil según la normativa de sismo-resistencia (zona 1), completado con entramados de madera en dos direcciones que arman los muros de quincha.",
          },
        ],
      },
    ],
    destacado: false,
    color_acento: "#c4a050",
    imagen_principal: localImage(
      1008,
      "/images/proyectos/ojo-de-perdiz/main.jpg",
      "Ojo de Perdíz — la vivienda sobre el pastizal serrano de Los Reartes",
      1080,
      716
    ),
    galeria: gallery(10080, [
      ["/images/proyectos/ojo-de-perdiz/g1.jpg", "La galería con hamacas al atardecer", 1400, 933],
      ["/images/proyectos/ojo-de-perdiz/g2.jpg", "El volumen bajo, amalgamado al perfil de las sierras", 1400, 786],
      ["/images/proyectos/ojo-de-perdiz/g3.jpg", "Lectura al sol frente a la casa", 1400, 933],
      ["/images/proyectos/ojo-de-perdiz/g4.jpg", "El estar con ventanales altos hacia el Champaquí", 1400, 933],
      ["/images/proyectos/ojo-de-perdiz/g5.jpg", "Estar con asientos de obra y textiles", 1400, 933],
      ["/images/proyectos/ojo-de-perdiz/g6.jpg", "Dormitorio con vista a las sierras", 1400, 933],
      ["/images/proyectos/ojo-de-perdiz/g7.jpg", "Baño con bacha sobre madera", 900, 1350],
      ["/images/proyectos/ojo-de-perdiz/g8.jpg", "La cubierta invertida, colectora de agua de lluvia", 1400, 786],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Colaboración", valor: "Arq. Máximo Garrone" },
      { id: 2, etiqueta: "Sistema constructivo", valor: "Quincha — esqueleto de eucalipto (zona sísmica 1)" },
      { id: 3, etiqueta: "Cubierta", valor: "Invertida, colectora de agua de lluvia" },
      { id: 4, etiqueta: "Agua", valor: "Cisterna subterránea + colector solar" },
      { id: 5, etiqueta: "Superficie total", valor: "159 m²" },
      { id: 6, etiqueta: "Superficie cubierta", valor: "132 m²" },
      { id: 7, etiqueta: "Obra", valor: "Agosto 2015 – septiembre 2016" },
    ],
    createdAt: isoDate(2016, 9, 1),
    updatedAt: isoDate(2016, 9, 1),
  },
  {
    id: 9,
    documentId: "demo-nina-huasi",
    titulo: "Nina Huasi",
    slug: "nina-huasi",
    ubicacion: "Villa General Belgrano, Córdoba",
    superficie_m2: 180,
    año: 2020,
    estado: "terminado",
    descripcion_corta:
      "Centro holístico octogonal de 9 m de diámetro con estructura de eucalipto y muros de quincha. Simbología comechingón integrada al diseño.",
    destacado: false,
    color_acento: "#4a6741",
    imagen_principal: localImage(
      1009,
      "/images/proyectos/nina-huasi/main.jpg",
      "Nina Huasi — techo verde y cubierta octogonal en Villa General Belgrano",
      1920,
      1082
    ),
    galeria: gallery(10090, [
      ["/images/proyectos/nina-huasi/g1.jpg", "Los volúmenes de Nina Huasi con las sierras de fondo", 1400, 789],
      ["/images/proyectos/nina-huasi/g2.jpg", "El techo verde con paneles solares", 1400, 789],
      ["/images/proyectos/nina-huasi/g3.jpg", "El acceso principal con escalones de madera", 1400, 789],
      ["/images/proyectos/nina-huasi/g4.jpg", "El salón octogonal con sus vitrales", 1400, 789],
      ["/images/proyectos/nina-huasi/g5.jpg", "La estructura octogonal de eucalipto desde adentro", 1400, 1050],
      ["/images/proyectos/nina-huasi/g6.jpg", "La cúpula octogonal con lucernario central", 1400, 789],
      ["/images/proyectos/nina-huasi/g7.jpg", "Mural de cobre sobre el muro de barro", 1400, 789],
      ["/images/proyectos/nina-huasi/g8.jpg", "Chakana de botellas de vidrio en el muro", 1400, 1050],
      ["/images/proyectos/nina-huasi/g9.jpg", "Baño con revoques pigmentados", 1400, 789],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Estructura", valor: "Eucalipto rollizo (esqueleto octogonal)" },
      { id: 2, etiqueta: "Muros", valor: "Quincha con arcilla y caña" },
      { id: 3, etiqueta: "Cubierta", valor: "Madera + aislación natural" },
      { id: 4, etiqueta: "Superficie cubierta", valor: "180 m²" },
      { id: 5, etiqueta: "Superficie total", valor: "350 m²" },
    ],
    createdAt: isoDate(2020, 6, 1),
    updatedAt: isoDate(2020, 6, 1),
  },
  {
    id: 10,
    documentId: "demo-casa-cupulas",
    titulo: "Casa de Cúpulas",
    slug: "casa-de-cupulas",
    ubicacion: "Inti Yaco, Valle de Calamuchita, Córdoba",
    superficie_m2: 95,
    año: 2014,
    estado: "terminado",
    descripcion_corta:
      "Construcción de cúpulas con tierra estabilizada al 10 % de cemento. Volúmenes orgánicos integrados al paisaje serrano.",
    destacado: false,
    color_acento: "#6b5b3e",
    imagen_principal: localImage(1010, "/images/proyectos/cupulas.jpg", "Casa de Cúpulas — Inti Yaco"),
    ficha_tecnica: [
      { id: 1, etiqueta: "Sistema", valor: "Tierra estabilizada (10 % cemento)" },
      { id: 2, etiqueta: "Tipología", valor: "Cúpulas / bóvedas autoportantes" },
      { id: 3, etiqueta: "Publicación", valor: "ArchDaily 2014" },
    ],
    createdAt: isoDate(2014, 5, 1),
    updatedAt: isoDate(2014, 5, 1),
  },
  {
    id: 14,
    documentId: "demo-cola-de-pez",
    titulo: "Cola de Pez",
    slug: "cola-de-pez",
    estado: "terminado",
    descripcion_corta:
      "Vivienda de tierra con cubierta ondulante rematada en madera. Un cantero de barro amarillo atraviesa el interior y separa los ambientes sin cerrarlos.",
    destacado: false,
    color_acento: "#b5793a",
    imagen_principal: localImage(
      1014,
      "/images/proyectos/cola-de-pez/main.jpg",
      "Cola de Pez — la fachada curva con su cubierta ondulante",
      1920,
      1080
    ),
    galeria: gallery(10140, [
      ["/images/proyectos/cola-de-pez/g1.jpg", "La casa desde el jardín", 734, 414],
      ["/images/proyectos/cola-de-pez/g2.jpg", "El zócalo de piedra y la envolvente de barro", 734, 414],
      ["/images/proyectos/cola-de-pez/g3.jpg", "La galería con hamaca paraguaya", 734, 414],
      ["/images/proyectos/cola-de-pez/g4.jpg", "El cantero interior de barro pigmentado", 736, 552],
      ["/images/proyectos/cola-de-pez/g5.jpg", "El ventanal del estar hacia el verde", 734, 414],
      ["/images/proyectos/cola-de-pez/g6.jpg", "Interior con barra curva de barro", 734, 414],
      ["/images/proyectos/cola-de-pez/g7.jpg", "El volumen contra el cerro", 1400, 788],
      ["/images/proyectos/cola-de-pez/g8.jpg", "El acceso principal", 1400, 788],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Muros", valor: "Tierra cruda sobre zócalo de piedra" },
      { id: 2, etiqueta: "Cubierta", valor: "Ondulante, con remate de madera" },
    ],
    createdAt: isoDate(2023, 6, 1),
    updatedAt: isoDate(2023, 6, 1),
  },
  {
    id: 16,
    documentId: "demo-las-rabonas",
    titulo: "Las Rabonas",
    slug: "las-rabonas",
    ubicacion: "Las Rabonas, Traslasierra, Córdoba",
    estado: "terminado",
    descripcion_corta:
      "Refugio de quincha elevado sobre pilotes en el monte de Traslasierra, con galería-balcón hacia las Sierras Grandes.",
    destacado: false,
    color_acento: "#8b6f47",
    imagen_principal: localImage(
      1016,
      "/images/proyectos/las-rabonas/main.jpg",
      "Las Rabonas — refugio de quincha sobre pilotes en Traslasierra",
      1920,
      1079
    ),
    galeria: gallery(10160, [
      ["/images/proyectos/las-rabonas/g1.jpg", "El balcón elevado entre la vegetación", 1400, 786],
      ["/images/proyectos/las-rabonas/g2.jpg", "El acceso con puerta de madera tallada", 1400, 786],
      ["/images/proyectos/las-rabonas/g3.jpg", "El refugio en el monte, con las sierras detrás", 1400, 788],
      ["/images/proyectos/las-rabonas/g4.jpg", "La estructura de madera y caña durante la obra", 1400, 788],
      ["/images/proyectos/las-rabonas/g5.jpg", "El esqueleto de madera con su cubierta", 1400, 788],
      ["/images/proyectos/las-rabonas/g6.jpg", "La cubierta terminada vista desde el monte", 1400, 788],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Sistema", valor: "Quincha sobre esqueleto de madera" },
      { id: 2, etiqueta: "Fundación", valor: "Pilotes — la casa flota sobre el monte" },
    ],
    createdAt: isoDate(2021, 4, 1),
    updatedAt: isoDate(2021, 4, 1),
  },
  {
    id: 15,
    documentId: "demo-garza-blanca",
    titulo: "Garza Blanca",
    slug: "garza-blanca",
    estado: "en_obra",
    descripcion_corta:
      "Vivienda de tierra y madera en plena llanura: entramados de madera, muros de barro y una cubierta que quiebra el horizonte pampeano.",
    destacado: false,
    color_acento: "#7a9b6d",
    imagen_principal: localImage(
      1015,
      "/images/proyectos/garza-blanca/main.jpg",
      "Garza Blanca — la vivienda de tierra en la llanura",
      1920,
      1082
    ),
    galeria: gallery(10150, [
      ["/images/proyectos/garza-blanca/g1.jpg", "El frente con sus cubiertas quebradas", 734, 414],
      ["/images/proyectos/garza-blanca/g2.jpg", "El esqueleto y los entramados de madera", 1400, 789],
      ["/images/proyectos/garza-blanca/g3.jpg", "La estructura antes del relleno de barro", 1400, 789],
      ["/images/proyectos/garza-blanca/g4.jpg", "La cocina con mesadas de revoque pigmentado", 734, 414],
      ["/images/proyectos/garza-blanca/g5.jpg", "Baño con revoques turquesa y rosa", 736, 1305],
      ["/images/proyectos/garza-blanca/g6.jpg", "El borde de la cubierta con piedra", 734, 414],
      ["/images/proyectos/garza-blanca/g7.jpg", "Caballos frente a la obra, en la llanura", 1400, 789],
      ["/images/proyectos/garza-blanca/g8.jpg", "La casa desde el campo", 734, 414],
    ]),
    ficha_tecnica: [
      { id: 1, etiqueta: "Sistema", valor: "Entramado de madera con relleno de tierra" },
      { id: 2, etiqueta: "Terminaciones", valor: "Revoques y mesadas de barro pigmentado" },
    ],
    createdAt: isoDate(2025, 5, 1),
    updatedAt: isoDate(2025, 5, 1),
  },
  {
    id: 17,
    documentId: "demo-casa-dragon",
    titulo: "Casa Dragón",
    slug: "casa-dragon",
    ubicacion: "San Javier, Traslasierra, Córdoba",
    estado: "en_obra",
    descripcion_corta:
      "Vivienda de tierra al pie de las Sierras Grandes de Traslasierra: muros curvos con vidrios de colores incrustados y una gran cubierta de madera en voladizo.",
    destacado: false,
    color_acento: "#6b5b8e",
    imagen_principal: localImage(
      1017,
      "/images/proyectos/casa-dragon/main.jpg",
      "Casa Dragón — la vivienda de tierra al pie de las sierras de San Javier",
      1280,
      720
    ),
    galeria: gallery(10170, [
      ["/images/proyectos/casa-dragon/g1.jpg", "Los volúmenes curvos sobre el zócalo de piedra", 1280, 720],
      ["/images/proyectos/casa-dragon/g2.jpg", "La cubierta en voladizo frente a las sierras", 1400, 786],
      ["/images/proyectos/casa-dragon/g3.jpg", "Vidrios de colores incrustados en el muro", 786, 1400],
      ["/images/proyectos/casa-dragon/g4.jpg", "Ducha con revoque azul pigmentado", 720, 1280],
      ["/images/proyectos/casa-dragon/g5.jpg", "Dormitorio con respaldo de tierra a la vista", 1400, 786],
    ]),
    createdAt: isoDate(2025, 4, 1),
    updatedAt: isoDate(2025, 4, 1),
  },
  {
    id: 18,
    documentId: "demo-villa-berna",
    titulo: "Villa Berna",
    slug: "villa-berna",
    ubicacion: "Villa Berna, Valle de Calamuchita, Córdoba",
    estado: "en_obra",
    descripcion_corta:
      "Pequeño refugio-mirador de dos niveles con muros curvos de tierra y aberturas facetadas, en lo alto de las sierras de Calamuchita.",
    destacado: false,
    color_acento: "#9b7a4f",
    imagen_principal: localImage(
      1018,
      "/images/proyectos/villa-berna/main.jpg",
      "Villa Berna — refugio-mirador de tierra en las sierras",
      1920,
      1080
    ),
    galeria: gallery(10180, [
      ["/images/proyectos/villa-berna/g1.jpg", "El volumen curvo con sus aberturas facetadas", 1400, 788],
      ["/images/proyectos/villa-berna/g2.jpg", "El mirador sobre el paisaje serrano", 1400, 788],
      ["/images/proyectos/villa-berna/g3.jpg", "La torre curva vista desde el camino", 1400, 788],
      ["/images/proyectos/villa-berna/g4.jpg", "Las ventanas facetadas desde el interior", 1400, 788],
      ["/images/proyectos/villa-berna/g5.jpg", "El esqueleto de madera a contraluz", 1400, 788],
    ]),
    createdAt: isoDate(2025, 3, 1),
    updatedAt: isoDate(2025, 3, 1),
  },
  {
    id: 11,
    documentId: "demo-tortuga",
    titulo: "Tortuga — Faro del Mundo",
    slug: "tortuga-faro-del-mundo",
    estado: "en_obra",
    descripcion_corta:
      "Vivienda de quincha en construcción: esqueleto de madera, entramados en dos direcciones y muros de barro. Una obra bio-construida con una huella de carbono cerca de un 80 % menor que la convencional.",
    destacado: false,
    color_acento: "#9b7a4f",
    imagen_principal: localImage(
      1011,
      "/images/proyectos/tortuga-faro-del-mundo/main.jpg",
      "Tortuga — muros de quincha en obra",
      1200,
      675
    ),
    galeria: gallery(10110, [
      ["/images/proyectos/tortuga-faro-del-mundo/g1.jpg", "Levantando los muros de quincha", 1200, 675],
      ["/images/proyectos/tortuga-faro-del-mundo/g2.jpg", "El esqueleto de madera sobre la roca", 1400, 1050],
      ["/images/proyectos/tortuga-faro-del-mundo/g3.jpg", "Diseños en técnicas de quincha", 1400, 1400],
      ["/images/proyectos/tortuga-faro-del-mundo/g4.jpg", "Aberturas triangulares desde el interior", 1400, 788],
      ["/images/proyectos/tortuga-faro-del-mundo/g5.jpg", "La luz entra por los ventanales en obra", 1400, 788],
      ["/images/proyectos/tortuga-faro-del-mundo/g6.jpg", "El barro sobre el entramado de madera", 700, 1400],
    ]),
    createdAt: isoDate(2025, 6, 1),
    updatedAt: isoDate(2025, 6, 1),
  },
  {
    id: 12,
    documentId: "demo-baguales",
    titulo: "Baguales",
    slug: "baguales",
    estado: "en_obra",
    descripcion_corta:
      "Esqueleto de madera y cubierta en avance sobre un afloramiento rocoso, entre pinares de las sierras. La estructura ya dibuja la silueta de la futura vivienda de tierra.",
    destacado: false,
    color_acento: "#6b5b3e",
    imagen_principal: localImage(
      1012,
      "/images/proyectos/baguales/main.jpg",
      "Baguales — estructura de madera en obra",
      1920,
      1080
    ),
    galeria: gallery(10120, [
      ["/images/proyectos/baguales/g1.jpg", "La cubierta toma forma entre los pinos", 1400, 788],
      ["/images/proyectos/baguales/g2.jpg", "Esqueleto y entramados de madera", 1400, 788],
      ["/images/proyectos/baguales/g3.jpg", "La obra sobre el afloramiento rocoso", 1400, 788],
      ["/images/proyectos/baguales/g4.jpg", "El volumen contra el cielo serrano", 1400, 788],
      ["/images/proyectos/baguales/g5.jpg", "La estructura vista desde el bosque", 1400, 788],
    ]),
    createdAt: isoDate(2025, 8, 1),
    updatedAt: isoDate(2025, 8, 1),
  },
  {
    id: 13,
    documentId: "demo-crisalida",
    titulo: "Crisálida — Umepay",
    slug: "crisalida-umepay",
    ubicacion: "Umepay, Valle de Calamuchita, Córdoba",
    estado: "en_obra",
    descripcion_corta:
      "«Crisálida en formación»: la estructura de madera que anticipa una vivienda de tierra en Umepay.",
    destacado: false,
    color_acento: "#7a9b6d",
    imagen_principal: localImage(
      1013,
      "/images/proyectos/crisalida-umepay/main.jpg",
      "Crisálida — estructura de madera en obra en Umepay",
      1920,
      1080
    ),
    galeria: gallery(10130, [
      ["/images/proyectos/crisalida-umepay/g1.jpg", "La estructura entre las sierras", 1400, 788],
      ["/images/proyectos/crisalida-umepay/g2.jpg", "Entramados de madera de la crisálida", 1400, 788],
      ["/images/proyectos/crisalida-umepay/g3.jpg", "La obra vista desde el bosque", 788, 1400],
    ]),
    createdAt: isoDate(2025, 9, 1),
    updatedAt: isoDate(2025, 9, 1),
  },
];

export const fallbackCategorias: CategoriaBiblioteca[] = [
  { id: 1, documentId: "c1", nombre: "Muros y Estructura", slug: "muros", icono: "🧱", orden: 1 },
  { id: 2, documentId: "c2", nombre: "Techos y Cubiertas", slug: "techos", icono: "🌿", orden: 2 },
  { id: 3, documentId: "c3", nombre: "Agua y Saneamiento", slug: "agua", icono: "💧", orden: 3 },
  { id: 4, documentId: "c4", nombre: "Energía", slug: "energia", icono: "☀️", orden: 4 },
  { id: 5, documentId: "c5", nombre: "Pisos y Revoques", slug: "pisos", icono: "🏗️", orden: 5 },
  { id: 6, documentId: "c6", nombre: "Planificación", slug: "planificacion", icono: "📐", orden: 6 },
];

/* Helper to build the 24 demo articles compactly. */
type ArticuloSeed = [
  number,
  number, // category index in fallbackCategorias (0..5)
  Articulo["tipo"],
  string, // título
  string, // slug
  string, // extracto
  string, // tiempo_lectura
  Articulo["dificultad"],
  boolean, // tiene_planos
  boolean // destacado
];

const ARTICULO_SEEDS: ArticuloSeed[] = [
  [1, 0, "guía", "Adobe paso a paso: del barro al muro", "adobe-paso-a-paso",
    "Guía completa de fabricación de ladrillos de adobe. Proporciones de tierra, arena y fibra. Secado, curado y técnicas de aparejo.",
    "18 min", "Intermedio", true, true],
  [2, 0, "plano", "Plano tipo: vivienda de quincha mejorada", "plano-quincha-mejorada",
    "Plano descargable de una vivienda de 90 m² con estructura de quincha mejorada. Cimientos, muros, carpinterías y cubierta.",
    "12 min", "Avanzado", true, false],
  [3, 0, "artículo", "Tapial vs. Adobe vs. Cob: ¿cuál elegir?", "tapial-vs-adobe-vs-cob",
    "Análisis comparativo de las tres grandes técnicas de construcción en tierra cruda. Ventajas, desventajas, costos y contextos ideales.",
    "15 min", "Básico", false, false],
  [5, 1, "plano", "Techo verde extensivo: plano y cálculo estructural", "techo-verde-extensivo",
    "Diseño completo de cubierta vegetal con capas de impermeabilización, drenaje, sustrato y especies nativas por región climática.",
    "22 min", "Avanzado", true, true],
  [6, 1, "guía", "Techo recíproco con madera de descarte", "techo-reciproco",
    "Estructura de techo recíproco autoportante sin columna central usando maderas recuperadas. Incluye cálculo de cargas.",
    "16 min", "Avanzado", true, false],
  [7, 1, "artículo", "Cubiertas de paja y junco: tradición pampeana", "cubiertas-paja-junco",
    "Rescate de la técnica de quincho pampeano para cubiertas naturales. Preparación del material, atado, inclinación y mantenimiento.",
    "10 min", "Básico", false, false],
  [8, 2, "plano", "Planta de fitodepuración: plano completo", "fitodepuracion-plano",
    "Sistema de tratamiento de aguas grises y negras mediante humedal artificial con plantas macrófitas. Dimensionamiento para 4 a 8 personas.",
    "25 min", "Avanzado", true, false],
  [9, 2, "guía", "Biodigestor casero: del residuo al biogás", "biodigestor-casero",
    "Construcción de biodigestor tubular de bajo costo. Alimentación, mantenimiento, producción de biogás para cocina y biofertilizante líquido.",
    "20 min", "Intermedio", true, false],
  [10, 2, "guía", "Captación de agua de lluvia: diseño integral", "captacion-agua-lluvia",
    "Cálculo de superficie de captación, dimensionamiento de cisterna, sistema de filtrado y potabilización para autosuficiencia hídrica.",
    "18 min", "Intermedio", true, false],
  [11, 2, "artículo", "Baño seco compostero: mitos y realidades", "bano-seco-compostero",
    "Todo sobre sanitarios secos: diseño de la cámara, ventilación, manejo del compost y normativa aplicable en Argentina.",
    "14 min", "Básico", false, false],
  [12, 3, "guía", "Muro Trombe: calefacción solar pasiva", "muro-trombe",
    "Diseño y dimensionamiento de muro Trombe. Orientación, espesor, ventilación y vidriado según latitud.",
    "16 min", "Intermedio", true, true],
  [13, 3, "plano", "Estufa rusa de masa térmica: plano constructivo", "estufa-rusa-masa-termica",
    "Plano paso a paso de estufa de inercia. Cimiento, cámara de combustión, banco calefactor y chimenea.",
    "28 min", "Avanzado", true, false],
  [14, 3, "artículo", "Calefón solar de termosifón: autoconstrucción", "calefon-solar-termosifon",
    "Fabricación de calentador solar de agua. Colector de tubos de cobre, tanque acumulador y circuito por termosifón.",
    "22 min", "Intermedio", true, false],
  [15, 3, "artículo", "Instalación fotovoltaica off-grid", "fotovoltaica-off-grid",
    "Cálculo de demanda, dimensionamiento de paneles, baterías, regulador e inversor. Presupuesto y amortización.",
    "20 min", "Avanzado", false, false],
  [16, 4, "guía", "Piso de tierra apisonada con aceite de lino", "piso-tierra-apisonada",
    "Técnica de piso monolítico en tierra estabilizada. Preparación de la mezcla, apisonado por capas, curado y acabado.",
    "14 min", "Intermedio", false, false],
  [17, 4, "guía", "Revoque fino de tierra: texturas y acabados", "revoque-fino-tierra",
    "Revoques de terminación con arcilla, arena fina y fibra. Técnicas de alisado, estucado japonés y pigmentación.",
    "12 min", "Básico", false, false],
  [18, 5, "artículo", "Diseño bioclimático: los 10 principios clave", "diseno-bioclimatico-10-principios",
    "Orientación solar, ventilación cruzada, masa térmica, aislación, protección de vientos, iluminación natural y más.",
    "20 min", "Básico", false, false],
  [19, 5, "plano", "Casa bioclimática 70 m²: plano tipo", "casa-bioclimatica-70m",
    "Plano completo optimizado para zona centro de Argentina. Orientación norte, galería, invernadero adosado.",
    "15 min", "Avanzado", true, false],
  [20, 5, "artículo", "Presupuesto real: construir en tierra en 2026", "presupuesto-construir-en-tierra-2026",
    "Desglose de costos por m² para adobe, quincha y técnica mixta. Comparación con construcción convencional.",
    "18 min", "Básico", false, true],
  [21, 5, "guía", "Trámites y habilitaciones para construcción natural", "tramites-construccion-natural",
    "Normativa argentina para construcción en tierra. Municipios habilitantes, ensayos requeridos y resistencia sísmica.",
    "16 min", "Intermedio", false, false],
  [22, 0, "artículo", "Superadobe y Earthbag: sacos de tierra", "superadobe-earthbag",
    "Construcción con bolsas rellenas. Ideales para bóvedas, domos y muros de contención. Resistencia sísmica comprobada.",
    "14 min", "Intermedio", true, false],
  [23, 1, "guía", "Techo verde intensivo: huerta en altura", "techo-verde-intensivo",
    "Cubierta con capacidad para huerta productiva. Refuerzo estructural, riego integrado y selección de cultivos.",
    "20 min", "Avanzado", true, false],
  [24, 3, "guía", "Cocina rocket de masa: eficiencia y bajo costo", "cocina-rocket-masa",
    "Cocina cohete con banco térmico radiante. Combustión limpia con mínimo consumo de leña.",
    "15 min", "Básico", true, false],
  [25, 0, "artículo", "Quincha sismorresistente: cómo cumplimos con CIRSOC 601 en zona sísmica 4", "quincha-sismorresistente-cirsoc-601",
    "Memoria técnica de la Vivienda Tunduqueral en Uspallata (Mendoza) — verificación de la norma CIRSOC 601 para construcción en quincha en la zona sísmica más exigente de Argentina. 1.º Premio Red ProTierra 2019.",
    "22 min", "Avanzado", true, true],
];

/* Full content per slug. Strapi entries override these per article. */
const CIRSOC_ARTICLE: Record<string, NonNullable<Articulo["contenido"]>> = {
  "quincha-sismorresistente-cirsoc-601": [
    {
      type: "paragraph",
      children: [
        {
          text: "En Argentina, la palabra \"tierra cruda\" todavía suele asociarse con construcción precaria. Este artículo cuenta cómo demostramos lo contrario — diseñando, calculando y construyendo una vivienda de quincha en la zona sísmica más severa del país, dentro del marco normativo CIRSOC 601.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      children: [{ text: "El contexto: zona sísmica 4" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "El INPRES (Instituto Nacional de Prevención Sísmica) divide a Argentina en cinco zonas según la aceleración esperada del suelo. La zona 4 — la más severa — incluye Mendoza, San Juan y norte de Neuquén. Allí, la aceleración pico esperada en suelo firme supera los 0,35 g.",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Construir en tierra en zona 4 implica cumplir con el Reglamento CIRSOC 601 (\"Reglamento Argentino de Construcciones Sismorresistentes\"). El reglamento no prohíbe la tierra, pero exige verificación estructural: cálculo de masas, rigidez lateral, ductilidad y conexiones.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      children: [{ text: "Por qué la quincha funciona" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "La quincha mejorada tiene tres ventajas decisivas frente al sismo:",
        },
      ],
    },
    {
      type: "list",
      format: "unordered",
      children: [
        {
          type: "list-item",
          children: [
            {
              text: "Liviana — densidad aproximada de 220 kg/m³, frente a los 1.800 kg/m³ de la mampostería de ladrillo común. Menos masa, menos fuerza sísmica.",
            },
          ],
        },
        {
          type: "list-item",
          children: [
            {
              text: "Elástica — el esqueleto de eucalipto rollizo flexiona sin fracturarse. La energía sísmica se disipa en deformación, no en colapso.",
            },
          ],
        },
        {
          type: "list-item",
          children: [
            {
              text: "Redundante — los muros trabajan como diafragmas independientes con múltiples puntos de apoyo. La falla local no compromete el conjunto.",
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      children: [{ text: "El cálculo en Tunduqueral" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Para la Vivienda Tunduqueral (Uspallata, Mendoza — 140 m², 2019) seguimos el método estático equivalente del CIRSOC 601 §6, considerando:",
        },
      ],
    },
    {
      type: "list",
      format: "unordered",
      children: [
        { type: "list-item", children: [{ text: "Coeficiente sísmico C = Z × γd / R (zona 4, factor R ≈ 4 por ductilidad)" }] },
        { type: "list-item", children: [{ text: "Peso sísmico W = peso propio + sobrecargas reducidas" }] },
        { type: "list-item", children: [{ text: "Esfuerzo de corte basal H = C × W" }] },
        { type: "list-item", children: [{ text: "Distribución por nivel y verificación al vuelco" }] },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "El resultado: muros arriostrados en los dos sentidos cada 4 m, vínculos metálicos en los nodos, encadenado superior continuo, y una cubierta de doble curvatura que trabaja como diafragma rígido en planta.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      children: [{ text: "Detalles constructivos clave" }],
    },
    {
      type: "list",
      format: "unordered",
      children: [
        { type: "list-item", children: [{ text: "Fundación: sobrecimiento de hormigón armado de 40 cm, capa de aislación hidrófuga doble." }] },
        { type: "list-item", children: [{ text: "Estructura: eucalipto colorado rollizo (ø 12–15 cm), conexiones con pasadores de acero galvanizado." }] },
        { type: "list-item", children: [{ text: "Muros: doble bastidor de caña tacuara cada 5 cm, relleno de barro armado con fibra de paja larga." }] },
        { type: "list-item", children: [{ text: "Revoque: dos manos gruesas + una fina con arcilla, arena fina y aceite de lino para hidrofobicidad." }] },
      ],
    },
    {
      type: "heading",
      level: 2,
      children: [{ text: "Reconocimiento y aprendizajes" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "El proyecto recibió el 1.º Premio del Concurso de Construcción Sostenible con Tierra de la Red ProTierra Argentina en 2019. Pero la mejor validación es la que ocurre cada vez que tiembla en Uspallata: la familia propietaria reporta que la casa \"baila y vuelve\", sin grietas, sin fallos en los nodos, sin daños.",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "La conclusión técnica es clara: la quincha mejorada no es una alternativa romántica al hormigón armado en zona sísmica — es una alternativa rigurosamente verificable y, en muchos parámetros, superior.",
        },
      ],
    },
  ],
};

const ARTICULO_CONTENT: Record<string, NonNullable<Articulo["contenido"]>> = {
  ...CIRSOC_ARTICLE,
  ...(EXTRA_ARTICULO_CONTENT as Record<string, NonNullable<Articulo["contenido"]>>),
};

export const fallbackArticulos: Articulo[] = ARTICULO_SEEDS.map(
  ([id, catIdx, tipo, titulo, slug, extracto, tiempo, dif, planos, destacado]) => ({
    id,
    documentId: `demo-art-${id}`,
    titulo,
    slug,
    tipo,
    dificultad: dif,
    tiempo_lectura: tiempo,
    extracto,
    tiene_planos: planos,
    destacado,
    categoria: fallbackCategorias[catIdx],
    contenido: ARTICULO_CONTENT[slug],
    createdAt: isoDate(2026, 1, 1),
    updatedAt: isoDate(2026, 1, 1),
  })
);

export const fallbackTecnicas: Tecnica[] = [
  { id: 1, documentId: "t1", nombre: "Adobe", slug: "adobe", icono: "🧱" },
  { id: 2, documentId: "t2", nombre: "Quincha", slug: "quincha", icono: "🪵" },
  { id: 3, documentId: "t3", nombre: "Tapial", slug: "tapial", icono: "🏗️" },
  { id: 4, documentId: "t4", nombre: "Cob", slug: "cob", icono: "🌾" },
  { id: 5, documentId: "t5", nombre: "Fardos de paja", slug: "fardos-paja", icono: "🌾" },
  { id: 6, documentId: "t6", nombre: "Superadobe", slug: "superadobe", icono: "⚱️" },
];

export const fallbackEquipo: MiembroEquipo[] = [
  {
    id: 1,
    documentId: "demo-eq-1",
    nombre: "Christian Lico",
    slug: "christian-lico",
    rol: "Arquitecto · Co-fundador",
    foto: null,
    instagram: "",
    linkedin: "",
    email: "",
    orden: 1,
    bio: [
      {
        type: "paragraph",
        children: [
          {
            text: "Arquitecto egresado de la FADU/UBA. Más de 15 años proyectando con tierra cruda, quincha y técnicas mixtas en Argentina.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    documentId: "demo-eq-2",
    nombre: "Ignacio Serrallonga",
    slug: "ignacio-serrallonga",
    rol: "Arquitecto · Co-fundador",
    foto: null,
    instagram: "",
    linkedin: "",
    email: "",
    orden: 2,
    bio: [
      {
        type: "paragraph",
        children: [
          {
            text: "Arquitecto egresado de la FAUDI Córdoba. Especialista en diseño bioclimático y construcción con materiales locales.",
          },
        ],
      },
    ],
  },
];

export const fallbackNosotros: PaginaNosotros = {
  titulo: "Nosotros",
  subtitulo:
    "Un estudio nacido en Villa General Belgrano, Córdoba. Hace más de 15 años proyectamos con la tierra como punto de partida.",
  historia: [
    {
      type: "heading",
      level: 2,
      children: [{ text: "Cómo empezó todo" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Hombre de Barro nace en 2010 en Villa General Belgrano (Córdoba), fundado por los arquitectos Christian Lico (FADU/UBA) e Ignacio Serrallonga (FAUDI Córdoba). El nombre es una declaración: trabajar con lo que está bajo nuestros pies, con la tierra como material noble y disponible.",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Desde entonces proyectamos viviendas, refugios y espacios comunitarios usando adobe, quincha, tapial, cob, fardos de paja, madera y piedra. Combinamos técnicas ancestrales con diseño bioclimático contemporáneo, infraestructura solar y sistemas de tratamiento de agua integrados al paisaje.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      children: [{ text: "Qué hacemos" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Nuestro trabajo no es solo construir casas: es ayudar a las personas a habitar mejor el lugar donde están. Cada proyecto empieza con una caminata por el terreno, una conversación larga, una lectura del clima y la luz. Después viene el plano.",
        },
      ],
    },
  ],
  principios: [
    {
      id: 1,
      numero: "01",
      titulo: "Tierra como punto de partida",
      descripcion:
        "Cada terreno tiene su propia tierra. Esa tierra nos dice qué técnica usar — adobe, quincha, tapial — y qué formas son posibles.",
    },
    {
      id: 2,
      numero: "02",
      titulo: "Diseño bioclimático",
      descripcion:
        "Orientación solar, ventilación cruzada, inercia térmica, protección de vientos. La energía más limpia es la que no necesitás.",
    },
    {
      id: 3,
      numero: "03",
      titulo: "Materiales locales",
      descripcion:
        "El 95 % de los materiales viene de menos de 50 km del terreno. Reducimos huella de transporte y damos trabajo a la región.",
    },
    {
      id: 4,
      numero: "04",
      titulo: "Autonomía habitable",
      descripcion:
        "Energía solar, captación pluvial, fitodepuración. Las casas que diseñamos buscan depender lo menos posible de servicios externos.",
    },
  ],
  hitos: [
    { id: 1, año: "2010", titulo: "Fundación del estudio", descripcion: "Christian Lico e Ignacio Serrallonga abren el estudio en Villa General Belgrano." },
    { id: 2, año: "2014", titulo: "Casa de Cúpulas", descripcion: "Publicación en ArchDaily. Primera obra con técnica de cúpulas en tierra estabilizada." },
    { id: 3, año: "2016", titulo: "Ojo de Perdíz", descripcion: "Refugio familiar en Los Reartes con el Arq. Máximo Garrone — 132 m² de quincha con vistas al Champaquí. El mismo año se termina la Suite del Arroyo en el complejo La Anita." },
    { id: 4, año: "2018", titulo: "Aguas del Sol", descripcion: "Vivienda de 180 m² en Inti Yaco con techo verde extensivo." },
    { id: 5, año: "2019", titulo: "1.º Premio Red ProTierra", descripcion: "Por la Vivienda Tunduqueral en Uspallata, Mendoza — quincha sismo-resistente." },
    { id: 6, año: "2020", titulo: "Nina Huasi", descripcion: "Centro holístico octogonal en quincha — 180 m² cubiertos sobre 350 m² de superficie total." },
  ],
  imagen_principal: localImage(1100, "/images/equipo.jpg", "El equipo de Hombre de Barro trabajando sobre planos"),
};

import type { EntradaBlog, CategoriaBlog } from "./types";

export const fallbackCategoriasBlog: CategoriaBlog[] = [
  { id: 1, documentId: "cb1", nombre: "Noticias", slug: "noticias" },
  { id: 2, documentId: "cb2", nombre: "Talleres", slug: "talleres" },
  { id: 3, documentId: "cb3", nombre: "Eventos", slug: "eventos" },
  { id: 4, documentId: "cb4", nombre: "Opinión", slug: "opinion" },
];

export const fallbackEntradas: EntradaBlog[] = [
  {
    id: 1,
    documentId: "demo-bl-1",
    titulo: "Taller intensivo de adobe — Otoño 2026",
    slug: "taller-intensivo-adobe-otono-2026",
    extracto:
      "Tres días en el predio del estudio para fabricar adobes, levantar un muro y revocar con tierra. Cupos limitados.",
    imagen_portada: null,
    destacado: true,
    categoria_blog: fallbackCategoriasBlog[1],
    contenido: [
      {
        type: "paragraph",
        children: [
          {
            text: "Te invitamos a un taller práctico de tres días en el que vamos a fabricar adobes desde cero, levantar un muro y aplicarle un revoque de tierra terminado. Trabajamos con tierras locales, así que cada participante se lleva la experiencia directa de cómo se comportan las arcillas de Calamuchita.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ text: "Qué vas a aprender" }],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          { type: "list-item", children: [{ text: "Pruebas de tierra (cinta, frasco, caída)" }] },
          { type: "list-item", children: [{ text: "Proporciones de tierra, arena y fibra" }] },
          { type: "list-item", children: [{ text: "Molde, secado y aparejo de adobes" }] },
          { type: "list-item", children: [{ text: "Revoque grueso y revoque fino" }] },
        ],
      },
    ],
    createdAt: isoDate(2026, 4, 12),
    updatedAt: isoDate(2026, 4, 12),
  },
  {
    id: 2,
    documentId: "demo-bl-2",
    titulo: "Nina Huasi cumple 5 años",
    slug: "nina-huasi-cumple-5-anos",
    extracto:
      "El centro holístico que abrimos en 2020 sigue funcionando perfecto: cero reparaciones estructurales y un costo de mantenimiento un 70 % menor al convencional.",
    imagen_portada: null,
    destacado: true,
    categoria_blog: fallbackCategoriasBlog[0],
    contenido: [
      {
        type: "paragraph",
        children: [
          {
            text: "Hace cinco años entregábamos Nina Huasi en Villa General Belgrano: 180 m² cubiertos de quincha sobre estructura octogonal de eucalipto. Una buena ocasión para mirar cómo se comportó la obra a lo largo del tiempo.",
          },
        ],
      },
    ],
    createdAt: isoDate(2025, 12, 1),
    updatedAt: isoDate(2025, 12, 1),
  },
  {
    id: 3,
    documentId: "demo-bl-3",
    titulo: "¿Construir en tierra es más barato? Sí, pero...",
    slug: "construir-en-tierra-mas-barato",
    extracto:
      "El metro cuadrado en quincha está hoy un 27 % por debajo del convencional. Pero el ahorro real aparece en otro lado: la operación.",
    imagen_portada: null,
    destacado: false,
    categoria_blog: fallbackCategoriasBlog[3],
    contenido: [
      {
        type: "paragraph",
        children: [
          {
            text: "Cuando alguien nos pregunta por el costo, la respuesta corta es: depende. La larga merece este artículo.",
          },
        ],
      },
    ],
    createdAt: isoDate(2026, 2, 14),
    updatedAt: isoDate(2026, 2, 14),
  },
];
