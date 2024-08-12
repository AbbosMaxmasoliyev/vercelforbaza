# syntax=docker/dockerfile:1.0.0-experimental
#STAGE 1
FROM node:18-alpine as build
ARG APP_ENV=exp

WORKDIR /app

COPY package.json yarn.lock ./
COPY . .

RUN echo $APP_ENV

RUN yarn install
RUN yarn build-$APP_ENV

#STAGE 2
FROM nginx:1.18.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
