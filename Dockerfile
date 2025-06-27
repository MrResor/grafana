FROM node:current-alpine
EXPOSE 3000
RUN apk update && apk add curl
COPY . ./program
WORKDIR /program
RUN npm i
RUN npm audit fix --force || true
CMD ["npm", "run", "start"]