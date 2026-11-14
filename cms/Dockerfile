# Payload CMS (Next.js) — Version: 1.00
# Contesto di build: la radice del repository (serve template/assets per il seed).
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY cms/package.json cms/package-lock.json ./
RUN npm ci

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY cms/ .
ENV NODE_ENV=production
RUN PAYLOAD_SECRET=solo-per-la-build DATABASE_URL=postgres://build:build@127.0.0.1:1/build npm run build

FROM base AS run
ENV NODE_ENV=production
ENV MEDIA_DIR=/app/media
ENV SEED_TEMPLATE_DIR=/app/seed-template
COPY --from=build /app ./
COPY template/assets ./seed-template/assets
RUN mkdir -p /app/media && chown -R node:node /app/media /app/.next
USER node
EXPOSE 3000
# All'avvio Payload applica da solo le migrazioni del database (prodMigrations).
CMD ["npm", "run", "start"]
