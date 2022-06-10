FROM node:lts-alpine
WORKDIR /api
EXPOSE 8800
COPY package*.json .
RUN npm  install
#add app
COPY . .


CMD ["npm","start"]