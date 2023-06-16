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
    inventory_id: 1,
  },
  {
    product_id: 1,
    product_name: "The Chicken Burger",
    price: "$3",
    description: "made from chicken",
    inventory_id: 1,
  },
  {
    product_id: 1,
    product_name: "The Pork Burger",
    price: "$3",
    description: "made from pig",
    inventory_id: 1,
  },
  {
    product_id: 1,
    product_name: "The fish Burger",
    price: "$3",
    description: "made from fish",
    inventory_id: 1,
  },
  {
    product_id: 2,
    product_name: "Coke cola",
    price: "$1",
    description: "crispy fizziness",
    inventory_id: 2,
  },
  {
    product_id: 2,
    product_name: "Dr.pepper",
    price: "$1",
    description: "23 amazing flavors",
    inventory_id: 2,
  },
  {
    product_id: 2,
    product_name: "Mountain dew",
    price: "$1",
    description: "comes from mount everest",
    inventory_id: 2,
  },
  {
    product_id: 3,
    product_name: "Fries",
    price: "$2",
    description: "pentagon fries",
    inventory_id: 3,
  },
  {
    product_id: 3,
    product_name: "fruits cups",
    price: "$1.5",
    description: "comes from mount everest",
    inventory_id: 3,
  },
  {
    product_id: 4,
    product_name: "ice cream cone",
    price: "$1",
    description: "toothpaste",
    inventory_id: 4,
  },
  {
    product_id: 4,
    product_name: "sundaes",
    price: "$1",
    description: "made straight from the udders of cow",
    inventory_id: 4,
  },

  {
    product_id: 5,
    product_name: "Two for $3",
    price: "$4",
    description: "get two burgers for the price of 4",
    inventory_id: 5,
  },
  {
    product_id: 5,
    product_name: "Grimace birthday meal",
    price: "20",
    description: "made with real babies... cow babies",
    inventory_id: 5,
  },
];
const categories = [
  { categoryname: "Sandwiches" },
  { categoryname: "Beverages" },
  { categoryname: "Sides" },
  { categoryname: "Sweets/Snacks" },
  { categoryname: "deals" },
];
const inventory = [
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

const categorythrough = [{ category_id: null, product_id: null }];

const shopping_cart = [
  { status: null, user_id: 1 },
  { status: null, user_id: 2 },
  { status: null, user_id: 3 },
  { status: null, user_id: 4 },
];

// ]
module.exports = {
  users,
  categories,
  inventory,
  cart_items,
  shopping_cart,
  products,
  categorythrough,
};
