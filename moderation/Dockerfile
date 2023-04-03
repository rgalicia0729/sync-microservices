FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN yarn

COPY ./ ./

EXPOSE 3003

CMD ["yarn", "start"]
