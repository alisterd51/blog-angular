# Base image for build
FROM node:21.6.1@sha256:58b34ac1370a11c2c580ffa91f3236a92eaa6021ab186c361ca78d2b36a4cb24 AS build

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
FROM nginx:1.25.3-alpine3.18-slim@sha256:4b4bc9f88bd63fb3abc8fd4f5ad7f16554589ca1fca8d3a53416ff55b59b6f80 AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/blog-angular.conf

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular /usr/share/nginx/html
