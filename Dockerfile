FROM node:10.8.0

RUN mkdir /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN yarn install

CMD ["yarn", "dev"]
