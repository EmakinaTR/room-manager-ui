FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run build
EXPOSE 3000