const CASSANDRA_CONTACT_POINTS =
  process.env.CASSANDRA_CONTACT_POINTS &&
  process.env.CASSANDRA_CONTACT_POINTS.split(",");
module.exports = CASSANDRA_CONTACT_POINTS;
