/*
TABLE OF CONTENT 

1.ADDING MIDDLEWARE
2.HOW MIDDLEWARE WORKS

*/

const http = require("http");
const express = require("express");

const app = express();

//------------------------------------------------------------------------------------------------------- //
// 1.ADDING MIDDLEWARE

// This function will be executed for every request
// Will receive 3 args: req, res, next
// Req and res are basically what we already know + some extra features
// next - function that will be passed to the arrow function, which will be passed to the use method by expressJS, and this next arg(function that we are receiving) has to be executed to allow the request to travel on to the next middleware.

// We should call next if we want to allow the request to go to the next function, and send a response if we have other plans.

// app.use((req, res, next) => {
//   console.log("In the middleware!");
//   next(); // Allows the request to continuo to the next middleware in line.
// });

// app.use((req, res, next) => {
//   console.log("Next Middleware!");
//   //...
// });

//------------------------------------------------------------------------------------------------------- //
// 2.HOW MIDDLEWARE WORKS

// app.use((req, res, next) => {
//   console.log("In the middleware!");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("In another middleware!");
//   res.send("<h1>Hello from express!</h1>");
// });

//------------------------------------------------------------------------------------------------------- //
//3.HANDLING DIFFERENT ROUTES
app.use("/", (req, res, next) => {
  /// this middleware will be executed for all paths...
  console.log("This will always run!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>The Add product page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from express!</h1>");
});

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000); // Instead of the 2 lines above.
