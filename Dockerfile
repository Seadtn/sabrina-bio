FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Add environment variable for React production build
ENV NODE_ENV=production
# Add this to prevent potential build issues
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