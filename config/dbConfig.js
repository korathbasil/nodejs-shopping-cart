const mongoClient = require("mongodb").MongoClient;

let db;
module.exports.connect = (done) => {
  const connectionURL = "mongodb://localhost:27017";
  const dbName = "TechMart";

  mongoClient.connect(connectionURL, (err, data) => {
    if (err) {
      done(err);
    } else {
      //   console.log(data.db(dbName));
      db = data.db(dbName);
      done();
    }
  });
};

module.exports.getDb = () => {
  return db;
};
