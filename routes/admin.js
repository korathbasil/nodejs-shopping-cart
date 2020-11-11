const express = require("express");
const router = express.Router();

const productHelpers = require("../helpers/product-helpers");

router.get("/", (req, res) => {
  productHelpers.getAllProducts().then((products) => {
    // console.log(products);
    res.render("admin/home", { admin: true, products });
  });
});
router.get("/add-product", (req, res) => {
  res.render("admin/add-products", { admin: true });
});
router.post("/add-product", (req, res) => {
  image = req.files.image;
  imageName = new Date().toISOString();
  imageExt = image.name.split(".")[image.name.split(".").length - 1];
  imagePath = `/images/products/${imageName}.${imageExt}`;
  image.mv(`./public/images/products/${imageName}.${imageExt}`, (err, done) => {
    if (!err) {
      // res.render("admin/add-products", { admin: true });
    } else {
      console.log(err);
    }
  });
  productHelpers.addProduct(req.body, imagePath, () => {
    res.render("admin/add-products");
  });
});
router.get("/edit-product/:id", (req, res) => {
  const productId = req.params.id;
  productHelpers.getProductDetails(productId).then((product) => {
    res.render("admin/edit-product", { product });
  });
});
router.get("/delete-product/:id", (req, res) => {
  const productId = req.params.id;
  productHelpers.deleteProduct(productId).then(() => {
    res.redirect("/admin");
  });
});
router.post("/edit-product/:id", (req, res) => {
  const productId = req.params.id;
  if (req.files.image) {
    image = req.files.image;
    imageName = new Date().toISOString();
    imageExt = image.name.split(".")[image.name.split(".").length - 1];
    imagePath = `/images/products/${imageName}.${imageExt}`;
    image.mv(
      `./public/images/products/${imageName}.${imageExt}`,
      (err, done) => {
        if (!err) {
          // res.render("admin/add-products", { admin: true });
        } else {
          console.log(err);
        }
      }
    );
    productHelpers.editProduct(productId, req.body, imagePath).then(() => {
      res.redirect("/admin");
    });
  } else {
    productHelpers.editProduct(productId, req.body).then(() => {
      res.redirect("/admin");
    });
  }
});
module.exports = router;
