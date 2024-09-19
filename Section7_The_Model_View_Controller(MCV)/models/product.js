// const fs = require("fs");
// const path = require("path");

// module.exports = class Product {
//   constructor(title) {
//     this.title = title;
//   }
//   save() {
//     // products.push(this); // This will refer to the object created based on the class and tha is exactly the object I want to store in this array..
//     const p = path.join(__dirname, "data", "products.json");
//     fs.readFile(p, (err, fileContent) => {
//       let products = [];
//       if (!err) {
//         products = JSON.parse(fileContent);
//       }
//       products.push(this); // Make sure we are pushing "this" with the arrow function so that it reffers to the Class
//       fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//       }); // Stringify method takes js object or array and converts it into JSON
//     });
//   }

//   static fetchAll() {
//     // Util function --> not called on signle instance of a product because it shuld fetch all the products. Static keyword makes sure that we can call this method directly on the class itself and not on an instantiated object
//     const p = path.join(__dirname, "data", "products.json");
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         cb([]);
//       }
//       cb(JSON.parse(fileContent));
//     });
//   }
// };

const fs = require("fs");
const path = require("path");

const getFilePath = () => {
  return path.join(__dirname, "data", "products.json");
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = getFilePath();

    // Read file to get existing products
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        try {
          products = JSON.parse(fileContent); // Parse the existing file content
        } catch (parseErr) {
          console.log("Error parsing JSON:", parseErr);
        }
      }

      // Add the new product
      products.push(this);

      // Write the updated products array back to the file
      fs.writeFile(p, JSON.stringify(products, null, 2), (writeErr) => {
        if (writeErr) {
          console.log("Error writing file:", writeErr);
        }
      });
    });
  }

  static fetchAll(cb) {
    const p = getFilePath();

    // Read the products from the file
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        console.log("Error reading file, returning empty array:", err);
        return cb([]); // Return an empty array if the file can't be read
      }

      try {
        const products = JSON.parse(fileContent); // Parse the file content
        cb(products); // Pass products to the callback
      } catch (parseErr) {
        console.log("Error parsing JSON:", parseErr);
        cb([]); // Return an empty array if parsing fails
      }
    });
  }
};
