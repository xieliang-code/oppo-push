FROM node:20-alpine 
WORKDIR /oppo-push
COPY package*.json /oppo-push
COPY src/ /oppo-push/src/
RUN npm install  
EXPOSE 3000 
CMD ["node", "src/app.js"] 