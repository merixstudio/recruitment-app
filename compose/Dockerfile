FROM node:6 AS builder
RUN mkdir /code

WORKDIR /
ADD package.json yarn.lock /
RUN yarn install
ENV PATH /node_modules/.bin:$PATH
WORKDIR /code/
ADD . /code/

ARG backend_url
ENV BACKEND_URL=$backend_url
ARG crossbar_url
ENV CROSSBAR_URL=$crossbar_url

RUN yarn production

FROM nginx:latest

ADD compose/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /code/dist/ /usr/share/nginx/html
