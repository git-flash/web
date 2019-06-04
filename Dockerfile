FROM mhart/alpine-node:11.1.0

RUN mkdir /web-app

WORKDIR /web-app

RUN apk update && apk upgrade && apk add --no-cache bash git

ENV PATH /web-app/node_modules/.bin:$PATH

COPY package.json /web-app/package.json

RUN yarn global add nodemon ts-node typescript

RUN yarn install

CMD ["yarn", "dev"]
