# Deployment — hombredebarro.com

Configs para deployar el sitio en un VPS (Ubuntu 24.04). Se reflejan en **Fase 3** del roadmap.

## Archivos

- **`nginx-hombredebarro.conf`** — reverse proxy para `/`, `/admin`, `/api`, `/uploads`
- **`ecosystem.config.js`** — PM2 con dos procesos: `hdb-cms` (Strapi) y `hdb-frontend` (Next.js)
- **`backup.sh`** — script de backup diario (pg_dump + tarball de uploads)

## Setup rápido en el VPS

```bash
# 1. Sistema
sudo apt update && sudo apt install -y nginx nodejs npm postgresql certbot python3-certbot-nginx
sudo npm install -g pm2

# 2. Código
sudo mkdir -p /var/www/hombredebarro
sudo chown $USER:$USER /var/www/hombredebarro
git clone <repo> /var/www/hombredebarro
cd /var/www/hombredebarro
cd cms && npm ci && npm run build && cd ..
cd frontend && npm ci && npm run build && cd ..

# 3. Base de datos
sudo -u postgres psql -c "CREATE DATABASE hombredebarro;"
sudo -u postgres psql -c "CREATE USER strapi WITH PASSWORD 'CHANGE_ME';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE hombredebarro TO strapi;"

# 4. Editar secretos en ecosystem.config.js (todos los CHANGE_ME)
nano deployment/ecosystem.config.js

# 5. Arrancar
pm2 start deployment/ecosystem.config.js
pm2 save
pm2 startup

# 6. Nginx + SSL
sudo cp deployment/nginx-hombredebarro.conf /etc/nginx/sites-available/hombredebarro.com
sudo ln -s /etc/nginx/sites-available/hombredebarro.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d hombredebarro.com -d www.hombredebarro.com

# 7. Backups
chmod +x deployment/backup.sh
echo "0 3 * * * /var/www/hombredebarro/deployment/backup.sh >> /var/log/hdb-backup.log 2>&1" | sudo crontab -

# 8. Primer usuario admin de Strapi
# Abrir https://hombredebarro.com/admin → crear superuser
# Después: Settings → API Tokens → New Token → "Frontend (read-only)" → copiar
# Y pegarlo en STRAPI_API_TOKEN dentro de ecosystem.config.js
pm2 restart hdb-frontend
```

## Webhook de revalidación (opcional)

Para que el frontend se actualice inmediatamente (sin esperar los 60 s de ISR):

1. En Strapi → Settings → Webhooks → New webhook
   - URL: `https://hombredebarro.com/api/revalidate?secret=REVALIDATE_SECRET`
   - Eventos: marcar todos los publish/update/delete
2. Implementar `app/api/revalidate/route.ts` en el frontend (Fase 2).

## Mantenimiento

```bash
# Logs en vivo
pm2 logs

# Reiniciar después de un deploy
cd /var/www/hombredebarro && git pull
cd cms && npm ci && npm run build && cd ..
cd frontend && npm ci && npm run build && cd ..
pm2 restart all

# Restaurar un backup
gunzip < /var/backups/hombredebarro/db_YYYYMMDD-HHMM.sql.gz | psql -U strapi hombredebarro
tar -xzf /var/backups/hombredebarro/uploads_YYYYMMDD-HHMM.tar.gz -C /var/www/hombredebarro/cms/public/
```
