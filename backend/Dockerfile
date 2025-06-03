FROM node:lts-alpine

WORKDIR /web

COPY package.json ./

RUN npm install

COPY . /web
EXPOSE 3001

CMD ["npm", "run", "prod"]