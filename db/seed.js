const client = require("./client");
const { createUser } = require("./adapters/users");
const { createProduct } = require("./adapters/products");
const { createCategory } = require("./adapters/category");
const { createCategoryThrough } = require("./adapters/categorythrough");
const { createShoppingCarts } = require("./adapters/shoppingcart");
const { createInventories } = require("./adapters/inventory");
const { createCart_Items } = require("./adapters/cart_items");
const {
  users,
  products,
  categories,
  categorythroughs,
  inventories,
  shopping_carts,
  cart_items,
} = require("./seedData");

async function dropTables() {
  console.log("Dropping tables...");
  try {
    console.log("Starting to drop tables");
    await client.query(`
      DROP TABLE IF EXISTS inventories, categories, categorythroughs, cart_items, shoppingcarts, products, users CASCADE;
    `);
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");
  try {
    // -- Create the "users" table
    console.log("before creating user");
    await client.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(50) NOT NULL
      )`);
    console.log("after creating user");

    // // -- Create the "products" table
    //there is more work in products its all 2 dollars
    await client.query(`
      CREATE TABLE products (
        product_id SERIAL PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL UNIQUE,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        inventory_id INT
      )`);

    // // -- Create the "category" table
    await client.query(`
      CREATE TABLE categories (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(100) NOT NULL UNIQUE
      )`);

    // // -- Create the "categorythrough" table
    await client.query(`
      CREATE TABLE categorythroughs (
        categorythrough_id SERIAL PRIMARY KEY,
        product_id INT,
        category_id INT,
        FOREIGN KEY (product_id) REFERENCES products(product_id),
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
      )`);

    // // -- Create the "inventory" table
    await client.query(`
      CREATE TABLE inventories (
        inventory_id SERIAL PRIMARY KEY,
        product_id INT,
        quantity INT,
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      )`);

    // // // -- Create the "shoppingcart" table
    await client.query(`
      CREATE TABLE shoppingcarts (
        shoppingcart_id SERIAL PRIMARY KEY,
        status text,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      )`);
    // // // -- Create the "cart_items" table
    await client.query(`
      CREATE TABLE cart_items (
        item_id SERIAL PRIMARY KEY,
        shoppingcart_id INT,
        product_id INT,
        count INT,
        FOREIGN KEY (shoppingcart_id) REFERENCES shoppingcarts(shoppingcart_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      )`);
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
    for (const user of users) {
      await createUser(user);
      console.log("users table populated");
    }
    for (const product of products) {
      await createProduct(product);
      console.log("products table populated");
    }
    for (const category of categories) {
      await createCategory(category);
      console.log("categories table populated");
    }
    for (const categorythrough of categorythroughs) {
      await createCategoryThrough(categorythrough);
      console.log("categorythrough table populated");
    }
    for (const inventory of inventories) {
      await createInventories(inventory);
      console.log("Inventory table populated");
    }
    for (const shoppingCart of shopping_carts) {
      console.log("shopping cart item:", shoppingCart);
      await createShoppingCarts(shoppingCart);
      console.log("ShoppingCarts table populated");
    }
    for (const cart_item of cart_items) {
      await createCart_Items(cart_item);
      console.log("Cart items table populated");
    }
    // Add code to populate tables here
  } catch (error) {
    console.error(error);
  }
}

async function rebuildDb() {
  try {
    await client.connect();
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
