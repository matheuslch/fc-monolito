FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && \
    npm i typescript --save-dev && \
    npm i sequelize reflect-metadata sequelize-typescript && \
    npm i uuid @types/uuid && \
    npm i tslint --save-dev && \
    npm i sqlite3 && \
    npm i express @types/express dotenv && \
    npm i nodemon && \
    npm i supertest @types/supertest && \
    npm i -S yup && \
    npm i jstoxml && \
    npm i -D @types/jstoxml

COPY . .

CMD [ "npm", "test" ]
