const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
const collection = require("../config/collections");

module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.getDb()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve();
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
};
