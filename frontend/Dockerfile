FROM node:10.15.3

WORKDIR /app

# Installing dependencies
COPY package.json /app/

# Copying source files
COPY . /app

RUN npm install 

EXPOSE 8000

ENV NODE_MAX_MEM=2048

RUN npm run build

CMD ["sh","-c","npm run start"]
