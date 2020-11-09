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
};
