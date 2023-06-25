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

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
          SELECT * FROM products;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(product_id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * FROM products
    WHERE product_id = $1;
    `,
      [product_id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(product_id, product_name, price, description) {
  try {
    const {
      rows: [updatedProduct],
    } = await client.query(
      `
    UPDATE products
    SET product_name = $2,
    price = $3,
    description = $4
    WHERE product_id = $1
    RETURNING *;
    `,
      [product_id, product_name]
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
