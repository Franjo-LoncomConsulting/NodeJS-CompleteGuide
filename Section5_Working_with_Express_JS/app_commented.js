/*
TABLE OF CONTENT 

1.ADDING MIDDLEWARE
2.HOW MIDDLEWARE WORKS

*/

// const http = require("http");
// const express = require("express");

// const app = express();

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
// app.use("/", (req, res, next) => {
//   /// this middleware will be executed for all paths...
//   console.log("This will always run!");
//   next();
// });

// app.use("/add-product", (req, res, next) => {
//   console.log("In another middleware!");
//   res.send("<h1>The Add product page</h1>");
// });

// app.use("/", (req, res, next) => {
//   console.log("In another middleware!");
//   res.send("<h1>Hello from express!</h1>");
// });

//------------------------------------------------------------------------------------------------------- //
//3.PARSING INCOMING REQUESTS

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extebded: false })); // Registers a middleware that will do that whole bodz parsing we had to do manually (but not for all types of data like json --> for that we will use something else later!)

// app.use(express.urlencoded({ extended: true }));

// app.use("/add-product", (req, res, next) => {
//   res.send(
//     "<form action='/product' method='POST'><input type='text' name='title'><button type='submit' '>Add product</button></form>"
//   );
// });

// app.use("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

// app.use("/", (req, res, next) => {
//   res.send("<h1>Hello from Express!</h1>");
// });

//------------------------------------------------------------------------------------------------------- //
//4.LIMITING MIDDLEWARE EXECUTION TO POST REQUESTS

// --> Instead of app.use() --> app.get() // app.post()
// Instead of use which will work with all http methods, we can use get or post to filter.
// We also have delete,patch,put

// app.use(express.urlencoded({ extended: true }));

// app.use("/add-product", (req, res, next) => {
//   res.send(
//     "<form action='/product' method='POST'><input type='text' name='title'><button type='submit' '>Add product</button></form>"
//   );
// });

// app.get("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

// app.use("/", (req, res, next) => {
//   res.send("<h1>Hello from Express!</h1>");
// });

// const server = http.createServer(app);
// server.listen(3000);
// app.listen(3000); // Instead of the 2 lines above.

//------------------------------------------------------------------------------------------------------- //
//5.USING EXPRESS ROUTING
// Typically we want to split our routing code over multiple files (export logic in different files and import it into this main file)
// Routing related code put in routes folder

const http = require("http");
const express = require("express");

const app = express();

const adminRoutes = require("./routes/admin"); // Imports router object, that in turn has the registrated routes. // Also a valid middleware function
const shopRoutes = require("./routes/shop");

app.use("/admin", adminRoutes);
//  --> If we have such a setup where our paths in such a router file start with the same part, or with the same segment, we can take that segment and add it as a filter. --> only routes starting with /admin will go into the admin routs file
// This filtering mechanism here in app.js allows us to put a common starting segment for our path which all routes in a given file use to outsource that into this app.js file so that we don't have to repeat that for all the routs in admin.js file

app.use(shopRoutes);

// Adding 404 error page
app.use((req, res, next) => {
  // res.status(404).send("<h1>Page Not Found</h1>");
  // res
  //   .status(404)
  //   .sendFile(path.join(__dirname, "views", "page_not_found.html"));
});

app.listen(3000);

//6.CREATING HTML Page
// -> We make a folder named views (MVC - model view controller structure)
// -> We manage our views(what we serve to the user) in one place of our application in the views folder.
