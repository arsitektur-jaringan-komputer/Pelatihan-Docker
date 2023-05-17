FROM node:14

WORKDIR /usr/src/frontend

COPY package*.json ./

# add new group 'mygroup' and assign to new user 'myuser'
RUN groupadd -r mygroup && useradd -r -g mygroup myuser

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]

# set user for container using this image
USER myuser