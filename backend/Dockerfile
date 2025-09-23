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
COPY tsconfig.json .
COPY backend ./backend
RUN npm run build:backend
EXPOSE 3001
CMD ["node", "build/index.js"]