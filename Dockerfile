# Base image for build
FROM node:22.2.0@sha256:a8ba58f54e770a0f910ec36d25f8a4f1670e741a58c2e6358b2c30b575c84263 AS build

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
FROM nginxinc/nginx-unprivileged:1.26.0-alpine3.19-slim@sha256:9d742a6544a066f7a7f66e937a62e63974af477a58fa923dae96564c776e8180 AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular/browser /usr/share/nginx/html
