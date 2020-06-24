FROM node:12.13-alpine

RUN mkdir -p /usr/src/tfs-auth

WORKDIR /usr/src/tfs-auth

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

EXPOSE 3001


