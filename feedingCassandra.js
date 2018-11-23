const Ratings = require("./connection.js");
const rating = require("./generateRatings.js");
global.counter = 1;
var total = 10;
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
feedingCassandra(total);
