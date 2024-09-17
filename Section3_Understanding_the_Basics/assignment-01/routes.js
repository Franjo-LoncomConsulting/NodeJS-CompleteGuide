const requestHandler = (req, res) => {
  const url = req.url;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Write a greeting!</title></head>");
    res.write(
      "<body><main><h1>Greetings!</h1><form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>SEND</button></form> <a href='/users'>Users webpage</a></main></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write(
      "<body><main><h1>Hello, this is a list of users:</h1><ul><li>Antonio</li><li>Marko</li><li>Borna</li></ul></main></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody.split("=")[1]);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
};

module.exports = requestHandler;
