const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
const users = [];

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "Add User Page" });
});

app.get("/users", (req, res, next) => {
  res.render("users", { pageTitle: "Users page", users: users });
});

app.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/users");
});

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "404" });
});

app.listen(3000);
