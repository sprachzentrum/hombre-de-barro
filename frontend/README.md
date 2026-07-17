# Hombre de Barro — Frontend

Frontend Next.js 16 para el sitio Hombre de Barro. Consume contenido desde
Strapi y usa contenido de demostración únicamente cuando
`USE_FALLBACK_CONTENT=true`.

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir http://localhost:3000.

## Producción

Copiar `.env.production.example` a `.env.production` y completar las URLs y el
token **antes** del build:

```bash
cp .env.production.example .env.production
npm run build
npm start
```

Para una instalación bajo un subdirectorio, establecer tanto
`NEXT_PUBLIC_BASE_PATH` como `NEXT_PUBLIC_SITE_URL` según el ejemplo incluido.
