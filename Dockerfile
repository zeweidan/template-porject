FROM  docker.jidudev.com/infra/alpine-nginx
RUN mkdir -p /opt/www
COPY dist /opt/www/jidu-<%= projectName %>-wap
COPY nginx/default.conf /etc/nginx/http.d/
