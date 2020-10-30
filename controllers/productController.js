const db = require("../dbConfig").getDb();

module.exports = {
  //   addProduct: (product, cb) => {
  //     db.collection("product")
  //       .insertOne(product)
  //       .then((data) => {
  //         cb(true);
  //       });
  //   },
  test: () => {
    console.log(db);
  },
};
