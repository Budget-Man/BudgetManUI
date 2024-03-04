# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /usr/share/nginx/html

COPY /dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /certificate/private.key /etc/nginx/ca/private.key
COPY /certificate/certificate.crt /etc/nginx/ca/certificate.crt
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
