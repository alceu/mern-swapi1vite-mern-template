ARG NODE_ENV=production

# Base stage for dependencies
FROM node:18-alpine as base
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install

# Development stage
FROM base as development
ARG FRONTEND_PORT
ENV FRONTEND_PORT=${FRONTEND_PORT}
COPY frontend ./
EXPOSE 3000
CMD ["npm", "run", "start"]

# Build stage for production
FROM base as builder
ARG FRONTEND_PORT
ARG VITE_SWAPI_API_URL
ENV FRONTEND_PORT=${FRONTEND_PORT}
ENV VITE_SWAPI_API_URL=${VITE_SWAPI_API_URL}
COPY frontend ./
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_URI=mongodb://root:password@mongo:27017
ENV NODE_ENV=production
ENV FRONTEND_PORT=8080
ENV BACKEND_PORT=3001
ENV MONGO_PORT=27017
ENV VITE_SEARCHES_STATS_API_URL=http://localhost:3001
ENV VITE_SWAPI_API_URL=https://www.swapi.tech/api/
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]