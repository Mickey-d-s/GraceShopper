// Create some seed data and export it from this file
const users = [
  { username: "Brandon", email: "Brandon@gmail.com", password: 12345678 },
  { username: "Jefrrey", email: "Jeffrey@gmail.com", password: 12345678 },
  { username: "Elliot", email: "Elliot@gmail.com", password: 12345678 },
  { username: "Brian", email: "Brian@gmail.com", password: 12345678 },
];

const products = [
  {
    product_name: "The Angus Burger",
    price: "$3",
    description: "made from cow",
    user_id: 1,
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
