const client = require("../client");

async function createCart_Item({ shoppingcart_id, product_id, count }) {
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

async function getCartById(item_id) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
    SELECT * FROM cart_items
    WHERE item_id = $1;
    `,
      [item_id]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateCartItem({ item_id, shoppingcart_id, product_id, count }) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
    UPDATE cart_items
    SET shoppingcart_id = $2, product_id =  $3, count= $4
    WHERE item_id = $1
    RETURNING *;
    
    `,
      [item_id, shoppingcart_id, product_id, count]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}

async function deleteCartItem(shoppingcart_id) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
  DELETE from cart_items WHERE item_id =$1
  RETURNING *;
  `,
      [shoppingcart_id]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart_Item,
  getCartById,
  updateCartItem,
  deleteCartItem,
};
