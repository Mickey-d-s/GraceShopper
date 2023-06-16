const client = require("./client");

async function dropTables() {
  console.log("Dropping tables...");
  try {
    console.log("Starting to drop tables");
    await client.query(`
      DROP TABLE IF EXISTS inventory, category;
      DROP TABLE IF EXISTS categorythrough, cartitems, shopping_cart;
      DROP TABLE IF EXISTS products, users;
    `);
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");
  try {
    // -- Create the "users" table
    await client.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(50) NOT NULL
      )`);

    // -- Create the "products" table
    await client.query(`
      CREATE TABLE products (
        product_id SERIAL PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL UNIQUE,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        quantity INT,
      )`);

    // -- Create the "category" table
    await client.query(`
      CREATE TABLE category (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(100) NOT NULL UNIQUE
      )`);

    // -- Create the "categorythrough" table
    await client.query(`
      CREATE TABLE categorythrough (
        categorythrough_id SERIAL PRIMARY KEY,
        product_id INT,
        category_id INT,
        FOREIGN KEY (product_id) REFERENCES products(product_id),
        FOREIGN KEY (category_id) REFERENCES category(category_id)
      )`);

    // -- Create the "inventory" table
    await client.query(`
      CREATE TABLE inventory (
        inventory_id SERIAL PRIMARY KEY,
        product_id INT,
        quantity INT,
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      )`);

    // -- Create the "shoppingcart" table
    await client.query(`
      CREATE TABLE shoppingcart (
        shoppingcart_id SERIAL PRIMARY KEY,
        status text,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      )`);

    // -- Create the "cart_items" table
    await client.query(`
      CREATE TABLE cart_items (
        item_id SERIAL PRIMARY KEY,
        shoppingcart_id INT,
        product_id INT,
        quantity INT,
        FOREIGN KEY (shoppingcart_id) REFERENCES shoppingcart(shoppingcart_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      )`);
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
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
