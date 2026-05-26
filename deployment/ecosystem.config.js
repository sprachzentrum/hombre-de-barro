/**
 * PM2 ecosystem configuration for hombredebarro.com
 *
 *   pm2 start ecosystem.config.js
 *   pm2 save
 *   pm2 startup        # to auto-start on reboot
 */
module.exports = {
  apps: [
    {
      name: 'hdb-cms',
      cwd: '/var/www/hombredebarro/cms',
      script: 'npm',
      args: 'start',
      max_memory_restart: '600M',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 1337,
        // ── PostgreSQL (recommended for prod) ─────────────────
        DATABASE_CLIENT: 'postgres',
        DATABASE_HOST: '127.0.0.1',
        DATABASE_PORT: 5432,
        DATABASE_NAME: 'hombredebarro',
        DATABASE_USERNAME: 'strapi',
        DATABASE_PASSWORD: 'CHANGE_ME',
        DATABASE_SSL: 'false',
        // ── Secrets — generate with `openssl rand -base64 16` ─
        APP_KEYS: 'CHANGE_ME,CHANGE_ME,CHANGE_ME,CHANGE_ME',
        API_TOKEN_SALT: 'CHANGE_ME',
        ADMIN_JWT_SECRET: 'CHANGE_ME',
        TRANSFER_TOKEN_SALT: 'CHANGE_ME',
        JWT_SECRET: 'CHANGE_ME',
        ENCRYPTION_KEY: 'CHANGE_ME',
      },
    },
    {
      name: 'hdb-frontend',
      cwd: '/var/www/hombredebarro/frontend',
      script: 'npm',
      args: 'start',
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '127.0.0.1',
        // Strapi reachable on loopback (same VPS)
        STRAPI_URL: 'http://127.0.0.1:1337',
        // Public URL (used for media + canonical URLs)
        NEXT_PUBLIC_STRAPI_URL: 'https://hombredebarro.com',
        NEXT_PUBLIC_SITE_URL: 'https://hombredebarro.com',
        // Generated from Strapi admin → Settings → API Tokens
        STRAPI_API_TOKEN: 'CHANGE_ME',
        REVALIDATE_SECRET: 'CHANGE_ME',
      },
    },
  ],
};
