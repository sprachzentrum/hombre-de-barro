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

export const fallbackConfig: ConfiguracionGlobal = {
  nombre_estudio: "Hombre de Barro",
  tagline: "Arquitectura Sustentable",
  descripcion_corta:
    "Arquitectura sustentable con tierra cruda, madera y materiales nobles. Villa General Belgrano, Córdoba.",
  telefono: "(03546) 464383",
  email: "info@hombredebarro.com",
  direccion: "Río Paraná 786, X5194 Villa Gral. Belgrano, Córdoba",
  whatsapp: "5493546464383",
  instagram_url: "https://www.instagram.com/hombredebarro786",
  facebook_url: "https://www.facebook.com/hombredbarro/",
  youtube_url: "",
  pinterest_url: "",
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
  hero_imagen: null,
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

export const fallbackProyectos: Proyecto[] = [
  {
    id: 1,
    documentId: "demo-nina-huasi",
    titulo: "Nina Huasi",
    slug: "nina-huasi",
    ubicacion: "Villa General Belgrano, Córdoba",
    superficie_m2: 180,
    año: 2020,
    estado: "terminado",
    descripcion_corta:
      "Centro holístico octogonal de 9 m de diámetro con estructura de eucalipto y muros de quincha. Simbología comechingón integrada al diseño.",
    destacado: true,
    color_acento: "#4a6741",
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
    id: 2,
    documentId: "demo-tunduqueral",
    titulo: "Vivienda Tunduqueral",
    slug: "vivienda-tunduqueral",
    ubicacion: "Uspallata, Mendoza",
    superficie_m2: 140,
    año: 2019,
    estado: "terminado",
    descripcion_corta:
      "Casa de quincha sismo-resistente en la precordillera de los Andes — zona sísmica 4, la más exigente de Argentina. Construcción verificada bajo norma CIRSOC 601. 1.º Premio Red ProTierra 2019.",
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
    ficha_tecnica: [
      { id: 1, etiqueta: "Sistema constructivo", valor: "Quincha mejorada según CIRSOC 601" },
      { id: 2, etiqueta: "Zona sísmica", valor: "Zona 4 (la más severa de Argentina)" },
      { id: 3, etiqueta: "Estructura", valor: "Esqueleto de eucalipto rollizo arriostrado" },
      { id: 4, etiqueta: "Muros", valor: "Quincha con caña tacuara y barro armado" },
      { id: 5, etiqueta: "Cubierta", valor: "Doble curvatura — madera local y tejuelas" },
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
    documentId: "demo-aguas-del-sol",
    titulo: "Aguas del Sol",
    slug: "aguas-del-sol",
    ubicacion: "Inti Yaco, Valle de Calamuchita, Córdoba",
    superficie_m2: 180,
    año: 2018,
    estado: "terminado",
    descripcion_corta:
      "Vivienda emplazada en un bosque de pinos sobre ladera. Estructura de madera, muros de quincha y techo verde con pasto Tifway.",
    destacado: true,
    color_acento: "#5a7247",
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
    id: 4,
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
    ficha_tecnica: [
      { id: 1, etiqueta: "Sistema", valor: "Tierra estabilizada (10 % cemento)" },
      { id: 2, etiqueta: "Tipología", valor: "Cúpulas / bóvedas autoportantes" },
      { id: 3, etiqueta: "Publicación", valor: "ArchDaily 2014" },
    ],
    createdAt: isoDate(2014, 5, 1),
    updatedAt: isoDate(2014, 5, 1),
  },
  {
    id: 5,
    documentId: "demo-adelia",
    titulo: "Casa en Adelia María",
    slug: "casa-adelia-maria",
    ubicacion: "Adelia María, Córdoba",
    superficie_m2: 165,
    año: 2022,
    estado: "terminado",
    descripcion_corta:
      "Residencia familiar en estancia de la pampa rural. Diseño bioclimático con materiales y mano de obra de la zona.",
    destacado: false,
    color_acento: "#7a9b6d",
    createdAt: isoDate(2022, 1, 1),
    updatedAt: isoDate(2022, 1, 1),
  },
  {
    id: 6,
    documentId: "demo-champaqui",
    titulo: "Casa Champaquí",
    slug: "casa-champaqui",
    ubicacion: "Los Reartes, Valle de Calamuchita",
    superficie_m2: 132,
    año: 2016,
    estado: "terminado",
    descripcion_corta:
      "Madera, piedra, fibras y tierra. 132 m² cubiertos + 27 m² semicubiertos. Colaboración con Estudio Garrone.",
    destacado: false,
    color_acento: "#c4a050",
    ficha_tecnica: [
      { id: 1, etiqueta: "Materiales", valor: "Madera, piedra, fibras vegetales, tierra" },
      { id: 2, etiqueta: "Superficie cubierta", valor: "132 m²" },
      { id: 3, etiqueta: "Superficie total", valor: "159 m²" },
      { id: 4, etiqueta: "Colaboración", valor: "Estudio Garrone" },
    ],
    createdAt: isoDate(2016, 8, 1),
    updatedAt: isoDate(2016, 8, 1),
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

/* Optional full content per slug — articles not listed here are shown
   with just the extracto plus a placeholder body (the architects will
   fill them from Strapi later). */
const ARTICULO_CONTENT: Record<string, NonNullable<Articulo["contenido"]>> = {
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
    { id: 3, año: "2016", titulo: "Casa Champaquí", descripcion: "Colaboración con Estudio Garrone en Los Reartes — 132 m² en madera, piedra, fibras y tierra." },
    { id: 4, año: "2018", titulo: "Aguas del Sol", descripcion: "Vivienda de 180 m² en Inti Yaco con techo verde extensivo." },
    { id: 5, año: "2019", titulo: "1.º Premio Red ProTierra", descripcion: "Por la Vivienda Tunduqueral en Uspallata, Mendoza — quincha sismo-resistente." },
    { id: 6, año: "2020", titulo: "Nina Huasi", descripcion: "Centro holístico octogonal en quincha — 180 m² cubiertos sobre 350 m² de superficie total." },
  ],
  imagen_principal: null,
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
