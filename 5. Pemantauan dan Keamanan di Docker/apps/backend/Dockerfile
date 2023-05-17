FROM node:14

WORKDIR /usr/src/backend

COPY package*.json ./

# add new group 'mygroup' and assign to new user 'myuser'
RUN groupadd -r mygroup && useradd -r -g mygroup myuser

RUN npm install --production
RUN apt-get update && \
    apt-get install -y net-tools postgresql-client


COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start-prod", "--", "0.0.0.0" ]

# set user for container using this image
USER myuser