FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod