# Base image for build
FROM node:21.6.1@sha256:5951e42dd697b63a6bd9a4dfd610da952097f9db829ea659257104e7fd4fdfa6 AS build

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
FROM nginx:1.25.4-alpine3.18-slim@sha256:d6091779d65947a1a2a985ce479fe3de53e141765d22d8253310aa60ab65308e AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/blog-angular.conf

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular /usr/share/nginx/html
