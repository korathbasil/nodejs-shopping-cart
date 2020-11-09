const db = require("../config/dbConfig");
const collection = require("../config/collections");

module.exports = {
  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .getDb()
        .collection(collection.PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },
  addProduct: (product, imagePath, cb) => {
    const newProduct = {
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.desc,
      image: imagePath,
    };
    db.getDb()
      .collection("product")
      .insertOne(newProduct)
      .then((data) => {
        cb();
      });
  },
};
