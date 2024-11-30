# FROM balenalib/raspberrypi4-64-ubuntu:latest AS build
FROM balenalib/raspberry-pi-debian:bookworm AS build

WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y nodejs

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
# RUN npm prune --production

# -------------------------
# FROM balenalib/raspberrypi4-64-ubuntu:latest AS run
FROM balenalib/raspberry-pi-debian:bookworm AS run

WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y nodejs

ENV NODE_ENV=production

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

RUN ulimit -c unlimited
ENTRYPOINT ["node", "build"]