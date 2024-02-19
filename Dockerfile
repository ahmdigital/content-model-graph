FROM node:16

WORKDIR /root/app

COPY package.json package-lock.json ./
RUN npm ci --quiet --no-optional && \
    npm cache clean --force

COPY .eslintrc .babelrc ./
COPY src ./src
COPY jest.config.js .
COPY package.config.ts .
COPY sanity.json .
COPY tsconfig.dist.json .
COPY tsconfig.json .
COPY tsconfig.settings.json .
COPY v2-incompatbile.js .
