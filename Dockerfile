# Dockerfile inside /sabrina-bio

# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app
COPY . .  
RUN npm install
RUN npm run build

# Step 2: Set up Nginx to serve the React app
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf  

# Copy the React app from the build container to Nginx's serving location
COPY --from=build /app/build /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80
