const client = require("../client");

async function createInventories({ product_id, quantity }) {
  try {
    const {
      rows: [inventory],
    } = await client.query(
      `
            INSERT INTO inventories(product_id, quantity)
            VALUES($1, $2)
            RETURNING *;
            `,
      [product_id, quantity]
    );
    return inventory;
  } catch (error) {
    throw error;
  }
}
module.exports = { createInventories };
