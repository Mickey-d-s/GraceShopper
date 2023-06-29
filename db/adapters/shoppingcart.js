const { array } = require("prop-types");
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
async function getshoppingcartbyuserid({ user_id }) {
  try {
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
      SELECT
shoppingcarts.shoppingcart_id as id,
shoppingcarts.status as status,
shoppingcarts.user_id as customer,
JSON_AGG(
JSON_BUILD_OBJECT(
products.product_id,
products.product_name,
cart_items.count,
products.price
)
)
from shoppingcarts
full outer join cart_items
on shoppingcarts.shoppingcart_id = cart_items.shoppingcart_id
inner join products
on products.product_id = cart_items.product_id
where shoppingcarts.user_id = 1
group by shoppingcarts.shoppingcart_id
    `,
      [user_id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createShoppingCarts,
  deleteshoppingcartbyuserid,
  updateshoppingcart,
  getshoppingcartbyuserid,
};
