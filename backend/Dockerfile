ARG NODE_ENV=production

# Base stage for dependencies
FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development stage
FROM base as development
COPY tsconfig.json .
COPY backend ./backend
CMD ["npm", "run", "dev:backend"]

# Production stage
FROM base as production
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_URI=mongodb://root:password@mongo:27017
ENV NODE_ENV=production
ENV FRONTEND_PORT=8080
ENV BACKEND_PORT=3001
ENV MONGO_PORT=27017
ENV VITE_SEARCHES_STATS_API_URL=http://localhost:3001
ENV VITE_SWAPI_API_URL=https://www.swapi.tech/api/
COPY tsconfig.json .
COPY backend ./backend
RUN npm run build:backend
EXPOSE 3001
CMD ["node", "build/index.js"]
COPY tsconfig.json .
COPY backend ./backend
RUN npm run build:backend
EXPOSE 3001
CMD ["node", "build/index.js"]