const express = require("express");
const router = express.Router();

const productHelpers = require("../helpers/product-helpers");

router.get("/", (req, res) => {
  res.render("admin/home", { admin: true });
});
router.get("/add-product", (req, res) => {
  res.render("admin/add-products", { admin: true });
});
router.post("/add-product", (req, res) => {
  console.log(req.body);
  console.log(req.files.image);
  productHelpers.addProduct(req.body);
  res.send("submited");
});

module.exports = router;
