var express = require("express");
var router = express.Router();

const userHelper = require("../helpers/user-helpers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/login", (req, res) => {
  res.render("user/login");
});
router.post("/login", (req, res) => {
  userHelper
    .doLogin(req.body)
    .then((result) => {
      req.session.isLoggedin = true;
      req.session.user = result.user;
      res.redirect("/");
    })
    .catch((e) => {
      res.redirect("/login");
    });
});
router.get("/signup", (req, res) => {
  res.render("user/signup");
});
router.post("/signup", (req, res) => {
  console.log(req.body);
  userHelper
    .doSignup(req.body)
    .then((user) => {
      req.session.isLoggedin = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((e) => {
      res.redirect("/login");
    });
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
router.get("/cart", (req, res) => {
  userHelper.getCartProducts(req.session.user._id).then((products) => {
    console.log(products);
    res.render("user/cart", { products });
  });
});
router.get("/add-to-cart/:id", (req, res) => {
  userHelper.addToCart(req.session.user._id, req.params.id).then(() => {
    res.json({ status: true, count: 12 });
  });
});
router.get("/checkout", (req, res) => {
  resw.render("user/checkout");
});
module.exports = router;
