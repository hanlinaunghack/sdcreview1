FROM node:latest
RUN mkdir -p /src/review
WORKDIR /src/review
COPY . /src/review

RUN npm install
EXPOSE 80
CMD npm start