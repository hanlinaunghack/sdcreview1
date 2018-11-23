const faker = require("faker");
const moment = require("moment");

function generateReview() {
  let reviews = [];
  let numofreviews = Math.ceil(Math.random() * 19);
  while (numofreviews--) {
    let obj = {
      author: faker.name.findName(),
      image: faker.image.avatar(),
      date: moment(faker.date.past(10)).format("MMMM YYYY"),
      body: faker.lorem.paragraph(),
      flagged: JSON.stringify(faker.random.boolean())
    };
    reviews.push(obj);
  }
  return reviews;
}

module.exports = generateReview;
