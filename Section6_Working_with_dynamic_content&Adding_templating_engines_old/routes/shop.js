const express = require("express");
const path = require("path");
rootDir = require("../util/path");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.product;
  res.render("shop", {
    prods: products,
    docsTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  }); // render method provides by express --> it will use the default templating engine which is why we had to define it.
});

module.exports = router;
