FROM node:alpine

WORKDIR /back-end

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3001
CMD npm start