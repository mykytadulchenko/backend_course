FROM node:latest

COPY . /backend_course

WORKDIR /backend_course

RUN npm install yarn
RUN yarn install

EXPOSE 3001

CMD ["yarn", "dev"]