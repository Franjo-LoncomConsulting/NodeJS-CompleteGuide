/*
TABLE OF CONTENT
  1.CREATING A NODE SERVER
  2.SENDING RESPONSE
  3.ROUTING REQUEST
  4.REDIRECTIN REQUESTS
  5.PARSING REQUEST BODIES
  6.UNDERSTANDING EVENT DRIVEN CODE EXECUTION
  7.BLOCKING AND NON BLOCKING CODE
  8.NODE.JS - LOOKING BEHIND THE SCENES
  9.USING THE NODE MODULES SYSTEM
  10.WRAP UP
*/

/*
Core Modules
http -> Launch a server, send requests
https -> Launch a SSL server
fs
path
os
*/

//------------------------------------------------------------------------------------------------------- //
// 1.CREATING A NODE SERVER

// HTTP
// const http = require("http");const http = require("http");

//function rqListener(req, res) {}

// Function rqListener will now run for every request that reaches our server
//http.createServer(rqListener);

// We can also do it with anonymous function

// http.createServer(function (req, res) {});

// or arrow func
// const server = http.createServer((req, res) => {
//   console.log(req);
// });

// server.listen(3000);

//------------------------------------------------------------------------------------------------------- //

// 2.SENDING RESPONSE

// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "text/html");
//   res.write("<html>");
//   res.write("<head><title>My First Page</title></head>");
//   res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
//   res.write("</html>");
//   res.end();
// });

//------------------------------------------------------------------------------------------------------- //

// 3.ROUTING REQUEST

// const http = require("http");

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   if (url === "/") {
//     res.write("<html>");
//     res.write("<head><title>Enter Message!</title></head>");
//     res.write(
//       "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>SEND</button></form></body>"
//     );
//     res.write("</html>");
//     return res.end(); // We must return here, because after res.end, we mustn't call any other headers
//   }
//   res.setHeader("Content-Type", "text/html");
//   res.write("<html>");
//   res.write("<head><title>My First Page</title></head>");
//   res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
//   res.write("</html>");
//   res.end();
// });

// server.listen(3000);

//------------------------------------------------------------------------------------------------------- //

// 4.REDIRECTIN REQUESTS

// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   const method = req.method;
//   if (url === "/") {
//     res.write("<html>");
//     res.write("<head><title>Enter Message!</title></head>");
//     res.write(
//       "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>SEND</button></form></body>"
//     );
//     res.write("</html>");
//     return res.end(); // We must return here, because after res.end, we mustn't call any other headers
//   }
//   if (url === "/message" && method === "POST") {
//     fs.writeFileSync("message.txt", `DUMMY`);
//     res.statusCode = 302;
//     res.setHeader("Location", "/");
//     return res.end();
//   }
//   res.setHeader("Content-Type", "text/html");
//   res.write("<html>");
//   res.write("<head><title>My First Page</title></head>");
//   res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
//   res.write("</html>");
//   res.end();
// });

// server.listen(3000);

//------------------------------------------------------------------------------------------------------- //

// 5.PARSING REQUEST BODIES

/*
Streams and buffers 
Example
--> Incoming request
Stream -> Request Body Part 1 -> Request Body Part 2 -> Request Body Part 3 -> Fully Parsed

Buffer -> Simply a construct which allows you to hold multiple chunks of data and work with them before they are released once your done.

*/

// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   const method = req.method;
//   if (url === "/") {
//     res.write("<html>");
//     res.write("<head><title>Enter Message!</title></head>");
//     res.write(
//       "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>SEND</button></form></body>"
//     );
//     res.write("</html>");
//     return res.end(); // We must return here, because after res.end, we mustn't call any other headers
//   }
//   if (url === "/message" && method === "POST") {
//     const body = [];
//     req.on("data", (chunk) => {
//       console.log(chunk);
//       body.push(chunk);
//     }); // Data event will be fired each time a new chunk is ready to be read. + Function that will fire for every data piece

//     req.on("end", () => {
//       // Buffer the chunks
//       const parseBody = Buffer.concat(body).toString(); // Buffer object available globbaly by NodeJS, concat(add all the chunks from body, array) to it. After that we convert it to string (only works because we know the incoming data will be text).
//       const message = parseBody.split("=")[1];
//       fs.writeFileSync("message.txt", message);
//     }); // Will be fired once its done parsing the incoming request in general.

//     res.statusCode = 302;
//     res.setHeader("Location", "/");
//     return res.end();
//   }
//   res.setHeader("Content-Type", "text/html");
//   res.write("<html>");
//   res.write("<head><title>My First Page</title></head>");
//   res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
//   res.write("</html>");
//   res.end();
// });

// server.listen(3000);

//------------------------------------------------------------------------------------------------------- //

// 6.UNDERSTANDING EVENT DRIVEN CODE EXECUTION

/*
programming approach where the flow of the program is determined by events (such as user actions, sensor outputs, or messages from other programs). Node.js uses an event-driven architecture, primarily managed by the Event Loop.

Key concepts:
Events: Actions or occurrences recognized by the program (like a network request completion or a user clicking a button).

Event Emitter: Node.js has an EventEmitter class to handle events. Objects emit events and other objects respond to them by using callbacks (event listeners).

Event Loop: Node.js runs a single thread that uses an event loop to handle asynchronous tasks. It listens for events and delegates tasks (I/O, timers, etc.) to handlers without blocking execution.

 */

//------------------------------------------------------------------------------------------------------- //
// 7.BLOCKING AND NON BLOCKING CODE

/*
 fs.writeFileSync  --> Sync = synchronous --> Will block code until the file is created
 --> we block the next line of code before this file is done. WE wont notice because the file is small...

 fs.writeFile('message.txt, message, (error)=> 
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  })

  --> this nested function will be executed onec we are done writing the file.
  --> event driven arhitecture --> tell nodeJS ---> pls do something, and it will go ahead and offload the process to the operating system which does multi threading, and will than continue its event loop, to listen to event callbacks. ---> It will come back when the opeartion is done by the OP. Never blocks the code, and never blocks the server. 
*/

//------------------------------------------------------------------------------------------------------- //
// 8.NODE.JS - LOOKING BEHIND THE SCENES

/*
How Node executes the code:
  1.Single JS Thread 
    ---> How is it able to handle multiple requests?
    ---> Perormance question: If the request A is still doing work, request B can't be handled?
    ---> Security question: Can you access data from request A, from request B?
  2.Event loop automatically starts when the program starts.
    ---> responsible for handling event callbacks.
    ---> FS operations are sent to Worker Pool 
      ---> responsible for heavy lifting 
      ---> Runs on different threads (detached from your code)
      ---> Once the worker is done, it will trigger the callback for that operation
      ---> Ends up in Event loop.
  3.The event loop
    ---> On beggining of each iteration it will check if there are any timer callbacks (setTimeout, setInterval);
    ---> Then checks other callbacks (Pending callbacks) - for example read or write files(Input & Output, Disk & Network operations) ~Blocking operations
    ---> Poll phaze, retrive new I/O events, execute their callbacks
    ---> Check phaze ---> execute setImmediate() callbacks
    ---> Close events phaze ---> execute all 'close' event callbacks
    ---> process.exit --> never finished by default


*/

//------------------------------------------------------------------------------------------------------- //
// 9.USING THE NODE MODULES SYSTEM

// const http = require("http");
// const routes = require("./routes");
// const server = http.createServer(routes);

// server.listen(3000);

//------------------------------------------------------------------------------------------------------- //
// 10.WRAP UP

/*
How the web works
Clinet -> Request -> Server -> Response -> Client

Program Lifecycle & Event Loop
- Node runs non-blocking JS code and uses an event-driven code ("Event Loop") for running your logic 
- Node program extis as soon as there is no more work to do
- Note: The createServer() event never finishes by default

// Asynchronous Code
--> JS Code is non-blocking
--> Use callbacks and events => Order Changes

Request & response
--> Parse request data in chunks (Streams & Buffers)
--> Avoid "double responses";

Node.js & Core Modules
--> Node ships with multiple core modules (http, fs, path...)
--> Core modules can be imported into any file to be used there
--> Import via require ('module');

Node Modul System
--> Import via require (./path-to-file) for custom files or require('module') for core & third-party modules
--> Export via modules.exports or just exports (for multiple exports);
*/
