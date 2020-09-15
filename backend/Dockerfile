FROM node:10.15.3

WORKDIR /app
COPY package.json /app
COPY . /app

RUN npm install
EXPOSE 3000

CMD ["sh","-c","npm run start"]
