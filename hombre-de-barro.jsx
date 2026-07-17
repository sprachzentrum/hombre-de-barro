import { useState, useEffect, useRef, useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "servicios", label: "Servicios" },
  { id: "biblioteca", label: "Biblioteca" },
  { id: "comparador", label: "Comparador" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

const SERVICES = [
  { icon: "🏠", title: "Adobe y Tierra Cruda", desc: "Viviendas con técnicas ancestrales de adobe, quincha y tapial adaptadas al confort moderno." },
  { icon: "🌿", title: "Techos Verdes", desc: "Cubiertas vegetales que regulan temperatura, absorben lluvia y devuelven vida al paisaje." },
  { icon: "♻️", title: "Diseño Bioclimático", desc: "Orientación solar óptima, ventilación natural e inercia térmica de materiales nobles." },
  { icon: "🪵", title: "Madera y Bambú", desc: "Estructuras renovables con madera certificada y bambú tratado como alternativa al hormigón." },
  { icon: "💧", title: "Gestión del Agua", desc: "Captación pluvial, biodigestores y humedales artificiales integrados al paisaje." },
  { icon: "🔆", title: "Energías Renovables", desc: "Paneles solares, calefones y aerogeneradores como parte orgánica del diseño." },
];

const PROJECTS = [
  { title: "Casa Pachamama", loc: "Villa de las Rosas, Córdoba", type: "Adobe y quincha", desc: "120 m² con muros de adobe de 40 cm, techo verde extensivo y muro Trombe.", color: "#4a6741" },
  { title: "Refugio Yareta", loc: "Tafí del Valle, Tucumán", type: "Tapial y madera", desc: "Refugio de montaña a 2.000 m con tapial, eucalipto y cubierta vegetal autóctona.", color: "#8b6f47" },
  { title: "Centro Raíces", loc: "El Bolsón, Río Negro", type: "Técnica mixta", desc: "350 m² con fardos de paja, cob y piedra local. Estufa rusa de masa térmica.", color: "#5a7247" },
  { title: "Bodega Tierra Viva", loc: "Cafayate, Salta", type: "Adobe y piedra", desc: "Bodega semienterrada aprovechando inercia térmica para control natural de temperatura.", color: "#6b5b3e" },
];

const CATEGORIES = [
  { id: "todos", label: "Todos", icon: "📚" },
  { id: "muros", label: "Muros y Estructura", icon: "🧱" },
  { id: "techos", label: "Techos y Cubiertas", icon: "🌿" },
  { id: "agua", label: "Agua y Saneamiento", icon: "💧" },
  { id: "energia", label: "Energía", icon: "☀️" },
  { id: "pisos", label: "Pisos y Revoques", icon: "🏗️" },
  { id: "planificacion", label: "Planificación", icon: "📐" },
];

const ARTICLES = [
  { id: 1, cat: "muros", type: "guía", title: "Adobe paso a paso: del barro al muro", desc: "Guía completa de fabricación de ladrillos de adobe. Proporciones de tierra, arena y fibra. Secado, curado y técnicas de aparejo.", reading: "18 min", difficulty: "Intermedio", hasPlans: true },
  { id: 2, cat: "muros", type: "plano", title: "Plano tipo: vivienda de quincha mejorada", desc: "Plano descargable de una vivienda de 90 m² con estructura de quincha mejorada. Incluye detalles de cimientos, muros, carpinterías y cubierta.", reading: "12 min", difficulty: "Avanzado", hasPlans: true },
  { id: 3, cat: "muros", type: "artículo", title: "Tapial vs. Adobe vs. Cob: ¿cuál elegir?", desc: "Análisis comparativo de las tres grandes técnicas de construcción en tierra cruda. Ventajas, desventajas, costos y contextos ideales.", reading: "15 min", difficulty: "Básico", hasPlans: false },
  { id: 4, cat: "muros", type: "guía", title: "Construcción con fardos de paja", desc: "Sistema Nebraska y técnica de poste y viga con fardos. Tratamiento antihumedad, revoque de tierra y detalles de encuentro con cimientos.", reading: "20 min", difficulty: "Intermedio", hasPlans: true },
  { id: 5, cat: "techos", type: "plano", title: "Techo verde extensivo: plano y cálculo estructural", desc: "Diseño completo de cubierta vegetal con capas de impermeabilización, drenaje, sustrato y especies nativas por región climática.", reading: "22 min", difficulty: "Avanzado", hasPlans: true },
  { id: 6, cat: "techos", type: "guía", title: "Techo recíproco con madera de descarte", desc: "Estructura de techo recíproco autoportante sin columna central usando maderas recuperadas. Incluye cálculo de cargas.", reading: "16 min", difficulty: "Avanzado", hasPlans: true },
  { id: 7, cat: "techos", type: "artículo", title: "Cubiertas de paja y junco: tradición pampeana", desc: "Rescate de la técnica de quincho pampeano para cubiertas naturales. Preparación del material, atado, inclinación y mantenimiento.", reading: "10 min", difficulty: "Básico", hasPlans: false },
  { id: 8, cat: "agua", type: "plano", title: "Planta de fitodepuración: plano completo", desc: "Sistema de tratamiento de aguas grises y negras mediante humedal artificial con plantas macrófitas. Dimensionamiento para 4 a 8 personas.", reading: "25 min", difficulty: "Avanzado", hasPlans: true },
  { id: 9, cat: "agua", type: "guía", title: "Biodigestor casero: del residuo al biogás", desc: "Construcción de biodigestor tubular de bajo costo. Alimentación, mantenimiento, producción de biogás para cocina y biofertilizante líquido.", reading: "20 min", difficulty: "Intermedio", hasPlans: true },
  { id: 10, cat: "agua", type: "guía", title: "Captación de agua de lluvia: diseño integral", desc: "Cálculo de superficie de captación, dimensionamiento de cisterna, sistema de filtrado y potabilización para autosuficiencia hídrica.", reading: "18 min", difficulty: "Intermedio", hasPlans: true },
  { id: 11, cat: "agua", type: "artículo", title: "Baño seco compostero: mitos y realidades", desc: "Todo sobre sanitarios secos: diseño de la cámara, ventilación, manejo del compost y normativa aplicable en Argentina.", reading: "14 min", difficulty: "Básico", hasPlans: false },
  { id: 12, cat: "energia", type: "guía", title: "Muro Trombe: calefacción solar pasiva", desc: "Diseño y dimensionamiento de muro Trombe. Orientación, espesor, ventilación y vidriado según latitud.", reading: "16 min", difficulty: "Intermedio", hasPlans: true },
  { id: 13, cat: "energia", type: "plano", title: "Estufa rusa de masa térmica: plano constructivo", desc: "Plano paso a paso de estufa de inercia. Cimiento, cámara de combustión, banco calefactor y chimenea.", reading: "28 min", difficulty: "Avanzado", hasPlans: true },
  { id: 14, cat: "energia", type: "artículo", title: "Calefón solar de termosifón: autoconstrucción", desc: "Fabricación de calentador solar de agua. Colector de tubos de cobre, tanque acumulador y circuito por termosifón.", reading: "22 min", difficulty: "Intermedio", hasPlans: true },
  { id: 15, cat: "energia", type: "artículo", title: "Instalación fotovoltaica off-grid", desc: "Cálculo de demanda, dimensionamiento de paneles, baterías, regulador e inversor. Presupuesto y amortización.", reading: "20 min", difficulty: "Avanzado", hasPlans: false },
  { id: 16, cat: "pisos", type: "guía", title: "Piso de tierra apisonada con aceite de lino", desc: "Técnica de piso monolítico en tierra estabilizada. Preparación de la mezcla, apisonado por capas, curado y acabado.", reading: "14 min", difficulty: "Intermedio", hasPlans: false },
  { id: 17, cat: "pisos", type: "guía", title: "Revoque fino de tierra: texturas y acabados", desc: "Revoques de terminación con arcilla, arena fina y fibra. Técnicas de alisado, estucado japonés y pigmentación.", reading: "12 min", difficulty: "Básico", hasPlans: false },
  { id: 18, cat: "planificacion", type: "artículo", title: "Diseño bioclimático: los 10 principios clave", desc: "Orientación solar, ventilación cruzada, masa térmica, aislación, protección de vientos, iluminación natural y más.", reading: "20 min", difficulty: "Básico", hasPlans: false },
  { id: 19, cat: "planificacion", type: "plano", title: "Casa bioclimática 70 m²: plano tipo", desc: "Plano completo optimizado para zona centro de Argentina. Orientación norte, galería, invernadero adosado.", reading: "15 min", difficulty: "Avanzado", hasPlans: true },
  { id: 20, cat: "planificacion", type: "artículo", title: "Presupuesto real: construir en tierra en 2026", desc: "Desglose de costos por m² para adobe, quincha y técnica mixta. Comparación con construcción convencional.", reading: "18 min", difficulty: "Básico", hasPlans: false },
  { id: 21, cat: "planificacion", type: "guía", title: "Trámites y habilitaciones para construcción natural", desc: "Normativa argentina para construcción en tierra. Municipios habilitantes, ensayos requeridos y resistencia sísmica.", reading: "16 min", difficulty: "Intermedio", hasPlans: false },
  { id: 22, cat: "muros", type: "artículo", title: "Superadobe y Earthbag: sacos de tierra", desc: "Construcción con bolsas rellenas. Ideales para bóvedas, domos y muros de contención. Resistencia sísmica comprobada.", reading: "14 min", difficulty: "Intermedio", hasPlans: true },
  { id: 23, cat: "techos", type: "guía", title: "Techo verde intensivo: huerta en altura", desc: "Cubierta con capacidad para huerta productiva. Refuerzo estructural, riego integrado y selección de cultivos.", reading: "20 min", difficulty: "Avanzado", hasPlans: true },
  { id: 24, cat: "energia", type: "guía", title: "Cocina rocket de masa: eficiencia y bajo costo", desc: "Cocina cohete con banco térmico radiante. Combustión limpia con mínimo consumo de leña.", reading: "15 min", difficulty: "Básico", hasPlans: true },
];

const TC = { "guía": "#3d6b3f", "plano": "#8b6f47", "artículo": "#5a7a8b" };
const DC = { "Básico": "#7a9b6d", "Intermedio": "#c4a050", "Avanzado": "#c47050" };

function calcCosts(m2) {
  const tC = 850, sC = 620, tE = m2 * 18, sE = m2 * 5, tW = m2 * 3.5, sW = m2 * 1.2, tM = m2 * 12, sM = m2 * 8;
  const solI = m2 * 45, watI = m2 * 15;
  const tT = m2 * tC, sT = m2 * sC + solI + watI;
  const mSav = (tE - sE) + (tW - sW), ySav = mSav * 12 + (tM - sM);
  const amort = [];
  let tA = tT, sA = sT;
  for (let y = 0; y <= 30; y++) {
    tA += y > 0 ? (tE * 12 + tW * 12 + tM) * Math.pow(1.03, y - 1) : 0;
    sA += y > 0 ? (sE * 12 + sW * 12 + sM) * Math.pow(1.01, y - 1) : 0;
    amort.push({ año: y, Convencional: Math.round(tA), Sustentable: Math.round(sA) });
  }
  const eData = [];
  for (let y = 0; y <= 25; y++) eData.push({ año: y, Convencional: Math.round(tE * 12 * Math.pow(1.04, y)), Sustentable: Math.round(sE * 12 * Math.pow(1.01, y)) });
  const beY = amort.findIndex((d, i) => i > 0 && d.Sustentable < d.Convencional);
  return {
    tT, sT, tC, sC, tE, sE, tW, sW, mSav, ySav, solI, watI, amort, eData, beY,
    co2T: Math.round(m2 * .45), co2S: Math.round(m2 * .12),
    radar: [
      { m: "Costo inicial", t: 40, s: 75 }, { m: "Efic. energética", t: 35, s: 90 },
      { m: "Confort térmico", t: 50, s: 88 }, { m: "Huella carbono", t: 25, s: 85 },
      { m: "Durabilidad", t: 70, s: 80 }, { m: "Valor reventa", t: 65, s: 72 },
      { m: "Autonomía", t: 15, s: 85 }, { m: "Salud interior", t: 40, s: 92 },
    ],
  };
}

function useInView(th = .12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: th });
    o.observe(el); return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

function Fade({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(26px)", transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`, ...style }}>{children}</div>;
}

const fmt = n => n.toLocaleString("es-AR");
const usd = n => "US$ " + fmt(n);

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("inicio");
  const [activeCat, setActiveCat] = useState("todos");
  const [searchQ, setSearchQ] = useState("");
  const [m2, setM2] = useState(100);
  const [activeChart, setActiveChart] = useState("amort");

  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      for (const s of [...NAV].reverse()) { const el = document.getElementById(s.id); if (el && el.getBoundingClientRect().top < 300) { setActiveNav(s.id); break; } }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goTo = id => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const sendContact = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      `Hola, soy ${data.get("nombre") || ""}.`,
      `Teléfono: ${data.get("telefono") || "—"}`,
      `Email: ${data.get("email") || "—"}`,
      `Interés: ${data.get("interes") || "Consulta general"}`,
      "",
      data.get("mensaje") || "",
    ].join("\n");
    window.open(
      `https://wa.me/5493546464383?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const filtered = useMemo(() => ARTICLES.filter(a => (activeCat === "todos" || a.cat === activeCat) && (!searchQ || (a.title + a.desc).toLowerCase().includes(searchQ.toLowerCase()))), [activeCat, searchQ]);
  const c = useMemo(() => calcCosts(m2), [m2]);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", color: "#2d2a24", background: "#f4f0e8", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        :root{--ti:#8b6f47;--tl:#c4a97d;--vd:#2d4a2e;--vb:#3d6b3f;--vs:#7a9b6d;--vc:#a8c49a;--cr:#f4f0e8;--cw:#efe8d8;--cb:#2d2a24;--cs:#5a5549}
        .nf{position:fixed;top:0;left:0;right:0;z-index:100;transition:all .4s}
        .nl{position:relative;font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--cr);text-decoration:none;cursor:pointer;padding:4px 0;transition:color .3s}
        .nl::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:var(--vc);transition:width .3s}.nl:hover::after,.nl.ac::after{width:100%}.nl:hover{color:var(--vc)}
        .sl{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--vb);font-weight:500;margin-bottom:14px}
        .st{font-family:'Playfair Display',serif;font-size:clamp(26px,4.5vw,46px);font-weight:400;line-height:1.2;color:var(--cb);margin-bottom:20px}
        .dv{width:48px;height:2px;background:linear-gradient(90deg,var(--vb),var(--vc));margin:0 auto 36px;border-radius:1px}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 30px;border-radius:50px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border:none;transition:all .35s;font-family:'DM Sans',sans-serif}
        .bp{background:var(--vb);color:#fff}.bp:hover{background:var(--vd);transform:translateY(-2px);box-shadow:0 8px 28px rgba(45,74,46,.25)}
        .bo{background:transparent;color:var(--cr);border:1.5px solid rgba(244,240,232,.35)}.bo:hover{background:rgba(244,240,232,.08);border-color:var(--vc);color:var(--vc)}
        .sc{background:#fff;border-radius:14px;padding:28px 24px;border:1px solid #e8e2d6;transition:transform .4s,box-shadow .4s,border-color .4s}
        .sc:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(45,74,46,.08);border-color:var(--vc)}
        .ci{width:100%;padding:12px 18px;border:1.5px solid #d9d3c7;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;background:#fff;color:var(--cb);transition:border-color .3s,box-shadow .3s;outline:none}
        .ci:focus{border-color:var(--vb);box-shadow:0 0 0 3px rgba(61,107,63,.1)}.ci::placeholder{color:#b0a898}
        .hb{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:110}
        .hb span{width:24px;height:2px;background:var(--cr);transition:all .3s;display:block;border-radius:1px}
        .mm{display:none;position:fixed;inset:0;background:rgba(26,46,26,.97);z-index:99;flex-direction:column;align-items:center;justify-content:center;gap:28px}
        .mm.op{display:flex}.mm .nl{font-size:18px;letter-spacing:3px}
        @media(max-width:768px){.dn{display:none!important}.hb{display:flex}}
        @keyframes fu{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .grain{position:absolute;inset:0;background-image:${NOISE};background-repeat:repeat;opacity:.4;pointer-events:none}
        .ctab{padding:10px 20px;border-radius:25px;font-size:13px;font-weight:500;cursor:pointer;border:1.5px solid #d9d3c7;background:#fff;color:var(--cs);transition:all .3s;font-family:'DM Sans',sans-serif}
        .ctab.act{background:var(--vb);color:#fff;border-color:var(--vb)}.ctab:hover:not(.act){border-color:var(--vs)}
        .acard{background:#fff;border-radius:16px;border:1px solid #e8e2d6;overflow:hidden;transition:all .35s;cursor:pointer}
        .acard:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.06);border-color:var(--vc)}
        .cpill{padding:8px 16px;border-radius:25px;font-size:12px;font-weight:500;letter-spacing:.5px;cursor:pointer;border:1.5px solid #d9d3c7;background:#fff;color:var(--cs);transition:all .3s;white-space:nowrap;font-family:'DM Sans',sans-serif}
        .cpill.act{background:var(--vb);color:#fff;border-color:var(--vb)}.cpill:hover:not(.act){border-color:var(--vs);background:rgba(61,107,63,.04)}
        input[type=range]{-webkit-appearance:none;width:100%;height:6px;border-radius:3px;background:linear-gradient(90deg,var(--vc),var(--vb));outline:none}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:var(--vb);border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.15);cursor:pointer}
        .fll{color:rgba(244,240,232,.55);text-decoration:none;font-size:13px;transition:color .3s;cursor:pointer}.fll:hover{color:var(--vc)}
      `}</style>

      {/* NAV */}
      <nav className="nf" style={{ background: scrollY > 80 ? "rgba(26,46,26,.92)" : "transparent", backdropFilter: scrollY > 80 ? "blur(14px)" : "none", boxShadow: scrollY > 80 ? "0 2px 20px rgba(0,0,0,.12)" : "none", padding: scrollY > 80 ? "12px 0" : "22px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => goTo("inicio")}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,var(--ti),var(--tl))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🏺</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: "var(--cr)", lineHeight: 1.1 }}>Hombre de Barro</div>
              <div style={{ fontSize: 8, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--vc)", fontWeight: 500 }}>Arquitectura Sustentable</div>
            </div>
          </div>
          <div className="dn" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {NAV.map(s => <span key={s.id} className={`nl ${activeNav === s.id ? "ac" : ""}`} onClick={() => goTo(s.id)}>{s.label}</span>)}
          </div>
          <button className="hb" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>
      <div className={`mm ${menuOpen ? "op" : ""}`}>{NAV.map(s => <span key={s.id} className="nl" onClick={() => goTo(s.id)}>{s.label}</span>)}</div>

      {/* HERO */}
      <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(165deg,#1a2e1a,#2d4a2e 35%,#3d5a35 60%,#4a6741)", overflow: "hidden" }}>
        <div className="grain" style={{ opacity: .35 }} />
        <div style={{ position: "absolute", width: 500, height: 500, top: "-10%", right: "-8%", borderRadius: "50%", background: "radial-gradient(circle,#4a6741,transparent)", filter: "blur(80px)", opacity: .15 }} />
        <div style={{ position: "absolute", width: 350, height: 350, bottom: "5%", left: "-5%", borderRadius: "50%", background: "radial-gradient(circle,#8b6f47,transparent)", filter: "blur(80px)", opacity: .15, animation: "fl 8s ease-in-out infinite" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px", maxWidth: 860 }}>
          <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "var(--vc)", fontWeight: 500, marginBottom: 24, opacity: 0, animation: "fu .9s ease .2s forwards" }}>Estudio de Arquitectura Sustentable</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px,8vw,84px)", fontWeight: 400, color: "var(--cr)", lineHeight: 1.05, marginBottom: 8, opacity: 0, animation: "fu .9s ease .4s forwards" }}>
            Hombre<br /><span style={{ fontStyle: "italic", color: "var(--tl)" }}>de Barro</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,2.2vw,19px)", color: "rgba(244,240,232,.65)", maxWidth: 540, margin: "20px auto 36px", lineHeight: 1.7, fontWeight: 300, opacity: 0, animation: "fu .9s ease .6s forwards" }}>
            Hogares que respiran con la tierra. Adobe, quincha y materiales nobles — tradición ancestral y diseño contemporáneo.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", opacity: 0, animation: "fu .9s ease .8s forwards" }}>
            <button className="btn bp" onClick={() => goTo("comparador")}>Comparador Interactivo →</button>
            <button className="btn bo" onClick={() => goTo("biblioteca")}>Biblioteca Técnica</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <Fade>
        <div style={{ background: "#fff", padding: "44px 28px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "40px 56px", borderBottom: "1px solid #e8e2d6" }}>
          {[{ n: "15+", l: "Años" }, { n: "80", l: "Proyectos" }, { n: "95%", l: "Mat. locales" }, { n: "24", l: "Guías y planos" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, fontWeight: 700, color: "var(--vb)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 11, color: "var(--cs)", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Fade>

      {/* NOSOTROS */}
      <section id="nosotros" style={{ padding: "90px 28px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 56, alignItems: "center" }}>
          <Fade>
            <div>
              <div className="sl">Quiénes Somos</div>
              <h2 className="st">La tierra nos enseñó <em style={{ color: "var(--vb)" }}>a construir distinto</em></h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--cs)", marginBottom: 18 }}>Somos arquitectos y constructores que creen en una arquitectura nacida del suelo. Hace más de 15 años diseñamos con adobe, quincha, fardos de paja, piedra y madera.</p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--cs)", marginBottom: 24 }}>Cada proyecto es un diálogo entre tradición ancestral y diseño bioclimático contemporáneo. No imponemos formas; las descubrimos junto al terreno, el clima y las personas.</p>
              <button className="btn bp" onClick={() => goTo("biblioteca")}>Explorar Biblioteca →</button>
            </div>
          </Fade>
          <Fade delay={.15}>
            <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", background: "linear-gradient(135deg,#c4a97d,#8b6f47 50%,#5a7247)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div className="grain" style={{ opacity: .25, borderRadius: 20 }} />
              <div style={{ textAlign: "center", color: "#fff", padding: 36, position: "relative", zIndex: 2 }}>
                <div style={{ fontSize: 72, marginBottom: 14 }}>🏺</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontStyle: "italic", opacity: .9 }}>"La casa más bella es la que crece del suelo como un árbol"</div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" style={{ background: "var(--cw)", padding: "90px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <Fade><div className="sl">Servicios</div><h2 className="st">Lo que hacemos</h2><div className="dv" /></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <Fade key={i} delay={i * .07}>
                <div className="sc" style={{ textAlign: "left", height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 400, marginBottom: 10, color: "var(--vd)" }}>{s.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--cs)" }}>{s.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BIBLIOTECA ═══════════ */}
      <section id="biblioteca" style={{ padding: "90px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center" }}>
            <div className="sl">Biblioteca Técnica</div>
            <h2 className="st">Guías, planos y artículos de <em style={{ color: "var(--vb)" }}>construcción natural</em></h2>
            <div className="dv" />
            <p style={{ maxWidth: 620, margin: "-16px auto 36px", fontSize: 15, color: "var(--cs)", lineHeight: 1.7 }}>
              Conocimiento abierto para quien quiera construir con la tierra. Planos descargables, guías paso a paso y fundamentos del diseño sustentable.
            </p>
          </div>
        </Fade>

        <Fade delay={.1}>
          <div style={{ marginBottom: 28 }}>
            <input className="ci" placeholder="🔍  Buscar artículos, planos, guías..." value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ maxWidth: 480, marginBottom: 16, display: "block" }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => <button key={cat.id} className={`cpill ${activeCat === cat.id ? "act" : ""}`} onClick={() => setActiveCat(cat.id)}>{cat.icon} {cat.label}</button>)}
            </div>
          </div>
        </Fade>

        <div style={{ fontSize: 13, color: "var(--cs)", marginBottom: 18 }}>{filtered.length} recurso{filtered.length !== 1 ? "s" : ""}</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
          {filtered.map((a, i) => (
            <Fade key={a.id} delay={Math.min(i * .05, .35)}>
              <div className="acard">
                <div style={{ height: 4, background: TC[a.type] }} />
                <div style={{ padding: "20px 20px 16px" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: .5, textTransform: "uppercase", color: TC[a.type], background: `${TC[a.type]}12`, padding: "3px 10px", borderRadius: 20 }}>{a.type}</span>
                    <span style={{ fontSize: 10, fontWeight: 500, color: "#888", background: "#f5f3ee", padding: "3px 10px", borderRadius: 20 }}>⏱ {a.reading}</span>
                    {a.hasPlans && <span style={{ fontSize: 10, fontWeight: 500, color: "var(--ti)", background: "rgba(139,111,71,.08)", padding: "3px 10px", borderRadius: 20 }}>📐 Planos</span>}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 400, marginBottom: 8, color: "var(--cb)", lineHeight: 1.3 }}>{a.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--cs)", marginBottom: 12 }}>{a.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: DC[a.difficulty], background: `${DC[a.difficulty]}20`, padding: "3px 12px", borderRadius: 20 }}>{a.difficulty}</span>
                    <span style={{ fontSize: 12, color: "var(--vb)", fontWeight: 600 }}>Leer más →</span>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "56px 20px", color: "var(--cs)" }}><div style={{ fontSize: 44, marginBottom: 10 }}>🔍</div>No se encontraron recursos</div>}
      </section>

      {/* ═══════════ COMPARADOR ═══════════ */}
      <section id="comparador" style={{ background: "linear-gradient(170deg,#1a2e1a,#2d4a2e 60%,#3d5a35)", padding: "90px 28px", color: "var(--cr)", position: "relative", overflow: "hidden" }}>
        <div className="grain" style={{ opacity: .25 }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Fade>
            <div style={{ textAlign: "center" }}>
              <div className="sl" style={{ color: "var(--vc)" }}>Comparador Interactivo</div>
              <h2 className="st" style={{ color: "var(--cr)" }}>Convencional vs. Sustentable: <em style={{ color: "var(--tl)" }}>los números</em></h2>
              <div className="dv" style={{ background: "linear-gradient(90deg,var(--tl),var(--vc))" }} />
            </div>
          </Fade>

          {/* Slider */}
          <Fade delay={.1}>
            <div style={{ maxWidth: 460, margin: "0 auto 44px", textAlign: "center" }}>
              <div style={{ fontSize: 13, marginBottom: 10, color: "rgba(244,240,232,.6)" }}>Superficie de la vivienda</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, fontWeight: 700, color: "var(--tl)", lineHeight: 1 }}>{m2} m²</div>
              <input type="range" min={40} max={300} step={10} value={m2} onChange={e => setM2(+e.target.value)} style={{ marginTop: 18 }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(244,240,232,.35)", marginTop: 4 }}><span>40 m²</span><span>300 m²</span></div>
            </div>
          </Fade>

          {/* Key metrics */}
          <Fade delay={.15}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, marginBottom: 36 }}>
              {[
                { l: "Costo convencional", v: usd(c.tT), s: `${usd(c.tC)}/m²`, col: "#e8826a" },
                { l: "Costo sustentable", v: usd(c.sT), s: `incluye solar + agua`, col: "var(--vc)" },
                { l: "Ahorro mensual", v: usd(Math.round(c.mSav)), s: "energía + agua", col: "var(--tl)" },
                { l: "Punto de equilibrio", v: c.beY > 0 ? `Año ${c.beY}` : "< 1 año", s: "recupero inversión", col: "#8bc4e8" },
              ].map((m, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.06)", borderRadius: 14, padding: "20px 18px", border: "1px solid rgba(255,255,255,.07)" }}>
                  <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "rgba(244,240,232,.45)", marginBottom: 6 }}>{m.l}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: m.col, lineHeight: 1 }}>{m.v}</div>
                  <div style={{ fontSize: 11, color: "rgba(244,240,232,.35)", marginTop: 3 }}>{m.s}</div>
                </div>
              ))}
            </div>
          </Fade>

          {/* Chart tabs */}
          <Fade delay={.2}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24, justifyContent: "center" }}>
              {[
                { id: "amort", label: "📈 Costo 30 años" },
                { id: "energia", label: "⚡ Energía anual" },
                { id: "radar", label: "🎯 Comparación integral" },
                { id: "co2", label: "🌍 Huella de carbono" },
              ].map(t => <button key={t.id} className={`ctab ${activeChart === t.id ? "act" : ""}`} onClick={() => setActiveChart(t.id)}>{t.label}</button>)}
            </div>
          </Fade>

          <Fade delay={.25}>
            <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 18, padding: "24px 14px 14px", border: "1px solid rgba(255,255,255,.07)" }}>
              {activeChart === "amort" && (
                <div>
                  <div style={{ fontSize: 12, color: "rgba(244,240,232,.45)", marginBottom: 8, textAlign: "center" }}>Costo total acumulado (construcción + operación) en USD</div>
                  <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={c.amort} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e8826a" stopOpacity={.3} /><stop offset="95%" stopColor="#e8826a" stopOpacity={0} /></linearGradient>
                        <linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a8c49a" stopOpacity={.3} /><stop offset="95%" stopColor="#a8c49a" stopOpacity={0} /></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
                      <XAxis dataKey="año" stroke="rgba(244,240,232,.3)" tick={{ fontSize: 10, fill: "rgba(244,240,232,.35)" }} />
                      <YAxis stroke="rgba(244,240,232,.3)" tick={{ fontSize: 10, fill: "rgba(244,240,232,.35)" }} tickFormatter={v => `${Math.round(v / 1000)}k`} />
                      <Tooltip contentStyle={{ background: "#2d2a24", border: "none", borderRadius: 10, color: "#f4f0e8", fontSize: 12 }} formatter={v => [usd(v), ""]} />
                      <Area type="monotone" dataKey="Convencional" stroke="#e8826a" strokeWidth={2} fill="url(#gc)" />
                      <Area type="monotone" dataKey="Sustentable" stroke="#a8c49a" strokeWidth={2} fill="url(#gs)" />
                      <Legend wrapperStyle={{ fontSize: 11, color: "rgba(244,240,232,.5)" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                  {c.beY > 0 && <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, color: "var(--vc)" }}>✦ La sustentable se vuelve más económica desde el <strong>año {c.beY}</strong></div>}
                </div>
              )}

              {activeChart === "energia" && (
                <div>
                  <div style={{ fontSize: 12, color: "rgba(244,240,232,.45)", marginBottom: 8, textAlign: "center" }}>Gasto energético anual en USD (inflación 4% conv. / 1% sust.)</div>
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={c.eData} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
                      <XAxis dataKey="año" stroke="rgba(244,240,232,.3)" tick={{ fontSize: 10, fill: "rgba(244,240,232,.35)" }} />
                      <YAxis stroke="rgba(244,240,232,.3)" tick={{ fontSize: 10, fill: "rgba(244,240,232,.35)" }} tickFormatter={v => `$${v}`} />
                      <Tooltip contentStyle={{ background: "#2d2a24", border: "none", borderRadius: 10, color: "#f4f0e8", fontSize: 12 }} formatter={v => [usd(v), ""]} />
                      <Line type="monotone" dataKey="Convencional" stroke="#e8826a" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="Sustentable" stroke="#a8c49a" strokeWidth={2.5} dot={false} />
                      <Legend wrapperStyle={{ fontSize: 11, color: "rgba(244,240,232,.5)" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeChart === "radar" && (
                <div>
                  <div style={{ fontSize: 12, color: "rgba(244,240,232,.45)", marginBottom: 8, textAlign: "center" }}>Puntaje comparativo 0–100 en 8 dimensiones</div>
                  <ResponsiveContainer width="100%" height={360}>
                    <RadarChart data={c.radar} cx="50%" cy="50%" outerRadius="68%">
                      <PolarGrid stroke="rgba(255,255,255,.1)" />
                      <PolarAngleAxis dataKey="m" tick={{ fontSize: 10, fill: "rgba(244,240,232,.55)" }} />
                      <PolarRadiusAxis tick={false} axisLine={false} />
                      <Radar name="Convencional" dataKey="t" stroke="#e8826a" fill="#e8826a" fillOpacity={.12} strokeWidth={2} />
                      <Radar name="Sustentable" dataKey="s" stroke="#a8c49a" fill="#a8c49a" fillOpacity={.18} strokeWidth={2} />
                      <Legend wrapperStyle={{ fontSize: 11, color: "rgba(244,240,232,.5)" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeChart === "co2" && (
                <div style={{ padding: "16px 0" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", padding: "16px 0" }}>
                    {[{ l: "Convencional", v: c.co2T, col: "#e8826a", ic: "🏭" }, { l: "Sustentable", v: c.co2S, col: "#a8c49a", ic: "🌱" }].map((d, i) => (
                      <div key={i} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 44, marginBottom: 6 }}>{d.ic}</div>
                        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 700, color: d.col }}>{d.v}</div>
                        <div style={{ fontSize: 12, color: "rgba(244,240,232,.45)" }}>toneladas CO₂</div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: d.col, marginTop: 3 }}>{d.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: "center", marginTop: 14, padding: "14px 18px", background: "rgba(168,196,154,.08)", borderRadius: 12, maxWidth: 480, margin: "14px auto 0" }}>
                    <div style={{ fontSize: 14, color: "var(--vc)" }}>🌿 Reducción del <strong>{Math.round((1 - c.co2S / c.co2T) * 100)}%</strong> en emisiones</div>
                    <div style={{ fontSize: 11, color: "rgba(244,240,232,.35)", marginTop: 3 }}>Equivale a plantar {Math.round((c.co2T - c.co2S) * 45)} árboles nativos</div>
                  </div>
                </div>
              )}
            </div>
          </Fade>

          {/* Breakdown grid */}
          <Fade delay={.3}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 28 }}>
              <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: 22, border: "1px solid rgba(255,255,255,.07)" }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--vc)", marginBottom: 14, fontWeight: 500 }}>Desglose de costos</div>
                {[
                  { l: "Construcción convencional", v: usd(m2 * 850), b: 100, col: "#e8826a" },
                  { l: "Construcción sustentable", v: usd(m2 * 620), b: 73, col: "#a8c49a" },
                  { l: "Instalación solar", v: usd(c.solI), b: Math.round(c.solI / (m2 * 850) * 100), col: "#e8c86a" },
                  { l: "Sistema de agua", v: usd(c.watI), b: Math.round(c.watI / (m2 * 850) * 100), col: "#8bc4e8" },
                ].map((r, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                      <span style={{ color: "rgba(244,240,232,.55)" }}>{r.l}</span>
                      <span style={{ fontWeight: 600, color: r.col }}>{r.v}</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(255,255,255,.05)", borderRadius: 3 }}>
                      <div style={{ height: "100%", width: `${r.b}%`, background: r.col, borderRadius: 3, transition: "width .8s" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: 22, border: "1px solid rgba(255,255,255,.07)" }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--vc)", marginBottom: 14, fontWeight: 500 }}>Ahorro mensual</div>
                {[
                  { l: "Energía conv.", v: usd(Math.round(c.tE)), col: "#e8826a" },
                  { l: "Energía sust.", v: usd(Math.round(c.sE)), col: "#a8c49a" },
                  { l: "Agua conv.", v: usd(Math.round(c.tW)), col: "#e8826a" },
                  { l: "Agua sust.", v: usd(Math.round(c.sW)), col: "#a8c49a" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,.04)" : "none", fontSize: 12 }}>
                    <span style={{ color: "rgba(244,240,232,.55)" }}>{r.l}</span>
                    <span style={{ fontWeight: 600, color: r.col }}>{r.v}/mes</span>
                  </div>
                ))}
                <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(168,196,154,.1)", borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "rgba(244,240,232,.45)" }}>Ahorro total mensual</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "var(--vc)" }}>{usd(Math.round(c.mSav))}</div>
                  <div style={{ fontSize: 11, color: "rgba(244,240,232,.35)" }}>{usd(Math.round(c.ySav))} al año</div>
                </div>
              </div>
            </div>
          </Fade>

          <Fade delay={.35}>
            <div style={{ textAlign: "center", marginTop: 36, fontSize: 11, color: "rgba(244,240,232,.3)", maxWidth: 560, margin: "36px auto 0" }}>
              * Valores estimativos zona centro Argentina 2026. Incluyen materiales, mano de obra y honorarios. Ahorros asumen diseño bioclimático + solar off-grid + captación pluvial.
            </div>
          </Fade>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" style={{ padding: "90px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <Fade><div style={{ textAlign: "center" }}><div className="sl">Proyectos</div><h2 className="st">Obras que respiran</h2><div className="dv" /></div></Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
          {PROJECTS.map((p, i) => (
            <Fade key={i} delay={i * .1}>
              <div style={{ borderRadius: 18, position: "relative", minHeight: 290, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 26, color: "#fff", background: `linear-gradient(180deg,${p.color}55,${p.color})`, transition: "transform .4s", cursor: "pointer" }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
                <div className="grain" style={{ borderRadius: 18, opacity: .3 }} />
                <div style={{ position: "absolute", top: 14, right: 14, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", opacity: .6, background: "rgba(0,0,0,.2)", padding: "4px 10px", borderRadius: 14 }}>{p.type}</div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 400, marginBottom: 4 }}>{p.title}</h3>
                  <div style={{ fontSize: 11, opacity: .7, marginBottom: 8 }}>📍 {p.loc}</div>
                  <p style={{ fontSize: 12, lineHeight: 1.6, opacity: .85 }}>{p.desc}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Fade>
        <div style={{ background: "var(--cw)", padding: "70px 28px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 400, lineHeight: 1.3, color: "var(--cb)", marginBottom: 14 }}>
            ¿Tenés un terreno y un sueño? <em style={{ color: "var(--vb)" }}>Hablemos.</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--cs)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 28px" }}>Cada proyecto empieza con una conversación.</p>
          <button className="btn bp" onClick={() => goTo("contacto")}>Agendar Consulta Gratuita →</button>
        </div>
      </Fade>

      {/* CONTACTO */}
      <section id="contacto" style={{ padding: "90px 28px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 56 }}>
          <Fade>
            <div>
              <div className="sl">Contacto</div>
              <h2 className="st">Empecemos a <em style={{ color: "var(--vb)" }}>construir juntos</em></h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--cs)", marginBottom: 24 }}>Córdoba, Argentina. Trabajamos en todo el país. Respondemos en 48 hs hábiles.</p>
              {[{ i: "📧", l: "hola@hombredebarro.com.ar" }, { i: "📱", l: "+54 351 XXX XXXX" }, { i: "📍", l: "Córdoba, Argentina" }, { i: "📸", l: "@hombredebarro" }].map((x, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--cs)", marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--cw)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{x.i}</div>{x.l}
                </div>
              ))}
            </div>
          </Fade>
          <Fade delay={.15}>
            <div style={{ background: "#fff", borderRadius: 18, padding: 30, border: "1px solid #e8e2d6" }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, marginBottom: 18 }}>Escribinos</h3>
              <form onSubmit={sendContact} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><input className="ci" name="nombre" placeholder="Nombre" required /><input className="ci" name="telefono" placeholder="Teléfono" /></div>
                <input className="ci" name="email" type="email" placeholder="Email" required />
                <select className="ci" name="interes" defaultValue="" style={{ color: "#b0a898" }}>
                  <option value="" disabled>¿Qué te interesa?</option>
                  <option>Vivienda en tierra cruda</option><option>Techo verde</option><option>Reforma sustentable</option><option>Asesoría bioclimática</option><option>Otro</option>
                </select>
                <textarea className="ci" name="mensaje" placeholder="Contanos tu proyecto..." rows={3} style={{ resize: "vertical" }} required />
                <button type="submit" className="btn bp" style={{ width: "100%", justifyContent: "center" }}>Preparar en WhatsApp →</button>
              </form>
            </div>
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--vd)", color: "var(--cr)", padding: "50px 28px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 32, marginBottom: 36 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><span style={{ fontSize: 20 }}>🏺</span><span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700 }}>Hombre de Barro</span></div>
              <p style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(244,240,232,.45)", maxWidth: 240 }}>Arquitectura sustentable con tierra cruda, madera y materiales nobles.</p>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--vc)", marginBottom: 12, fontWeight: 500 }}>Secciones</div>
              {NAV.map(s => <div key={s.id} style={{ marginBottom: 5 }}><span className="fll" onClick={() => goTo(s.id)}>{s.label}</span></div>)}
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--vc)", marginBottom: 12, fontWeight: 500 }}>Biblioteca</div>
              {["Adobe y Quincha", "Techos Verdes", "Fitodepuración", "Biodigestores", "Energía Solar"].map((s, i) => <div key={i} style={{ marginBottom: 5 }}><span className="fll">{s}</span></div>)}
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--vc)", marginBottom: 12, fontWeight: 500 }}>Redes</div>
              {["Instagram", "Facebook", "YouTube", "LinkedIn"].map((s, i) => <div key={i} style={{ marginBottom: 5 }}><span className="fll">{s}</span></div>)}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(244,240,232,.07)", paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 11, color: "rgba(244,240,232,.25)" }}>
            <div>© 2026 Hombre de Barro</div><div>Hecho con 🌿 tierra y código</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
