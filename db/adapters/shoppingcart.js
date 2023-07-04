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

async function getShoppingCartById(shoppingcart_id) {
  try {
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
      SELECT *
      FROM shoppingcarts
      WHERE shoppingcart_id = $1;
    `,
      [shoppingCart]
    );
    return shoppingcart_id;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createShoppingCarts,
  deleteshoppingcartbyuserid,
  updateshoppingcart,
  getshoppingcartbyuserid,
  getShoppingCartById,
};
