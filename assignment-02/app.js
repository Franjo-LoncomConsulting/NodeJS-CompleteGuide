const http = require("http");
const express = require("express");

const app = express();
// app.use((req, res, next) => {
//   console.log("This will come out!");
//   next();
// });

// app.use( (req, res, next) => {
//   console.log("This will come out too!");
//   res.send("<h1>Hello there!</h1>");
// });

app.use("/users", (req, res, next) => {
  console.log("This will be cl-ed to the /users path");
});

app.use("/", (req, res, next) => {
  console.log("This will be cl-ed to the / path");
  res.send();
});

app.listen(3000);
