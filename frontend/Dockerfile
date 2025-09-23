# Base stage for dependencies
FROM node:18-alpine as base
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install

# Development stage
FROM base as development
COPY frontend ./
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage for production
FROM base as builder
COPY frontend ./
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]