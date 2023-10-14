# Base image for build
FROM node:20.8.0 AS build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Base image for production
FROM nginx:1.25.2-alpine3.18-slim AS production

# Create app directory
WORKDIR /usr/src/app

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/blog-angular.conf

# expose port
EXPOSE 4200
