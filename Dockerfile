# Base image for build
FROM node:22.12.0@sha256:f7354aa281a8d45e44f4d28269200e1c412e9b41188599326a49506e01a89f97 AS build

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
FROM nginxinc/nginx-unprivileged:1.27.0-alpine3.19-slim@sha256:ca64db2deb22eb4a2378a390d3c6b261921173798554b8dfd01254bcabdc5871 AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular/browser /usr/share/nginx/html
