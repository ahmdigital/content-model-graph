FROM node:12

WORKDIR /root/app

RUN npm i -g npm@latest
COPY package.json package-lock.json ./
RUN npm ci --quiet --no-optional && \
  npm cache clean --force

COPY .eslintrc .babelrc ./
COPY src ./src
