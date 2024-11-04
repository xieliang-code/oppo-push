FROM node:18

WORKDIR /oppo-push/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]
