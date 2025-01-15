
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g http-server

EXPOSE 4002

CMD ["http-server", "build", "-p", "4002"]
