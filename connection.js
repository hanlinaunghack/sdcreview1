var ExpressCassandra = require("express-cassandra");
var models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ["localhost"],
    protocolOptions: { port: 9042 }, //9042 9160
    keyspace: "airbnb",
    queryOptions: { consistency: ExpressCassandra.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: "SimpleStrategy",
      replication_factor: 1
    },
    migration: "drop",
    createKeyspace: true,
    createTable: true,
    udts: {
      review: {
        author: "text",
        image: "text",
        date: "text",
        body: "text",
        flagged: "text"
      },
      ratings: {
        name: "text",
        accuracy: "int",
        communication: "int",
        cleanliness: "int",
        location: "int",
        check_in: "int",
        value: "int",
        reviews: "set<frozen<review>>"
      }
    }
  }
});

var Ratings = models.loadSchema("Ratings", {
  fields: {
    id: "int",
    ratings: {
      type: "frozen",
      typeDef: "<ratings>"
    }
  },
  key: ["id"]
});

Ratings.syncDB(function(err, result) {
  if (err) throw err;
  console.log("synced!");
});

module.exports = Ratings;
