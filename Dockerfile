FROM node:latest
RUN mkdir -p /src/review
WORKDIR /src/review
COPY . /src/review

RUN npm install
EXPOSE 3000
CMD npm start