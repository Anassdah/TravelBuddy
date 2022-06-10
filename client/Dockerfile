FROM node:lts-alpine
WORKDIR /client
EXPOSE 3000
COPY package*.json ./

RUN npm install
#add app
COPY . .
CMD ["npm","start"]