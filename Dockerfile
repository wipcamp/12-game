FROM node:8.14-alpine
WORKDIR .
COPY . .
RUN yarn install

RUN yarn build
EXPOSE 3000
CMD ["yarn","start"]