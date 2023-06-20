// Create some seed data and export it from this file
const users = [
  { username: "Brandon", email: "Brandon@gmail.com", password: "12345678" },
  { username: "Jeffrey", email: "Jeffrey@gmail.com", password: "12345678" },
  { username: "Elliot", email: "Elliot@gmail.com", password: "12345678" },
  { username: "Brian", email: "Brian@gmail.com", password: "12345678" },
];

const products = [
  {
    product_name: "The Angus Burger",
    price: (3, 2),
    description: "made from cow",
  },
  {
    product_name: "The Chicken Burger",
    price: (3, 2),
    description: "made from chicken",
  },
  {
    product_name: "The Pork Burger",
    price: (3, 2),
    description: "made from pig",
  },
  {
    product_name: "The fish Burger",
    price: (3, 2),
    description: "made from fish",
  },
  {
    product_name: "Coke cola",
    price: (3, 2),
    description: "crispy fizziness",
  },
  {
    product_name: "Dr.pepper",
    price: (3, 2),
    description: "23 amazing flavors",
  },
  {
    product_name: "Mountain dew",
    price: (1, 2),
    description: "comes from mount everest",
  },
  {
    product_name: "Fries",
    price: (2, 2),
    description: "pentagon fries",
  },
  {
    product_name: "fruits cups",
    price: (1, 2),
    description: "comes from mount everest",
  },
  {
    product_name: "ice cream cone",
    price: (1, 2),
    description: "toothpaste",
  },
  {
    product_name: "sundaes",
    price: (1, 2),
    description: "made straight from the udders of cow",
  },

  {
    product_name: "Two for $3",
    price: (1, 2),
    description: "get two burgers for the price of 4",
  },
  {
    product_name: "Grimace birthday meal",
    price: (1, 2),
    description: "made with real babies... cow babies",
  },
];
const categories = [
  { categoryname: "Sandwiches" },
  { categoryname: "Beverages" },
  { categoryname: "Sides" },
  { categoryname: "Sweets/Snacks" },
  { categoryname: "deals" },
];
const inventories = [
  { product_id: 1, quantity: 100 },
  { product_id: 2, quantity: 100 },
  { product_id: 3, quantity: 100 },
  { product_id: 4, quantity: 100 },
  { product_id: 5, quantity: 100 },
];
const cart_items = [
  { shoppingcart_id: null, product_id: 1, count: null },
  { shoppingcart_id: null, product_id: 2, count: null },
  { shoppingcart_id: null, product_id: 3, count: null },
  { shoppingcart_id: null, product_id: 4, count: null },
  { shoppingcart_id: null, product_id: 5, count: null },
];

const categorythroughs = [
  { category_id: 1, product_id: 1 },
  { category_id: 1, product_id: 2 },
];

const shopping_carts = [
  { status: null, user_id: 1 },
  { status: null, user_id: 2 },
  { status: null, user_id: 3 },
  { status: null, user_id: 4 },
];

// ]
module.exports = {
  users,
  categories,
  inventories,
  cart_items,
  shopping_carts,
  products,
  categorythroughs,
};
