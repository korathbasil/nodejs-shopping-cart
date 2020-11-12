const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
const collection = require("../config/collections");
const { ObjectID } = require("mongodb");

module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.getDb()
        .collection(collection.USER_COLLECTION)
        .insertOne({ ...userData, cart: [] })
        .then((data) => {
          resolve(data.ops[0]);
        });
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .getDb()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (user) {
        let isPasswordMatch = await bcrypt.compare(
          userData.password,
          user.password
        );
        if (isPasswordMatch) {
          resolve({ status: true, user: user });
        } else {
          reject({ status: false, message: "Incorrect Password" });
        }
      } else {
        reject({ status: false, message: "User not found" });
      }
    });
  },
  addToCart: (userId, productId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: ObjectID(userId) },
          {
            $push: {
              cart: ObjectID(productId),
            },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },
  getCartProducts: (userId) => {
    return new Promise(async (resolve, reject) => {
      let userWithLoadedCart = await db
        .getDb()
        .collection(collection.USER_COLLECTION)
        .aggregate([
          { $match: { _id: ObjectID(userId) } },
          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              let: { userCart: "$cart" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$userCart"],
                    },
                  },
                },
              ],
              as: "cart",
            },
          },
        ])
        .toArray();
      resolve(userWithLoadedCart[0].cart);
    });
  },
};
