# Base image for build
FROM node:22.3.0@sha256:a3816e038e05ea70d2640c845c285f49e416bdae2481a7ff94fde96647a10607 AS build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build --omit=dev

# Base image for production
FROM nginxinc/nginx-unprivileged:1.27.0-alpine3.19-slim@sha256:35c4c6421ff522d54a7e4d0ff4d83d6e7fa533266e38d76073599e04e251796e AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular/browser /usr/share/nginx/html
