FROM alpine:3.13.2

ENV nginx_version 1.18.0-r15

RUN apk update \
	&& apk add --no-cache nginx=${nginx_version} \
	&& adduser -D -g 'www' www \
	&& mkdir -p /run/nginx \
	&& mkdir -p /www \
	&& chown -R www:www /var/lib/nginx \
	&& chown -R www:www /run/nginx

ADD nginx.conf /etc/nginx/nginx.conf 
ADD index.html /www/index.html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]