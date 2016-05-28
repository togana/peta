FROM node:6.2.0-slim
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && npm cache clean

COPY . /usr/src/app
EXPOSE 3000
CMD ["npm", "start"]
