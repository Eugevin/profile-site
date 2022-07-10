FROM node:alpine

RUN npm i -g serve

WORKDIR /profile-site

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD serve -l 3000 -s dist
