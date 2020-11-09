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
  productHelpers.addProduct(req.body, (id) => {
    image = req.files.image;
    imageExt = image.name.split(".")[image.name.split(".").length - 1];
    image.mv(`./public/images/products/${id}.${imageExt}`, (err, done) => {
      if (!err) {
        res.render("admin/add-products", { admin: true });
      } else {
        console.log(err);
      }
    });
  });
});

module.exports = router;
