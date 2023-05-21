FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
#config
COPY ./nginx.conf /etc/nginx/nginx.conf
#sample web page
COPY . /usr/share/nginx/html