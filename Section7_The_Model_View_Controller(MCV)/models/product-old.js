const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    // products.push(this); // This will refer to the object created based on the class and tha is exactly the object I want to store in this array..
    const p = path.join(__dirname, "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this); // Make sure we are pushing "this" with the arrow function so that it reffers to the Class
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      }); // Stringify method takes js object or array and converts it into JSON
    });
  }

  static fetchAll() {
    // Util function --> not called on signle instance of a product because it shuld fetch all the products. Static keyword makes sure that we can call this method directly on the class itself and not on an instantiated object
    const p = path.join(__dirname, "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
