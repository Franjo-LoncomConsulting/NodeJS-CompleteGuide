const http = require("http");
const express = require("express");
const path = require("path");
const app = express();

// Paths
const adminData = require("./routes/admin");
const dashboardData = require("./routes/dashboard");

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use("/", adminData.routes);
// app.use(dashboardData);

app.listen(3000);
