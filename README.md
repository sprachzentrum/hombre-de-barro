# Hombre de Barro — Sitio web

Sitio web del estudio de bioarquitectura **Hombre de Barro** (Villa General Belgrano, Córdoba). Arquitectura: **Strapi 5** (CMS headless) + **Next.js 16** (frontend SSG/ISR).

## Estructura

```
hdb/
├── cms/             → Strapi 5 (SQLite en dev, PostgreSQL en prod) — admin en /admin
├── frontend/        → Next.js 16, App Router, TypeScript
├── docs/            → Guía de administración para arquitectos (ES)
├── deployment/      → Nginx, PM2, scripts de backup
└── hombre-de-barro.jsx → Prototipo de diseño de referencia
```

## Desarrollo local

**1. CMS (Strapi)**
```bash
cd cms
npm install
npm run develop      # http://localhost:1337/admin
```

Primera vez: crear usuario admin desde el navegador. Después, ir a *Settings → API Tokens* y generar un token personalizado con permisos de lectura para los tipos públicos — copiarlo a `frontend/.env.local`. No usar un token **Full access**.

**2. Frontend (Next.js)**
```bash
cd frontend
npm install
cp .env.example .env.local   # añadir STRAPI_API_TOKEN
npm run dev          # http://localhost:3000
```

## Stack

- **CMS:** Strapi 5, SQLite (dev) / PostgreSQL (prod), i18n español
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, CSS Modules
- **Charts:** Recharts (comparador)
- **Fonts:** DM Sans + Playfair Display (next/font local)
- **Deploy:** VPS Ubuntu + Nginx + PM2 + Let's Encrypt

## Roadmap

- **Implementado:** CMS, homepage, proyectos, biblioteca, comparador, nosotros, blog, contacto y deployment VPS.
- **Pendiente:** reemplazar el contenido demo, validación editorial y monitoreo de producción.
- **Futuro:** **Biocorralón** — tienda de materiales (extensión del CMS con tipo `producto`)
