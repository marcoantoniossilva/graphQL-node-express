FROM node:stretch

EXPOSE 4000

WORKDIR /home/node/app

ENV APP=server.js

COPY ${APP} /home/node/app

RUN npm install express express-graphql graphql --save

ENTRYPOINT [ "node","server.js" ]