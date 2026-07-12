FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json ./package.json
COPY backend/package.json ./backend/package.json
COPY backend ./backend

RUN npm install --omit=dev --prefix backend

FROM node:22-alpine AS production
WORKDIR /app/backend
ENV NODE_ENV=production

COPY --from=deps /app/package.json /app/package.json
COPY --from=deps /app/backend /app/backend
COPY --from=deps /app/backend/node_modules /app/backend/node_modules

EXPOSE 3000
CMD ["node", "src/server.js"]
