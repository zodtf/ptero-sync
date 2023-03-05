FROM node:16-alpine
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "/app/index.js"]