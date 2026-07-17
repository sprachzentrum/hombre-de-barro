# Deployment — hombredebarro.com

Configs para deployar el sitio en un VPS (Ubuntu 24.04). Se reflejan en **Fase 3** del roadmap.

## Archivos

- **`nginx-hombredebarro.conf`** — reverse proxy para `/`, `/admin`, `/api`, `/uploads`
- **`ecosystem.config.js`** — PM2 con dos procesos: `hdb-cms` (Strapi) y `hdb-frontend` (Next.js)
- **`backup.sh`** — script de backup diario (pg_dump + tarball de uploads)

## Setup rápido en el VPS

```bash
# 1. Sistema (Strapi requiere Node 20–24; se usa Node 22 LTS)
sudo apt update && sudo apt install -y nginx curl ca-certificates postgresql certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version
sudo npm install -g pm2

# 2. Código + dependencias
sudo mkdir -p /var/www/hombredebarro
sudo chown $USER:$USER /var/www/hombredebarro
git clone <repo> /var/www/hombredebarro
cd /var/www/hombredebarro
cd cms && npm ci && cd ..
cd frontend && npm ci && cd ..

# 3. Base de datos
sudo -u postgres psql -c "CREATE USER strapi WITH PASSWORD 'CHANGE_ME';"
sudo -u postgres psql -c "CREATE DATABASE hombredebarro OWNER strapi;"

# 4. Configuración (antes del build de Next.js)
cp cms/.env.production.example cms/.env
cp frontend/.env.production.example frontend/.env.production
chmod 600 cms/.env frontend/.env.production
nano cms/.env
nano frontend/.env.production

# Generar secretos Strapi, por ejemplo:
# openssl rand -base64 32

# 5. Construir y arrancar Strapi
cd cms && npm run build && cd ..
pm2 start deployment/ecosystem.config.js --only hdb-cms

# 6. Nginx + SSL
sudo cp deployment/nginx-hombredebarro.conf /etc/nginx/sites-available/hombredebarro.com
sudo ln -s /etc/nginx/sites-available/hombredebarro.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d hombredebarro.com -d www.hombredebarro.com

# 7. Crear el primer admin y el token de lectura
# Abrir https://hombredebarro.com/admin y crear el superuser.
# Settings → API Tokens → New Token → "Frontend (read-only)".
# Pegar el token en STRAPI_API_TOKEN dentro de frontend/.env.production.
nano frontend/.env.production

# 8. Construir y arrancar Next.js con las variables definitivas
cd frontend && npm run build && cd ..
pm2 start deployment/ecosystem.config.js --only hdb-frontend
pm2 save
pm2 startup

# 9. Backups — pg_dump usa /root/.pgpass para el cron
chmod +x deployment/backup.sh
echo "127.0.0.1:5432:hombredebarro:strapi:CHANGE_ME" | sudo tee /root/.pgpass
sudo chmod 600 /root/.pgpass
echo "0 3 * * * root /var/www/hombredebarro/deployment/backup.sh >> /var/log/hdb-backup.log 2>&1" | sudo tee /etc/cron.d/hombredebarro-backup
```

## Webhook de revalidación (opcional)

Para que el frontend se actualice inmediatamente (sin esperar los 60 s de ISR):

1. En Strapi → Settings → Webhooks → New webhook
   - URL: `https://hombredebarro.com/api/revalidate?secret=REVALIDATE_SECRET`
   - Eventos: marcar todos los publish/update/delete
2. Guardar. El endpoint ya está implementado y rechaza secretos inválidos.

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
gunzip < /var/backups/hombredebarro/db_YYYYMMDD-HHMM.sql.gz | psql -h 127.0.0.1 -U strapi hombredebarro
tar -xzf /var/backups/hombredebarro/uploads_YYYYMMDD-HHMM.tar.gz -C /var/www/hombredebarro/cms/public/
```
