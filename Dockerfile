FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Set the public URL for the React app
ENV PUBLIC_URL=/
ENV NODE_ENV=production
ENV CI=false
RUN npm run build

FROM nginx:alpine
# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
# Copy our custom configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built files to nginx directory
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]