FROM node:10.8.0

RUN mkdir /web-app

WORKDIR /web-app

ENV PATH /web-app/node_modules/.bin:$PATH

COPY package.json /web-app/package.json

RUN yarn install

CMD ["yarn", "dev"]
