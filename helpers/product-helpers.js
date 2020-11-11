const db = require("../config/dbConfig");
const collection = require("../config/collections");
const { ObjectId } = require("mongodb");

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
  getProductDetails: (productId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collection.PRODUCT_COLLECTION)
        .findOne({ _id: ObjectId(productId) })
        .then((product) => {
          resolve(product);
        });
    });
  },
  editProduct: (productId, updatedDetails, newImagePath) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collection.PRODUCT_COLLECTION)
        .updateOne(
          {
            _id: ObjectId(productId),
          },
          {
            $set: {
              name: updatedDetails.name,
              category: updatedDetails.category,
              price: updatedDetails.price,
              description: updatedDetails.desc,
              image: newImagePath,
            },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },
  deleteProduct: (productId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collection.PRODUCT_COLLECTION)
        .removeOne({ _id: ObjectId(productId) })
        .then(() => {
          resolve();
        });
    });
  },
};
