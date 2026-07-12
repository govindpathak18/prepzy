FROM node:22-alpine AS build
WORKDIR /app

COPY package.json ./package.json
COPY frontend/package.json ./frontend/package.json
COPY frontend ./frontend

RUN npm install --prefix frontend && npm run build --prefix frontend

FROM nginx:1.27-alpine AS production
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
