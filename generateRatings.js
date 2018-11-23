const faker = require("faker");
const generateReview = require("./generateReviews.js");

function generateRating() {
  const ratings = {
    name: faker.name.findName(),
    accuracy: faker.random.number({ min: 1, max: 5 }),
    communication: faker.random.number({ min: 1, max: 5 }),
    cleanliness: faker.random.number({ min: 1, max: 5 }),
    location: faker.random.number({ min: 1, max: 5 }),
    check_in: faker.random.number({ min: 1, max: 5 }),
    value: faker.random.number({ min: 1, max: 5 }),
    reviews: generateReview()
  };
  return ratings;
}

module.exports = generateRating;
