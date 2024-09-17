/*
Core Modules
http -> Launch a server, send requests
https -> Launch a SSL server
fs
path
os
*/

// HTTP
const http = require("http");

//function rqListener(req, res) {}

// Function rqListener will now run for every request that reaches our server
//http.createServer(rqListener);

// We can also do it with anonymous function

// http.createServer(function (req, res) {});

// or arrow func
const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(3000);
