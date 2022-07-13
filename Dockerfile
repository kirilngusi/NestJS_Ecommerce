FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

# Run the web service on container startup
CMD [ "yarn", "start" ]