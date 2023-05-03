FROM node:14

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
