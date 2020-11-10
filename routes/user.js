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
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => {
      res.redirect("/login");
    });
});
module.exports = router;
