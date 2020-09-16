FROM node:10.15.3

WORKDIR /app
COPY package.json /app
COPY . /app

RUN npm install

RUN npm install pm2 -g

CMD pm2-runtime bin/backend

EXPOSE 3000
