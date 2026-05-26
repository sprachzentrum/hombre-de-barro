# Hombre de Barro — Sitio web

Sitio web del estudio de bioarquitectura **Hombre de Barro** (Villa General Belgrano, Córdoba). Arquitectura: **Strapi 5** (CMS headless) + **Next.js 15** (frontend SSG/ISR).

## Estructura

```
hdb/
├── cms/             → Strapi 5 (SQLite en dev, PostgreSQL en prod) — admin en /admin
├── frontend/        → Next.js 15, App Router, TypeScript
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

Primera vez: crear usuario admin desde el navegador. Después, ir a *Settings → API Tokens* y generar un token de tipo *Full access* — copiarlo a `frontend/.env.local`.

**2. Frontend (Next.js)**
```bash
cd frontend
npm install
cp .env.example .env.local   # añadir STRAPI_API_TOKEN
npm run dev          # http://localhost:3000
```

## Stack

- **CMS:** Strapi 5, SQLite (dev) / PostgreSQL (prod), i18n español
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, CSS Modules
- **Charts:** Recharts (comparador)
- **Fonts:** DM Sans + Playfair Display (next/font local)
- **Deploy:** VPS Ubuntu + Nginx + PM2 + Let's Encrypt

## Roadmap

- **Fase 1** (actual): Skeleton, CMS, homepage, design system
- **Fase 2:** Páginas restantes (proyectos, biblioteca, comparador, nosotros, blog, contacto), contenido demo
- **Fase 3:** Deploy (Nginx, PM2, SSL, backups), guía PDF en español
- **Futuro:** **Biocorralón** — tienda de materiales (extensión del CMS con tipo `producto`)
