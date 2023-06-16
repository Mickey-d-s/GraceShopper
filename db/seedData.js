// Create some seed data and export it from this file
const users = [
  { username: "Brandon", email: "Brandon@gmail.com", password: 12345678 },
  { username: "Jefrrey", email: "Jeffrey@gmail.com", password: 12345678 },
  { username: "Elliot", email: "Elliot@gmail.com", password: 12345678 },
  { username: "Brian", email: "Brian@gmail.com", password: 12345678 },
];

const products = [
  {
    product_id: 1,
    product_name: "The Angus Burger",
    price: "$3",
    description: "made from cow",
    quantity: 100,
  },
  {
    product_id: 1,
    product_name: "The Chicken Burger",
    price: "$3",
    description: "made from chicken",
    quantity: 100,
  },
  {
    product_id: 1,
    product_name: "The Pork Burger",
    price: "$3",
    description: "made from pig",
    quantity: 100,
  },
  {
    product_id: 1,
    product_name: "The fish Burger",
    price: "$3",
    description: "made from fish",
    quantity: 100,
  },
  {
    product_id: 2,
    product_name: "Coke cola",
    price: "$1",
    description: "crispy fizziness",
    quantity: 100,
  },
  {
    product_id: 2,
    product_name: "Dr.pepper",
    price: "$1",
    description: "23 amazing flavors",
    quantity: 100,
  },
  {
    product_id: 2,
    product_name: "Mountain dew",
    price: "$1",
    description: "comes from mount everest",
    quantity: 100,
  },
  {
    product_id: 3,
    product_name: "Fries",
    price: "$2",
    description: "pentagon fries",
    quantity: 100,
  },
  {
    product_id: 3,
    product_name: "fruits cups",
    price: "$1.5",
    description: "comes from mount everest",
    quantity: 100,
  },
  {
    product_id: 4,
    product_name: "ice cream cone",
    price: "$1",
    description: "toothpaste",
    quantity: 100,
  },
  {
    product_id: 4,
    product_name: "sundaes",
    price: "$1",
    description: "made straight from the udders of cow",
    quantity: 100,
  },

  {
    product_id: 5,
    product_name: "Two for $3",
    price: "$4",
    description: "get two burgers for the price of 4",
    quantity: 100,
  },
  {
    product_id: 5,
    product_name: "Grimace birthday meal",
    price: "20",
    description: "made with real babies... cow babies",
    quantity: 100,
  },
];
const category = [
  { categoryname: "Sandwiches" },
  { categoryname: "Beverages" },
  { categoryname: "Sides" },
  { categoryname: "Sweets/Snacks" },
  { categoryname: "deals" },
];
module.exports = { users };
