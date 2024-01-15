FROM node:20

WORKDIR /root/app

COPY package.json package-lock.json ./
RUN npm ci --quiet --no-optional && \
  npm cache clean --force

COPY .eslintrc .babelrc ./
COPY src ./src
