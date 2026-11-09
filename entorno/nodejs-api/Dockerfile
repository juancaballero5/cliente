FROM node:22-alpine

RUN npm install -g nodemon

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000
CMD ["nodemon", "server.js"]
