FROM node:16.20-alpine3.17
WORKDIR /mmdance-content-api
COPY . /mmdance-content-api
RUN yarn install && yarn build
EXPOSE 1337
CMD ["yarn", "start"]
