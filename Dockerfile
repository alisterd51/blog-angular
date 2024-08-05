# Base image for build
FROM node:22.5.1@sha256:86915971d2ce1548842315fcce7cda0da59319a4dab6b9fc0827e762ef04683a AS build

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
FROM nginxinc/nginx-unprivileged:1.27.0-alpine3.19-slim@sha256:a45f92f2464597fc9a45c802f15b8f282f5b022971193d5038cac4fab97e8185 AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular/browser /usr/share/nginx/html
