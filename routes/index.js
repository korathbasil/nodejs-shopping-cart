const express = require("express");
const router = express.Router();

const productHelpers = require("../helpers/product-helpers");

/* GET home page. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    res.render("index", { admin: false, products });
  });
});

module.exports = router;
