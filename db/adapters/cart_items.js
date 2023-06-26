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
async function updateCartItems({
  item_id,
  shoppingcart_id,
  product_id,
  count,
}) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
    UPDATE cart_items
    SET item_id = $1
    WHERE shoppingcart_id = $2 and product_id =  $3 and count= $4
    ;
    `,
      [item_id, shoppingcart_id, product_id, count]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}

async function deleteCartItem(product_id) {
  const {
    rows: [cart_item],
  } = await client.query("DELETE from cart_items WHERE product_id=$2", [
    product_id,
  ]);
  return cart_item;
}

module.exports = { createCart_Items, updateCartItems };
