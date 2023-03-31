FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN yarn

COPY ./ ./

EXPOSE 3002

CMD ["yarn", "start"]