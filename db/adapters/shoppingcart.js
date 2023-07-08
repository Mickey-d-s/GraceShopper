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
async function deleteshoppingcartbyuserid({ user_id }) {
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

async function updateshoppingcart({ user_id, updateObj }) {
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
async function getshoppingcartbyuserid(user_id) {
  try {
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
      SELECT * 
      FROM shoppingcarts
      WHERE shoppingcarts.user_id = $1 AND status = 'pending'
    `,
      [user_id]
    );
    return shoppingCart;
  } catch (error) {
    throw error;
  }
}

async function getAllOrdersByUserId(user_id) {
  try {
    const { rows: shoppingCart } = await client.query(
      `SELECT shoppingcarts.shoppingcart_id AS shoppingcart_id, shoppingcarts.user_id AS user_id, shoppingcarts.status AS status,
COALESCE(
    JSON_AGG(
        JSON_BUILD_OBJECT (
        'item_id', cart_items.item_id,
        'product_id', products.product_id,
        'name', products.product_name,
        'qty', cart_items.count,
        'price', products.price
        )
    )::json,
    '[]'::json
) AS products
FROM shoppingcarts
LEFT JOIN cart_items ON shoppingcarts.shoppingcart_id = cart_items.shoppingcart_id
LEFT JOIN products ON cart_items.product_id = products.product_id
GROUP BY shoppingcarts.shoppingcart_id, shoppingcarts.user_id, shoppingcarts.status;`,
      [user_id]
    );
    return shoppingCart;
  } catch (error) {
    console.log("Error in getting the Shopping Cart by User Id:", error);
    throw error;
  }

  // async function getShoppingCartById(shoppingcart_id) {
  //   try {
  //     const {
  //       rows: [shoppingCart],
  //     } = await client.query(
  //       `
  //     SELECT *
  //     FROM shoppingcarts
  //     WHERE shoppingcart_id = $1;
  //   `,
  //       [shoppingCart]
  //     );
  //     return shoppingcart_id;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = {
  createShoppingCarts,
  deleteshoppingcartbyuserid,
  updateshoppingcart,
  getshoppingcartbyuserid,
  //getShoppingCartById,
  getAllOrdersByUserId,
};

