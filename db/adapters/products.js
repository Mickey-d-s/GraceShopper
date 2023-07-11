const client = require("../client");

async function createProduct({ product_name, price, description, category }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(product_name, price, description, category)
            VALUES($1,$2,$3,$4)
            ON CONFLICT (product_name) DO NOTHING
            RETURNING *;
            `,
      [product_name, price, description, category]
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

async function updateProduct(
  product_id,
  product_name,
  price,
  description,
  category
) {
  try {
    const {
      rows: [updatedProduct],
    } = await client.query(
      `
    UPDATE products
    SET product_name = $2,
    price = $3,
    description = $4
    category = $5
    WHERE product_id = $1
    RETURNING *;
    `,
      [product_id, product_name, price, description, category]
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(product_id) {
  console.log("ping");
  try {
    await client.query(
      `DELETE FROM inventories 
      WHERE product_id = $1`,
      [product_id]
    );
    await client.query(
      `DELETE FROM cart_items 
    WHERE product_id = $1`,
      [product_id]
    );
    await client.query(
      `DELETE FROM products
      WHERE product_id = $1`,
      [product_id]
    );

    return { sucess: true, message: "inventory item deleted" };
  } catch (error) {
    return { sucess: false, message: error };
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
