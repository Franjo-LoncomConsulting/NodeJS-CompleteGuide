const Product = require("../models/product"); // Class added

exports.getAddProduct = (req, res, next) => {
  res.render("add-products", {
    docsTitle: "Add product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title); // Create new object based on the class blueprint
  product.save(); // Call save method from Product class
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll(); // Calling fetch all method from the Product class so that we can render them on /
  res.render("shop", {
    prods: products,
    docsTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
