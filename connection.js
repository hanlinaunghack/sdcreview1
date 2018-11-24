const ExpressCassandra = require("express-cassandra");
const CASSANDRA_CONTACT_POINTS = require("config.js");
const _ = require("lodash");

if (_.isEmpty(CASSANDRA_CONTACT_POINTS)) {
  console.error("CASSANDRA_CONTACT_POINTS environment variable not set");
  process.exit(1);
}

var models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: CASSANDRA_CONTACT_POINTS,
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
