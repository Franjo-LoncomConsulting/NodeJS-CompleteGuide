const express = require("express");

const path = require("path");
const rootDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "dashboard.html"));
});

router.get("/user", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "user.html"));
});

// router.post("/user", (req, res, next) => {
//   res.redirect("/");
// });

module.exports = router;
