FROM node:8.14-alpine
WORKDIR .
RUN yarn install

COPY . .

RUN yarn build
EXPOSE 3000
CMD ["yarn","start"]