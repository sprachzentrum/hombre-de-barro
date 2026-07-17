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
      // Database credentials and Strapi secrets are loaded from cms/.env.
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 1337,
      },
    },
    {
      name: 'hdb-frontend',
      cwd: '/var/www/hombredebarro/frontend',
      script: 'npm',
      args: 'start',
      max_memory_restart: '500M',
      // Strapi URLs and tokens are loaded from frontend/.env.production.
      // NEXT_PUBLIC_* values must be present before `npm run build`.
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '127.0.0.1',
      },
    },
  ],
};
