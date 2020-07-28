FROM node:12.18.3

WORKDIR /var/app

COPY .eslintrc .
COPY package-lock.json .
COPY package.json .

RUN npm install

COPY src ./src
COPY .babelrc .
