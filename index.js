const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const Ratings = require("./connection.js");

app.use(cors());
app.use(parser.json());

app.get("/api/:id/reviews/3000000", (req, res) => {
  let id = Number(req.params.id);
  Ratings.find({ id: id }, (err, docs) => {
    if (err) console.error(err);
    res.json(docs[0]);
  });
});
app.post("/api/:id/reviews/3000000", (req, res) => {
  let id = Number(req.params.id);
  if (req.body && req.body.author && req.body.body) {
    var name = req.body.author;
    var body = req.body.body;
  } else {
    var body = {
      author: "Anonymous",
      image: "https://s3.amazonaws.com/uifaces/faces/twitter/1markiz/128.jpg",
      date: "November 2018",
      body:
        "Non temporibus fugit facere. Modi rem qui. Modi aut consectetur et labore omnis. Deserunt quae iusto sunt est facere ipsum molestiae. Maiores laudantium illo. Quasi corrupti dolore quaerat aut."
    };
  }
  //expect {author, image, date, body, flagged}
  Ratings.find({ id: id }, (err, docs) => {
    if (err) console.error(err);
    let data = new Ratings(docs[0]);
    data.ratings.reviews.filter(e => e.author != name);
    data.ratings.reviews.push(body);
    data.save((err, resu) => {
      if (err) {
        throw err;
      } else {
        res.json(data);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
