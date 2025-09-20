FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY backend/ ./backend

COPY sample-prod.env .env

RUN npm run build:backend

EXPOSE 3001

CMD ["node", "build/index.js"]
