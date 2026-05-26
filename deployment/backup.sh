#!/usr/bin/env bash
# Daily backup of hombredebarro.com — database + uploads
# Install: /var/www/hombredebarro/deployment/backup.sh
# Cron:    0 3 * * * /var/www/hombredebarro/deployment/backup.sh >> /var/log/hdb-backup.log 2>&1

set -euo pipefail

DATE=$(date +%Y%m%d-%H%M)
BACKUP_DIR="/var/backups/hombredebarro"
DB_NAME="hombredebarro"
DB_USER="strapi"
UPLOADS_DIR="/var/www/hombredebarro/cms/public/uploads"
RETENTION_DAYS=30

mkdir -p "$BACKUP_DIR"

# ── PostgreSQL dump ──────────────────────────────────────────────
pg_dump --no-owner --no-privileges --clean --if-exists \
  -U "$DB_USER" "$DB_NAME" \
  | gzip > "$BACKUP_DIR/db_${DATE}.sql.gz"

# ── Uploads archive ──────────────────────────────────────────────
if [ -d "$UPLOADS_DIR" ]; then
  tar --warning=no-file-changed -czf \
    "$BACKUP_DIR/uploads_${DATE}.tar.gz" \
    -C "$(dirname "$UPLOADS_DIR")" "$(basename "$UPLOADS_DIR")"
fi

# ── Cleanup old backups ──────────────────────────────────────────
find "$BACKUP_DIR" -name "db_*.sql.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "uploads_*.tar.gz" -mtime +$RETENTION_DAYS -delete

# ── Optional: sync to remote storage ─────────────────────────────
# Uncomment one of these once configured.
#
# rclone copy "$BACKUP_DIR" b2:hdb-backups/ --include "*${DATE}*"
# aws s3 cp "$BACKUP_DIR/db_${DATE}.sql.gz" s3://hdb-backups/db/
# aws s3 cp "$BACKUP_DIR/uploads_${DATE}.tar.gz" s3://hdb-backups/uploads/

echo "[backup] $(date): completed — files in $BACKUP_DIR"
