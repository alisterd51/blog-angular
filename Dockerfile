# Base image for build
FROM node:22.3.0@sha256:b98ec1c96103fbe1a9e449b3854bbc0a0ed1c5936882ae0939d4c3a771265b4b AS build

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
FROM nginxinc/nginx-unprivileged:1.27.0-alpine3.19-slim@sha256:de6ddde5c469a798004f3659bd694194171c118e6c513ebbb517178751abbe78 AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular/browser /usr/share/nginx/html
