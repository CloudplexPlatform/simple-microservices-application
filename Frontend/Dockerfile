#!/bin/sh
FROM node:10.15.3

RUN npm install 

WORKDIR /app

# Installing dependencies
COPY package.json yarn.lock /app/

RUN yarn install

# Copying source files
COPY . /app

ENV NODE_MAX_MEM=2048
CMD ["sh","-c","npm run build && npm run start"]
# CMD ["sh","-c","npm run dev-linx"]
EXPOSE 8000
