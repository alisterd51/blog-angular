# Base image for build
FROM node:21.7.1@sha256:b9ccc4aca32eebf124e0ca0fd573dacffba2b9236987a1d4d2625ce3c162ecc8 AS build

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
FROM nginx:1.25.4-alpine3.18-slim@sha256:cbbb87ca9417ed5cac0fe5dbbc489b18296721afd20c0b88000e3bea1cae3b4b AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/blog-angular.conf

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular /usr/share/nginx/html
