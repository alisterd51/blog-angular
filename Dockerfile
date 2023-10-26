# Base image for build
FROM node:21.1.0@sha256:1f937398bb207138bd26777f76d8b31b44f22d8baf6058705ad7433225c6f1aa AS build

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
FROM nginx:1.25.3-alpine3.18-slim@sha256:d45f4c998198583de669cd0ea8ab819ab344d57d6bf42b6f121d0ec097a032e8 AS production

# Copy a "dist" folder for the production build
COPY --from=build /usr/src/app/dist/blog-angular /usr/share/nginx/html
