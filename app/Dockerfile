FROM balenalib/raspberrypi4-64-ubuntu:latest
WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_23.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y nodejs

COPY package*.json ./
RUN npm config list
RUN npm install --include=dev

RUN ls -l /app/node_modules | wc -l
# RUN cat /app/node_modules/.bin/vite

COPY . .
RUN npm run build

ENV NODE_ENV=production

# RUN ulimit -c unlimited
ENTRYPOINT ["node", "build"]