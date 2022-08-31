FROM node:16.9.0-alpine
WORKDIR /app
COPY package.json app.js /app/
RUN npm install
RUN npm i -g nodemon
CMD ["nodemon","app.js"]
