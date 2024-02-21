FROM node:16

WORKDIR /var/app

COPY .eslintignore .
COPY .eslintrc .
COPY package-lock.json .
COPY package.json .
COPY package.config.ts .

RUN npm install

COPY src ./src
COPY sanity.json .
COPY jest.config.js .
COPY tsconfig.dist.json .
COPY tsconfig.json .
COPY tsconfig.settings.json .
COPY v2-incompatible.js .
