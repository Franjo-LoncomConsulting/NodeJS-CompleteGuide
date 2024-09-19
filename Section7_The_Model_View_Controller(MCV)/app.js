const http = require("http");
const express = require("express");
const path = require("path");
const app = express();

//EJS
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public"))); // Access public files

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Adding 404 error page
app.use(errorsController.get404);

app.listen(3000);
