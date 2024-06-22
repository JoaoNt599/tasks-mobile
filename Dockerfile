# Stage 1: Compile the Angular application
FROM node:14 AS build

WORKDIR /app

# Copy necessary files
COPY . .

# Instalar dependências e compilar
RUN npm install
RUN npm run build --prod

# Stage 2: Serving the application with nginx
FROM nginx:alpine

# Copy stage 1 build
COPY --from=build /app/www /usr/share/nginx/html

# nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
