FROM node:alpine

WORKDIR /web

COPY package.json ./

RUN npm install

COPY . /web

COPY wait-for.sh /app/wait-for.sh
RUN chmod +x /app/wait-for.sh

EXPOSE 3001

CMD ["sh", "/app/wait-for.sh", "npm", "run", "prod"]