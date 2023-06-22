const client = require("../client");

async function createShoppingCarts({ status, user_id }) {
  try {
    console.log(user_id);
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
            INSERT INTO shoppingcarts(status, user_id)
            VALUES($1,$2)
            RETURNING *;
            `,
      [status, user_id]
    );
    return shoppingCart;
  } catch (error) {
    throw error;
  }
}
module.exports = { createShoppingCarts };
