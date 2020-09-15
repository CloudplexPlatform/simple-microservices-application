FROM node:10.15.3
WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm install
CMD ["sh","-c","npm run start"]
EXPOSE 3000
