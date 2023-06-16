const client = require("../client");

async function createInventory({ product_id, quantity }) {
  try {
    const {
      rows: [inventory],
    } = await client.query(
      `
            INSERT INTO inventory(product_id, quantity)
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
module.exports = { createInventory };
