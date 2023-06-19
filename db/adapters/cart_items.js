const client = require("../client");

async function createCart_Items({ shoppingcart_id, product_id, count }) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
            INSERT INTO cart_items(shoppingcart_id, product_id, count)
            VALUES($1,$2,$3)
            RETURNING *;
            `,
      [shoppingcart_id, product_id, count]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}
module.exports = { createCart_Items };
