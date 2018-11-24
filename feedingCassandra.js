const Ratings = require("./connection.js");
const rating = require("./generateRatings.js");
const feedingCassandra = require("./feedingCassandra.js");

const feedingCassandra = async total => {
  if (total) {
    var entree = new Ratings({
      id: counter,
      ratings: rating()
    });
    await entree.save((err, result) => {
      if (err) throw err;
      if (result) {
        counter++;
        feedingCassandra(total - 1);
      }
    });
  } else {
    console.log(counter);
  }
};

global.counter = 1;
var total = 5;

feedingCassandra(total);

module.exports = feedingCassandra;
