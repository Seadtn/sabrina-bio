# Stage 1: Build React app
FROM node:18 AS build

WORKDIR /app
COPY ./sabrina-bio  /app
RUN npm install
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html  

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
