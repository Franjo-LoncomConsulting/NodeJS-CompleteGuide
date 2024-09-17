const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  //   res.send("<h1>Hello from Express!</h1>");
  // Instead of sending text, lets send a file:
  res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // __dirname = global variable that holds the absolute path on our op system - it will point to the routes folder, then views folder, then the file --> correct path for both Linux and Windows where we use backslash
});

module.exports = router;
