FROM node:10.15.2-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./server.js ./server.js
EXPOSE 3000
CMD npm start