FROM node:10.15.3

RUN npm install 

WORKDIR /app

# Installing dependencies
COPY package.json /app/

# Copying source files
COPY . /app

EXPOSE 8000

ENV NODE_MAX_MEM=512

CMD ["sh","-c","npm run build && npm run start"]
