FROM node:16.20.0-alpine3.18

WORKDIR /app

COPY . .

RUN yarn install && yarn build

EXPOSE 1337

CMD ["yarn", "start"]
