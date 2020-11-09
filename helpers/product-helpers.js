const db = require("../dbConfig");

module.exports = {
  addProduct: (product, cb) => {
    db.getDb()
      .collection("product")
      .insertOne(product)
      .then((data) => {
        cb(data.ops[0]._id);
      });
  },
};
