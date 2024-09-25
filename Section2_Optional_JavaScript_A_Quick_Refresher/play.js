/*
What is nodeJS?
--> JS runtime environment

What are reference data types?
--> arrays, functions, collections, and all other types of objects
--> pointer that points to the location of that data type in memory


JS - Quick guide (refresher)

-slice method -> Copies array

SPREAD --> For Arrays
[...array] -> spread operator

REST --> For Objects
Const toArray  = (...args) => {
return arg
}
*/

const person = {
  name: "Max",
  age: 29,
  greet() {
    console.log("Hi, I am " + this.name);
  },
};

// Destructuring

const printName = ({ name, greet }) => {
  console.log(name);
};

printName(person);

const { name, age } = person;

const hobbies = ["Sports", "Cooking"];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);

// Asynchronus code..

const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done");
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log("Timer is done!");
  fetchData()
    .then((text) => {
      console.log(text);
      return fetchData();
    })
    .then((text2) => {
      console.log(text2);
    });
}, 2000);
