FROM balenalib/raspberry-pi-debian:latest
WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y nodejs

COPY package*.json ./
RUN npm config list
RUN npm install --include=dev

COPY . .
RUN npm run build

ENV NODE_ENV=production

# RUN ulimit -c unlimited
ENTRYPOINT ["node", "build"]