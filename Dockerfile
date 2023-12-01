# Base image for build
FROM node:21.2.0@sha256:84bb4077fd52933a935e7057ba9991e7cb18487b0ba444835dd44975aa94b7b2 AS build

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
FROM nginx:1.25.3-alpine3.18-slim@sha256:6af140b2ad5a495d3d9e1293a0b4dc74f2a14f6425f9e3faafe0c87b12097d7c AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/blog-angular.conf

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular /usr/share/nginx/html
