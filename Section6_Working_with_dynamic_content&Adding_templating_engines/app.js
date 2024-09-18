const http = require("http");
const express = require("express");
const path = require("path");
const app = express();

//EJS
app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public"))); // Access public files

app.use("/admin", adminData.routes);
app.use(shopRoutes);

// Adding 404 error page
app.use((req, res, next) => {
  res.status(404).render("404", { docsTitle: "404" });
});

app.listen(3000);
