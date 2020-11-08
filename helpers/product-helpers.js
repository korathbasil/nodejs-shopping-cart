const db = require("../dbConfig");

module.exports = {
  addProduct: (product, cb) => {
    db.getDb()
      .collection("product")
      .insertOne(product)
      .then((data) => {
        cb(true);
      });
  },
  // test: () => {
  //   console.log(db);
  // },
};
