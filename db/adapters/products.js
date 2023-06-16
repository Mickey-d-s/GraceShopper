const client = require("../client");

async function createProduct({ product_name, price, description }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(product_name, price, description)
            VALUES($1,$2,$3)
            ON CONFLICT (product_name) DO NOTHING
            RETURNING *;
            `,
      [product_name, price, description]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = { createProduct };
