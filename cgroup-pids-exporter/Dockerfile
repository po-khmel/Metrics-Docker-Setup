FROM node:lts-alpine
RUN apk update && apk add bash 
ENV PORT=9101
EXPOSE 9101/tcp
COPY main.js pids.sh /cgroup-pids/
WORKDIR /cgroup-pids
ENTRYPOINT ["node", "main.js"]
