const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message!</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>SEND</button></form></body>"
    );
    res.write("</html>");
    return res.end(); // We must return here, because after res.end, we mustn't call any other headers
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    }); // Data event will be fired each time a new chunk is ready to be read. + Function that will fire for every data piece

    return req.on("end", () => {
      // Buffer the chunks
      const parseBody = Buffer.concat(body).toString(); // Buffer object available globbaly by NodeJS, concat(add all the chunks from body, array) to it. After that we convert it to string (only works because we know the incoming data will be text).
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    }); // Will be fired once its done parsing the incoming request in general.
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

// 1. way of exporting
module.exports = requestHandler;

// 2.
/*
module.exports = {
handler: requestHandler,
someText: 'Some hard coded text'
}

*/
