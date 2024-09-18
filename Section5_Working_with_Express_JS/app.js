const http = require("http");
const express = require("express");
const path = require("path");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public"))); // Access public files

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Adding 404 error page
app.use((req, res, next) => {
  // res.status(404).send("<h1>Page Not Found</h1>");
  res
    .status(404)
    .sendFile(path.join(__dirname, "views", "page_not_found.html"));
});

app.listen(3000);
