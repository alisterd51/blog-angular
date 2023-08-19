# Base image for build
FROM node:20-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Update npm
RUN npm install -g npm 

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Base image for production
FROM nginx:alpine AS production

# Create app directory
WORKDIR /usr/src/app

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog_angular /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/blog_angular.conf

# expose port
EXPOSE 4200
