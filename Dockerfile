FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install
