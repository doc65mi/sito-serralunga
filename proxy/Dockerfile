# Proxy unico (Caddy) — Version: 1.00
# Il Caddyfile sta dentro l'immagine: così non servono file montati dal repository (Coolify).
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
HEALTHCHECK --interval=10s --timeout=5s --retries=6 --start-period=10s \
  CMD wget -q --spider http://127.0.0.1/_salute || exit 1
