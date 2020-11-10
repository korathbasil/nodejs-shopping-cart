const express = require("express");
const router = express.Router();

const productHelpers = require("../helpers/product-helpers");

/* GET home page. */
router.get("/", function (req, res, next) {
  let user = req.session.user;
  productHelpers.getAllProducts().then((products) => {
    res.render("index", { admin: false, products, user });
  });
});

module.exports = router;
