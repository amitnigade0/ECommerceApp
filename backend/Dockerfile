# Backend Dockerfile
FROM node:14

WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["node", "server.js"]