# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g http-server
EXPOSE 4002
CMD ["http-server", "build", "-p", "4002"]
