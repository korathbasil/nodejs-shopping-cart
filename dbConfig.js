const mongoClient = require("mongodb").MongoClient;

let state = {
  db: null,
};

module.exports.connect = (done) => {
  const connectionURL = "mongodb://localhost:27017";
  const dbName = "TechMart";

  mongoClient.connect(connectionURL, (err, data) => {
    if (err) {
      done(err);
    } else {
      //   console.log(data.db(dbName));
      state.db = data.db(dbName);
      done();
    }
  });
};

module.exports.getDb = () => {
  return state.db;
};
