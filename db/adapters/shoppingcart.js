const { client } = require("../client");

async function createShoppingCart({ status, user_id }) {
  try {
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
            INSERT INTO shoppingcart(status, user_id)
            VALUES($1,$2)
            RETURNING *;
            `,
      [status, user_id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
