const http = require("http");
const express = require("express");
const path = require("path");
const app = express();

const expressHbs = require("express-handlebars");

// PUG
// app.set("view engine", "pug"); // pug supported out of the box
// app.set("views", "views"); // we want to compile dynamic templates with the pug engine and where to find these templates

// HandleBars
// app.engine(
//   "handlebars",
//   expressHbs({ layoutsDir: "views/layouts/", defaultLayout: "main-layout" })
// ); // We call function expressHbs to initialise this engine
// app.set("view engine", "handlebars");
// app.set("views", "views");

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
  // res.status(404).send("<h1>Page Not Found</h1>");
  res.status(404).render("404", { docsTitle: "404" });
});

app.listen(3000);
