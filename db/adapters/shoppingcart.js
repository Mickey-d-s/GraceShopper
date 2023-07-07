const { array } = require("prop-types");
const client = require("../client");

async function createShoppingCarts({ status, user_id }) {
  try {
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

// not sure if we need a full crud but will do so just in case
async function deleteShoppingCartByUserId({ user_id }) {
  try {
    //untested
    console.log(user_id);
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
        Delete FROM shoppingcarts
        where id = $1 
        `,
      [user_id]
    );
  } catch (error) {
    throw error;
  }
}

async function updateShoppingCart({ user_id, updateObj }) {
  try {
    //untested
    console.log(user_id);
    const setString = Object.keys(updateObj)

      .map((key, i) => {
        return `${key}=$${i + 1}`;
      })
      .join(", ");
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
      UPDATE shoppingcarts
      SET ${setString}
      WHERE id = ${user_id}
      returning *
    `,
      Object.values(updateObj)
    );
  } catch (error) {
    throw error;
  }
}
async function getShoppingCartByUserId(user_id) {
  try {
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
      SELECT shoppingcarts.shoppingcart_id as id,
      shoppingcarts.status,
      shoppingcarts.user_id, 
       CASE WHEN cart_items.shoppingcart_id IS NULL THEN '[]'::json
      
      ELSE
      JSON_AGG(
          JSON_BUILD_OBJECT(
               'id', products.product_id,
               'name', products.product_name,
               'qty', cart_items.count,
               'price', products.price
          )
      ) END AS products
      FROM shoppingcarts
      FULL OUTER JOIN cart_items 
      ON shoppingcarts.shoppingcart_id = cart_items.shoppingcart_id
      FULL OUTER JOIN products
      ON products.product_id = cart_items.product_id
      WHERE user_id = $1 and status='pending'
      GROUP BY shoppingcarts.shoppingcart_id, cart_items.shoppingcart_id
    `,
      [user_id]
    );
    return shoppingCart;
  } catch (error) {
    throw error;
  }
}

// async function getShoppingCartById(shoppingcart_id) {
//   try {
//     const {
//       rows: [shoppingCart],
//     } = await client.query(
//       `
//       SELECT *
//       FROM shoppingcarts
//       WHERE shoppingcart_id = $1;
//     `,
//       [shoppingCart]
//     );
//     return shoppingcart_id;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  createShoppingCarts,
  deleteShoppingCartByUserId,
  updateShoppingCart,
  getShoppingCartByUserId,
  // getShoppingCartById,
};
